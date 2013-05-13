
var map;

$(document).ready(function() {

        var example = new OpenLayers.Layer.XYZ("ABC", ["http://localhost:8000/api/tile/example/${z}/${x}/${y}.png"], {
            tms: true,
			attribution: "blabla",
            transitionEffect: "resize"
        });
		
	map = new OpenLayers.Map('map', {
          projection: new OpenLayers.Projection("EPSG:900913")
      });

      //var base_layer = new OpenLayers.Layer.OSM();

      var base_layer = new OpenLayers.Layer.TMS(
          'TMS street_layer',
          '/data/',
          {layername: 'example',
           type: 'png', isBaseLayer: true}  //false
      );

      map.addLayer(base_layer);
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
