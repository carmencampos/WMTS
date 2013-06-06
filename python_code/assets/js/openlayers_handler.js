
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
				//url: "http://api.tiles.mapbox.com/v3/mapbox.geography-class/{TileMatrix}/{TileCol}/{TileRow}.png",
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
		        new OpenLayers.Control.Zoom(),
		        new OpenLayers.Control.Permalink({anchor: true})
		    ]
		});

        //map.setCenter(new OpenLayers.LonLat(-87.63,41.88).transform(new OpenLayers.Projection("EPSG:4326"),map.getProjectionObject()), zoom);       

		map.zoomTo(3);
	/*
    var example = new OpenLayers.Layer.XYZ("ABC", ["http://localhost:8000/api/tile/example/${z}/${x}/${y}.png"], {
            tms: true,
			attribution: "blabla",
            transitionEffect: "resize"
        });
		
	var wmtsmio = new OpenLayers.Layer.WMTS({
		name: "My WMTS Layer",
		url: "http://a.tiles.mapbox.com/v3/carmencampos",
		layer: "example",
		style: "default",
		matrixSet: "googlemapscompatible"
	});
	
	
	var wmts = new OpenLayers.Layer.WMTS({
	        name: "chicago wmts",
			requestEncoding: 'REST',
			url: "http://localhost:8888/tileserverdemo/chicago/{TileMatrix}/{TileCol}/{TileRow}.png",
	        layer: "chicago",
	        matrixSet: "GoogleMapsCompatible",
	        format: "image/png",
	        style: "_null",
	        opacity: 1.0,
	        isBaseLayer: false,
	    });
	
	*/
/*	
    map = new OpenLayers.Map({
        div: "map",
        projection: "EPSG:900913"
    });    
    
    var osm = new OpenLayers.Layer.OSM();

    // If tile matrix identifiers differ from zoom levels (0, 1, 2, ...)
    // then they must be explicitly provided.
    var matrixIds = new Array(26);
    for (var i=0; i<26; ++i) {
        matrixIds[i] = "EPSG:900913:" + i;
    }

    var wmts = new OpenLayers.Layer.WMTS({
        name: "Example Map", //"Medford Buildings",
        //url: "http://v2.suite.opengeo.org/geoserver/gwc/service/wmts/",
		//url: "http://localhost:8000/api/tile?Service=WMTS&Version=1.0.0&Request=GetTile&Layer=example&style=default&format=image/jpeg&TileMatrixSet=googlemapscompatible&TileMatrix={z}&TileRow={y}&TileCol={x}",
        //url: "http://localhost:8000/api/wmtstile/Service=WMTS/Version=1.0.0/Request=GetTile/Layer=example/style=default/format=image/jpeg/TileMatrixSet=googlemapscompatible/TileMatrix=1/TileRow=1/TileCol=1",
		url: "http://localhost:8000/api/wmtstile/",
		layer: "example",
        matrixSet: "googlemapscompatible", //"EPSG:900913",
        //matrixIds: matrixIds,
        format: "image/png",
        style: "default", //"_null",
        opacity: 0.7,
        isBaseLayer: false
    });                

    map.addLayers([osm, wmts]);
    map.addControl(new OpenLayers.Control.LayerSwitcher());
    map.setCenter(new OpenLayers.LonLat(-13677832, 5213272), 13);

    
    /*var base_layer = new OpenLayers.Layer.TMS(
        'TMS street_layer',
        '/data/',
        {layername: 'example',
        type: 'png', isBaseLayer: true}  //false
    );

	map.addLayer(wmts);
    //map.addLayer(base_layer);
    //map.addLayer(overlay_layer);
    map.zoomToMaxExtent();
		
		/* var layer = new OpenLayers.Layer.TMS(
    "My Layer", // name for display in LayerSwitcher
    "http://tilecache.osgeo.org/wms-c/Basic.py/", // service endpoint
    {layername: "basic", type: "png"} // required properties
);*/

	/*	var example = new OpenLayers.Layer.TMS("ABC", 
			"http://localhost:8000/api/tile/example/${z}/${x}/${y}.png"], 
			{
            
        });*/
		
	/*	map = new OpenLayers.Map('map', {
            projection: "EPSG:900913",
            layers: [example]
        });
		
		layer = new OpenLayers.Layer.TMS( "TMS",
                    "http://tilecache.osgeo.org/wms-c/Basic.py/", {layername: 'basic', type:'png'} );
            map.addLayer(layer);
			
		// http://openlayers.org/dev/examples/tms.html
		
		/*
		var osm = new OpenLayers.Layer.OSM();

    // If tile matrix identifiers differ from zoom levels (0, 1, 2, ...)
    // then they must be explicitly provided.
    var matrixIds = new Array(26);
    for (var i=0; i<26; ++i) {
        matrixIds[i] = "EPSG:900913:" + i;
    }

    var wmts = new OpenLayers.Layer.WMTS({
        name: "Medford Buildings",
        url: "http://v2.suite.opengeo.org/geoserver/gwc/service/wmts/",
        layer: "medford:buildings",
        matrixSet: "EPSG:900913",
        matrixIds: matrixIds,
        format: "image/png",
        style: "_null",
        opacity: 0.7,
        isBaseLayer: false
    });                

    map.addLayers([osm, wmts]);
		*/
		
		// http://openlayers.org/dev/examples/wmts.html
		
		// otro http://openlayers.org/dev/examples/wmts-capabilities.html
		
		// otro http://maps.peterrobins.co.uk/files/wmts2.html
		
     /*   map.zoomToMaxExtent();

        var switcherControl = new OpenLayers.Control.LayerSwitcher();

        map.addControl(switcherControl);

        switcherControl.maximizeControl();
 
		map.addControl(new OpenLayers.Control.ScaleLine());  */

});
