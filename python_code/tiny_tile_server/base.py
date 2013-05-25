
import sqlite3
import json
import zlib

def get_tile(layer, x, y, z, ext):
	try:
		# Connect to the database and get the cursor
		db = sqlite3.connect("data/%s.mbtiles" % layer)
		c = db.cursor()
		#closing(db.cursor)
	except:
#		return None
		# In case the connection can not be done
		start_response('404 Not found', [('Content-Type', 'text/plain')])
		return ["Not found: %s.mbtiles" % (layer,)]
	# Get the tiles from the database, using the zoom and the coordinates we got previously
	c.execute("select tile_data from tiles where tile_column=? and tile_row=? and zoom_level=?", (x, y, z))
	res = c.fetchone()
	if res:
		# In case there are tiles, print them with their necesary headers
		#get_grid(layer, x, y, z)
		return bytes(res[0])
	return None


def get_grid(layer, x, y, z): #, ext):
	print "accede a grid"
    # Connect to the database and get the cursor
	try:
		db = sqlite3.connect("data/%s.mbtiles" % layer)
		c1 = db.cursor()
		c2 = db.cursor()
		#closing(db.cursor)
	except:
		# In case the connection can not be done
		start_response('404 Not found', [('Content-Type', 'text/plain')])
		return ["Not found: %s.mbtiles" % (layer,)]
	# Get the utfgrid info from the database, using the zoom and the coordinates we got previously
	c1.execute("select grid from grids where tile_column=? and tile_row=? and zoom_level=?", (31, 39, 6)) #(x, y, z))
	#c1.execute("select * from grids")
	row = c1.fetchone()
	if not row:
		print "NO ROW"
		return None
	print "ROW"
	bts = bytes(row[0])
	# Decompresses the data in string, returning a string containing the uncompressed data.
	files = zlib.decompress(bts)
	# Deserialize files to a Python object -> http://docs.python.org/2/library/json.html#json-to-py-table
	jsonfiles = json.loads(files)
	#return jsonfiles

	# Get the data
	keys = []
	#for keyrow in c2.execute("select key_name as key, key_json as json from grid_data where zoom_level=? and tile_column=? and tile_row=?", (z, x, y)):
	for keyrow in c2.execute("SELECT keymap.key_name AS key_name, keymap.key_json AS key_json FROM map JOIN grid_utfgrid ON grid_utfgrid.grid_id = map.grid_id JOIN grid_key ON grid_key.grid_id = map.grid_id JOIN keymap ON grid_key.key_name = keymap.key_name WHERE tile_column=? and tile_row=? and zoom_level=?", (31, 39, 6)): #(x, y, z)):
		keyname, keydata = keyrow  
		keys.append((keyname, eval(keydata))) 
	datadict = dict(keys)
	jsonfiles[u'data'] = datadict
	# return jsonfiles
	print "okey Z:" + z + "x,y" + x + y
	# Serialize jsonfiles to a JSON formatted string using -> http://docs.python.org/2/library/json.html#py-to-json-table
	res = json.dumps(jsonfiles)
	# return res
	sol = "grid(%s)" % res
	return sol


def get_metadata(layer):
	print "accede a metadata"
    # Connect to the database and get the cursor
	try:
		db = sqlite3.connect("data/%s.mbtiles" % layer)
		c1 = db.cursor()
		c2 = db.cursor()
		#closing(db.cursor)
	except:
		# In case the connection can not be done
		start_response('404 Not found', [('Content-Type', 'text/plain')])
		return ["Not found: %s.mbtiles" % (layer,)]
	# Get the metadata
	c1.execute("select value from metadata where name='bounds'")  #grids, legend, template
	row = c1.fetchone()
	bts = bytes(row[0])
	if row:
		print "bounds: %s" % bts
	c1.execute("select value from metadata where name='template'")  #grids, legend, template
	row = c1.fetchone()
	bts = bytes(row[0])
	if row:
		print "template: %s" % bts
	c1.execute("select value from metadata where name='legend'")  #grids, legend, template
	row = c1.fetchone()
	bts = bytes(row[0])
	if row:
		print "legend: %s" % bts
	c1.execute("select value from metadata where name='grids'")  #grids, legend, template
	row = c1.fetchone()
	if row:
		print "hay grid"
		bts = bytes(row[0])
		#print "grids: %s" % bts
		return bts
	c1.execute("select value from metadata where name='tiles'")  #grids, legend, template
	row = c1.fetchone()
	if row:
		print "hay legend"
		bts = bytes(row[0])
		print "tiles: %s" % bts