
$(document).ready(function() {

var map;

		var arrayOSM = ["http://otile1.mqcdn.com/tiles/1.0.0/osm/${z}/${x}/${y}.png",
                    "http://otile2.mqcdn.com/tiles/1.0.0/osm/${z}/${x}/${y}.png",
                    "http://otile3.mqcdn.com/tiles/1.0.0/osm/${z}/${x}/${y}.png",
                    "http://otile4.mqcdn.com/tiles/1.0.0/osm/${z}/${x}/${y}.png"];
       
        var baseOSM = new OpenLayers.Layer.OSM("OSM Tiles", arrayOSM);

		var wmts = new OpenLayers.Layer.WMTS({
	        name: "geography-class",
				requestEncoding: 'REST',
				url: "http://localhost:8000/api/tilewmts/points_of_interest/{TileMatrix}/{TileCol}/{TileRow}.png",
			layer: "geography-class",
	        matrixSet: "GoogleMapsCompatible",
	        format: "image/png",
	        style: "_null",
	        opacity: 0.7,
			isBaseLayer: false,
	    });
      												
		map = new OpenLayers.Map({
		    div: "map",
			layers: [baseOSM, wmts],
			projection: "EPSG:3857",
		    controls: [
				new OpenLayers.Control.LayerSwitcher(),
		        new OpenLayers.Control.Attribution(),
		        new OpenLayers.Control.Navigation({
		            dragPanOptions: {
		                enableKinetic: true
		            }
		        }),
		        new OpenLayers.Control.PanZoomBar(),
		        new OpenLayers.Control.ScaleLine(),
				new OpenLayers.Control.Permalink({anchor: true})
		    ],
			//center: [10, 1],
			//zoom: 7
		});
		
		map.setCenter(new OpenLayers.LonLat(9.63,46.88).transform(new OpenLayers.Projection("EPSG:4326"),map.getProjectionObject()), 6);     

		//map.setCenter(new OpenLayers.LonLat(10, 10), 5);
        //map.zoomTo(5);

});
