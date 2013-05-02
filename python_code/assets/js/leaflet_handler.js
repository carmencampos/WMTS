
var map;

$(document).ready(function() {

	// We take data from OpenStreetMap to use a base layer
	var oam = new L.tileLayer("http://localhost:8000/api/tile/{s}/{z}/{x}/{y}.png", {
		tms: true,
		attribution : "asdfdsf",
		subdomains : ["example"]
	});

	map = new L.map('map',{  //here
		// these are the layers that appear by default
		center : new L.LatLng(39.73, -104.99),
		zoom : 7,
		layers: [oam]
	});
	
/*var url = 'http://a.tiles.mapbox.com/v3/carmencampos/example.jsonp';

// We need Wax to add the legend and the tooltips to the map
wax.tilejson(url, function(tilejson) {
	// here we create the map
	map = new L.Map("map",{
		// these are the layers that appear by default
		layers: [oam]
	}).fitWorld()
	// to select the latitud, longitud, and zoom that should appear in the beggining
	.setView(new L.LatLng(47, 8), 7);
		
	// To add a legend
	wax.leaf.legend(map, tilejson).appendTo(map._container);
	
	wax.leaf.interaction()
    	.map(map)
    	.tilejson(tilejson)
	// In this case, we add movetip; when we want it to appear where the mouse is
	.on(wax.movetip().parent(map._container).events());
	
	// Add to switch between the available layers
	map.addControl(layersControl);
});*/

});
