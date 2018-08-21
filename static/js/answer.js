function answer()
{
    var user_input = $('#text_area').children('p.user_blue_msg').last();
    var user_text = user_input.html();
    var user_checked_text = user_text.toLowerCase();

    setTimeout(function () {maps_api(user_checked_text);}, 1000);
    setTimeout(function () {wiki_api(user_input, user_text, user_checked_text);}, 1000);

    //We set the input text value to null
    $("#input_text").val("");
}
