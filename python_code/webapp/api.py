import sys, os, json, re, bottle

api = bottle.Bottle();

from tiny_tile_server import base

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

@api.route('/grid/<layer>/<z>/<x>/<y>.<ext>')
def api_grid(layer, z, x, y, ext):
	bottle.response.content_type = "application/json"
	return base.get_grid(layer, x, y, z, ext)

@api.get('/tile?service=tms&request=getTile&layer=<layer>...')
def api_tms(layer):
	bottle.response.content_type = "application/xml"
	return python_tms.get_tile_tms(layer)

#http://localhost:8000/api/tile?Service=WMTS&Version=1.0.0&Request=GetTile&Layer=example&style=default&format=image/jpeg&TileMatrixSet=googlemapscompatible&TileMatrix={z}&TileRow={y}&TileCol={x}');
@api.get('/tile?Service=WMTS&Version=1.0.0&Request=GetTile&Layer=<layer>&style=default&format=image/jpeg&TileMatrixSet=googlemapscompatible&TileMatrix=<z>&TileRow=<y>&TileCol=<x>')
def api_wmts(layer, x, y, z):
	bottle.response.content_type = "application/xml"
	return python_wmts.get_tile_wmts(layer)