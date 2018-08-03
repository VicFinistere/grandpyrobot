$(function () {
    $('#answer_button').on('click', function () {
        var input_text = $("#input_text").val();
//        alert(input_text);
        $("#answer").append(input_text);
        });
    });

