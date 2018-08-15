/* Event listener : Getting answer using button */
$(function() { $('#answer_button').on('click', function() { sending_text(); }); });

/* Event listener : Getting answer pressing enter */
$(function () { $(document).keypress(function (e) { if (e.which === 13){ sending_text(); }}); });

function sending_text()
{
    //Getting the input value
    var input_text = $("#input_text").val();

    //Getting the content in page
    var content = $("#answer").html();

    //If the input is filled
    if(input_text != "")
    {
        //We append the input text
        $('<p>', { class: 'user_blue_msg', text: input_text}).appendTo('#text_area');

        //We set the input text value to null
        $("#input_text").val("");
    }

    //If the input if empty
    else
    {
        //It has to be something in input
        var text = "Write something please !..."

        //If it's not already said
        if(content != text)
        {
            //Say it!
            $("#answer").html(text);
        }
    }
}

