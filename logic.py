"""File containing function utilised by the app"""
import requests
import json
import config
import logging

'''''''''''''''''
GENERIC USAGE
Python functions
'''''''''''''''''


def request_api(url):
    logging.info(f"request_api with {url} (logic.py)")
    data = requests.get(url)
    try:
        logging.info("request api worked !(logic.py)")
        return data.json()
    except ValueError:
        logging.exception("request api failed(logic.py)")
        pass


def cleaning_request(user_request):
    """
    Parse a string
    :param user_request: The request to parse
    :return: cleaned request
    """

    logging.info(f"cleaning_request {user_request} (logic.py)")
    specials_chars = ['.',',','!',':','\'',':','&',';','-','?']
    keywords_list = []

    # Parsing each char in user request
    for char in user_request:

        # If the current char is a special char
        if char in specials_chars:
            # Replace it by a space
            user_request = user_request.replace(char, ' ')

    # Create an array of words
    #  ["word","word","word"]
    array_of_words = user_request.split()

    # Using stopwords file
    with open('static/json/stopwords.json', 'r') as file:
        stopwords = json.load(file)

        # Parsing each word in array
        for word in array_of_words:

            # If the current word is not a stop_word
            if word.lower() not in stopwords:
                # Append in the list
                keywords_list.append(word)

    return " ".join(keywords_list)


'''''''''''''''''''''
GOOGLE  MAPS
Python Functions
'''''''''''''''''''''


def google_maps_request(keywords):
    logging.info(f"google maps request {keywords} (logic.py)")
    url = f"https://maps.googleapis.com/maps/api/place/textsearch/json?input={keywords}&key={config.KEY}"
    data = request_api(url)
    try:
        lat = data["results"][0]["geometry"]["location"]["lat"]
        lng = data["results"][0]["geometry"]["location"]["lng"]
        address = data["results"][0]["formatted_address"]
        name = data["results"][0]["name"]
        return name, lat, lng, address
    except IndexError:
        logging.error(f"google maps request failed with keyword(s) {keywords} (logic.py)")
        return 'failed'


def query_autocomplete_place(input_request):
    logging.info(f"query autocomplete place : {input_request} (logic.py)")

    try:
        autocomplete_url = "https://maps.googleapis.com/maps/api/place/queryautocomplete/json"
        url = f"{autocomplete_url}?key={config.KEY}&language=fr?&input={input_request}"
        data = request_api(url)
        place = data["predictions"][0]["description"]
        logging.info("query autocomplete place worked !(logic.py)")
        return place

    except IndexError as e:
        logging.exception("query autocomplete place failed (logic.py)")
        logging.exception(e)
        pass


'''''''''''''''''''''
WIKI ENCYCLOPEDIA
Python Functions

'''''''''''''''''''''


def wiki_loop_through_keywords(keywords):
    logging.info(f"wiki loop through {keywords} (logic.py)")
    keywords = keywords.split(' ')

    for i, _ in enumerate(keywords):

        logging.info(f"{keywords[i]}")
        wiki_answer = wiki_request(keywords[i])
        logging.info(f"{wiki_answer}")

        if wiki_answer:
            logging.info(f"wiki find this answer : {wiki_answer} (logic.py)")
            return wiki_answer


def wiki_request(requested_area):
    """
    Getting wiki answer
    :param requested_area: The requested area
    :return: Wiki answer about requested area
    """

    logging.info(f"wiki request {requested_area} (logic.py)")

    wiki_url = "https://fr.wikipedia.org/w/api.php"
    title_url = f'{wiki_url}?action=opensearch&search={requested_area}'

    try:
        wiki_title_answer = request_api(title_url)
        if wiki_title_answer and wiki_title_answer[1]:
            logging.info("wiki_title_answer worked !")
            wiki_title = wiki_title_answer[1][0]
            if wiki_title:
                logging.info("wiki_title worked !")
                wiki_extract = get_wiki_extract(wiki_url, wiki_title)
                return wiki_extract
    except IndexError as idxError:
        logging.exception("wiki request failed at the end..")
        logging.exception(idxError)
        pass
    except ValueError as valError:
        logging.info("wiki request failed on start...")
        logging.exception(valError)
        pass


def get_wiki_extract(wiki_url, wiki_title):
    """
    Get an extract of a wiki page
    :param wiki_url: Wiki url
    :param wiki_title: Wiki title
    :return: wiki extract
    """

    logging.info(f"get_wiki_extract : url = {wiki_url} / tirle = {wiki_title} (logic.py)")

    prop_sentence = "extracts&exsentences"
    first_sentence_url = f"{wiki_url}?action=query&titles={wiki_title}&prop={prop_sentence}=1&format=json&explaintext"
    first_sentence = request_api(first_sentence_url)
    wiki_extract = ""
    for page_id in first_sentence['query']['pages']:
        wiki_extract = first_sentence['query']['pages'][page_id]['extract']
    return wiki_extract
