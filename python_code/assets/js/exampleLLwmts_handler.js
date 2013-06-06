
$(document).ready(function() {

	var map;
	
	var oam = new L.TileLayer("http://{s}.mqcdn.com/tiles/1.0.0/sat/{z}/{x}/{y}.jpg", {
		maxZoom: 17,
		minZoom: 2,
		subdomains: ["otile1", "otile2", "otile3", "otile4"],
	});
	
	var wmts = L.tileLayer('http://localhost:8000/api/tilewmts/example/{z}/{x}/{y}.png?Service=WMTS&Version=1.0.0&Request=GetTile&Layer=example&style=default&format=image/jpeg&TileMatrixSet=googlemapscompatible&TileMatrix={z}&TileRow={y}&TileCol={x}', {
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
		"MapQuest Streets": oam,
	};

	layersControl = new L.Control.Layers(baseLayers, overlays, {
		// using "true" the switched layer box appears collapsed
		collapsed: true
	});
		
	map = new L.map('map',{
		// these are the layers that appear by default
		layers: [oam, wmts],
		center : new L.LatLng(47, 5),
		zoom : 3
	});
	
	// Add to switch between the available layers
	map.addControl(layersControl);
	
	// Add a scale to the map
	L.control.scale().addTo(map);
	
});
