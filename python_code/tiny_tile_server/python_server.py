
import bottle
import glob
import json
import sqlite3
import hashlib
import math

import python_wmts

# Here the user has to configure his own values 
config_url = ["http://localhost:8000/"]
title = "Tiny Tile Server"
service = ""
maps = []

def init_data(layer, x, y, z, ext, callback=None):
	if not callback:
		callback = "grid"
	global mylayer
	mylayer = layer
	return python_wmts.get_tile_wmts(mylayer, x, y, z, ext)

# CORS header
print 'Access-Control-Allow-Origin: *'

# ------------
# TEST SERVICE
# ------------
if(service == 'test'):
    bottle.response.content_type = "text/plain; charset=utf-8"
    print title + " at " + config_url
	
# ------------
# HTML SERVICE
# ------------
if(service == 'html'):
    maps = maps()

"""
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8"/>"""
"<title>%s</title>" % title
"""
<html>
<h1>Welcome to %s </h1>""" % title
"""
<p>This server distributes maps to desktop, web, and mobile applications.</p>
<p>The mapping data are available as OpenGIS Web Map Tiling Service (OGC WMTS), OSGEO Tile Map Service (TMS), and popular XYZ urls described with TileJSON metadata.</p>
"""

# Are there some maps on the server?
if(len(maps) == 0):
	"""
	<h3 style="color:darkred;">No maps available yet</h3>
	<p style="color:darkred; font-style: italic;">Ready to go, just upload some maps on this server.</p>
	<p>Note: The maps can be a directory with tiles in XYZ format with metadata.json file.<br/>
	You can easily convert existing geodata (GeoTIFF, ECW, MrSID, etc) to this tile structure with <a href="http://www.maptiler.com">MapTiler Cluster</a> or open-source projects such as <a href="http://www.klokan.cz/projects/gdal2tiles/">GDAL2Tiles</a> or <a href="http://www.maptiler.org/">MapTiler</a> or simply upload any maps in MBTiles format made by <a href="http://www.tilemill.com/">TileMill</a>. Helpful is also the <a href="https://github.com/mapbox/mbutil">mbutil</a> tool. Serving directly from .mbtiles files is supported, but with decreased performance.</p>
	"""

# Print the available maps
else:
    "<h3>Available maps</h3>"
    "<ul>"
    for map in maps:
		myname = map['name']
		"<li>%s</li>" % myname
    "</ul>"
"""
</body>
</html>
"""

# ------------
# JSON SERVICE
# ------------
if(service == 'json'):
    bottle.response.content_type = "application/json; charset=utf-8"
  
    if(mylayer):
        output = metadataTileJson(layer(mylayer))
    else:
        maps = maps()
        tilejsons = []
        for map in maps:
            tilejsons = metadataTileJson(map)
        output = tilejsons
	output = json_encode(output)
    output = output.replace("\\/","/") 
    if(callback):
        print "callback(output)"
    else:
		print output


# INTERNAL FUNCTIONS:

def maps():
    print "creating maps"
    maps = []
    maps.append(metadataFromMbtiles())
    return maps

# check is the metadata information will be extracted from the metadata.json file 
# or from the metadata table in the MBTiles database
def layer(mylayer):
    if((mylayer.find('.mbtiles')) == -1):
        return metadataFromMetadataJson(mylayer.append('/metadata.json'))
    else:
        return metadataFromMbtiles(mylayer)

# open and read the metadata from the file that receive as parameter, check that it is right 
# and add in metadata the basename with the value of that file
def metadataFromMetadataJson(jsonFileName):
	metadata = json.load(open(jsonFileName).read())
	metadata = metadataValidation(metadata)
	metadata['basename'] = jsonFileName.replace('/metadata.json', '')
	return metadata

# connect to the MBTiles database and extract all the metadata information from the metadata table, 
# check that it is right and add in metadata the basename with the value of the layer name
def metadataFromMbtiles():
	metadata = {}
	try:
		# Connect to the database and get the cursor
		db = sqlite3.connect("data/%s.mbtiles" % mylayer)
		c = db.cursor()
	except:
		# In case the connection can not be done
		bottle.response.content_type = "text/plain"
		return ["Not found: %s.mbtiles" % (mylayer,)]
	res = c.execute("select * from metadata")
	result = c.fetchall()
	for r in result:
		a = r[0] 
		b = r[1] 
		metadata[a] = b 
	metadata = metadataValidation(metadata)
	metadata['basename'] = mylayer
	return metadata

# check and correct the metadata; split the values from the bounds so we get an array with the four values, 
# assign 'mercator' as the value by default for profile in case this is missing, if there is not minzoom 
# it should be 0, if there is it specifies that should be an integer, if there is not maxzoom it should be 18, 
# if there is it specifies that should be an integer, assign 'png' as the value by default for format 
# in case this is missing
def metadataValidation(metadata):
	if('bounds' in metadata):
  		metadata['bounds'] = metadata['bounds'].split(',')
	if not('profile' in metadata):
		metadata['profile'] = 'mercator'
	if('minzoom' in metadata):
		metadata['minzoom'] = int(metadata['minzoom'])
	else:
		metadata['minzoom'] = 0
	if('maxzoom' in metadata):
		metadata['maxzoom'] = int(metadata['maxzoom'])
	else:
		metadata['maxzoom'] = 18
	if not('format' in metadata):
		metadata['format'] = 'png'
	return metadata

# add some more values to the metadata information: the 'tilejson', 
# the kind of the 'scheme' and the url for the 'tiles'
def metadataTileJson(metadata):
  metadata['tilejson'] = '2.0.0'
  metadata['sheme'] = 'xyz'
  tiles = []
  ext = '/{z}/{x}/{y}.'.append(metadata['format'])
  tiles.append(config_url[0].metadata['basename'].append(ext))
  metadata['tiles'] = tiles
  return metadata


# http://www.maptiler.org/google-maps-coordinates-tile-bounds-projection/
#!/usr/bin/env python
###############################################################################
# $Id$
#
# Project:  GDAL2Tiles, Google Summer of Code 2007 & 2008
#           Global Map Tiles Classes
# Purpose:  Convert a raster into TMS tiles, create KML SuperOverlay EPSG:4326,
#           generate a simple HTML viewers based on Google Maps and OpenLayers
# Author:   Klokan Petr Pridal, klokan at klokan dot cz
# Web:      http://www.klokan.cz/projects/gdal2tiles/
#
###############################################################################
# Copyright (c) 2008 Klokan Petr Pridal. All rights reserved.
#
# Permission is hereby granted, free of charge, to any person obtaining a
# copy of this software and associated documentation files (the "Software"),
# to deal in the Software without restriction, including without limitation
# the rights to use, copy, modify, merge, publish, distribute, sublicense,
# and/or sell copies of the Software, and to permit persons to whom the
# Software is furnished to do so, subject to the following conditions:
#
# The above copyright notice and this permission notice shall be included
# in all copies or substantial portions of the Software.
#
# THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
# OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
# FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
# THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
# LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
# FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
# DEALINGS IN THE SOFTWARE.
###############################################################################
class GlobalMercator:
	#global math.pi
	#pi = 3.14159
	
	# Initialize the TMS Global Mercator pyramid
	def __init__(self):
		print "Create"
		self.tileSize = 256
		self.initialResolution = 2 * math.pi * 6378137 / self.tileSize
		# 156543.03392804062 for tileSize 256 math.pixels
		self.originShift = 2 * math.pi * 6378137 / 2.0
		# 20037508.342789244

	# Converts given lat/lon in WGS84 Datum to XY in Spherical Mercator EPSG:900913
	def LatLonToMeters(self, lat, lon):
		mx = lon * self.originShift / 180.0
		my = math.log(math.tan((90 + lat) * math.pi / 360.0 )) / (math.pi / 180.0)
		my *= self.originShift / 180.0
		return (mx, my)

	# Converts XY point from Spherical Mercator EPSG:900913 to lat/lon in WGS84 Datum
	def MetersToLatLon(mx, my):
		lon = (mx / self.originShift) * 180.0
		lat = (my / self.originShift) * 180.0
		lat = 180 / math.pi * (2 * math.atan(math.exp(lat * math.pi / 180.0)) - math.pi / 2.0)
		return (lat, lon)

	# Converts math.pixel coordinates in given zoom level of pyramid to EPSG:900913
	def pixelsToMeters(px, py, zoom):
		res = Resolution(zoom)
		mx = px * res - self.originShift
		my = py * res - self.originShift
		return (mx, my)

	# Converts EPSG:900913 to pyramid math.pixel coordinates in given zoom level
	def MetersToPixels(mx, my, zoom):
		res = Resolution(zoom)
		px = (mx + self.originShift) / res
		py = (my + self.originShift) / res
		return array(px, py)

	# Returns a tile covering region in given math.pixel coordinates
	def pixelsToTile(px, py):
		tx = math.ceil(px / self.tileSize ) - 1
		ty = math.ceil(py / self.tileSize ) - 1
		return array(tx, ty)

	# Returns tile for given mercator coordinates
	def MetersToTile(mx, my, zoom):
		(px, py) = MetersToPixels(mx, my, zoom)
		return math.pixelsToTile(px, py)

	# Returns bounds of the given tile in EPSG:900913 coordinates
	def TileBounds(tx, ty, zoom):
		minx = (tx*self.tileSize, ty*self.tileSize, zoom)[0]
		miny = (tx*self.tileSize, ty*self.tileSize, zoom)[1]
		maxx = pixelsToMeters((tx+1)*self.tileSize, (ty+1)*self.tileSize, zoom)[0]
		maxy = pixelsToMeters((tx+1)*self.tileSize, (ty+1)*self.tileSize, zoom)[1]
		return array(minx, miny, maxx, maxy)

	# Returns bounds of the given tile in latutude/longitude using WGS84 datum
	def TileLatLonBounds(tx, ty, zoom):
		bounds = TileBounds(tx, ty, zoom)
		(minLat, minLon) = MetersToLatLon(float(bounds[0]), float(bounds[1]))
		(maxLat, maxLon) = MetersToLatLon(float(bounds[2]), float(bounds[3]))
		return array(minLat, minLon, maxLat, maxLon)

	# Resolution (meters/pixel) for given zoom level (measured at Equator)
	def Resolution(zoom):
		return self.initialResolution / (1 << zoom)

mercator = GlobalMercator()