
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

/*
var tilejson = {
    tilejson: '1.0.0',
    //tms: true, 
	scheme: 'tms',
	legend: "hola q tal",
    template: "{{#__location__}}{{/__location__}}{{#__teaser__}}{{{Name}}}{{/__teaser__}}{{#__full__}}{{/__full__}}", 
    tiles: ['http://localhost:8000/api/tile/example/{z}/{x}/{y}.png'],
    grids: ['http://localhost:8000/api/tile/example/{z}/{x}/{y}.grid.json'],
    formatter: function (options, data) { return "CODE: " + data.Name }
};*/

// CAMBIAR URL A LOCAL
//var url = 'http://a.tiles.mapbox.com/v3/carmencampos.example.jsonp';
//var url = 'http://localhost:8000/api/tile/example'; //NOT WORK
//var url = 'http://localhost:8000/api/grid/example/{z}/{x}/{y}.grid.json';
//var url = 'http://localhost:8000/api/grid/example.json'; //NOT WORK
//var url = 'http://localhost:8000/api/grid/example.jsonp'; //NOT WORK
var url = '/data/example/metadata.json'; //NOT WORK
//var url = 'http://localhost:8000/api/grid/example.tilejson'; //NOT WORK
// 'http://earthatlas.info/nz/tiles/nz-popden.tilejson'
// http://earthatlas.info/nz/?base=Population

// We need Wax to add the legend and the tooltips to the map
//wax.tilejson(url, 
//function(tilejson) {
  	// here we create the map
	map = new L.Map("map", {
		layers: [oam, mbTiles]
	}).fitWorld()
	// to select the latitud, longitud, and zoom that should appear in the beggining
	.setView(new L.LatLng(47, 8), 3);
	
	// To add a legend
//	wax.leaf.legend(map, tilejson).appendTo(map._container);

/*	
	// To add interaction
	wax.leaf.interaction()
    	.map(map)
    	.tilejson(tilejson)
	// In this case, we add tooltip; when we want it to appear in a static place
    	//.on(wax.tooltip().animate(true).parent(map._container).events());
	// In this case, we add movetip; when we want it to appear where the mouse is
		.on(wax.movetip().parent(map._container).events());
*/	
	// Add to switch between the available layers
	map.addControl(layersControl);
	
	// Add a scale to the map
	L.control.scale().addTo(map);
	
//});

});
