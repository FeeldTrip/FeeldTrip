
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
    center: [-118.4, 34.08],
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


  var madPoint = new Point(-41,74);
      
        var madGraphic = new Graphic(madPoint);
        madGraphic.setAttributes({"XCoord":41,"YCoord":74,"Sentiment":"Happy", "Factor": 16});
        graphicsLayer.add(madGraphic);


        var pointLA = new Point(-118,34);
      
        var graphic = new Graphic(pointLA);
        graphic.setAttributes({"XCoord":-118,"YCoord":34,"Sentiment":"Happy", "Factor": 20});
        
        graphicsLayer.add(graphic);

        var pointNY = new Point(-74,41);
      
        var graphic = new Graphic(pointNY);
        graphic.setAttributes({"XCoord":-41,"YCoord":74,"Sentiment":"Happy", "Factor": 18});
        
        graphicsLayer.add(graphic);

 // function createPoint(thePoint){
 //       var senti;
 //        if (thePoint["sentimentIndex"] > 5) {
 //            senti = "Happy";
 //        } else {
 //            senti = "Mad";
 //        }
 //        var nuPoint = new Point(thePoint["x"], thePoint["y"]);
 //        var nuGraphic = new Graphic(nuPoint);
 //        nuGraphic.setAttributes({"XCoord": -thePoint["x"], "YCoord": thePoint["y"], "Sentiment": senti, "Factor": thePoint["factor"]});
 //        graphicsLayer.add(nuGraphic);
 //    		}    
 //  createPoint(sampleGeoPoint);{
	// 	var sampleGeoPoint = {
 //     		sentimentIndex: 2,
 //    		factor: 20,
 //    		x: 120,
 //    		y: 46
	// 		};
	// 	}   
});



//city submit
// $( "#citySubmit" ).submit(function( event ) {
// 	console.log("city submitted!");
// 	$(".hiddenCon").show();
// 	event.preventDefault();
// 	$('#citySubmit').trigger("reset");
//   // alert( "City happiness is" + {{ happiness }} + "Latitude:" + {{ latitude }} + "Longitude:" + {{ longitude }} );
  
// });

// $(cirlcle).hover(
// 	function() {
//    	$( ".data" ).fadeIn( 100 );
//   }, function() {
//   $( ".data" ).fadeOut( 100 );
// });
// 	  }, function() {
// 	  $( ".data" ).fadeOut( 100 );
// 	});

// $(function() { $( "#citySubmit" ).submit(function( event ) { 
// 	alert("city submitted yo!"); 
// 	// alert( "City happiness is" + {{ happiness }} + "Latitude:" + {{ latitude }} + "Longitude:" + {{ longitude }} ); 
// 	event.preventDefault(); 
// 		}, function() { 
// 		$.getJSON('/feeld', { 
// 			lat: $('input[name = "lat"]').val(), 
// 			lon: $('input[name = "lon"]').val(), 
// 			happy: $('input[name = "happy"]').val() 
// 		});
// 	}); 
// });

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


