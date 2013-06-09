
$(document).ready(function() {

//var map;

        var oam = new OpenLayers.Layer.XYZ("MapQuest Streets", ["http://otile1.mqcdn.com/tiles/1.0.0/osm/${z}/${x}/${y}.png", "http://otile2.mqcdn.com/tiles/1.0.0/osm/${z}/${x}/${y}.png", "http://otile3.mqcdn.com/tiles/1.0.0/osm/${z}/${x}/${y}.png", "http://otile4.mqcdn.com/tiles/1.0.0/osm/${z}/${x}/${y}.png"], {
            attribution: "Data, imagery and map information provided by <a href='http://www.mapquest.com/'  target='_blank'>MapQuest</a>, <a href='http://www.openstreetmap.org/' target='_blank'>Open Street Map</a> and contributors, <a href='http://creativecommons.org/licenses/by-sa/2.0/' target='_blank'>CC-BY-SA</a>  <img src='http://developer.mapquest.com/content/osm/mq_logo.png' border='0'>",
            transitionEffect: "resize"
        });

        var hostedTiles = new OpenLayers.Layer.XYZ("Hosted Tiles", ["http://a.tiles.mapbox.com/v3/mapbox.geography-class/${z}/${x}/${y}.png", "http://b.tiles.mapbox.com/v3/mapbox.geography-class/${z}/${x}/${y}.png", "http://c.tiles.mapbox.com/v3/mapbox.geography-class/${z}/${x}/${y}.png", "http://d.tiles.mapbox.com/v3/mapbox.geography-class/${z}/${x}/${y}.png"], {
            attribution: "Tiles Courtesy of <a href='http://tiles.mapbox.com/mapbox/map/geography-class' target='_blank'>MapBox</a>",
            transitionEffect: "resize",
            isBaseLayer: false,
            opacity: 0.7,
            visibility: false
        });

       /* map = new OpenLayers.Map('map', {
            projection: "EPSG:900913",
            layers: [oam, hostedTiles]
        });*/
		
var tilejsonp = {
    tilejson: '1.0.0',
    //tms: true, 
	scheme: 'tms',
	legend: "<p>About this map</p>\n<p>Here are shown the differents rivers, lakes and oceans in the Earth</p>", 
    template: "{{#__location__}}{{/__location__}}{{#__teaser__}}{{{Name}}}{{/__teaser__}}{{#__full__}}{{/__full__}}", 
    tiles: ['http://localhost:8000/api/tile/example/{z}/{x}/{y}.png'],  //example //geography-class
    grids: ['http://localhost:8000/api/grid/example/{z}/{x}/{y}.grid.json'],  //example
	//grids: ['http://c.tiles.mapbox.com/v3/carmencampos.example/{z}/{x}/{y}.grid.json'],
    formatter: function (options, data) { return "CODE: " + data.Name }
};
		
wax.tilejson('http://a.tiles.mapbox.com/v3/carmencampos.example.jsonp',
function(tilejson) {
    var map = new OpenLayers.Map({
        div: 'map',
        controls: [
            new OpenLayers.Control.Navigation(),
            new OpenLayers.Control.Attribution(),
			new OpenLayers.Control.LayerSwitcher()
        ],
        layers: [
			//oam,
            wax.ol.connector(tilejson)
        ]
    });
	
	wax.ol.Legend(map, tilejsonp).appendTo(map._container);
	
    map.zoomTo(3);
	
	/*map.addControl(new wax.ol.Legend());
	
	// The Wax OL interaction control can accept TileJSON.
	map.addControl(new wax.ol.Interaction({
		tilejson: '1.0.0',
		scheme: 'tms',
		legend: "<p>About this map</p>\n<p>Here are shown the differents rivers, lakes and oceans in the Earth</p>", 
		template: "{{#__location__}}{{/__location__}}{{#__teaser__}}{{{Name}}}{{/__teaser__}}{{#__full__}}{{/__full__}}", 
		tiles: ['http://c.tiles.mapbox.com/v3/carmencampos.example/{z}/{x}/{y}.png'],  
		grids: ['http://c.tiles.mapbox.com/v3/carmencampos.example/{z}/{x}/{y}.grid.json'],
		//formatter: function(options, data) { return data.Name }
}));*/

});




//map.zoomToMaxExtent();

//var switcherControl = new OpenLayers.Control.LayerSwitcher();

//map.addControl(switcherControl);

//switcherControl.maximizeControl();

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

});
