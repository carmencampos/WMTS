
var grid;

$(document).ready(function() {

		var cloudmade = L.tileLayer('http://{s}.tile.cloudmade.com/{key}/997/256/{z}/{x}/{y}.png', {
			maxZoom: 18,
			attribution: 'Map data &copy; 2011 OpenStreetMap contributors, Imagery &copy; 2011 CloudMade',
			key: 'BC9A493B41014CAABB98F0471D759707'
		});

		//var utfGrid = new L.UtfGrid('http://{s}.tiles.mapbox.com/v3/mapbox.geography-class/{z}/{x}/{y}.grid.json?callback={cb}');
		//var utfGrid = new L.UtfGrid('http://{s}.tiles.mapbox.com/v3/carmencampos.example/{z}/{x}/{y}.grid.json?callback={cb}');
		//var utfGrid = new L.UtfGrid('http://localhost:8000/api/grid/example/{z}/{x}/{y}.grid.json?callback={cb}');
		var utfGrid = new L.UtfGrid('http://localhost:8000/api/grid/geography-class/{z}/{x}/{y}.grid.json?callback={cb}');

grid = function (e){
	//alert('Bar');
	if (e.grid) {
		document.getElementById('more').innerHTML = 'and: ' + e.grid;
		document.getElementById('hover').innerHTML = 'hover: ' + e.data;
	}
	else
		document.getElementById('more').innerHTML = 'and: ' + "nothing else...";
}

		
		utfGrid.on('click', function (e) {
			if (e.data) {
				document.getElementById('click').innerHTML = 'click: ' + e.data.admin;
				//document.getElementById('click').innerHTML = 'click: ' + e.data.name;
			} else {
				document.getElementById('click').innerHTML = 'click: nothing';
			}
		}); 
		utfGrid.on('mouseover', function (e) {
			if (e.data) {
				document.getElementById('hover').innerHTML = 'hover: ' + e.data.admin;
				//document.getElementById('click').innerHTML = 'click: ' + e.data.name;
			} else {
				document.getElementById('hover').innerHTML = 'hover: nothing';
			}
			//console.log('mouseover: ' + e.data);
		});
		
		utfGrid.on('mouseout', function (e) {
			//console.log('mouseout: ' + e.data);
		});

		var map = L.map('map')
				.setView([47, 8], 7)
				.addLayer(cloudmade)
				.addLayer(utfGrid);

});
