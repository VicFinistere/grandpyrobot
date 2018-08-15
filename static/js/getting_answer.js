function answer()
{
    var user_input = $('#text_area').children('p.user_blue_msg').last();
    var user_text = user_input.html();
    var user_checked_text = user_text.toLowerCase();
    switch (true)
    {
        case(user_checked_text.indexOf("bonjour") != -1):
            if (user_input.css('color') != 'rgb(128, 128, 128)')
            {
                $('<p>', {class: 'robot_white_msg', text: "Bonjour !"}).appendTo('#text_area');
                user_input.css('color', 'rgb(128,128,128)');
            }
            break;
        case(user_checked_text.indexOf("ok") != -1):
            if (user_input.css('color') != 'rgb(128, 128, 128)')
            {
                $('<p>', {class: 'fas fa-thumbs-up fa-inverse robot_white_msg'}).appendTo('#text_area');
                user_input.css('color', 'rgb(128,128,128)');
            }
            break;
        default:
            if (user_input.css('color') != 'rgb(128, 128, 128)')
            {
                $('<p>', {class: 'robot_white_msg', text: "..."}).appendTo('#text_area');
                user_input.css('color', 'rgb(128,128,128)');
                break;
            }
    }
}

setInterval(function(){ answer();  }, 5000);
//setInterval(function(){ answer();  }, 1000);