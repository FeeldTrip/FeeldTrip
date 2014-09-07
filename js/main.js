function CurrencyFormatted(amount) {
	var i = parseFloat(amount);
	if(isNaN(i)) { i = 0.00; }
	var minus = '';
	if(i < 0) { minus = '-'; }
	i = Math.abs(i);
	i = parseInt((i + .005) * 100);
	i = i / 100;
	s = new String(i);
	if(s.indexOf('.') < 0) { s += '.00'; }
	if(s.indexOf('.') == (s.length - 2)) { s += '0'; }
	s = minus + s;
	return s;
}


var access,
		city1, city2, city3, city4, city5,
		fare1, fare2, fare3, fare4, fare5,
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
    				fare1 = fares[0].LowestFare;
    				fare2 = fares[1].LowestFare;
    				fare3 = fares[2].LowestFare;
    				fare4 = fares[3].LowestFare;
    				fare5 = fares[4].LowestFare;
    				var fare1 = CurrencyFormatted(fare1)
    				var fare2 = CurrencyFormatted(fare1)
    				var fare3 = CurrencyFormatted(fare1)
    				var fare4 = CurrencyFormatted(fare1)
    				var fare5 = CurrencyFormatted(fare1)
    				$("#fare1").text(fare1);
    				$("#fare2").text(fare2);
    				$("#fare3").text(fare3);
    				$("#fare4").text(fare4);
    				$("#fare5").text(fare5);
        }
    });

  }
}
);



