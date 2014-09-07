
//function $_GET(q,s) {
//    s = s || window.location.search;
//    var re = new RegExp('&'+q+'=([^&]*)','i');
//    return (s=s.replace(/^\?/,'&').match(re)) ? s=s[1] : s='';
//}//

//var lat = $_GET('lat')
//var lon = $_GET('lon')
//var happy = $_GET('happy')

var scriptParam = document.getElementById('geohappiness');

var lat = scriptParam.getAttribute('lat');
var lon = scriptParam.getAttribute('lon');
var happy = scriptParam.getAttribute('happy');

lat = parseFloat(lat);
lon = parseFloat(lon);
happy = parseFloat(happy);

var map;
require([
  "esri/map", "esri/geometry/Extent", "esri/geometry/Point", "esri/graphic",
  "esri/layers/ArcGISTiledMapServiceLayer", "esri/layers/FeatureLayer", "esri/layers/GraphicsLayer",
  "esri/InfoTemplate", "esri/renderers/DotDensityRenderer", "esri/renderers/UniqueValueRenderer", "esri/symbols/SimpleMarkerSymbol", "esri/symbols/SimpleLineSymbol",
  "esri/renderers/ScaleDependentRenderer", "esri/dijit/Legend",
  "esri/Color", "dojo/_base/array", "dojo/dom", "dojo/domReady!"
], function(
  Map, Extent, Point, Graphic,
  ArcGISTiledMapServiceLayer, FeatureLayer, GraphicsLayer,
  InfoTemplate, DotDensityRenderer,UniqueValueRenderer,SimpleMarkerSymbol, SimpleLineSymbol,
  ScaleDependentRenderer, Legend, 
  Color, array, dom
) {
  map = new Map("map", {
   // extent: new Extent({"xmin":-2460944,"ymin":-1389910,"xmax":2297115,"ymax":1643787,"spatialReference":{"wkid":102100}}),
    basemap: "gray",
    center: [lon, lat],
    zoom: 5,
   // maxScale: 5000000,
   // minScale: 20000000
  });
  

    var graphicsLayer = new GraphicsLayer();

    var defaultSymbol = new SimpleMarkerSymbol().setColor(new Color("green"));

    defaultSymbol.outline.setStyle(SimpleLineSymbol.STYLE_NULL);

    //Define a renderer that sets the symbology based on the sentiment
    //This renderer expects that each point has an attribute associted with it called
    //sentimenet
    var renderer = new UniqueValueRenderer(defaultSymbol, "Sentiment");

    //Looks at the sentiment value and if "happy" draw red if mad draw green
    renderer.addValue("Happy", new SimpleMarkerSymbol().setColor("green"));
    renderer.addValue("Mad", new SimpleMarkerSymbol().setColor("red"));


    //Define the size of the symbols based on the values in the factor attribute
  renderer.setProportionalSymbolInfo({
    field: "Factor",
    minSize: 6,
    maxSize: 25,
    minDataValue: 5,
    maxDataValue: 50,
    valueUnit: "unknown"
  });

  //add a layer to the map that holds all the graphics 
  map.addLayer(graphicsLayer);

  //apply the symbols to the layer 
  graphicsLayer.setRenderer(renderer);

      function createPoint(thePoint){
            var senti;
            if (thePoint["sentimentIndex"] > 0.25) {
                senti = "Happy";
            } else {
                senti = "Mad";
            }
            var nuPoint = new Point(thePoint["x"], thePoint["y"]);
            var nuGraphic = new Graphic(nuPoint);
            nuGraphic.setAttributes({"XCoord": thePoint["x"], "YCoord": thePoint["y"], "Sentiment": senti, "Factor": thePoint["factor"]});
            graphicsLayer.add(nuGraphic);
      }        

        
        var sampleGeoPoint = {
            sentimentIndex: happy,
            factor: 50,
            x: lon,
            y: lat
        };


        createPoint(sampleGeoPoint);

//city submit
$( "#citySubmit" ).submit(function( event ) {
  alert("city submitted!");
  // alert( "City happiness is" + {{ happiness }} + "Latitude:" + {{ latitude }} + "Longitude:" + {{ longitude }} );
  event.preventDefault();
});
});






//  $( "#citySubmit" ).submit(function( event ) {
//    alert("city submitted!");
//    // alert( "City happiness is" + {{ happiness }} + "Latitude:" + {{ latitude }} + "Longitude:" + {{ longitude }} );
//    event.preventDefault();
//  }, 
//  function() {
//    $.getJSON('/', {
//      var lat: $('input[name = "lat"]').val(),
//      var lon: $('input[name = "lon"]').val(),
//      var happy: $('input[name = "happy"]').val()
//    },
//    function(data) {
//      $("#result").text(data.result);
//    });
//    return false;   
//  });




 // // take sentiment data (sentNumber)
 // // take geolocation data (long, lat)
 
 // @@ -10,12 +95,18 @@
 // 	add circle
 // 	 circleCSS (size, color)
 
// $( "#greenCircle" ).hover(

// function createHoverData(city) {
// 	console.log("creating hover data")
// 	.hover(
//  	function() {
//    	$( ".data" ).fadeIn( 100 );
//   }, function() {
//   $( ".data" ).fadeOut( 100 );
// });
// 	  }, function() {
// 	  $( ".data" ).fadeOut( 100 );
// 	});
// }

 
 // var sentNumber = X