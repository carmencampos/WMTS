
import bottle

# we need the functions
import python_server
from python_server import *

python_wmts = bottle.Bottle()

def get_tile_tms(layer):
	config = config_url[0]
	mymaps = maps()
	bottle.response.content_type = "application/xml"

	# print "<?xml version=\"1.0\" encoding=\"UTF-8\" ?>\n"; 

	# -----------
	# TMS SERVICE
	# -----------
	if (layer == ""):
	  mymaps = maps()
	  for m in maps:
		basename = m['basename']
		title = m['name'] if ('name' in m) else basename
		profile = m['profile']
		if (profile == 'geodetic'):
			srs = "EPSG:4326"
		else:
			srs = "EPSG:3857"
			
	# ---------
	# TMS LAYER
	# ---------
	else:
		m = layer(layer)
		basename = m['basename']
		title = m['name'] if ('name' in m) else basename
		description = m['description'] if ('description' in m) else ""
		bounds = m['bounds']
		profile = m['profile']
		# or World Geodetic System WGS 84; http://spatialreference.org/ref/epsg/4326/
		if (profile == 'geodetic'):
			srs = "EPSG:4326"
			originx = -180.0
			originy = -90.0
			initialResolution = 0.703125
		# Spherical Mercator projection coordinate system popularized by web services such as Google and later OpenStreetMap	
		else:
			srs = "EPSG:3857"
			originx = -20037508.342789
			originy = -20037508.342789
			(minx, miny) = mercator.LatLonToMeters(bounds[1], bounds[0])
			(maxx, maxy) = mercator.LatLonToMeters(bounds[3], bounds[2])
			bounds = array(minx, miny, maxx, maxy)
			initialResolution = 156543.03392804062
		format = m['format']
		mime = 'image/jpeg' if (format == 'jpg') else 'image/png'
		

	#<TileMapService version="1.0.0">
	#  <TileMaps>
	# print "    <TileMap title=\"title\" srs=\"srs\" type=\"InvertedTMS\" profile=\"global-profile\" href=\"config_url[0]basename/tms\" />\n"
	# </TileMaps>
	#</TileMapService>

	return """
	<TileMap version="1.0.0" tilemapservice="""+ config_url.basename +""" type="InvertedTMS">
		<Title>"""+ htmlspecialchars(title) +"""</Title>
		<Abstract>"""+ htmlspecialchars(description) +"""</Abstract>
		<SRS>"""+ srs +"""</SRS>
		<BoundingBox minx='"""+ bounds[0] +"""' miny='"""+ bounds[1] +"""' maxx='"""+ bounds[2] +"""' maxy='"""+ bounds[3] +"""' />
		<Origin x='"""+ originx +"""' y='"""+ originy +"""'/>
		<TileFormat width="256" height="256" mime-type='"""+ mime +"""' extension='"""+ format +"""'/>
		<TileSets profile="global-"""+ profile +"""'>"""
#	<% for (zoom = m['minzoom']; zoom < m['maxzoom']+1; zoom++ ):%>
#			"""<TileSet href='"""+ config_url.basename.'/'.zoom +"""' units-per-pixel='"""+ initialResolution / (2 ** zoom) +"""' order='"""+ zoom +"""' />
#		</TileSets>
#	</TileMap>"""