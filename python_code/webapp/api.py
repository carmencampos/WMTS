import sys, os, json, re, bottle

api = bottle.Bottle();

from tiny_tile_server import base

#api.route (incl. get, delete, post, put)
#api.get
#api.put

#@api.get('/tile?service=wmts&request=getTile&layer=<layer>...')
@api.route('/tile/<layer>/<z>/<x>/<y>.<ext>')
def api_tile(layer, z, x, y, ext):
    print "heeeeeey"
    bottle.response.content_type = "image/%s" % ext
    return base.get_tile(layer, x, y, z, ext)
