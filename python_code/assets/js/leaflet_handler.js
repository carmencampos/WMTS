
$(document).ready(function() {

	var map;
	
	//L.tileLayer('<ServiceRoot>?SERVICE=WMTS&REQUEST=GetTile&VERSION=[version]&Layer=[layername]&Format=image/png&TileMatrixSet=[MatrixsetName]=&TileMatrix={z}&TileRow={x}&TileCol={y}').addTo(map);
	
	//L.tileLayer('http://a.tiles.mapbox.com/v3/carmencampos?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&Layer=example&Format=image/png&TileMatrixSet=openlayerssphericalmercator:epsg:900913&TileMatrix={z}&TileRow={x}&TileCol={y}').addTo(map);

	var wmts = L.tileLayer('http://localhost:8000/api/tilewmts/example/{z}/{x}/{y}.png?Service=WMTS&Version=1.0.0&Request=GetTile&Layer=example&style=default&format=image/jpeg&TileMatrixSet=googlemapscompatible&TileMatrix={z}&TileRow={y}&TileCol={x}', {
		minZoom: 2,
		opacity: 0.7
	});
		
	/*var wmts = L.tileLayer("http://localhost:8000/api/tilewmts/switzerland/{TileMatrix}/{TileCol}/{TileRow}.png", {
		//layers: 'geo',
		format: 'image/png',
		transparent: true
		//attribution: "Weather data © 2012 IEM Nexrad"
	});*/
	map = new L.map('map',{  //here
		// these are the layers that appear by default
		center : new L.LatLng(47, 8),
		zoom : 3,
		layers: [wmts]
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
