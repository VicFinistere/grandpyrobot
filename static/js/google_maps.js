var map;

function initMap(lat, Lng)
{
    activatePlacesSearch();
    var mapCenter;

    if(lat === undefined || Lng === undefined)
    {
        if(navigator.geolocation)
        {
            navigator.geolocation.getCurrentPosition(function (position)
            {
                lat = Number(position.coords.latitude.toString());
                Lng = Number(position.coords.longitude.toString());
                mapCenter = new google.maps.LatLng(lat,Lng);
                create_map_objects(mapCenter);

            });
            if(lat === undefined || Lng === undefined)
            {
                mapCenter = new google.maps.LatLng(46.2276, 2.2137);
                create_map_objects(mapCenter);
            }
        }
        else
        {
            mapCenter = new google.maps.LatLng(46.2276, 2.2137);
            create_map_objects(mapCenter);
        }
    }
    else
    {
        mapCenter = new google.maps.LatLng(lat,Lng);
        create_map_objects(mapCenter);
    }
}

function activatePlacesSearch()
{
    var input = document.getElementById('input_text');
    var auto_complete;
    auto_complete = new google.maps.places.Autocomplete(input);
}

function create_map_objects(mapCenter)
{
    map = new google.maps.Map(document.getElementById('map'), {center: mapCenter, zoom: 15});
    var marker;
    marker = new google.maps.Marker({position: mapCenter,map: map});
    return map;
}

// function find_place(requested_area)
// {
//     $.get("https://maps.googleapis.com/maps/api/geocode/json?address=" + requested_area + "&key=AIzaSyDL3Y5p7GsKor0nJ5mVZscqsd9hejr145s",
//         function (responseMaps)
//         {
//             var data = responseMaps;
//             var exact_address = data["results"][0]["formatted_address"];
//             $('<p>', {class: 'robot_white_msg', text: exact_address}).appendTo('#text_area');
//             var lat = data["results"][0]["geometry"]["location"]["lat"];
//             var lng = data["results"][0]["geometry"]["location"]["lng"];
//             initMap(lat, lng);
//         });
// }

function maps_api(input_text)
{
    $.getJSON($SCRIPT_ROOT + '/google_api', {keywords:input_text},
        function(data)
       {
           if (data !== 'failed')
           {
               var lat = Number(data[0]);
               var lng = Number(data[1]);
               var address = data[2];
               if (address !== '')
               {
                   $('<p>', {class: 'robot_white_msg', text: "L'adresse que tu cherches est "+address+" !"}).appendTo('#text_area');
                   scroll();
               }
               initMap(lat, lng);
           }
       });
}