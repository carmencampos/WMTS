
$(document).ready(function() {

var map;

// we take data from OpenStreetMap to use a base layer
var oam = new L.TileLayer("http://{s}.mqcdn.com/tiles/1.0.0/sat/{z}/{x}/{y}.jpg", {
	maxZoom: 17,
	minZoom: 0,
	// {s} means one of the randomly chosen subdomains, and here we specificate which are the subdomains
	// This lets you spread out the requests across multiple subdomains which helps both for sharing your 
	// requests to the server, and to download more tiles in parallel
	subdomains: ["otile1", "otile2", "otile3", "otile4"]
});

// this part is to show the layer using the local map
var mbTiles = new L.tileLayer("http://localhost:8000/api/tile/{s}/{z}/{x}/{y}.png", {
	tms: true,
	minZoom: 0,
	subdomains : ["example"], 
	opacity: 0.7
});

// we can decide which one of these layers we want to show, or none of them
var overlays = {
	"Hosted Tiles": mbTiles
};

// the baseLayers appears always on the map
var baseLayers = {
	"MapQuest Streets": oam
};

layersControl = new L.Control.Layers(baseLayers, overlays, {
	// using "true" the switched layer box appears collapsed
	collapsed: true
});

// This is the metadata.json information of our map
// When we export our map in TileMill to a MBTiles database, the "tiles" URL and "grids" URL do not appear
// on it, so we can not access directly to the metadata.json file
// Another option would be to modify our MBTiles database with sqlite3 and insert those values
var tilejsonNO = {
    tilejson: '2.0.0',
	version: '1.0.0',
    bounds: [-166.9922,-74.212,164.8828,81.0932],
	center: [0,0,2],
	maxzoom: 7,
	minzoom: 0,
	name: "Example",
	scheme: "xyz",
	legend: "<p>About this map</p>\n<p>Here are shown the differents rivers, lakes and oceans in the Earth</p>", 
    template: "{{#__location__}}{{/__location__}}{{#__teaser__}}{{{Name}}}{{/__teaser__}}{{#__full__}}{{/__full__}}", 
    tiles: ['http://localhost:8000/api/tile/example/{z}/{x}/{y}.png'], 
    grids: ['http://localhost:8000/api/grid/example/{z}/{x}/{y}.grid.json'],  
	formatter: function (options, data) { return "CODE: " + data.Name }
};

var url = 'http://localhost:8000/api/metadata/example/metadata.jsonp';

// We need Wax to add the legend and the tooltips to the map
wax.tilejson(url,
  function(tilejson) {
  	// here we create the map
	map = new L.map('map')
		.addLayer(mbTiles)
		.addLayer(oam)
		.addLayer(new wax.leaf.connector(tilejson))
		// center in Switzerland
		.setView(new L.LatLng(47, 8), 4);
	
	// Permanent link, to know latitud and longitud
	var hash = new L.Hash(map);
	
	// To add a legend
	wax.leaf.legend(map, tilejson).appendTo(map._container);
	
	// To add interaction
	wax.leaf.interaction()
    	.map(map)
    	.tilejson(tilejson)
	// In this case, we add tooltip; when we want it to appear in a static place
    	//.on(wax.tooltip().animate(true).parent(map._container).events());
	// In this case, we add movetip; when we want it to appear where the mouse is
		.on(wax.movetip().parent(map._container).events());
	
	// Add to switch between the available layers
	map.addControl(layersControl);
	
	// Add a scale to the map
	L.control.scale().addTo(map);
});

});