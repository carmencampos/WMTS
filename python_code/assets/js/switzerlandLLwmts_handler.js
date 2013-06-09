
$(document).ready(function() {

	var map;
	
	// we take data from OpenStreetMap to use a base layer
	var oam = new L.TileLayer("http://a.tile.openstreetmap.org/{z}/{x}/{y}.png", {
		maxZoom: 17,
		minZoom: 2,
		subdomains: ["otile1", "otile2", "otile3", "otile4"],
	});
	
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
		
/*	map = new L.map('map',{
		// these are the layers that appear by default
		layers: [baseOSM, wmts],
		center : new L.LatLng(47, 5),
		zoom : 6
	}); */
	
var tilejson = {
    tilejson: '1.0.0',
    //tms: true, 
	scheme: 'tms',
	legend: "<p>About this map</p>\n<p>Here are shown the differents rivers, lakes and oceans in the Earth</p>", 
    template: "{{#__location__}}{{/__location__}}{{#__teaser__}}{{{name}}}{{/__teaser__}}{{#__full__}}<p>Picnic site</p> \n<p>{{{name}}}</p>{{/__full__}}",	
    tiles: ['http://localhost:8000/api/tile/points_of_interest1/{z}/{x}/{y}.png'],  
    grids: ['http://localhost:8000/api/grid/points_of_interest1/{z}/{x}/{y}.grid.json'],  
	//grids: ['http://c.tiles.mapbox.com/v3/cbordons.switzerland3/{z}/{x}/{y}.grid.json'],
    formatter: function (options, data) { return "CODE: " + data.Name }
};


    map = new L.Map('map')
		.addLayer(wmts)
		.addLayer(oam)
        //.addLayer(new wax.leaf.connector(tilejson))
        .setView(new L.LatLng(47, 8), 6);
        // var interaction = wax.leaf.interaction(map, tilejson);
		
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
	

