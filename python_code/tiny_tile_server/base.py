
import sqlite3
import json
import zlib

def get_tile(layer, x, y, z, ext):
	try:
		# Connect to the database and get the cursor
		db = sqlite3.connect("data/%s.mbtiles" % layer)
		c = db.cursor()
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
		return bytes(res[0])
	return None


def get_grid(layer, x, y, z, ext):
	print "accede a grid"
    # Connect to the database and get the cursor
	try:
		db = sqlite3.connect("data/%s.mbtiles" % layer)
		c1 = db.cursor()
		c2 = db.cursor()
	except:
		# In case the connection can not be done
		start_response('404 Not found', [('Content-Type', 'text/plain')])
		return ["Not found: %s.mbtiles" % (layer,)]
	# Get the utfgrid info from the database, using the zoom and the coordinates we got previously
	c1.execute("select grid from grids where tile_column=? and tile_row=? and zoom_level=?", (x, y, z))
	row = c1.fetchone()
	if not row:
		print "NO ROWWWW"
		return None
	print "SIIIIIIIII ROWWWW"
	bts = bytes(row[0])
	# Decompresses the data in string, returning a string containing the uncompressed data.
	files = zlib.decompress(bts)
	# Deserialize files to a Python object -> http://docs.python.org/2/library/json.html#json-to-py-table
	jsonfiles = json.loads(files)

# query('select key_name as key, key_json as json from grid_data where zoom_level=z and tile_column=x and tile_row=y);
	sql = '''SELECT keymap.key_name AS key_name, keymap.key_json AS key_json FROM map
		JOIN grid_utfgrid ON grid_utfgrid.grid_id = map.grid_id JOIN grid_key ON grid_key.grid_id = map.grid_id
		JOIN keymap ON grid_key.key_name = keymap.key_name WHERE tile_column=? and tile_row=? and zoom_level=?;''' % (x, y, z)
	keys = []
	for keyrow in c2.execute(sql):
		keyname, keydata = keyrow  
		keys.append((keyname, eval(keydata))) 
	datadict = dict(keys)
	jsonfiles[u'data'] = datadict
	print "okeeeey"
	# Serialize jsonfiles to a JSON formatted string using -> http://docs.python.org/2/library/json.html#py-to-json-table
	return json.dumps(jsonfiles)