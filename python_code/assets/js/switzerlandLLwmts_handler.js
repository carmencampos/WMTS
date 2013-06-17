
$(document).ready(function() {

	var map;
	
	// we take data from OpenStreetMap to use a base layer
	var oam = new L.TileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
		maxZoom: 17,
		minZoom: 2,
		// {s} means one of the randomly chosen subdomains, and here we specificate which are the subdomains
		// This lets you spread out the requests across multiple subdomains which helps both for sharing your 
		// requests to the server, and to download more tiles in parallel
		subdomains: ["a", "b", "c"]
	});
	
	// this part is to show the layer using the local map
	var wmts = L.tileLayer('http://localhost:8000/api/tilewmts/points_of_interest1/{z}/{x}/{y}.png?Service=WMTS&Version=1.0.0&Request=GetTile&Layer=example&style=default&format=image/jpeg&TileMatrixSet=googlemapscompatible&TileMatrix={z}&TileRow={y}&TileCol={x}', {
		maxZoom: 7,
		minZoom: 2,
		opacity: 0.7
	});
	
	// we can decide which one of these layers we want to show, or none of them
	var overlays = {
		"Hosted Tiles": wmts
	};

	// the baseLayers appears always on the map
	var baseLayers = {
		"OSM Tiles": oam,
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
    tilejson: '1.0.0',
    scheme: 'xyz',
	legend: "<p>About this map</p>\n<p>Here are shown the differents rivers, lakes and oceans in the Earth</p>", 
    template: "{{#__location__}}{{/__location__}}{{#__teaser__}}{{{name}}}{{/__teaser__}}{{#__full__}}<p>Picnic site</p> \n<p>{{{name}}}</p>{{/__full__}}",	
    tiles: ['http://localhost:8000/api/tile/points_of_interest1/{z}/{x}/{y}.png'],  
    grids: ['http://localhost:8000/api/grid/points_of_interest1/{z}/{x}/{y}.grid.json'],  
	formatter: function (options, data) { return "CODE: " + data.Name }
};

var url = 'http://localhost:8000/api/metadata/points_of_interest1/metadata.jsonp';

// We need Wax to add the legend and the tooltips to the map
wax.tilejson(url,
  function(tilejson) {
	// here we create the map
    map = new L.Map('map')
		.addLayer(wmts)
		.addLayer(oam)
		.addLayer(new wax.leaf.connector(tilejson))
        .setView(new L.LatLng(47, 8), 7);
		
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