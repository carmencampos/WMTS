
var map;

$(document).ready(function() {

	OpenLayers.ProxyHost = "/proxy/?url=";

	var  format;

    /*
     * KVP version
     */

    format = new OpenLayers.Format.WMTSCapabilities({
        /**
         * This particular service is not in compliance with the WMTS spec and
         * is providing coordinates in y, x order regardless of the CRS.  To
         * work around this, we can provide the format a table of CRS URN that
         * should be considered y, x order.  These will extend the defaults on
         * the format.
         */
        yx: {
            "urn:ogc:def:crs:EPSG::900913": true
        }
    });

    OpenLayers.Request.GET({
        url: "http://v2.suite.opengeo.org/geoserver/gwc/service/wmts",
		// url: "http://c.tiles.mapbox.com/v3/carmencampos/example",
        params: {
            SERVICE: "WMTS",
            VERSION: "1.0.0",
            REQUEST: "GetCapabilities"
        },
        success: function(request) {
            var doc = request.responseXML;
            if (!doc || !doc.documentElement) {
                doc = request.responseText;
            }
            var capabilities = format.read(doc);
            var layer = format.createLayer(capabilities, {
                layer: "medford:buildings",
                matrixSet: "EPSG:900913",
                format: "image/png",
                opacity: 0.7,
                isBaseLayer: false
            });
            map.addLayer(layer);
        },
        failure: function() {
            alert("Trouble getting capabilities doc");
            OpenLayers.Console.error.apply(OpenLayers.Console, arguments);
        }
    });

    map = new OpenLayers.Map({
        div: "map",
        projection: "EPSG:900913"
    });

    var osm = new OpenLayers.Layer.OSM();

    map.addLayer(osm);
    map.addControl(new OpenLayers.Control.LayerSwitcher());
    map.setCenter(new OpenLayers.LonLat(-13677832, 5213272), 13);

/*
var osm = new OpenLayers.Layer.XYZ(
    "MapQuest OSM", 
    [
        "http://otile1.mqcdn.com/tiles/1.0.0/osm/${z}/${x}/${y}.png",
        "http://otile2.mqcdn.com/tiles/1.0.0/osm/${z}/${x}/${y}.png",
        "http://otile3.mqcdn.com/tiles/1.0.0/osm/${z}/${x}/${y}.png",
        "http://otile4.mqcdn.com/tiles/1.0.0/osm/${z}/${x}/${y}.png"
    ],
    {transitionEffect: "resize", wrapDateLine: true}
);

var utfgrid = new OpenLayers.Layer.UTFGrid({
    url: "/data/1.0.0/example/${z}/${x}/${y}.grid.json",
    utfgridResolution: 4, // default is 2
    displayInLayerSwitcher: false
});

var map = new OpenLayers.Map({
    div: "map", 
    projection: "EPSG:900913",
    numZoomLevels: 3,
    layers: [osm, utfgrid],
    controls: [
        new OpenLayers.Control.Navigation({
            dragPanOptions: {
                enableKinetic: true
            }
        }),
        new OpenLayers.Control.Zoom()
    ],
    center: [0, 0],
    zoom: 1
});

var output = document.getElementById("output");
var flag = document.getElementById("flag");

var callback = function(infoLookup, loc, pixel) {
    var msg = "mmm ";
    if (infoLookup) {
        var info;
        for (var idx in infoLookup) {
            // idx can be used to retrieve layer from map.layers[idx]
            info = infoLookup[idx];
            if (info && info.data) {
                output.innerHTML = "Hola"; //info.data.admin;
                //flag.innerHTML = "<img src='data:image/png;base64," + info.data.flag_png + "'>";
                //flag.style.left = (pixel.x + 15) + "px";
                //flag.style.top = (pixel.y + 15) + "px";
            } else {
                output.innerHTML = "Adios"; //flag.innerHTML = "&nbsp;";
            }
        }
    }
};
    
var control = new OpenLayers.Control.UTFGrid({
    callback: callback,
    handlerMode: "move"
});

map.addControl(control);

/*
    var example = new OpenLayers.Layer.XYZ("ABC", ["http://localhost:8000/api/tile/example/${z}/${x}/${y}.png"], {
            tms: true,
			attribution: "blabla",
            transitionEffect: "resize"
        });
		
	var wmts = new OpenLayers.Layer.WMTS({
		name: "My WMTS Layer",
		url: "http://a.tiles.mapbox.com/v3/carmencampos",
		layer: "example",
		style: "default",
		matrixSet: "googlemapscompatible"
	});
		
	map = new OpenLayers.Map('map', {
          projection: new OpenLayers.Projection("EPSG:900913")
    });

    var base_layer = new OpenLayers.Layer.OSM();

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
