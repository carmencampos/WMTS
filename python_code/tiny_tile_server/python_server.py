
import bottle
import glob
import json
import sqlite3
import hashlib

import python_wmts

config_url = ["http://localhost:8000/"]
title = "Tiny Tile Server"
 
service = python_wmts.service
layer = python_wmts.layer
# callback = $_GET['callback'] if ('callback' in $_GET) else ""    # VER 86

maps = []

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
    # print_r(maps)
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
  
    if(layer):
        output = metadataTileJson(layer(layer))
    else:
        maps = maps()
        tilejsons = []
        for map in maps:
            tilejsons = metadataTileJson(map)
        output = tilejsons
	output = json_encode(output)
    output = output.replace("\\/","/") 
    #if(callback):
    #    print "callback(output)"
    #else
    print output


# INTERNAL FUNCTIONS:

def maps():
    maps = maps()
    # Scan all directories with metadata.json
    mjs = glob.glob('*/metadata.json')
    if(mjs): 
	    for mj in mjs:
 		    maps.append(metadataFromMetadataJson(mj))
    # Scan all mbtiles
    mbts = glob.glob('*.mbtiles')
    if(mbts):
	    for mbt in mbts:
		    maps.append(metadataFromMbtiles(mbt))
    return maps

def layer(layer):
    if((layer.find('.mbtiles')) == -1):
        return metadataFromMetadataJson(layer.append('/metadata.json'))
    else:
        return metadataFromMbtiles(layer)

def metadataFromMetadataJson(jsonFileName):
	metadata = json.load(open(jsonFileName).read())
	metadata = metadataValidation(metadata)
	metadata['basename'] = jsonFileName.replace('/metadata.json', '')
	return metadata

def metadataFromMbtiles(mbt):
	metadata = []
	try:
		# Connect to the database and get the cursor
		db = sqlite3.connect("data/%s.mbtiles" % layer)
		c = db.cursor()
		# closing(db.cursor)
	except:
		# In case the connection can not be done
		start_response('404 Not found', [('Content-Type', 'text/plain')])
		return ["Not found: %s.mbtiles" % (layer,)]
	c.execute("select * from metadata")
	res = c.fetchall()
	for r in res:
		metadata.append(r['name'], r['value'])
	metadata = metadataValidation(metadata)
	metadata['basename'] = mbt
	return metadata

def metadataValidation(metadata):
	if('bounds' in metadata):
  	#TODO:Calculate bounds from tiles if bounds is missing - with GlobalMercator
		metadata['bounds'] = map('floatval', metadata['bounds'].spilt(','))
	if not('profile' in metadata):
		metadata['profile'] = 'mercator'
	#TODO: detect format, minzoom, maxzoom, thumb
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

def metadataTileJson(metadata):
  metadata['tilejson'] = '2.0.0'
  metadata['sheme'] = 'xyz'
  tiles = []
#for url in config_url
  ext = '/{z}/{x}/{y}.'.append(metadata['format'])
  tiles.append(config_url[0].metadata['basename'].append(ext))
  metadata['tiles'] = tiles
  return metadata

# VER do we need this method?
#def selfUrl(serverOnly = false):
    #if not(isset($_SERVER['REQUEST_URI'])):
    #    serverrequri = $_SERVER['PHP_SELF']
    #else:
    #    serverrequri = $_SERVER['REQUEST_URI']
    #s = empty($_SERVER["HTTPS"]) ? '' : ($_SERVER["HTTPS"] == "on") ? "s" : ""
    #port = ($_SERVER["SERVER_PORT"] == "80") ? "" : (":".$_SERVER["SERVER_PORT"])
    #if (serverOnly) return 'http'.s.'://'.$_SERVER['SERVER_NAME'].port."/"
    #return 'http'.s.'://'.$_SERVER['SERVER_NAME'].port.serverrequri

# VER do we need this method?
#def doConditionalGet(timestamp):
	# Bottle automatically adds a Last-Modified header and even supports the If-Modified-Since header
    #last_modified = time.strftime('D, d M Y H:i:s \G\M\T', time.gmtime(timestamp))
    #etag = '"'.hashlib.md5(last_modified).hexdigest().'"'
    # Send the headers
    #print "Last-Modified: last_modified"
    #print "ETag: etag"
	#See if the client has provided the required headers
    #if_modified_since = isset($_SERVER['HTTP_IF_MODIFIED_SINCE']) ?
    #    stripslashes($_SERVER['HTTP_IF_MODIFIED_SINCE']) :
    #    false
    #if_none_match = isset($_SERVER['HTTP_IF_NONE_MATCH']) ?
    #    stripslashes($_SERVER['HTTP_IF_NONE_MATCH']) : 
    #    false
    #!if_modified_since && !if_none_match:
    #    return None
    # At least one of the headers is there - check them
    #if_none_match && if_none_match != etag:
    #    return None
    #if_modified_since && if_modified_since != last_modified:
    #    return None
    # Nothing has changed since their last request - serve a 304 and exit
    #print 'HTTP/1.0 304 Not Modified'


class GlobalMercator:
	global pi
	pi = 3.14159

	# Initialize the TMS Global Mercator pyramid
	def __init__(self):
		self.tileSize = 256
		self.initialResolution = 2 * pi * 6378137 / self.tileSize
		# 156543.03392804062 for tileSize 256 Pixels
		self.originShift = 2 * pi * 6378137 / 2.0
		# 20037508.342789244

	# Converts given lat/lon in WGS84 Datum to XY in Spherical Mercator EPSG:900913
	def LatLonToMeters(lat, lon):
		mx = lon * self.originShift / 180.0
		my = log(tan((90 + lat) * pi / 360.0 )) / (pi / 180.0)
		my *= selforiginShift / 180.0
		return (mx, my)

	# Converts XY point from Spherical Mercator EPSG:900913 to lat/lon in WGS84 Datum
	def MetersToLatLon(mx, my):
		lon = (mx / self.originShift) * 180.0
		lat = (my / self.originShift) * 180.0
		lat = 180 / pi * (2 * atan(exp(lat * pi / 180.0)) - pi / 2.0)
		return (lat, lon)

	# Converts pixel coordinates in given zoom level of pyramid to EPSG:900913
	def PixelsToMeters(px, py, zoom):
		res = Resolution(zoom)
		mx = px * res - self.originShift
		my = py * res - self.originShift
		return (mx, my)

	# Converts EPSG:900913 to pyramid pixel coordinates in given zoom level
	def MetersToPixels(mx, my, zoom):
		res = Resolution(zoom)
		px = (mx + self.originShift) / res
		py = (my + self.originShift) / res
		return array(px, py)

	# Returns a tile covering region in given pixel coordinates
	def PixelsToTile(px, py):
		tx = ceil(px / self.tileSize ) - 1
		ty = ceil(py / self.tileSize ) - 1
		return array(tx, ty)

	# Returns tile for given mercator coordinates
	def MetersToTile(mx, my, zoom):
		(px, py) = MetersToPixels(mx, my, zoom)
		return PixelsToTile(px, py)

	# Returns bounds of the given tile in EPSG:900913 coordinates
	def TileBounds(tx, ty, zoom):
		minx = (tx*self.tileSize, ty*self.tileSize, zoom)[0]
		miny = (tx*self.tileSize, ty*self.tileSize, zoom)[1]
		maxx = PixelsToMeters((tx+1)*self.tileSize, (ty+1)*self.tileSize, zoom)[0]
		maxy = PixelsToMeters((tx+1)*self.tileSize, (ty+1)*self.tileSize, zoom)[1]
		return array(minx, miny, maxx, maxy)

	# Returns bounds of the given tile in latutude/longitude using WGS84 datum
	def TileLatLonBounds(tx, ty, zoom):
		bounds = TileBounds(tx, ty, zoom)
		(minLat, minLon) = MetersToLatLon(bounds[0], bounds[1])
		(maxLat, maxLon) = MetersToLatLon(bounds[2], bounds[3])
		return array(minLat, minLon, maxLat, maxLon)

	# Resolution (meters/pixel) for given zoom level (measured at Equator)
	def Resolution(zoom):
		return self.initialResolution / (1 << zoom)

mercator = GlobalMercator()