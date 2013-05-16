
$(document).ready(function() {
	
	var map;

	map = new OpenLayers.Map({
        div: "map", 
        projection: "EPSG:900913",
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
			}) 
		] 
    });
	
	map.zoomTo(5);
	
	var osm = new OpenLayers.Layer.OSM();
    map.addLayer(osm);
	
	/*var mbTiles = new OpenLayers.Layer.XYZ("Hosted Tiles", ["http://localhost:8000/api/tile/example/${z}/${x}/${y}.png"], {
        // Existing tiles are resized on zoom to provide a visual effect of the zoom having taken place immediately.  
		// As the new tiles become available, they are drawn over top of the resized tiles.
		transitionEffect: "resize",
        isBaseLayer: false,
        opacity: 0.7
    });*/
	//map.addLayer(mbTiles);
	
	var world_utfgrid = new OpenLayers.Layer.UTFGrid({
		//url: "/tiles/world_utfgrid/${z}/${x}/${y}.json",
		url: "http://localhost:8000/api/grid/example/${z}/${x}/${y}.json",
		utfgridResolution: 4
		//displayInLayerSwitcher: false
	});
	map.addLayer(world_utfgrid);

	var control = new OpenLayers.Control.UTFGrid({
		layers: [world_utfgrid],
		handlerMode: 'move',
		callback: function(dataLookup) {
			// do something with returned data
			document.getElementById("attrs").innerHTML = "hola q tal";
		}
	})
	map.addControl(control);
	
});

/*

        map = new OpenLayers.Map({
            div: "map", 
            projection: "EPSG:900913",
            controls: [] // No default controls; no pan zoom for demo
        });

        var callback = function(infoLookup) {
            var msg = "mmm ";
            if (infoLookup) {
				msg += infoLookup;
                var info;
                for (var idx in infoLookup) {
                    // idx can be used to retrieve layer from map.layers[idx]
                    info = infoLookup[idx];
                    if (info){
                        msg += "[" + info.id + "]";
						if (info.data){
							msg += "<strong>es " + info.data.NAME + " tuturu </strong> ";
						}
						else
							msg += " no info data ";
					}
					else
						msg += " no info";
                }
            }
            document.getElementById("attrs").innerHTML = msg;
        };
            
        var controls = {
            move: new OpenLayers.Control.UTFGrid({
                callback: callback,
                handlerMode: 'move'
            }),
            hover: new OpenLayers.Control.UTFGrid({
                callback: callback,
                handlerMode: 'hover'
            }),
            click: new OpenLayers.Control.UTFGrid({
                callback: callback,
                handlerMode: 'click'
            })
        };
        var control;
        for(var key in controls) {
            control = controls[key];
            control.deactivate();
            map.addControl(control);
        }
        controls['move'].activate();

        function toggleControl(el) {
            for(var c in controls) {
                control = controls[c];
                control.deactivate();
            }
            control = controls[el.value];
            control.activate();
        }

        var osm = new OpenLayers.Layer.OSM();
        map.addLayer(osm);

        var grid_layer = new OpenLayers.Layer.UTFGrid( 
            'Invisible UTFGrid Layer', 
            "http://localhost:8000/api/grid/example/{z}/{x}/{y}.json",
            {utfgridResolution: 4} // default is 2
        );
        map.addLayer(grid_layer);

        map.zoomTo(5);

});
	/*
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