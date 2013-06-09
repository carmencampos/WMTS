
import sqlite3
import json
import zlib
import bottle

def get_tile(layer, x, y, z, ext, isWMTS):
	y_new = int(y)
	if(isWMTS):
		y_new = (2**int(z) - 1) - int(y)
	try:
		# Connect to the database and get the cursor
		db = sqlite3.connect("data/%s.mbtiles" % layer)
		c = db.cursor()
		# caux1 = db.cursor()
		# caux2 = db.cursor()
	except:
		# return None
		# In case the connection can not be done
		# start_response('404 Not found', [('Content-Type', 'text/plain')])
		bottle.response.content_type = "text/plain"
		return ["Not found: %s.mbtiles" % (layer,)]
	# Get the tiles from the database, using the zoom and the coordinates we got previously
	c.execute("select tile_data from tiles where tile_column=? and tile_row=? and zoom_level=?", (x, y_new, z))
	res = c.fetchone()
	db.close()
	# c.close()
	if res:
		# get_grid(layer, x, y, z)
		# In case there are tiles, print them with their necesary headers
		return bytes(res[0])
	# If we have successfully connected to the database, but there is not tiles, it is not an error:
	# it is because that part of the map can be undefined, because it is not a whole world map
	return None


def get_grid(layer, x, y, z): #, callback): #, ext):
	y_new = (2**int(z) - 1) - int(y) #int(y)# + 43
	print "accede a grid"
    # Connect to the database and get the cursor
	try:
		db = sqlite3.connect("data/%s.mbtiles" % layer)
		c1 = db.cursor()
		# c2 = db.cursor()
	except:
		# In case the connection can not be done
		# start_response('404 Not found', [('Content-Type', 'text/plain')])
		bottle.response.content_type = "text/plain"
		return ["Not found: %s.mbtiles" % (layer,)]
	# Get the utfgrid info from the database, using the zoom and the coordinates we got previously
	c1.execute("select grid from grids where tile_column=? and tile_row=? and zoom_level=?", (x, y_new, z)) #(67, 84, 7)) #(31, 39, 6)) #
	#c1.execute("select * from grids")
	row = c1.fetchone()
	# If we have successfully connected to the database, but there is not grids, it is not an error:
	# it is because that part of the map can be undefined, because it is not a whole world map
	if not row:
		# print "NO ROW"
		return None
	bts = bytes(row[0])
	print "get_grid: ROW x y w %s %s %s %s" % (x, y_new, z, len(bts),)
	# Decompresses the data in string, returning a string containing the uncompressed data.
	files = zlib.decompress(bts)
	# Deserialize files to a Python object -> http://docs.python.org/2/library/json.html#json-to-py-table
	jsonfiles = json.loads(files)
	#return jsonfiles

	# Get the data
	keys = []
	for keyrow in c1.execute("select key_name as key, key_json as json from grid_data where zoom_level=? and tile_column=? and tile_row=?", (z, x, y_new)):
	# for keyrow in c1.execute("SELECT keymap.key_name AS key_name, keymap.key_json AS key_json FROM map JOIN grid_utfgrid ON grid_utfgrid.grid_id = map.grid_id JOIN grid_key ON grid_key.grid_id = map.grid_id JOIN keymap ON grid_key.key_name = keymap.key_name WHERE tile_column=? and tile_row=? and zoom_level=?", (x, y_new, z)): #(67, 84, 7)): #(31, 39, 6)): #(x, y, z)):
		keyname, keydata = keyrow  
		# eval() -> parse the variable keydata to its corresponding value
		# The expression argument is parsed and evaluated as a Python expression (technically speaking, a condition list)
		# The return value is the result of the evaluated expression.
		keys.append((keyname, eval(keydata)))
	db.close()
	datadict = dict(keys)
	jsonfiles[u'data'] = datadict
	# return jsonfiles
	print "get_grid: okey x y w %s %s %s %s" % (x, y_new, z, len(keys),)
	# Serialize jsonfiles to a JSON formatted string using -> http://docs.python.org/2/library/json.html#py-to-json-table
	res = json.dumps(jsonfiles)
	# return res
	# Wrapped in a function to make it compatible with Wax
	# sol = "%s(%s)" % (callback, res,) 
	sol = "grid(%s)" % res #reqwest_1369811590395(%s)
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
	c1.execute("select value from metadata where name='bounds'")  
	row = c1.fetchone()
	bts = bytes(row[0])
	if row:
		print "bounds: %s" % bts
	c1.execute("select value from metadata where name='template'")  
	row = c1.fetchone()
	bts = bytes(row[0])
	if row:
		print "template: %s" % bts
	c1.execute("select value from metadata where name='legend'")  
	row = c1.fetchone()
	bts = bytes(row[0])
	if row:
		print "legend: %s" % bts
	c1.execute("select value from metadata where name='grids'")  
	row = c1.fetchone()
	if row:
		print "there are grids"
		bts = bytes(row[0])
		#print "grids: %s" % bts
		return bts
	c1.execute("select value from metadata where name='tiles'")  
	row = c1.fetchone()
	if row:
		print "there are tiles"
		bts = bytes(row[0])
		print "tiles: %s" % bts