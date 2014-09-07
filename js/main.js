var access,
		city1, city2, city3, city4, city5,
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
    				city1 = fares[0].DestinationLocation;
    				city2 = fares[1].DestinationLocation;
    				city3 = fares[2].DestinationLocation;
    				city4 = fares[3].DestinationLocation;
    				city5 = fares[4].DestinationLocation;
    				$("#city1").text(city1);
    				$("#city2").text(city2);
    				$("#city3").text(city3);
    				$("#city4").text(city4);
    				$("#city5").text(city5);
        }
    });

  }
}
);



