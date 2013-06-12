import sys, os, json, re, bottle

api = bottle.Bottle();

from tiny_tile_server import base
from tiny_tile_server import python_wmts
from tiny_tile_server import python_server

# Access to tiles in XYZ
@api.route('/tile/<layer>/<z>/<x>/<y>.<ext>')
def api_tile(layer, z, x, y, ext):
	bottle.response.content_type = "image/%s" % ext
	return base.get_tile(layer, x, y, z, ext, False)

# Access to grids
@api.route('/grid/<layer>/<z>/<x>/<y>.grid.json')
def api_grid(layer, z, x, y):
	bottle.response.content_type = "application/json"
	return base.get_grid(layer, x, y, z)

# Access to metadata
@api.route('/metadata/<layer>/metadata.json')
def api_metadata(layer):
	bottle.response.content_type = "application/json"
	return base.get_metadata(layer)

# Print metadata information
@api.route('/metadata_info/<layer>/metadata.json')
def api_def_metadata(layer):
	bottle.response.content_type = "application/json"
	return base.def_metadata(layer)

# Access to tiles in WMTS
@api.route('/tilewmts/<layer>/<z>/<x>/<y>.<ext>')
def api_tilewmts(layer, z, x, y, ext):
	bottle.response.content_type = "image/%s" % ext
	return base.get_tile(layer, x, y, z, ext, True)

# Access to getCapabilities for WMTS protocol
@api.get('/wmtstile/<layer>/<z>/<x>/<y>.<ext>')
def api_wmts(layer, z, x, y, ext):
	return python_server.init_data(layer, x, y, z, ext)