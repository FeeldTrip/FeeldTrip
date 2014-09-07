        function createPoint(thePoint){
            var senti;
            if (thePoint["sentimentIndex"] > 5) {
                senti = "Happy";
            } else {
                senti = "Mad";
            }
            var nuPoint = new Point(thePoint["x"], thePoint["y"]);
            var nuGraphic = new Graphic(nuPoint);
            nuGraphic.setAttributes({"XCoord": -thePoint["x"], "YCoord": thePoint["y"], "Sentiment": senti, "Factor": thePoint["factor"]});
            graphicsLayer.add(nuGraphic);
        }
        
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
          basemap: "gray",
          center: [-118.4, 34.08],
          zoom: 5
        });
        
 
          var graphicsLayer = new GraphicsLayer();
        

          var defaultSymbol = new SimpleMarkerSymbol().setColor(new Color("green"));
  
          defaultSymbol.outline.setStyle(SimpleLineSymbol.STYLE_NULL);

          //Define a renderer that sets the symbology based on the sentiment
          //This renderer expects that each point has an attribute associted with it called
          //sentiment
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
        

        
        var sampleGeoPoint = {
            sentimentIndex: 1,
            factor: 20,
            x: -110,
            y: 40
        };
        
        var madPoint = new Point(-115,34);
      
        var madGraphic = new Graphic(madPoint);
        madGraphic.setAttributes({"XCoord":114,"YCoord":43,"Sentiment":"Mad", "Factor": 20});
        graphicsLayer.add(madGraphic);


        var point = new Point(-118,34);
      
        var graphic = new Graphic(point);
        graphic.setAttributes({"XCoord":118,"YCoord":34,"Sentiment":"Happy", "Factor": 6});
        
        graphicsLayer.add(graphic);

      createPoint(sampleGeoPoint);

      });