
$(document).ready(function() {

// http://www.mapbox.com/wax/connector-ol.html
// http://geoconsulter.de/map/wax/manual/index.html

//var map;

var tilejson = {
    tilejson: '2.0.0',
	version: '1.0.0',
    //bounds: [-166.9922,-74.212,164.8828,81.0932],
	center: [0,0,2],
	maxzoom: 7,
	minzoom: 0,
	name: "Example",
	scheme: "xyz",
	legend: "hola que tal", //<p>About this map</p>\n<p>Here are shown the differents rivers, lakes and oceans in the Earth</p>", 
    //template: "{{#__location__}}{{/__location__}}{{#__teaser__}}{{{Name}}}{{/__teaser__}}{{#__full__}}{{/__full__}}", 
    //tiles: ['http://localhost:8000/api/tile/example/{z}/{x}/{y}.png'],  //geography-class
    //grids: ['http://localhost:8000/api/grid/example/{z}/{x}/{y}.grid.json'], 
	tiles: ['http://c.tiles.mapbox.com/v3/carmencampos.example/{z}/{x}/{y}.png']
	//grids: ['http://c.tiles.mapbox.com/v3/carmencampos.example/{z}/{x}/{y}.grid.json'],
    //formatter: function (options, data) { return "CODE: " + data.Name }
};

//wax.tilejson('http://api.tiles.mapbox.com/v3/carmencampos.example.jsonp',
//function(tilejson) {
    var map = new OpenLayers.Map({
        div: 'map',
        controls: [
            new OpenLayers.Control.Navigation(),
            new OpenLayers.Control.Attribution(),
			new wax.ol.Legend(tilejson)
        ],
        layers: [
            wax.ol.connector(tilejson)
        ]
    });

	map.addControl(new wax.ol.Legend("hola que tallll"));
	//map.addControl(new wax.ol.Interaction());
	map.zoomTo(3);
//});


/*
var osm = new OpenLayers.Layer.OSM();

var utfgrid = new OpenLayers.Layer.UTFGrid({
    url: "http://localhost:8000/api/grid/example/${z}/${x}/${y}.grid.json",
    utfgridResolution: 4, // default is 2
    displayInLayerSwitcher: false
});

var map = new OpenLayers.Map({
    div: "map", 
    projection: "EPSG:900913",
    controls: [],
    layers: [osm, utfgrid],
    center: [0, 0],
    zoom: 5
});

var callback = function(infoLookup) {
    var msg = "";
    if (infoLookup) {
        var info;
        for (var idx in infoLookup) {
            // idx can be used to retrieve layer from map.layers[idx]
            info = infoLookup[idx];
            if (info && info.data) {
                msg += "[" + info.id + "] <strong>In 2005, " + 
                    info.data.NAME + " had a population of " +
                    info.data.POP2005 + " people.</strong> ";
            }
        }
    }
    document.getElementById("attrs").innerHTML = msg;
};
    
var controls = {
    move: new OpenLayers.Control.UTFGrid({
        callback: callback,
        handlerMode: "move"
    }),
    hover: new OpenLayers.Control.UTFGrid({
        callback: callback,
        handlerMode: "hover"
    }),
    click: new OpenLayers.Control.UTFGrid({
        callback: callback,
        handlerMode: "click"
    })
};
for (var key in controls) {
    map.addControl(controls[key]);
}

function toggleControl(el) {
    for (var c in controls) {
        controls[c].deactivate();
    }
    controls[el.value].activate();
}

// activate the control that responds to mousemove
toggleControl({value: "move"});
		
// OpenLayers.Layer.XYZ("Hosted Tiles", ["http://a.tiles.mapbox.com/v3/carmencampos.example/${z}/${x}/${y}.png", "http://b.tiles.mapbox.com/v3/carmencampos.example/${z}/${x}/${y}.png", "http://c.tiles.mapbox.com/v3/carmencampos.example/${z}/${x}/${y}.png"], {
 
 /*
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
		url: "http://localhost:8000/api/grid/example/${z}/${x}/${y}.grid.json", //?callback=grid",
		//url: "http://a.tiles.mapbox.com/v3/carmencampos.example/${z}/${x}/${y}.grid.json",
		utfgridResolution: 4,
		displayInLayerSwitcher: false,
		useJSONP: true
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
	
		var grid = function(infoLookup) {
            var msg = "";
            if (infoLookup) {
				msg = "hay infolookup "
                var info;
                for (var idx in infoLookup) {
                    // idx can be used to retrieve layer from map.layers[idx]
                    info = infoLookup[idx];
                    if (info && info.data) {
						msg += "hay infoydata "
                        msg += "[" + info.id + "] <strong>In 2005, " + 
                            info.data.NAME + " had a population of " +
                            info.data.POP2005 + " people.</strong> ";
                    }
                }
            }
            document.getElementById("attrs").innerHTML = msg;
        };
		
		var callback = function(infoLookup) {
            var msg = "";
            if (infoLookup) {
				msg = "en grid hay infolookup "
                var info;
                for (var idx in infoLookup) {
                    // idx can be used to retrieve layer from map.layers[idx]
                    info = infoLookup[idx];
					if(info){
						msg += " info " + info;
					}
                    if (info && info.data) {
						msg += "en grid hay infoydata "
                        msg += "[" + info.id + "] <strong>In 2005, " + 
                            info.data.NAME + " had a population of " +
                            info.data.POP2005 + " people.</strong> ";
                    }
                }
            }
            document.getElementById("attrs").innerHTML = msg;
        };

        var control = new OpenLayers.Control.UTFGrid({
            'handlerMode': 'move',
            'callback': callback
        });
        map.addControl(control);

	/*
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
	*/
	
	//map.addControl(control);
	
	//map.zoomTo(5);
	
}); 

function grid2() {
        // TODO: don't build for tiles outside of viewport
        // Touch interaction leads to intermediate
        //var zoomLayer = map.createOrGetLayer(Math.round(map.getZoom())); //?what is this doing?
        // Calculate a tile grid and cache it, by using the `.tiles`
        // element on this map.
        //if (!dirty && _grid) {
        //    return _grid;
        //} else {
            return (_grid = (function(layers) {
                var o = [];
                for (var layerId in layers) {
                    // This only supports tiled layers
                    if (layers[layerId]._tiles) {
                        for (var tile in layers[layerId]._tiles) {
                            var _tile = layers[layerId]._tiles[tile];
                            // avoid adding tiles without src, grid url can't be found for them
                            if(_tile.src) {
                              var offset = wax.u.offset(_tile);
                              o.push([offset.top, offset.left, _tile]);
                            }
                        }
                    }
                }
                return o;
            })(map._layers));
        }
 
 function grid(infoLookup) {
 var msg = "";
            if (infoLookup) {
				msg = "en gridfin hay infolookup "
                var info;
                for (var idx in infoLookup) {
                    // idx can be used to retrieve layer from map.layers[idx]
                    info = infoLookup[idx];
					/*if(info){
						msg += " info " + info;
					}*/
					if(info.grid){
						msg += " infokkk " + info.grid;
					}
					if(info.keys){
						msg += " infokkk " + info.keys;
					}
					if(info.data){
						msg += " info " + info.data;
					}
                    if (info && info.data) {
						alert(info.data.name);
						msg += "en grid hay infoydata "
                        msg += "[" + info.id + "] <strong>In 2005, " + 
                            info.data.NAME + " had a population of " +
                            info.data.POP2005 + " people.</strong> ";
                    }
                }
				}
	document.getElementById("attrs2").innerHTML = msg;
 }
 
 function callback(infoLookup) {
 var msg = "";
            if (infoLookup) {
				msg = "en gridcb hay infolookup "
                var info;
                for (var idx in infoLookup) {
                    // idx can be used to retrieve layer from map.layers[idx]
                    info = infoLookup[idx];
					/*if(info){
						msg += " info " + info;
					}*/
					if(info.grid){
						msg += " infokkk " + info.grid;
					}
					if(info.keys){
						msg += " infokkk " + info.keys;
					}
					if(info.data){
						msg += " info " + info.data;
					}
                    if (info && info.data) {
						alert(info.data.name);
						msg += "en grid hay infoydata "
                        msg += "[" + info.id + "] <strong>In 2005, " + 
                            info.data.NAME + " had a population of " +
                            info.data.POP2005 + " people.</strong> ";
                    }
                }
				}
	document.getElementById("attrs3").innerHTML = msg;
 }
 
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

