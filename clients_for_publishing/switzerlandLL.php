<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01//EN">
<html>
<head>
<title>Leaflet PHP/MBTiles Example</title>
	<meta charset="utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<script src='http://api.tiles.mapbox.com/mapbox.js/v0.6.4/mapbox.js'></script>
	<link href='http://api.tiles.mapbox.com/mapbox.js/v0.6.4/mapbox.css' rel='stylesheet' />
	<link rel="stylesheet" href="lib/Leaflet/dist/leaflet.css" />
    	<link rel="stylesheet" href="src/L.Control.Zoomslider.css" />
	<link rel="stylesheet" href="http://cdn.leafletjs.com/leaflet-0.4.5/leaflet.css" />
	<script src='wax/ext/leaflet.js' type='text/javascript'></script>
	<script src='wax/dist/wax.leaf.js' type='text/javascript'></script>
	<link href='wax/ext/leaflet.css' rel='stylesheet' type='text/css' />
	<!-- files for style -->
	<link rel="stylesheet" type="text/css" href="style/header.css" media="screen" />
	<link rel="stylesheet" type="text/css" href="style/footer.css" media="screen" />
	<link rel="stylesheet" type="text/css" href="style/tutorial.css" media="screen" />
    <style>
    .olControlAttribution {
    	font-size: smaller; 
    	right: 2px;
    	bottom: 2px;
    	position: absolute; 
    	display: block;
    }
	.olImageLoadError { 
		/* when OL encounters a 404, don't display the pink image */
		display: none !important;
	} 
    </style>
</head>

<body>

<script src="http://cdn.leafletjs.com/leaflet-0.4.5/leaflet.js"></script>
<script src="lib/Leaflet/dist/leaflet-src.js"></script>
<script src="src/L.Control.Zoomslider.js" ></script>

<?php include("includes/header.html");?>

<div class="howto">
<p><a href="../tilemillswitzerland.php" title="tillemill init">How to create this?</a></p>
</div>

<!-- space where we are going to place the map -->
<div id="map" style="width: 100%; height: 460px"></div>

<?php include("includes/footer.html");?>

<script>

var map;

// We take data from OpenStreetMap to use a base layer
var osm = new L.TileLayer("http://a.tile.openstreetmap.org/{z}/{x}/{y}.png", {
	maxZoom: 17,
	minZoom: 5,
});


// this part is to show the layer using the local map
// we need the mbtiles.php file to extract the tiles
// mbtiles.php?db=example.mbtiles&z={z}&x={x}&y={y} is the local url
// in general would be {name-of-the-file-to-extract-the-map}.php?db={name-of-the-map}.mbtiles&z={z}&x={x}&y={y}
var mbTiles = new L.tileLayer('mbtiles.php?db=switzerland.mbtiles&z={z}&x={x}&y={y}', {
	// inverses Y axis numbering for tiles (turn this on for TMS services)
	tms: true,
	minZoom: 5,
	opacity: 0.5,
});

// this part is to show the layer using the map hosted in mapbox
// http://{s}.tiles.mapbox.com/v3/carmencampos.example/{z}/{x}/{y}.png is the url where our map is hosted in mapbox
// in general would be http://{s}.tiles.mapbox.com/v3/{user}.{name-of-the-map}/{z}/{x}/{y}.png
var hostedTiles = new L.tileLayer('http://{s}.tiles.mapbox.com/v3/cbordons.switzerland3/{z}/{x}/{y}.png', {
	//If true, inverses Y axis numbering for tiles (turn this on for TMS services)
	tms: false,
	minZoom: 5,
	// {s} means one of the randomly chosen subdomains, and here we specificate which are the subdomains
	// This lets you spread out the requests across multiple subdomains which helps both for sharing your 
	// requests to the server, and to download more tiles in parallel
	subdomains: ["a", "b", "c", "d"],
	opacity: 0.5,
});

// we can decide which one of these layers we want to show, or none of them
var overlays = {
	"Local MBTiles File": mbTiles,
	"Hosted Tiles": hostedTiles
};

// the baseLayers appears always on the map
var baseLayers = {
	"MapQuest Streets": osm,
};

layersControl = new L.Control.Layers(baseLayers, overlays, {
	// using "true" the switched layer box appears collapsed
	collapsed: true
});
	
var url = 'http://a.tiles.mapbox.com/v3/cbordons.switzerland3.jsonp';

// We need Wax to add the legend and the tooltips to the map
wax.tilejson(url, function(tilejson) {
	// here we create the map
	map = new L.Map("map",{
		// these are the layers that appear by default
		layers: [osm, hostedTiles]
	}).fitWorld()
	// to select the latitud, longitud, and zoom that should appear in the beggining
	.setView(new L.LatLng(47, 8), 7);
		
	// To add a legend
	wax.leaf.legend(map, tilejson).appendTo(map._container);
	
	// To add interaction
	//wax.leaf.interaction()
    	//.map(map)
    	//.tilejson(tilejson)
	// In this case, we add tooltip; when we want it to appear in a static place
    	//.on(wax.tooltip().animate(true).parent(map._container).events());

	// To add interaction
	wax.leaf.interaction()
    	.map(map)
    	.tilejson(tilejson)
	// In this case, we add movetip; when we want it to appear where the mouse is
	.on(wax.movetip().parent(map._container).events());
	
	// Add to switch between the available layers
	map.addControl(layersControl);
});

</script>
</body>
</html>