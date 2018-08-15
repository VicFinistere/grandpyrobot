// Initialize and add the map
function initMap() {
    // The location of Uluru
    var uluru = {lat: -25.344, lng: 131.036};
    // The map, centered at Uluru
    var map = new google.maps.Map(
        document.getElementById('map'), {zoom: 4, center: uluru});
    // The marker, positioned at Uluru
    var marker = new google.maps.Marker({position: uluru, map: map});
}

// var map;
//
// function initialize() {
//   // Create a map centered in Pyrmont, Sydney (Australia).
//   map = new google.maps.Map(document.getElementById('map'), {
//     center: {lat: -33.8666, lng: 151.1958},
//     zoom: 15
//   });
//
//   // Search for Google's office in Australia.
//   var request = {
//     location: map.getCenter(),
//     radius: '500',
//     query: 'Google Sydney'
//   };
//
//   var service = new google.maps.places.PlacesService(map);
//   service.textSearch(request, callback);
// }
//
// // Checks that the PlacesServiceStatus is OK, and adds a marker
// // using the place ID and location from the PlacesService.
// function callback(results, status) {
//   if (status == google.maps.places.PlacesServiceStatus.OK) {
//     var marker = new google.maps.Marker({
//       map: map,
//       place: {
//         placeId: results[0].place_id,
//         location: results[0].geometry.location
//       }
//     });
//   }
// }
//
// google.maps.event.addDomListener(window, 'load', initialize);

//function initMap() {
//        var map = new google.maps.Map(document.getElementById('map'), {
//          zoom: 8,
//          center: {lat: -34.397, lng: 150.644}
//        });
//        var geocoder = new google.maps.Geocoder();
//
//        document.getElementById('submit').addEventListener('click', function() {
//          geocodeAddress(geocoder, map);
//        });
//      }
//
//      function geocodeAddress(geocoder, resultsMap) {
//        var address = document.getElementById('address').value;
//        geocoder.geocode({'address': address}, function(results, status) {
//          if (status === 'OK') {
//            resultsMap.setCenter(results[0].geometry.location);
//            var marker = new google.maps.Marker({
//              map: resultsMap,
//              position: results[0].geometry.location
//            });
//          } else {
//            alert('Geocode was not successful for the following reason: ' + status);
//          }
//        });
//      }

//function loadMap() {
//   var mapOptions = {
//      center:new google.maps.LatLng(17.240498, 82.287598),
//      zoom:9,
//      mapTypeId:google.maps.MapTypeId.ROADMAP
//   };
//}

//function initMap()
//{
//    var myLatLng = {lat: -25.363, lng: 131.044};
//
//    // Create a map object and specify the DOM element for display.
//    var map = new google.maps.Map(document.getElementById('map'),
//    {
//      center: myLatLng,//      zoom: 4
//    });
//
//    // Create a marker and set its position.
//    var marker = new google.maps.Marker({
//      map: map,
//      position: myLatLng,
//      title: 'Hello World!'
//    });
//}