
$(document).ready(function() {
	
var map;

// We take data from OpenStreetMap to use a base layer
var oam = new L.TileLayer("http://a.tile.openstreetmap.org/{z}/{x}/{y}.png", {
	maxZoom: 17,
	minZoom: 2,
	subdomains: ["otile1", "otile2", "otile3", "otile4"],
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
	opacity: 0.5
});

// we can decide which one of these layers we want to show, or none of them
var overlays = {
	"Hosted Tiles": hostedTiles
};

// the baseLayers appears always on the map
var baseLayers = {
	"MapQuest Streets": oam,
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
		layers: [oam, hostedTiles]
	}).fitWorld()
	// to select the latitud, longitud, and zoom that should appear in the beggining
	.setView(new L.LatLng(47, 8), 7);
		
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
	
});

});
