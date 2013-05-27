import sys, os, json, re, bottle

api = bottle.Bottle();

from tiny_tile_server import base
from tiny_tile_server import python_wmts

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
	return base.get_tile(layer, x, y, z, ext)

#@api.route('/grid/<layer>/<z>/<x>/<y>.<ext>')
@api.route('/grid/<layer>/<z>/<x>/<y>.grid.json')
def api_grid(layer, z, x, y):
	bottle.response.content_type = "application/json"
	return base.get_grid(layer, x, y, z)
	
@api.route('/metadata/<layer>/metadata.json')
def api_metadata(layer):
	bottle.response.content_type = "application/json"
	return base.get_metadata(layer)

#http://localhost:8000/api/tile?Service=WMTS&Version=1.0.0&Request=GetTile&Layer=example&style=default&format=image/jpeg&TileMatrixSet=googlemapscompatible&TileMatrix={z}&TileRow={y}&TileCol={x}');
#@api.get('/wmtstile/Service=WMTS/<layer>/<z>/<x>/<y>')
@api.get('/wmtstile/Service=WMTS/Version=1.0.0/Request=GetTile/Layer=<layer>/style=default/format=image/jpeg/TileMatrixSet=googlemapscompatible/TileMatrix=<z>/TileRow=<y>/TileCol=<x>')
def api_wmts(layer, x, y, z):
	print "accede a api_wmts"
	bottle.response.content_type = "application/xml"
	return python_wmts.get_tile_wmts(layer, x, y, z)

#@api.get('/wmtstile/Service=WMTS')
#def api_wmts():
	#print "hola que tal"
	#bottle.response.content_type = "application/xml"
	#return python_wmts.get_tile_wmts(layer, x, y, z)

@api.get('/tile?service=tms&request=getTile&layer=<layer>...')
def api_tms(layer):
	bottle.response.content_type = "application/xml"
	return python_tms.get_tile_tms(layer)