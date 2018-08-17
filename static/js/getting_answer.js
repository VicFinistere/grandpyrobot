var wiki_result_status;

function wiki_search(requested_area)
{
    $.get(
        "https://fr.wikipedia.org/w/api.php?action=query&titles="+requested_area+"&prop=revisions&rvprop=content&format=json)",
        function (data) {
            alert("petit poucé");
            alert('page content: ' + data);
            var wiki_json_result = data;
            wiki_result_status = true;
            return [wiki_json_result, wiki_result_status];
        }
    );
}
    //
//     $.get("https://fr.wikipedia.org/w/api.php?action=query&titles="+requested_area+"&prop=revisions&rvprop=content&format=json)",
//         function (wiki_json_result)
//         {
//             alert("cherche wikipedia cherche");
//             if (wiki_json_result === undefined ) wiki_answer(unregistered_area_story);
//             else if (wiki_json_result["query"] === undefined) wiki_answer(unregistered_area_story);
//             else if (wiki_json_result["query"]["pages"]["5653202"] === undefined) wiki_answer(unregistered_area_story);
//             else
//             {
//                 var story = wiki_json_result["query"]["pages"]["5653202"]["revisions"][0]["*"];
//                 alert(story);
//                 wiki_result_status = true;
//                 return [wiki_json_result, wiki_result_status];
//             }
//
//         });
// }

function answer()
{
    var user_input = $('#text_area').children('p.user_blue_msg').last();
    var user_text = user_input.html();
    if(user_text !== null)
    {
        try
        {
            var user_checked_text = user_text.toLowerCase();
        }
        catch (error)
        {
            console.error(error);
        }

    }


    var wiki_json_result, wiki_result_status = wiki_search(user_checked_text);

    switch (true)
    {

        case(wiki_result_status):
            if (user_input.css('color') !== 'rgb(230, 230, 230)')
            {
                if(wiki_json_result)
                {
                    $('<p>', {class: 'robot_white_msg', text: wiki_json_result}).appendTo('#text_area');
                    user_input.css('color', 'rgb(230, 230, 230)');
                }

            }
            break;
        case(user_checked_text.indexOf("bonjour") !== -1):
            if (user_input.css('color') !== 'rgb(230, 230, 230)')
            {
                $('<p>', {class: 'robot_white_msg', text: "Bonjour !"}).appendTo('#text_area');
                user_input.css('color', 'rgb(230, 230, 230)');
            }
            break;
        case(user_checked_text.indexOf("coucou") !== -1):
            if (user_input.css('color') !== 'rgb(230, 230, 230)')
            {
                $('<p>', {class: 'robot_white_msg', text: "Salut salut !"}).appendTo('#text_area');
                user_input.css('color', 'rgb(230, 230, 230)');
            }
            break;
        case(user_checked_text.indexOf("salut") !== -1):
            if (user_input.css('color') !== 'rgb(230, 230, 230)')
            {
                $('<p>', {class: 'robot_white_msg', text: "Salut !"}).appendTo('#text_area');
                user_input.css('color', 'rgb(230, 230, 230)');
            }
            break;
        case(user_checked_text.indexOf("revoir") !== -1):
            if (user_input.css('color') !== 'rgb(230, 230, 230)')
            {
                $('<p>', {class: 'robot_white_msg', text: "A bientôt!"}).appendTo('#text_area');
                user_input.css('color', 'rgb(230, 230, 230)');
            }
            break;
        case(user_checked_text.indexOf("pourquoi") !== -1):
            if (user_input.css('color') !== 'rgb(230, 230, 230)')
            {
                $('<p>', {class: 'robot_white_msg', text: "Va savoir!..."}).appendTo('#text_area');
                user_input.css('color', 'rgb(230, 230, 230)');
            }
            break;
        case(user_checked_text.indexOf("allo") !== -1):
            if (user_input.css('color') !== 'rgb(230, 230, 230)')
            {
                $('<p>', {class: 'robot_white_msg', text: "A l'huile ?"}).appendTo('#text_area');
                $('<p>', {class: 'robot_white_msg', text: "Oh non ! C'te blague est nulle..."}).appendTo('#text_area');
                user_input.css('color', 'rgb(230, 230, 230)');
            }
            break;
        case(user_checked_text.indexOf("oui") !== -1):
            if (user_input.css('color') !== 'rgb(230, 230, 230)')
            {
                $('<p>', {class: 'fas fa-thumbs-up fa-inverse robot_white_msg'}).appendTo('#text_area');
                user_input.css('color', 'rgb(230, 230, 230)');
            }
            break;
        case(user_checked_text.indexOf("cool") !== -1):
            if (user_input.css('color') !== 'rgb(230, 230, 230)')
            {
                $('<p>', {class: 'fas fa-thumbs-up fa-inverse robot_white_msg'}).appendTo('#text_area');
                user_input.css('color', 'rgb(230, 230, 230)');
            }
            break;
        case(user_checked_text.indexOf("super") !== -1):
            if (user_input.css('color') !== 'rgb(230, 230, 230)')
            {
                $('<p>', {class: 'fas fa-thumbs-up fa-inverse robot_white_msg'}).appendTo('#text_area');
                user_input.css('color', 'rgb(230, 230, 230)');
            }
            break;
        case(user_checked_text.indexOf("merci") !== -1):
            if (user_input.css('color') !== 'rgb(230, 230, 230)')
            {
                $('<p>', {class: 'robot_white_msg', text: "C'est avec plaisir !"}).appendTo('#text_area');
                user_input.css('color', 'rgb(230, 230, 230)');
            }
            break;
        case(user_checked_text.indexOf("chat") !== -1):
            if (user_input.css('color') !== 'rgb(230, 230, 230)')
            {
                $('<p>', {class: 'robot_white_msg', text: "Les chats sont mignons !"}).appendTo('#text_area');
                user_input.css('color', 'rgb(230, 230, 230)');
            }
            break;
        case(user_checked_text.indexOf("vas-y") !== -1):
            if (user_input.css('color') !== 'rgb(230, 230, 230)')
            {
                $('<p>', {class: 'robot_white_msg', text: "C'est à toi de jouer!"}).appendTo('#text_area');
                user_input.css('color', 'rgb(230, 230, 230)');
            }
            break;
        case(user_checked_text.indexOf("intelligent") !== -1):
            if (user_input.css('color') !== 'rgb(230, 230, 230)')
            {
                $('<p>', {class: 'robot_white_msg', text: "Tout ça c'est relatif !"}).appendTo('#text_area');
                user_input.css('color', 'rgb(230, 230, 230)');
            }
            break;
        case(user_checked_text.indexOf("bien") !== -1):
            if (user_input.css('color') !== 'rgb(230, 230, 230)')
            {
                $('<p>', {class: 'fas fa-thumbs-up fa-inverse robot_white_msg'}).appendTo('#text_area');
                user_input.css('color', 'rgb(230, 230, 230)');
            }
            break;
        case(user_checked_text.indexOf("vrai") !== -1):
            if (user_input.css('color') !== 'rgb(230, 230, 230)')
            {
                $('<p>', {class: 'robot_white_msg', text: "Alors là...pff!!"}).appendTo('#text_area');
                user_input.css('color', 'rgb(230, 230, 230)');
            }
            break;
        case(user_checked_text.indexOf("coucher") !== -1):
            if (user_input.css('color') !== 'rgb(230, 230, 230)')
            {
                $('<p>', {class: 'robot_white_msg', text: "Quelle fougue !"}).appendTo('#text_area');
                user_input.css('color', 'rgb(230, 230, 230)');
            }
            break;
        case(user_checked_text.indexOf("chante") !== -1):
            if (user_input.css('color') !== 'rgb(230, 230, 230)')
            {
                $('<p>', {class: 'robot_white_msg', text: "La la la la laaaa !!"}).appendTo('#text_area');
                user_input.css('color', 'rgb(230, 230, 230)');
            }
            break;
        case(user_checked_text.indexOf("test") !== -1):
            if (user_input.css('color') !== 'rgb(230, 230, 230)')
            {
                $('<p>', {class: 'robot_white_msg', text: "1 2 1 2...Test..."}).appendTo('#text_area');
                user_input.css('color', 'rgb(230, 230, 230)');
            }
            break;
        case(user_checked_text.indexOf("comment") !== -1):
            if (user_input.css('color') !== 'rgb(230, 230, 230)')
            {
                $('<p>', {class: 'robot_white_msg', text: "Il faut écrire un lieu dans la case!"}).appendTo('#text_area');
                user_input.css('color', 'rgb(230, 230, 230)');
            }
            break;
        case(user_checked_text.indexOf("nul") !== -1):
            if (user_input.css('color') !== 'rgb(230, 230, 230)')
            {
                $('<p>', {class: 'robot_white_msg', text: "Tu veux m'aider ? (Github moi donc...)"}).appendTo('#text_area');
                user_input.css('color', 'rgb(230, 230, 230)');
            }
            break;
        case(user_checked_text.indexOf("ahah") !== -1):
            if (user_input.css('color') !== 'rgb(230, 230, 230)')
            {
                $('<p>', {class: 'far fa-laugh-beam fa-inverse robot_white_msg'}).appendTo('#text_area');
                user_input.css('color', 'rgb(230, 230, 230)');
            }
            break;
        case(user_checked_text.indexOf("je vais") !== -1):
            if (user_input.css('color') !== 'rgb(230, 230, 230)')
            {
                $('<p>', {class: 'robot_white_msg', text: "Ok !"}).appendTo('#text_area');
                user_input.css('color', 'rgb(230, 230, 230)');
            }
            break;
        case(user_checked_text.indexOf("nom") !== -1):
            if (user_input.css('color') !== 'rgb(230, 230, 230)')
            {
                $('<p>', {class: 'robot_white_msg', text: "Je suis grandpy !"}).appendTo('#text_area');
                user_input.css('color', 'rgb(230, 230, 230)');
            }
            break;
        case(user_checked_text.indexOf("t'") !== -1):
            if (user_input.css('color') !== 'rgb(230, 230, 230)')
            {
                $('<p>', {class: 'robot_white_msg', text: "Je suis grandpy !"}).appendTo('#text_area');
                $('<p>', {class: 'robot_white_msg', text: "Je peux te trouver un lieu..."}).appendTo('#text_area');
                user_input.css('color', 'rgb(230, 230, 230)');
            }
            break;
        case(user_checked_text.indexOf("désol") !== -1):
            if (user_input.css('color') !== 'rgb(230, 230, 230)')
            {
                $('<p>', {class: 'robot_white_msg', text: "Il n'y a pas de mal !.."}).appendTo('#text_area');
                user_input.css('color', 'rgb(230, 230, 230)');
            }
            break;
        case(user_checked_text.indexOf("ciao") !== -1):
            if (user_input.css('color') !== 'rgb(230, 230, 230)')
            {
                $('<p>', {class: 'robot_white_msg', text: "Salut !"}).appendTo('#text_area');
                user_input.css('color', 'rgb(230, 230, 230)');
            }
            break;
        case(user_checked_text.indexOf("connais-tu") !== -1):
            if (user_input.css('color') !== 'rgb(230, 230, 230)')
            {
                $('<p>', {class: 'robot_white_msg', text: "Non je ne connais pas encore..."}).appendTo('#text_area');
                user_input.css('color', 'rgb(230, 230, 230)');
            }
            break;
        case(user_checked_text.indexOf("connais tu") !== -1):
            if (user_input.css('color') !== 'rgb(230, 230, 230)')
            {
                $('<p>', {class: 'robot_white_msg', text: "Non je ne connais pas encore..."}).appendTo('#text_area');
                user_input.css('color', 'rgb(230, 230, 230)');
            }
            break;
        case(user_checked_text.indexOf("tu veux") !== -1):
            if (user_input.css('color') !== 'rgb(230, 230, 230)')
            {
                $('<p>', {class: 'robot_white_msg', text: "Je suis toujours partant !"}).appendTo('#text_area');
                user_input.css('color', 'rgb(230, 230, 230)');
            }
            break;
        case(user_checked_text.indexOf("...") !== -1):
            if (user_input.css('color') !== 'rgb(230, 230, 230)')
            {
                $('<p>', {class: 'robot_white_msg', text: "Désolé...je suis agé tu sais !"}).appendTo('#text_area');
                user_input.css('color', 'rgb(230, 230, 230)');
            }
            break;
        case(user_checked_text.indexOf("42") !== -1):
            if (user_input.css('color') !== 'rgb(230, 230, 230)')
            {
                $('<p>', {class: 'robot_white_msg', text: "42...! La solution évidente !"}).appendTo('#text_area');
                user_input.css('color', 'rgb(230, 230, 230)');
            }
            break;
        case(user_checked_text.indexOf("moi") !== -1):
            if (user_input.css('color') !== 'rgb(230, 230, 230)')
            {
                $('<p>', {class: 'robot_white_msg', text: "Ok !"}).appendTo('#text_area');
                user_input.css('color', 'rgb(230, 230, 230)');
            }
            break;
        case(user_checked_text.indexOf("dire") !== -1):
            if (user_input.css('color') !== 'rgb(230, 230, 230)')
            {
                $('<p>', {class: 'robot_white_msg', text: "Je ne suis pas un perroquet ! Je suis bien plus que ça !"}).appendTo('#text_area');
                user_input.css('color', 'rgb(230, 230, 230)');
            }
            break;
        case(user_checked_text.indexOf("fais") !== -1):
            if (user_input.css('color') !== 'rgb(230, 230, 230)')
            {
                $('<p>', {class: 'robot_white_msg', text: "Non merci !"}).appendTo('#text_area');
                user_input.css('color', 'rgb(230, 230, 230)');
            }
            break;
        case(user_checked_text.indexOf("ou est") !== -1):
            if (user_input.css('color') !== 'rgb(230, 230, 230)')
            {
                $('<p>', {class: 'robot_white_msg', text: "On ne m'as pas encore renseigné là dessus..."}).appendTo('#text_area');
                user_input.css('color', 'rgb(230, 230, 230)');
            }
            break;
        case(user_checked_text.indexOf("où est") !== -1):
            if (user_input.css('color') !== 'rgb(230, 230, 230)')
            {
                $('<p>', {class: 'robot_white_msg', text: "On ne m'as pas encore renseigné là dessus..."}).appendTo('#text_area');
                user_input.css('color', 'rgb(230, 230, 230)');
            }
            break;
        case(user_checked_text.indexOf("ok") !== -1):
            if (user_input.css('color') !== 'rgb(230, 230, 230)')
            {
                $('<p>', {class: 'fas fa-thumbs-up fa-inverse robot_white_msg'}).appendTo('#text_area');
                user_input.css('color', 'rgb(230, 230, 230)');
            }
            break;
        case(user_checked_text.indexOf("bouton") !== -1):
            if (user_input.css('color') !== 'rgb(230, 230, 230)')
            {
                $('<p>', {class: 'robot_white_msg', text: "Mon bouton si situe juste au dessous."}).appendTo('#text_area');
                $('<p>', {class: 'robot_white_msg', text: "Si tu as une touche entrée il est inutile."}).appendTo('#text_area');
                user_input.css('color', 'rgb(230, 230, 230)');
            }
            break;
        case(user_checked_text.indexOf("quoi") !== -1):
            if (user_input.css('color') !== 'rgb(230, 230, 230)')
            {
                $('<p>', {class: 'robot_white_msg', text: "Je ne sais pas..."}).appendTo('#text_area');
                user_input.css('color', 'rgb(230, 230, 230)');
            }
            break;
        case(user_checked_text.indexOf(":)") !== -1):
            if (user_input.css('color') !== 'rgb(230, 230, 230)')
            {
                $('<p>', {class: 'robot_white_msg far fa-grin-beam'}).appendTo('#text_area');
                user_input.css('color', 'rgb(230, 230, 230)');
            }
            break;
        case(user_checked_text.indexOf("=)") !== -1):
            if (user_input.css('color') !== 'rgb(230, 230, 230)')
            if (user_input.css('color') !== 'rgb(230, 230, 230)')
            {
                $('<p>', {class: 'robot_white_msg far fa-grin-beam'}).appendTo('#text_area');
                user_input.css('color', 'rgb(230, 230, 230)');
            }
            break;
        case(user_checked_text.indexOf(";)") !== -1):
            if (user_input.css('color') !== 'rgb(230, 230, 230)')
            {
                $('<p>', {class: 'robot_white_msg far fa-smile-wink'}).appendTo('#text_area');
                user_input.css('color', 'rgb(230, 230, 230)');
            }
            break;
        case(user_checked_text.indexOf("=(far fa-grin-beam") !== -1):
            if (user_input.css('color') !== 'rgb(230, 230, 230)')
            {
                $('<p>', {class: 'robot_white_msg far fa-grin-tongue-squint'}).appendTo('#text_area');
                user_input.css('color', 'rgb(230, 230, 230)');
            }
            break;
        case(user_checked_text.indexOf(":(") !== -1):
            if (user_input.css('color') !== 'rgb(230, 230, 230)')
            {
                $('<p>', {class: 'robot_white_msg far fa-grin-tongue-squint'}).appendTo('#text_area');
                user_input.css('color', 'rgb(230, 230, 230)');
            }
            break;
        case(user_checked_text.indexOf("ça va") !== -1):
            if (user_input.css('color') !== 'rgb(230, 230, 230)')
            {
                $('<p>', {class: 'robot_white_msg', text: "Je ne suis pas certain..."}).appendTo('#text_area');
                $('<p>', {class: 'robot_white_msg', text: "Je suis juste un papy robot après tout..."}).appendTo('#text_area');
                user_input.css('color', 'rgb(230, 230, 230)');
            }
            break;
        case(user_checked_text.indexOf("va") !== -1):
            if (user_input.css('color') !== 'rgb(230, 230, 230)')
            {
                $('<p>', {class: 'fas fa-thumbs-up fa-inverse robot_white_msg'}).appendTo('#text_area');
                user_input.css('color', 'rgb(230, 230, 230)');
            }
            break;
        case(user_checked_text.indexOf("tu") !== -1):
            if (user_input.css('color') !== 'rgb(230, 230, 230)')
            {
                $('<p>', {class: 'robot_white_msg', text: "Je suis grandpy !"}).appendTo('#text_area');
                $('<p>', {class: 'robot_white_msg', text: "Je peux te trouver un lieu..."}).appendTo('#text_area');
                user_input.css('color', 'rgb(230, 230, 230)');
            }
            break;
        default:
            if (user_input.css('color') !== 'rgb(230, 230, 230)')
            {
                $('<p>', {class: 'robot_white_msg far fa-grin-beam-sweat'}).appendTo('#text_area');
                $('<p>', {class: 'robot_white_msg', text: "...?"}).appendTo('#text_area');
                user_input.css('color', 'rgb(230, 230, 230)');
            }
            break;
    }
}

