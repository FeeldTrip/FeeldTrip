
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


  var madPoint = new Point(lat,lon);
      
        var madGraphic = new Graphic(madPoint);
        madGraphic.setAttributes({"XCoord":lat,"YCoord":lon,"Sentiment":"Happy", "Factor": 20});
        graphicsLayer.add(madGraphic);


        var point = new Point(-118,34);
      
        var graphic = new Graphic(point);
        graphic.setAttributes({"XCoord":118,"YCoord":34,"Sentiment":"Happy", "Factor": 6});
        
        graphicsLayer.add(graphic);

        var NYpoint = new Point(-74,41);
      
        var graphic = new Graphic(NYpoint);
        graphic.setAttributes({"XCoord":-74,"YCoord":41,"Sentiment":"Happy", "Factor": 18});
        
        graphicsLayer.add(graphic);

});

$("#map_layers > circle").on("click", function() {
	alert("clicked!");
});


//sabre API stuff
var access,
    fares;
$.ajax(
    {
    type: 'POST',
    url: 'https://api.test.sabre.com/v1/auth/token',
    beforeSend : function( xhr ) {
    xhr.setRequestHeader( "Authorization", "Basic " + "VmpFNk5UWTFjbTEwYW5GdmRIZHhaV0V3WnpwRVJWWkRSVTVVUlZJNlJWaFU6ZERobFNUWnVVa0k9" );
    },
    data: { grant_type:'client_credentials' },
    success: function( response ) {
    access = response.access_token;
    $.ajax({
        type: 'GET',
        url: 'https://api.test.sabre.com/v1/shop/flights/fares?origin=sfo&lengthofstay=6&theme=ROMANTIC&pointofsalecountry=US',
        beforeSend : function( xhr ) {
            xhr.setRequestHeader( "Authorization", "BEARER " + access );
        },
        success: function(response) {
            fares = response.FareInfo;
            console.log(fares.length);
        }
    });
  var city1 = fares[0];
  }
}
);


