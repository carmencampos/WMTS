
var map;

$(document).ready(function() {


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
    //url: "utfgrid/geography-class/${z}/${x}/${y}.grid.json",
	url: "http://api.tiles.mapbox.com/v3/mapbox.geography-class/${z}/${x}/${y}.grid.json",
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
			msg = "mandm ";
            if (info && info.data) {
                output.innerHTML = info.data.admin;
                flag.innerHTML = "<img src='data:image/png;base64," + info.data.flag_png + "'>";
                flag.style.left = (pixel.x + 15) + "px";
                flag.style.top = (pixel.y + 15) + "px";
            } else {
                output.innerHTML = flag.innerHTML = "&nbsp;";
            }
        }
    }
};
    
var control = new OpenLayers.Control.UTFGrid({
    callback: callback,
    handlerMode: "move"
});

map.addControl(control);


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

