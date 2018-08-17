$(function(){ introduction();});
$(function(){ wiki();});

function introduction()
{
    $('<p>', {class: 'robot_white_msg', text: "Bonjour ! Je suis grandpy !"}).appendTo('#text_area');
    $('<p>', {class: 'robot_white_msg', text: "Ecris le nom d'un lieu et je t'en parlerais !"}).appendTo('#text_area');
}


// function test()
// {
//     var wikiAPI = "https://fr.wikipedia.org/w/api.php?action=query&format=json&gsrlimit=1&generator=search&origin=*&gsrsearch=";
//     $.get(wikiAPI+"apple", function(json)
//     {
//         alert(JSON.stringify(json));
//     });
// }
//
function wiki()
{
    var wikiAPI = "https://fr.wikipedia.org/w/api.php?origin=*&action=query&titles=";
    var url_params = "&prop=revisions&rvprop=content&format=json";
    $.get(wikiAPI + "apple" + url_params, function (json)
    {
        var wiki_result = JSON.stringify(json);
        // var wiki_result_id;
        $.each(JSON.parse(wiki_result), function (key, value)
        {
            if (key === "query")
            {
                var wiki_query = JSON.stringify(value);
                $.each(JSON.parse(wiki_query), function (key, value)
                {
                    if (key === "pages")
                    {
                        var wiki_page = JSON.stringify(value);
                        $.each(JSON.parse(wiki_page), function (key){
                            var wiki_id = JSON.stringify(key);
                            alert(wiki_id);
                        });
                    }
                });
            }
        });
    });
}
        //
        // var total = $('ul li').length;
        // $('ul li').each(function(index) {
        //     if (index === total - 1) {
        //         // this is the last one
        //     }
        // });

        // {"pages":{"63":{"pageid":63,"ns":0,"title":"Apple","index":1}}}

        // wiki_result_id = JSON.stringify(wiki_result_id);
        // alert(wiki_result_id);
        // var wiki_link = '"https://fr.wikipedia.org/?curid=' + data.query.pages[i].pageid ';
        // data.query.pages[i].title
        // alert(wiki_result);
//     })
// }



// // https://codepen.io/luckyguy73/full/GqPzZO/


// https://codepen.io/luckyguy73/full/GqPzZO/

// {"batchcomplete":"","continue":{"gsroffset":1,"continue":"gsroffset||"},"query":{"pages":{"63":{"pageid":63,"ns":0,"title":"Apple","index":1}}}}