
$(document).ready(function() {
	
	var map;
	
	var osm = new OpenLayers.Layer.OSM();
    //map.addLayer(osm);
	
	var mbTiles = new OpenLayers.Layer.TMS("Hosted Tiles", 
			["mmm"], { //"http://localhost:8000/api/tile/example/${z}/${x}/${y}.png"], { //this.url+"?db="+db+"&z="+z+"&x="+x+"&y="+((1 << z) - y - 1);
        // Existing tiles are resized on zoom to provide a visual effect of the zoom having taken place immediately.  
		// As the new tiles become available, they are drawn over top of the resized tiles.
		getURL: mbtilesURL,
		transitionEffect: "resize",
        isBaseLayer: false,
        opacity: 0.7
    });
	function mbtilesURL(bounds) {
            var db = "example.mbtiles";
            var res = this.map.getResolution();
            var x = Math.round ((bounds.left - this.maxExtent.left) / (res * this.tileSize.w));
            var y = Math.round ((this.maxExtent.top - bounds.top) / (res * this.tileSize.h));
            var z = this.map.getZoom();
            // Deal with Bing layers zoom difference...
            if (this.map.baseLayer.CLASS_NAME == 'OpenLayers.Layer.VirtualEarth' || this.map.baseLayer.CLASS_NAME == 'OpenLayers.Layer.Bing') {
               z = z + 1;
            }
			var limit = Math.pow(2, z);

		    //if (mapBounds.intersectsBounds(bounds) && z >= mapMinZoom && z <= mapMaxZoom ) {
				x = ((x % limit) + limit) % limit;
				y = Math.pow(2,z) - y - 1;
				return "http://localhost:8000/api/tile/example/" + z + "/" + x + "/" + y + ".png";
			//}
            //return this.url+"?db="+db+"&z="+z+"&x="+x+"&y="+((1 << z) - y - 1);   
			//return "http://localhost:8000/api/tile/example/"+z+"/"+x+"/"+y+".png";
        }
	//map.addLayer(mbTiles);
	
	var world_utfgrid = new OpenLayers.Layer.UTFGrid({
		name: "UTFGrid",
		url: "http://localhost:8000/api/grid/example/${z}/${x}/${y}.json",
		utfgridResolution: 4,
		displayInLayerSwitcher: false
	});
	//map.addLayer(world_utfgrid);
	
	map = new OpenLayers.Map({
        div: "map", 
        projection: "EPSG:900913",
		layers: [osm, mbTiles, world_utfgrid],
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

	var control = new OpenLayers.Control.UTFGrid({
		layers: [world_utfgrid],
		handlerMode: 'move',
		// Keys of this object are layer indexes and can be used to resolve a layer in the map.layers array.  
		// The structure of the property values depend on the data included in the underlying UTFGrid and may be 
		// any valid JSON type.
		callback: function(infoLookup) {
			// do something with returned data
			var msg = "M ";
			if (infoLookup) {
				var info;
				for (var idx in infoLookup) {
					// idx can be used to retrieve layer from map.layers[idx]
					info = infoLookup[idx];
					layer = map.layers[idx];
					var a = Math.random();
					msg += a + " name "+ layer.name + "- " + idx + " ";
					//msg += layer.getFeatureInfo(47, 21) + " " + layer.getFeatureId(55, 29) + " ";
					//msg += info;
					if (info){
						if(info.data){
							msg += info.data.Name;
						}
						else
							msg += " no infodata ";
						if(info.keys){
							msg += info.keys[0];
						}
						else
							msg += " no infokey ";
					}
					else
						msg += " no info ";
				}
			}
			document.getElementById("attrs").innerHTML = msg;
		}
	})
	map.addControl(control);
	
	map.zoomTo(5);
	
});

/*

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


		/* var layer = new OpenLayers.Layer.TMS(
    "My Layer", // name for display in LayerSwitcher
    "http://tilecache.osgeo.org/wms-c/Basic.py/", // service endpoint
    {layername: "basic", type: "png"} // required properties


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