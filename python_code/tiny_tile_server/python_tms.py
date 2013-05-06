
import bottle
import python_server.py

python_tms = bottle.Bottle();

maps = maps();

bottle.response.content_type = "application/xml"

print "<?xml version=\"1.0\" encoding=\"UTF-8\" ?>\n"; 

# Accepted GET strings    VERRRRRRRRRRRRRR
# layer = $_GET['layer'] if ('layer' in $_GET)) else "";


if (layer === ""):
  maps = maps()

# -----------
# TMS SERVICE
# -----------
<TileMapService version="1.0.0">
  <TileMaps>
<%
  for m in maps:
    basename = m['basename']
    title = m['name'] if ('name' in m) else basename
    profile = m['profile']
    if (profile == 'geodetic'):
        srs = "EPSG:4326"
    else:
        srs = "EPSG:3857"
    print "    <TileMap title=\"title\" srs=\"srs\" type=\"InvertedTMS\" profile=\"global-profile\" href=\"config_urlbasename/tms\" />\n"
%>
  </TileMaps>
</TileMapService>

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
    if (profile == 'geodetic'):
        srs = "EPSG:4326"
        originx = -180.0
        originy = -90.0
        initialResolution = 0.703125
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
%>

<TileMap version="1.0.0" tilemapservice="<% print config_url.basename %>" type="InvertedTMS">
	<Title><% print htmlspecialchars(title) %></Title>
	<Abstract><% print htmlspecialchars(description) %></Abstract>
	<SRS><% print srs %></SRS>
	<BoundingBox minx="<% print bounds[0] %>" miny="<% print bounds[1] ?>" maxx="<% print bounds[2] ?>" maxy="<% print bounds[3] %>" />
	<Origin x="<% print originx %>" y="<% print originy %>"/>
	<TileFormat width="256" height="256" mime-type="<% print mime %>" extension="<% print format %>"/>
	<TileSets profile="global-<% print profile %>">
<% for ($zoom = $m['minzoom']; $zoom < $m['maxzoom']+1; $zoom++ ):%>
		<TileSet href="<% print config_url.basename.'/'.zoom ?>" units-per-pixel="<% print initialResolution / (2 ** zoom) %>" order="<% print zoom %>" />
	</TileSets>
</TileMap>