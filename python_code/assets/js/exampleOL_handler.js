
$(document).ready(function() {
		
// OpenLayers.Layer.XYZ("Hosted Tiles", ["http://a.tiles.mapbox.com/v3/carmencampos.example/${z}/${x}/${y}.png", "http://b.tiles.mapbox.com/v3/carmencampos.example/${z}/${x}/${y}.png", "http://c.tiles.mapbox.com/v3/carmencampos.example/${z}/${x}/${y}.png"], {
 
	var map;
	
	var osm = new OpenLayers.Layer.OSM();
    //map.addLayer(osm);
	
	var mbTiles = new OpenLayers.Layer.XYZ("Hosted Tiles", ["http://a.tiles.mapbox.com/v3/carmencampos.example/${z}/${x}/${y}.png", "http://b.tiles.mapbox.com/v3/carmencampos.example/${z}/${x}/${y}.png", "http://c.tiles.mapbox.com/v3/carmencampos.example/${z}/${x}/${y}.png"], {
		// Existing tiles are resized on zoom to provide a visual effect of the zoom having taken place immediately.  
		// As the new tiles become available, they are drawn over top of the resized tiles.
		transitionEffect: "resize",
        isBaseLayer: false,
        opacity: 0.7
    });
	
	var world_utfgrid = new OpenLayers.Layer.UTFGrid({
		name: "UTFGrid",
		//url: "http://localhost:8000/api/grid/example/${z}/${x}/${y}.json",
		url: "http://a.tiles.mapbox.com/v3/carmencampos.example/${z}/${x}/${y}.jsonp",
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
wax.tilejson('http://c.tiles.mapbox.com/v3/carmencampos.example.jsonp',
function(tilejson) {
    map = new OpenLayers.Map({
        div: 'map',
        controls: [
            new OpenLayers.Control.Navigation(),
            new OpenLayers.Control.Attribution()
        ],
        layers: [
            wax.ol.connector(tilejson)
        ]
    });
    map.zoomTo(3);
});

/*
// Use the mapbox openlayers zoom/pan control images.
//OpenLayers.ImgPath = 'http://js.mapbox.com/theme/dark/';
// Set up a map in a div with the id 'openlayers-simple'
map = new OpenLayers.Map('map', {
  units: 'm',
  projection: new OpenLayers.Projection('EPSG:900913'),
  maxExtent: new OpenLayers.Bounds(-20037508.34,
    -20037508.34,
    20037508.34,
    20037508.34)
});
map.addLayer(new OpenLayers.Layer.TMS('geography-class',
  'http://a.tiles.mapbox.com/mapbox/', {
  maxResolution: 156543.0339,
  type: 'png',
  layername: 'geography-class'
}));
/*
// The Wax OL interaction control can accept TileJSON.
map.addControl(new wax.ol.Interaction({
  tilejson: '1.0.0',
  scheme: 'tms',
  tiles: ['http://a.tiles.mapbox.com/mapbox/1.0.0/geography-class/{z}/{x}/{y}.png'],
  grids: ['http://a.tiles.mapbox.com/mapbox/1.0.0/geography-class/{z}/{x}/{y}.grid.json'],
  formatter: function(options, data) { return data.NAME }
}));
*/
//map.zoomTo(1);

/*
	map = new OpenLayers.Map('map', {
          projection: new OpenLayers.Projection("EPSG:900913")
    });

    var base_layer = new OpenLayers.Layer.OSM();

    map.addLayer(base_layer);
	map.zoomToMaxExtent();

var world_utfgrid = new OpenLayers.Layer.UTFGrid(
    'UTFGrid Layer',
    "http://a.tiles.mapbox.com/v3/mapbox.geography-class/${z}/${x}/${y}.json"
	// http://a.tiles.mapbox.com/v3/carmencampos.example/{z}/{x}/{y}.grid.json
);
map.addLayer(world_utfgrid);

var control = new OpenLayers.Control.UTFGrid({
    layers: [world_utfgrid],
    handlerMode: 'move',
    callback: function(infoLookup) {
        // do something with returned data

    }
})

map.addControl(control);

/*
// Use the mapbox openlayers zoom/pan control images.
//OpenLayers.ImgPath = 'http://js.mapbox.com/theme/dark/';
// Set up a map in a div with the id 'openlayers-simple'
map = new OpenLayers.Map('map', {
  units: 'm',
  projection: new OpenLayers.Projection('EPSG:900913'),
  maxExtent: new OpenLayers.Bounds(-20037508.34,
    -20037508.34,
    20037508.34,
    20037508.34)
});
map.addLayer(new OpenLayers.Layer.TMS('geography-class',
  'http://a.tiles.mapbox.com/mapbox/', {
  maxResolution: 156543.0339,
  type: 'png',
  layername: 'geography-class'
}));
// The Wax OL interaction control can accept TileJSON.
map.addControl(new wax.ol.Interaction({
  tilejson: '1.0.0',
  scheme: 'tms',
  tiles: ['http://a.tiles.mapbox.com/mapbox/1.0.0/geography-class/{z}/{x}/{y}.png'],
  grids: ['http://a.tiles.mapbox.com/mapbox/1.0.0/geography-class/{z}/{x}/{y}.grid.json'],
  formatter: function(options, data) { return data.NAME }
}));
map.zoomTo(1);

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
    url: "http://a.tiles.mapbox.com/v3/mapbox/geography-class/${z}/${x}/${y}.grid.json",
    utfgridResolution: 4, // default is 2
    displayInLayerSwitcher: false
});

map = new OpenLayers.Map({
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

    
var control = new OpenLayers.Control.UTFGrid({
	handlerMode: "move"
});

map.addControl(control);


/*var url = 'http://api.tiles.mapbox.com/v3/mapbox.geography-class.jsonp';
//var url = 'http://api.tiles.mapbox.com/v3/carmencampos.example.jsonp';

wax.tilejson(url,
function(tilejson) {
    map = new OpenLayers.Map({
        div: 'map',
        controls: [
            new OpenLayers.Control.Navigation(),
            new OpenLayers.Control.Attribution()
        ],
        layers: [
            wax.ol.connector(tilejson)
        ]
    });
    map.zoomTo(3);
});
*/

