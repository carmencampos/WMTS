
$(document).ready(function() {

	document.getElementById('map').innerHTML =


/*
	var map;
	
	//'http://{s}.geospatial.intergraph.com/erdas-iws/ogc/wmts?Service=WMTS&Version=1.0.0&Request=GetTile&Layer=virtualmosaic&style=default&format=image/jpeg&TileMatrixSet=googlemapscompatibleext2:epsg:3857&TileMatrix={z}&TileRow={y}&TileCol={x}', 
	var virtual = L.tileLayer('http://localhost:8000/api/tile?Service=WMTS&Version=1.0.0&Request=GetTile&Layer=example&style=default&format=image/jpeg&TileMatrixSet=googlemapscompatible&TileMatrix={z}&TileRow={y}&TileCol={x}', 
	{
		//subdomains: ['demo-apollo','demo-ap2','demo-ap3','demo-ap4']
		//attribution: 'Imagery served via ERDAS APOLLO Essentials, data for demonstration purposes only',
		//maxZoom: 26
	});
	
	
	/*var wmts1 = new OpenLayers.Layer.WMTS({
        name: "Medford Buildings",
        //url: "http://v2.suite.opengeo.org/geoserver/gwc/service/wmts/",
		url: "http://localhost:8000/api/tile?Service=WMTS&Version=1.0.0&Request=GetTile&Layer=example&style=default&format=image/jpeg&TileMatrixSet=googlemapscompatible&TileMatrix={z}&TileRow={y}&TileCol={x}",
        layer: "medford:buildings",
        matrixSet: "EPSG:900913",
        matrixIds: matrixIds,
        format: "image/png",
        style: "_null",
        opacity: 0.7,
        isBaseLayer: false
    });*/

	/*
	var wmts2 = L.tileLayer('<ServiceRoot>?SERVICE=WMTS&REQUEST=GetTile&VERSION=[version]&Layer=[layername]&Format=image/png&TileMatrixSet[MatrixsetName]=&TileMatrix={z}&TileRow={x}&TileCol={y}');

	var map = L.map('map', {
		center: [0, 0],
		zoom: 1,
		layers: [virtual]
	});
	
/*
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
*/

});
