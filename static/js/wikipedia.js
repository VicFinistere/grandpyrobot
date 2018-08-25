function wiki_api(user_input)
{
    //Debug
    console.debug("wiki_api "+user_input+" (wikipedia.js)");

    $.getJSON($SCRIPT_ROOT + '/wiki_api', {user_input: user_input },
        function(wiki_answer)
        {
            //Debug
            console.debug("Using wiki personnal API getting: "+user_input+" (wikipedia.js)");

            if(wiki_answer !== 'wiki failed')
            {
                //Debug
                console.debug("wiki succeed (wikipedia.js)");
                setTimeout(function ()
                {
                    scroll();
                    $('<p>', {class: 'robot_white_msg wiki_answer', text: "J'ai une anecdote !"}).appendTo('#text_area');
                    scroll();
                }, 1000);
                setTimeout(function ()
                {
                    $('#text_area').children('p.wiki_answer').last().hide();
                },2000)
                setTimeout(function ()
                {
                    $('#text_area').children('p.wait').last().remove();
                    $('<p>', {class: 'robot_white_msg', text: wiki_answer}).appendTo('#text_area');
                    scroll();
                },1800);
            }
            else
            {
                //Warn
                console.warn("wiki failed (wikipedia.js)");
                bot_answering(user_input);
            }

        });

}