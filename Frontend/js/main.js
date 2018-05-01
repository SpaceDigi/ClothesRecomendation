var map;
var markers = [];
function initMap() {
    var geocoder = new google.maps.Geocoder;
    var infowindow = new google.maps.InfoWindow;
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 50.464379, lng: 30.519131},
        zoom: 6
    });

    google.maps.event.addListener(map, 'click', function(event) {
        if(markers.length > 0){
            clearMarkers()
        }
        placeMarker(event.latLng);
        geocodeLatLng(geocoder, map, infowindow, event.latLng);
        queries(event.latLng.lat(),event.latLng.lng())
    });
    //creates marker on the map
    function geocodeLatLng(geocoder, map, infowindow, location) {
        geocoder.geocode({'location': location}, function(results, status) {
            if (status === 'OK') {
                if (results[1]) {
                    map.setZoom(11);
                    $("#city").text(results[1].formatted_address);
                } else {
                    window.alert('No results found');
                }
            } else {
                window.alert('Geocoder failed due to: ' + status);
            }
        });
    }
    function placeMarker(location) {
        var marker = new google.maps.Marker({
            position: location,
            map: map,
            animation: google.maps.Animation.DROP,
            draggable: true
        });
        markers.push(marker);
    }
    // Sets the map on all markers in the array.
    function setMapOnAll(map) {
        for (var i = 0; i < markers.length; i++) {
            markers[i].setMap(map);
        }
    }
    // Removes the markers from the map, but keeps them in the array.
    function clearMarkers() {
        setMapOnAll(null);
    }
    // Takes weather form setted location
    function queries(latitude,longitude) {
        const key = "335a95b9bed307f7e4555df2e0087ae2";
        const currently = 'currently';
        //currently
        const icon = 'icon';
        const summary = 'summary';
        const tempFarengeit = 'temperature';
        const windSpeed = 'windSpeed';
        const humidity = "humidity";
        const precipType = 'precipType';
        //In root
        const timeZone = "timezone";

        $.post("http://localhost:3000/sss",{lat:latitude,lng:longitude}, function(forecast) {
            console.log(forecast);
            const temp = forecast[currently][tempFarengeit];
            const wind = forecast[currently][windSpeed];
            const userIcon = forecast[currently][icon];
            const userHumidity = forecast[currently][humidity];
            const textSummary = forecast[currently][summary];
            const location = forecast[timeZone]
            $('.weather').text("Summary: "+textSummary);
            $('#temperature').text(((temp-32)*5/9).toFixed(1)+"°C")
            weatherPicture(userIcon);
            clothesRecommendation(userIcon, temp);
        });
    }
    // Function corresponding to weather to draw particular picture
    function weatherPicture(weather){
        console.log(weather)
        switch (weather){
            case 'сlear-day' :
                console.log(weather)
                $('#weather').attr("src","images/weather/sun.png")
                break;
            case 'clear-night' :
                console.log(weather)
                $('#weather').attr("src","images/weather/sun.png")
                break;
            case 'rain':
                console.log(weather)//+
                $('#weather').attr("src", 'images/weather/rain.png');
                break;
            case 'snow' :   //+
                console.log(weather)
                $('#weather').attr("src",'images/weather/snow.png');
                break;
            case 'sleet':
                console.log(weather)//+
                $('#weather').attr("src", 'images/weather/fog.png');
                break;
            case 'fog':
                console.log(weather)//+
                $('#weather').attr("src", 'images/weather/fog.png');
                break;
            case 'wind':
                console.log(weather)//+
                $('#weather').attr("src", 'images/weather/fog.png');
                break;
            case 'cloudy':
                console.log(weather)//+
                $('#weather').attr("src",'images/weather/cloudy.png');
                break;
            case 'partly-cloudy-day':
                console.log(weather)//+
                $('#weather').attr("src",'images/weather/uncertain.png');
                break;
            case 'partly-cloudy-night':
                console.log(weather)//+
                $('#weather').attr("src",'images/weather/uncertain.png');
                break;
        }
    }
    // Function to recommend clothes
    function clothesRecommendation(weather) {
        switch(weather){
            case 'snow' :
                $('#man-shoes').attr("src",'images/clothes/man-boots.png');
                $('#man-top').attr("src",'images/clothes/man-jacket-winter.png');
                $('#man-accessory').attr("src", 'images/clothes/man-gloves.png');
                $('#man-trousers').attr("src",'images/clothes/man-winter-hat.png');

                $('#woman-shoes').attr("src", 'images/clothes/woman-boots.png');
                $('#woman-top').attr("src",'images/clothes/woman-jacket-winter.png');
                $('#woman-accessory').attr("src", 'images/clothes/woman-gloves.png');
                $('#woman-trousers').attr("src",'images/clothes/woman-winter-hat.png');
                break;
            case  'sleet':
                $('#man-shoes').attr("src",'images/clothes/man-boots.png');
                $('#man-top').attr("src",'images/clothes/man-jacket-winter.png');
                $('#man-accessory').attr("src",'images/clothes/man-gloves.png');
                $('#man-trousers').attr("src",'images/clothes/man-winter-hat.png');

                $('#woman-shoes').attr("src", 'images/clothes/woman-boots.png');
                $('#woman-top').attr("src",'images/clothes/woman-jacket-winter.png');
                $('#woman-accessory').attr("src",'images/clothes/woman-gloves.png');
                $('#woman-trousers').attr("src",'images/clothes/woman-winter-hat.png');
                break;
            case  'fog' :
                $('#man-shoes').attr("src", 'images/clothes/man-shoe.png');
                $('#man-top').attr("src",'images/clothes/man-hoodie.png');
                $('#man-accessory').attr("src", 'images/clothes/cap.png');
                $('#man-trousers').attr("src",'images/clothes/jeans.png');

                $('#woman-shoes').attr("src", 'images/clothes/high-heels.png');
                $('#woman-top').attr("src",'images/clothes/woman-hoodie.png');
                $('#woman-accessory').attr("src",'images/clothes/coat.png');
                $('#woman-trousers').attr("src",'images/clothes/jeans.png');
                break;
            case 'wind' :
                $('#man-shoes').attr("src", 'images/clothes/man-shoe.png');
                $('#man-top').attr("src",'images/clothes/man-hoodie.png');
                $('#man-accessory').attr("src", 'images/clothes/cap.png');
                $('#man-trousers').attr("src",'images/clothes/jeans.png');

                $('#woman-shoes').attr("src",'images/clothes/high-heels.png');
                $('#woman-top').attr("src",'images/clothes/woman-hoodie.png');
                $('#woman-accessory').attr("src", 'images/clothes/coat.png');
                $('#woman-trousers').attr("src",'images/clothes/jeans.png');
                break;
            case 'rain' :
                $('#man-shoes').attr("src",'images/clothes/man-shoe.png');
                $('#man-top').attr("src",'images/clothes/man-hoodie.png');
                $('#man-accessory').attr("src", 'images/clothes/cap.png');
                $('#man-trousers').attr("src",'images/clothes/jeans.png');

                $('#woman-shoes').attr("src",'images/clothes/high-heels.png');
                $('#woman-top').attr("src",'images/clothes/woman-hoodie.png');
                $('#woman-accessory').attr("src", 'images/clothes/coat.png');
                $('#woman-trousers').attr("src",'images/clothes/jeans.png');
                break;
            case 'cloudy' :
                $('#man-shoes').attr("src",'images/clothes/man-shoe.png');
                $('#man-top').attr("src",'images/clothes/man-hoodie.png');
                $('#man-accessory').attr("src", 'images/clothes/cap.png');
                $('#man-trousers').attr("src",'images/clothes/jeans.png');

                $('#woman-shoes').attr("src",'images/clothes/high-heels.png');
                $('#woman-top').attr("src",'images/clothes/woman-hoodie.png');
                $('#woman-accessory').attr("src",'images/clothes/coat.png');
                $('#woman-trousers').attr("src",'images/clothes/jeans.png');
                break;
            case 'partly-cloudy-day':
                $('#man-shoes').attr("src",'images/clothes/man-shoe.png');
                $('#man-top').attr("src",'images/clothes/man-hoodie.png');
                $('#man-accessory').attr("src",'images/clothes/cap.png');
                $('#man-trousers').attr("src",'images/clothes/jeans.png');

                $('#woman-shoes').attr("src",'images/clothes/high-heels.png');
                $('#woman-top').attr("src",'images/clothes/woman-hoodie.png');
                $('#woman-accessory').attr("src",'images/clothes/coat.png');
                $('#woman-trousers').attr("src",'images/clothes/jeans.png');
                break;
                case 'partly-cloudy-night':
                $('#man-shoes').attr("src",'images/clothes/man-shoe.png');
                $('#man-top').attr("src",'images/clothes/man-hoodie.png');
                $('#man-accessory').attr("src",'images/clothes/cap.png');
                $('#man-trousers').attr("src",'images/clothes/jeans.png');

                $('#woman-shoes').attr("src",'images/clothes/high-heels.png');
                $('#woman-top').attr("src",'images/clothes/woman-hoodie.png');
                $('#woman-accessory').attr("src",'images/clothes/coat.png');
                $('#woman-trousers').attr("src",'images/clothes/jeans.png');
                break;
            case 'clear-day':
                $('#man-shoes').attr("src",'images/clothes/sneakers.png');
                $('#man-top').attr("src",'images/clothes/shirt.png');
                $('#man-accessory').attr("src",'images/clothes/cap.png');
                $('#man-trousers').attr("src",'images/clothes/shorts.png');

                $('#woman-shoes').attr("src",'images/clothes/high-heels.png');
                $('#woman-top').attr("src",'images/clothes/dress.png');
                $('#woman-accessory').attr("src", 'images/clothes/sunglasses.png');
                $('#woman-trousers').attr("src",'images/clothes/shawl.png');
                break;
            case 'clear-night':
                $('#man-shoes').attr("src",'images/clothes/sneakers.png');
                $('#man-top').attr("src",'images/clothes/shirt.png');
                $('#man-accessory').attr("src",'images/clothes/cap.png');
                $('#man-trousers').attr("src",'images/clothes/shorts.png');

                $('#woman-shoes').attr("src",'images/clothes/high-heels.png');
                $('#woman-top').attr("src",'images/clothes/dress.png');
                $('#woman-accessory').attr("src", 'images/clothes/sunglasses.png');
                $('#woman-trousers').attr("src",'images/clothes/shawl.png');
                break;
        }
    }
}