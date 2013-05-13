
var map;

$(document).ready(function() {

//var url = 'http://api.tiles.mapbox.com/v3/mapbox.geography-class.jsonp';
//var url = 'http://api.tiles.mapbox.com/v3/carmencampos.example.jsonp'

var tilejson = {
	bounds: [-166.9922,-74.212,164.8828,81.0932],
	center: [0,0,2],
	description: "",
	//grids: ["http://a.tiles.mapbox.com/v3/carmencampos.example/{z}/{x}/{y}.grid.json","http://b.tiles.mapbox.com/v3/carmencampos.example/{z}/{x}/{y}.grid.json","http://c.tiles.mapbox.com/v3/carmencampos.example/{z}/{x}/{y}.grid.json","http://d.tiles.mapbox.com/v3/carmencampos.example/{z}/{x}/{y}.grid.json"],
	grids: ["http://localhost:8000/api/grid/example/{z}/{x}/{y}.grid.json"],
	legend: "<p>About this map</p>\n<p>Here are shown the differents rivers, lakes and oceans in the Earth</p>",
	maxzoom: 7, 
	minzoom: 0,
	name: "Example",
	scheme: "tms", //"xyz" hosted file
	template: "{{#__location__}}{{/__location__}}{{#__teaser__}}{{{Name}}}{{/__teaser__}}{{#__full__}}{{/__full__}}",
	tilejson: "2.0.0",
	//tiles: ["http://a.tiles.mapbox.com/v3/carmencampos.example/{z}/{x}/{y}.png","http://b.tiles.mapbox.com/v3/carmencampos.example/{z}/{x}/{y}.png","http://c.tiles.mapbox.com/v3/carmencampos.example/{z}/{x}/{y}.png","http://d.tiles.mapbox.com/v3/carmencampos.example/{z}/{x}/{y}.png"],
	tiles: ["http://localhost:8000/api/tile/example/{z}/{x}/{y}.png"],
	version: "1.0.0",
	formatter: function (options, data) { return "CODE: " + data.Name }
};

//wax.tilejson(url,
//  function(tilejson) {
	map = new L.Map('map')
		.addLayer(new wax.leaf.connector(tilejson))
		.setView(new L.LatLng(51.505, -0.09), 1);
	
	// Create map legend
	wax.leaf.legend(map, tilejson).appendTo(map._container);
 
	// Add map interaction (tooltips)
	wax.leaf.interaction()
		.map(map)
		.tilejson(tilejson)
		.on(wax.tooltip().animate(true).parent(map._container).events());
//});

/*
wax.tilejson('http://api.tiles.mapbox.com/v3/mapbox.geography-class.jsonp',
  function(tilejson) {
  var map = new L.Map('map')
    .addLayer(new wax.leaf.connector(tilejson))
    .setView(new L.LatLng(51.505, -0.09), 1);
  wax.leaf.interaction()
    .map(map)
    .tilejson(tilejson)
    .on('on', function(o) {
        if (o.e.type !== 'mousemove') {
            // create a marker in the given location and add it to the map
            var marker = new L.Marker(map.mouseEventToLatLng(o.e));
            map.addLayer(marker);

            // attach a given HTML content to the marker and immediately open it
            marker.bindPopup(o.formatter({ format: 'teaser' }, o.data)).openPopup();
        }
    });
});


/*	// We take data from OpenStreetMap to use a base layer
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
