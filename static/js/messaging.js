/* Event listener : Getting answer using button */
$(function() { $('#answer_button').on('click', function() { sending_text(); }); });

/* Event listener : Getting answer pressing enter */
$(function () { $(document).keypress(function (e) { if (e.which === 13){ sending_text(); }}); });

/* Robot Introduction */
$(function(){ introduction();});

function scroll()
{
    //Debug
    console.debug("Scrolling down the conversation (messaging.js)");

    var text_area = document.getElementById('text_area');
    text_area.scrollTop = text_area.scrollHeight;
}

function introduction()
{
    //Debug
    console.debug("Message introduction (messaging.js)");

    $('<p>', {class: 'robot_white_msg', text: "Bonjour ! Je suis grandpy !"}).appendTo('#text_area');
    $('<p>', {class: 'robot_white_msg', text: "Ecris le nom d'un lieu et je t'en parlerai !"}).appendTo('#text_area');

    scroll();
}

function clear_text()
{
    //Debug
    console.debug("clear_text (messaging.js)");

    if ($("#text_error").not(':empty'))
    {
        //Debug
        console.debug("Text_error is cleared (messaging.js)");
        $("#text_error").empty();
    }

    if ($("#text_place_area").not(':empty'))
    {
        //Debug
        console.debug("Text_place is cleared (messaging.js)");
        $("#text_place_area").empty();
    }
}

function sending_text()
{
    //Debug
    console.debug("sending_text (messaging.js)");

    clear_text();

    //Getting the input value
    var input_text = $("#input_text").val();

    //Getting the content in page
    var content = $("#answer").html();

    //If the input is filled
    if(input_text !== "")
    {
        //We append the input text
        $('<p>', { class: 'user_blue_msg', text: input_text}).appendTo('#text_area');
        scroll();
        asking_robot();
    }

    //If the input if empty
    else
    {
        //Warn
        console.warn("No message in input text ! (messaging.js)");

        //It has to be something in input
        var text = "Posez une question à Papy Robot!...";

        //If it's not already said
        if(content !== text)
        {
            //Debug
            console.debug("Giving empty input text error(messaging.js)");

            //Say it!
            $("#text_error").html(text);
        }
    }
}

function asking_robot()
{
    $('<p>', {class: 'robot_white_msg wait fas fa-spinner faa-spin animated'}).appendTo('#text_area');
    scroll();
    setTimeout(function ()
    {
        $('#text_area').children('p.wait').last().hide();
        answer();
        $('#text_area').children('p.wait').last().remove();
    },500);

}

function answer()
{
    //Debug
    console.debug("answer (messaging.js))");

    var user_input = $('#text_area').children('p.user_blue_msg').last();
    var user_text = user_input.html();
    var user_checked_text = user_text.toLowerCase();

    // Google Maps
    maps_api(user_checked_text);

    //Calling api
    wiki_api(user_checked_text);


    //Input text value to null
    $("#input_text").val("");

}

