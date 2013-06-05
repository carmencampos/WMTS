import sys, os, json, re, bottle

api = bottle.Bottle();

from tiny_tile_server import base_xyz
from tiny_tile_server import base_wmts
from tiny_tile_server import python_wmts
from tiny_tile_server import python_server

#api.route (incl. get, delete, post, put)
#api.get
#api.put
#@api.get('/tile?service=wmts&request=getTile&layer=<layer>...')
#http://myhost.com/mapcache/wmts?service=wmts&request=getcapabilities&version=1.0.0
#http://myhost.com/mapcache/wmts/1.0.0/WMTSCapabilities.xml
#http://tileserver.maptiler.com/?service=wmts&request=getcapabilities&version=1.0.0


@api.route('/tile/<layer>/<z>/<x>/<y>.<ext>')
def api_tile(layer, z, x, y, ext):
	bottle.response.content_type = "image/%s" % ext
	return base_xyz.get_tile(layer, x, y, z, ext)

#@api.route('/grid/<layer>/<z>/<x>/<y>.<ext>')
@api.route('/grid/<layer>/<z>/<x>/<y>.grid.json')
def api_grid(layer, z, x, y):
	bottle.response.content_type = "application/json"
	return base_xyz.get_grid(layer, x, y, z)
	
@api.route('/metadata/<layer>/metadata.json')
def api_metadata(layer):
	bottle.response.content_type = "application/json"
	return base_xyz.get_metadata(layer)

#http://localhost:8000/api/tile?Service=WMTS&Version=1.0.0&Request=GetTile&Layer=example&style=default&format=image/jpeg&TileMatrixSet=googlemapscompatible&TileMatrix={z}&TileRow={y}&TileCol={x}')
#@api.get('/wmtstile/Service=WMTS/Version=1.0.0/Request=GetTile/Layer=<layer>/style=default/format=image/jpeg/TileMatrixSet=googlemapscompatible/TileMatrix=<z>/TileRow=<x>/TileCol=<y>')
@api.get('/wmtstile/<layer>/<z>/<x>/<y>.png')
#http://bottlepy.org/docs/dev/tutorial.html#request-routing
#:path matches all characters including the slash character in a non-greedy way and can be used to match more than one path segment.
def api_wmts(layer, z, x, y):
	print "accede a api_wmts url: " #+ url
	#bottle.response.content_type = "application/xml"
	return python_server.init_data(layer, x, y, z)
	#return python_wmts.get_tile_wmts(layer, x, y, z)
	
@api.route('/tilewmts/<layer>/<z>/<x>/<y>.<ext>')
def api_tilewmts(layer, z, x, y, ext):
	bottle.response.content_type = "image/%s" % ext
	return base_wmts.get_tile(layer, x, y, z, ext)

#@api.route('/grid/<layer>/<z>/<x>/<y>.<ext>')
@api.route('/gridwmts/<layer>/<z>/<x>/<y>.grid.json')
def api_gridwmts(layer, z, x, y):
	bottle.response.content_type = "application/json"
	return base_wmts.get_grid(layer, x, y, z)

@api.get('/tile?service=tms&request=getTile&layer=<layer>...')
def api_tms(layer):
	bottle.response.content_type = "application/xml"
	return python_tms.get_tile_tms(layer)