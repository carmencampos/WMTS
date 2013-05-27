
$(document).ready(function() {

var map;

// we take data from OpenStreetMap to use a base layer
var oam = new L.TileLayer("http://{s}.mqcdn.com/tiles/1.0.0/sat/{z}/{x}/{y}.jpg", {
	maxZoom: 17,
	minZoom: 2,
	subdomains: ["otile1", "otile2", "otile3", "otile4"],
});

// this part is to show the layer using the local map
var mbTiles = new L.tileLayer("http://localhost:8000/api/tile/{s}/{z}/{x}/{y}.png", {
	tms: true,
	minZoom: 2,
	subdomains : ["example"], //example
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

var tilejson = {
    tilejson: '1.0.0',
    //tms: true, 
	scheme: 'tms',
	legend: "<p>About this map</p>\n<p>Here are shown the differents rivers, lakes and oceans in the Earth</p>", 
    template: "{{#__location__}}{{/__location__}}{{#__teaser__}}{{{Name}}}{{/__teaser__}}{{#__full__}}{{/__full__}}", 
    tiles: ['http://localhost:8000/api/tile/example/{z}/{x}/{y}.png'],  //example
    grids: ['http://localhost:8000/api/grid/example/{z}/{x}/{y}.grid.json'],  //example
	//grids: ['http://c.tiles.mapbox.com/v3/carmencampos.example/{z}/{x}/{y}.grid.json'],
    formatter: function (options, data) { return "CODE: " + data.Name }
};

var layer = L.mapbox.gridLayer(tilejson);

//wax.tilejson(url, 
//function(tilejson){
  	// here we create the map
	map = new L.map('map')
		//.addLayer(new wax.leaf.connector(tilejson))
		.addLayer(mbTiles)
		.addLayer(layer)
		.addLayer(oam)
		.setView(new L.LatLng(50, 11), 7);
		//center : new L.LatLng(47, 8),
		//zoom : 3
		// these are the layers that appear by default
		//layers: [oam, mbTiles]
	//});
	
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
