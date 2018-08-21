$(function(){ introduction();});

function introduction()
{
    $('<p>', {class: 'robot_white_msg', text: "Bonjour ! Je suis grandpy !"}).appendTo('#text_area');
    $('<p>', {class: 'robot_white_msg', text: "Ecris le nom d'un lieu et je t'en parlerai !"}).appendTo('#text_area');
    scroll();
}





