function wiki_api(user_input, requested_area, user_checked_text)
{
    $.ajax
    ({
        url: "https://fr.wikipedia.org/w/api.php?action=opensearch&search="+ requested_area +"&format=json&callback=?",
        type: 'GET',
        contentType: "application/json; charset=utf-8",
        async: false,
        headers: { 'Api-User-Agent': 'grandpa_python_   robot/1.0' },
        dataType: "json",
        success: function (wiki_response, status)
        {
            // Answer with encyclopedia or by messaging from getting answer file
            output(user_input, requested_area, user_checked_text, wiki_response, status);
        },
        error: function ()
        {
            bot_answering(user_input, requested_area, user_checked_text);
        }
    });
}

function output(user_input, requested_area, user_checked_text, wiki_response, status)
{
    if (user_input.css('color') !== 'rgb(230, 230, 230)')
    {
        if(status === "success")
        {
            var wiki_string = JSON.stringify(wiki_response[2]);
            if(wiki_string.length > 20 )
            {
                var short_wiki_string = wiki_string.split(".",3);
                for (var i = 0; i < short_wiki_string.length; i++)
                {
                    if(short_wiki_string[i].length > 30 )
                    {
                        var sentence = short_wiki_string[i].replace(/[^a-zA-Z0-9áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ.]/g," ");
                        $('<p>', {class: 'robot_white_msg', text: sentence}).appendTo('#text_area');
                        var wiki_answered = true;
                        scroll();
                    }
                }
                user_input.css('color', 'rgb(230, 230, 230)');
            }
            if (user_input.css('color') !== 'rgb(230, 230, 230)' && wiki_answered !== true)
            {
                bot_answering(user_input, requested_area, user_checked_text);
            }
        }
        else
        {
            bot_answering(user_input, requested_area, user_checked_text);
        }
    }
}
