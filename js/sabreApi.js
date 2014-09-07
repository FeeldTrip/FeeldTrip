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
            url: 'https://api.test.sabre.com/v1/shop/flights/fares?origin=sfo&lengthofstay=6&theme=BEACH&pointofsalecountry=US',
            beforeSend : function( xhr ) {
                xhr.setRequestHeader( "Authorization", "BEARER " + access );
            },
            success: function(response) {
                fares = response.FareInfo;
                console.log(fares.length);
            }
        });
        }
    }
    );