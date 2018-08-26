var map;

function maps_api(input_text)
{
    //Debug
    console.debug("google_api (google_maps.js)");

    $.getJSON($SCRIPT_ROOT + '/google_api', {input_text: input_text},
        function (data)
        {
            //Debug
            console.debug("Using google maps personnal API (google_maps.js)");

            if (data !== 'failed')
            {
                //Debug
                console.debug("google maps succeed (google_maps.js)");
                maps_success_answer(data);
            }
            else
            {
                //Warn
                console.warn("google maps failed (google_maps.js)");
                get_place_auto_complete(input_text);
            }
        });
}

function initMap(lat, Lng)
{
    //Debug
    console.debug("Init Map"+lat+" "+Lng+" (google_maps.js)");

    activatePlacesSearch();
    var mapCenter;

    if (lat === undefined || Lng === undefined)
    {
        //Debug
        console.debug("setting default lat and Lng(google_maps.js)");
        mapCenter = new google.maps.LatLng(46.2276, 2.2137);
        create_map_objects(mapCenter, false);
    }
    else
    {
        //Debug
        console.debug("Using requested Lat and Lng (google_maps.js)");
        mapCenter = new google.maps.LatLng(lat, Lng);
        create_map_objects(mapCenter, true);
    }
}

function activatePlacesSearch()
{
    //Debug
    console.debug("Autocomplete 'activatePlacesSearch' (google_maps.js)");
    var input = document.getElementById('input_text');
    var auto_complete = new google.maps.places.Autocomplete(input);
}

function create_map_objects(mapCenter, founded_place=true)
{
    var zoom;

    //Debug
    console.debug("create_map_objects "+mapCenter+" : map and marker (google_maps.js)");
    if(founded_place === true)
    {
        zoom = 15
    }
    else
    {
        zoom = 6
    }
    map = new google.maps.Map(document.getElementById('map'), {center: mapCenter, zoom: zoom});
    var marker;
    marker = new google.maps.Marker({position: mapCenter, map: map});
    return map;
}

function get_place_auto_complete(input_text)
{
    //Debug
    console.debug("get_place_auto_complete "+input_text+" (google_maps.js)");
    $.getJSON($SCRIPT_ROOT + '/query_place', {keywords: input_text},
        function (data) {
            place_auto_complete(data);
        });
}

function place_auto_complete(data)
{
    //Debug
    console.debug("place_auto_complete "+data+" (google_maps.js)");
    if (data !== undefined)
    {
        //Debug
        console.debug("place_auto_complete : Query place worked ! (google_maps.js) ");
        remake_maps_call(data, 1);
    }
    else
    {
        //Warn
        console.warn("place_auto_complete : Query place failed ! (google_maps.js) ");
        sending_maps_failed_text();
    }
}

function remake_maps_call(data)
{
    //Debug
    console.debug("One recall for maps_api");

    //Debug
    console.debug("google_api (google_maps.js)");

    $.getJSON($SCRIPT_ROOT + '/google_api', {input_text: data},
        function (data)
        {
            //Debug
            console.debug("Using google maps personnal API (google_maps.js)");

            if (data !== 'failed' )
            {
                //Debug
                console.debug("google maps succeed (google_maps.js)");
                maps_success_answer(data);
            }
            else
            {
                sending_maps_failed_text();
            }
        });

}

function maps_success_answer(data)
{
    //Debug
    console.debug("maps_success_answer (google_maps.js)");
    var name = data[0];
    var lat = Number(data[1]);
    var lng = Number(data[2]);
    var address = data[3];

    console.debug("lat");
    console.debug(lat);
    console.debug('lng');
    console.debug(lng);
    console.debug('adress');
    console.debug(address);

    if (address !== '')
    {
        //Debug
        console.debug("maps_success_answer : Founded address (google_maps.js)");
        console.debug(address);

        sending_address_text(name, address);
    }
    initMap(lat, lng);
}

function sending_address_text(name, address)
{

    clear_text();
    $('<p>', {class: 'maps robot_white_msg', text:"Je connais ce lieu ! Je te montre sur la carte !"}).appendTo('#text_area');
    $('<p>', {text: name + " : " + address}).appendTo('#text_place_area');

    //Debug
    console.debug("sending adress text"+name+" "+address+" (google_maps.js)");
}

function sending_maps_failed_text()
{
    clear_text();

    var maps_failed_text = "( Papy a oublié ce lieu... Essayez autre chose... )";
    $('<p>', {text: maps_failed_text}).appendTo('#text_place_area');

    //Warn
    console.debug("sending_maps_failed_text (google_maps.js)");
}

