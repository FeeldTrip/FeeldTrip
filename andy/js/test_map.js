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
    center: [ 
    {% if longitude %}
    {{ longitude }}
    {% else %}
    -118.4, 
    {% if latitude %}
    {{ latitude }} 
    {% else %}
    34.08
    {% endif %}],
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


  //this is the part you'll want to convert to a loop. 

  // function createCircles (XCoord, YCoord, Factor) {
  //   $each
  //   var madPoint = new Point( Xcoord , YCoord );
  
  //   var madGraphic = new Graphic(madPoint);
  //   madGraphic.setAttributes({"XCoord":XCoord,"YCoord":YCoord,"Sentiment":Sentiment, "Factor": Factor});
  //   graphicsLayer.add(madGraphic);
  // }

    // var point = new Point(-118,34);
  
    // var graphic = new Graphic(point);
    // graphic.setAttributes({"XCoord":118,"YCoord":34,"Sentiment":"Happy", "Factor": 6});
    
    // graphicsLayer.add(graphic);

  // require(["esri/map", "esri/geometry/Circle", "esri/geometry/Point"], function (Map, Circle, Point){

  // });
});

//city submit
$( "#citySubmit" ).submit(function( event ) {
	alert("city submitted!");
  // alert( "City happiness is" + {{ happiness }} + "Latitude:" + {{ latitude }} + "Longitude:" + {{ longitude }} );
  event.preventDefault();
});



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