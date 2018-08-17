var requested_area = "Openclassroom's";

// Change this text
var unregistered_area_story = "Cette zone m'est inconnue...Je devrais y faire un tour !";

function wiki_answer(wiki_text_result) {
    $('<p>', {class: 'robot_white_msg', text: wiki_text_result}).appendTo('#text_area');
}

$.get("https://fr.wikipedia.org/w/api.php?action=query&titles="+requested_area+"&prop=revisions&rvprop=content&format=json)",
    function (wiki_json_result)
    {
        if
        (
            wiki_json_result === undefined ||
            wiki_json_result["query"] === undefined ||
            wiki_json_result["query"]["pages"]["5653202"] === undefined
        )
        {
            wiki_answer(unregistered_area_story);
        }
        else
        {
            var story = wiki_json_result["query"]["pages"]["5653202"]["revisions"][0]["*"];
            // anecdote = anecdote.split("==")[2].split("File")[0];
            // anecdote = anecdote.substring(0, 54) + anecdote.substring(56,83) + "." + anecdote.substring(122,141) + " T" + anecdote.substring(158,277);
            // anecdote = anecdote.split("[[").join("").split("]]").join("");
            // var index = Math.floor(Math.random()*stories.length);
            // story = stories[index];
            // displayMessage(story + anecdote);
            alert(story)
        }
    });