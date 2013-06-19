
$(document).ready(function() {
	
	var map;
	
	// base layer using OpenStreetMap
	var osm = new OpenLayers.Layer.OSM();
    
	// this part is to show the layer using the local map
	var mbTiles = new OpenLayers.Layer.TMS("Hosted Tiles", ["mbtiles"], { 
		getURL: mbtilesURL,
		// Existing tiles are resized on zoom to provide a visual effect of the zoom having taken place immediately.  
		// As the new tiles become available, they are drawn over top of the resized tiles.
		transitionEffect: "resize",
        isBaseLayer: false,
        opacity: 0.7
    });

	// We use this function to extract the map from the MBTiles database
	function mbtilesURL(bounds) {
        var db = "points_of_interest1.mbtiles";
        var res = this.map.getResolution();
        var x = Math.round ((bounds.left - this.maxExtent.left) / (res * this.tileSize.w));
        var y = Math.round ((this.maxExtent.top - bounds.top) / (res * this.tileSize.h));
        var z = this.map.getZoom();
		var limit = Math.pow(2, z);
		x = ((x % limit) + limit) % limit;
		y = Math.pow(2,z) - y - 1;
		return "http://localhost:8000/api/tile/points_of_interest1/" + z + "/" + x + "/" + y + ".png";
    }

// This is the metadata.json information of our map
var url = 'http://localhost:8000/api/metadata/points_of_interest1/metadata.jsonp';

// We need Wax to add the legend and the tooltips to the map
wax.tilejson(url,
  function(tilejson) {	
	// here we create the map  
	map = new OpenLayers.Map({
        div: "map", 
        projection: "EPSG:900913",
		layers: [
			osm, 
			mbTiles,
			wax.ol.connector(tilejson)
		],
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
		//new wax.ol.Legend()
		// To display tooltips using Wax
		//new wax.ol.interaction()
		]
    });

// To specify the center and the zoom at the beginning
map.setCenter(new OpenLayers.LonLat(9.63,46.88).transform(new OpenLayers.Projection("EPSG:4326"),map.getProjectionObject()), 7);     

});

});