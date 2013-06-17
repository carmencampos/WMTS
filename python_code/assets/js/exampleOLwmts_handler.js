
$(document).ready(function() {

var map;

// base layer using OpenStreetMap
var arrayOSM = ["http://otile1.mqcdn.com/tiles/1.0.0/osm/${z}/${x}/${y}.png",
            "http://otile2.mqcdn.com/tiles/1.0.0/osm/${z}/${x}/${y}.png",
            "http://otile3.mqcdn.com/tiles/1.0.0/osm/${z}/${x}/${y}.png",
            "http://otile4.mqcdn.com/tiles/1.0.0/osm/${z}/${x}/${y}.png"];
var baseOSM = new OpenLayers.Layer.OSM("OSM Tiles", arrayOSM);

// this part is to show the layer using the local map
var wmts = new OpenLayers.Layer.WMTS({
    name: "example",
	requestEncoding: 'REST',
	url: "http://localhost:8000/api/tilewmts/example/{TileMatrix}/{TileCol}/{TileRow}.png",
	layer: "example",
    matrixSet: "GoogleMapsCompatible",
    format: "image/png",
    style: "_null",
    opacity: 0.7,
	isBaseLayer: false,
});

// This is the metadata.json information of our map
// When we export our map in TileMill to a MBTiles database, the "tiles" URL and "grids" URL do not appear
// on it, so we can not access directly to the metadata.json file
// Another option would be to modify our MBTiles database with sqlite3 and insert those values
var tilejsonNO = {
    tilejson: '2.0.0',
	version: '1.0.0',
    bounds: [-166.9922,-74.212,164.8828,81.0932],
	center: [0,0,2],
	maxzoom: 7,
	minzoom: 0,
	name: "Example",
	scheme: "xyz",
	legend: "<p>About this map</p>\n<p>Here are shown the differents rivers, lakes and oceans in the Earth</p>", 
    template: "{{#__location__}}{{/__location__}}{{#__teaser__}}{{{Name}}}{{/__teaser__}}{{#__full__}}{{/__full__}}", 
    tiles: ['http://localhost:8000/api/tile/example/{z}/{x}/{y}.png'], 
    grids: ['http://localhost:8000/api/grid/example/{z}/{x}/{y}.grid.json'],  
	formatter: function (options, data) { return "CODE: " + data.Name }
};

var url = 'http://localhost:8000/api/metadata/example/metadata.jsonp';

// We need Wax to add the legend and the tooltips to the map
wax.tilejson(url,
  function(tilejson) {
map = new OpenLayers.Map({
    div: "map",
	layers: [
		baseOSM, 
		wmts,
		wax.ol.connector(tilejson)
	],
	projection: "EPSG:3857",
    controls: [
		// To be able to add or remove a overlay layer, or to choose which base layer will be shown
		new OpenLayers.Control.LayerSwitcher(),
		// Zoom with sliders and posibility to move to north, south, east, west
        new OpenLayers.Control.PanZoomBar(),
		// Scale indicating distances
		new OpenLayers.Control.ScaleLine(),
		// Posibility to move the map with the mouse
		new OpenLayers.Control.Navigation({
			dragPanOptions: {
				enableKinetic: true
			}
		}),
		// To display the location in the URL
		new OpenLayers.Control.Permalink({anchor: true})
		// To display the legend using Wax
		//new wax.ol.Legend(),
		// To display tooltips using Wax
		//new wax.ol.interaction()
    ],
});

// To specify the center and the zoom at the beginning	
map.setCenter(new OpenLayers.LonLat(9.63,46.88).transform(new OpenLayers.Projection("EPSG:4326"),map.getProjectionObject()), 3);     

});

});