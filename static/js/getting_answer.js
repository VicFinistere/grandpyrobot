//$(function () {
//    $('#answer_button').on('click', function () {
//        var input_text = $("#input_text").val();
////        alert(input_text);
//        $("#answer").append(input_text);
//        });
//    });
//
//$(function ()
//{
//    if(characterCode == 13)
//    {
//        var key = e.which;
//        alert("Pushing enter")
//        var input_text = $("#input_text").val();
//        if(input_text != "")
//        {
//            $("#answer").append(input_text);
//        }
//     }
//});


//When pressing a key
$(document).keypress(function (e) {

    //If the key is enter
    if (e.which == 13) {

        //Getting the input value
        var input_text = $("#input_text").val();

        //Getting the content in page
        var content = $("#answer").html();

        //If the input is filled
        if(input_text != "")
        {
            //We append the input text
            $("#answer").html(input_text);
        }

        //If the input if empty
        else
        {
            //It has to be something in input
            text = "Write something please !..."

            //If it's not already said
            if(content != text)
            {
                //Say it!
                $("#answer").html(text);
            }
        }
    }
});