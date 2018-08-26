function wiki_api(user_input)
{
    //Debug
    console.debug("wiki_api "+user_input+" (wikipedia.js)");

    $.getJSON($SCRIPT_ROOT + '/wiki_api', {user_input: user_input },
        function(wiki_answer)
        {
            //Debug
            console.debug("Using wiki personnal API getting: "+user_input+" (wikipedia.js)");

            if(wiki_answer !== 'failed')
            {
                //Debug
                console.debug("wiki succeed (wikipedia.js)");
                setTimeout(function ()
                {
                    scroll();
                    $('<p>', {class: 'tmp robot_white_msg wiki_answer', text: "J'ai une anecdote !"}).appendTo('#text_area');
                    scroll();
                }, 1000);

                setTimeout(function () {$('p.tmp').hide();},2000);

                setTimeout(function ()
                {
                    scroll();
                    $('p:hidden').remove();
                    $('<p>', {class: 'robot_white_msg', text: wiki_answer}).appendTo('#text_area');
                    setTimeout(function ()
                    {
                        $('p.maps').hide();
                        scroll();
                    },3000);
                },1800);
            }
            else
            {
                //Warn
                console.debug("wiki failed (wikipedia.js)");
                bot_answering(user_input);
            }

        });

}