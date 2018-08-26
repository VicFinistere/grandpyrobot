"""
WebApp Python Side - Logic
"""
import json
import logging
import requests
import config

'''
GENERIC USAGE
Python functions
'''


def request_api(url):
    """
    Request api
    :param url: API url
    :return: JSON Data
    """
    logging.info(f"request_api with {url} (logic.py)")
    data = requests.get(url)
    return data.json()


def cleaning_request(user_request):
    """
    Parse a string
    :param user_request: The request to parse
    :return: cleaned request
    """

    logging.info(f"cleaning_request {user_request} (logic.py)")
    specials_chars = ['.', ',', '!', ':', '\'', ':', '&', ';', '-', '?']
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


'''
GOOGLE  MAPS
Python Functions
'''


def google_maps_request(user_request):
    """
    Google maps request
    :param user_request: user request
    :return: maps_response : [name, lat, lng, address ]
    """
    logging.info(f"google maps request {user_request} (logic.py)")
    url = f"https://maps.googleapis.com/maps/api/place/textsearch/json?input={user_request}&key={config.KEY}"

    data = request_api(url)
    if data is not None:
        try:
            maps_response = assign_maps_data(data)
            if maps_response is not None:
                return maps_response
            else:
                logging.error("Google maps objects not found..")
                return None

        except IndexError:
            logging.error("Google maps couldn't assign..")
            return None
    else:
        logging.error(f"google maps request failed with keyword(s) {user_request} (logic.py)")
        return None


def assign_maps_data(data):
    """
    Assign data
    :param data: Maps data in json
    :return: name, lat, lng, address
    """

    try:
        lat = data["results"][0]["geometry"]["location"]["lat"]
        lng = data["results"][0]["geometry"]["location"]["lng"]
        address = data["results"][0]["formatted_address"]
        name = data["results"][0]["name"]
        result = [name, lat, lng, address]
        return result

    except IndexError:
        logging.error("Index error assign maps data (logic.py)")
        return None


def query_autocomplete_place(input_request):
    """
    Query for a place by auto completion
    :param input_request: User request
    :return: The first place returned by the query place api
    """
    logging.info(f"query autocomplete place : {input_request} (logic.py)")
    autocomplete_url = "https://maps.googleapis.com/maps/api/place/queryautocomplete/json"
    url = f"{autocomplete_url}?key={config.KEY}&language=fr?&input={input_request}"
    data = request_api(url)

    try:
        place = data["predictions"][0]["description"]
        logging.info("query autocomplete place worked !(logic.py)")
        return place

    except IndexError:
        logging.exception("query autocomplete place failed (logic.py)")
        return None


'''
WIKI ENCYCLOPEDIA
Python Functions

'''


def wiki_loop_through_keywords(request):
    """
    Wiki testing each word in request
    :param request: request
    :return: wiki answer
    """
    logging.info(f"wiki loop through {request} (logic.py)")
    request = request.split(' ')

    for i, _ in enumerate(request):
        print(request[i])
        wiki_answer = wiki_request(request[i])
        # Using the first result
        if wiki_answer:
            logging.info(f"wiki find this answer : {wiki_answer} (logic.py)")
            return wiki_answer
        i += 1
    print('faiiiiiiiiled')
    return None


def wiki_request(requested_area):
    """
    Getting wiki answer
    :param requested_area: The requested area
    :return: Wiki answer about requested area
    """

    logging.info(f"wiki request {requested_area} (logic.py)")
    wiki_url = "https://fr.wikipedia.org/w/api.php"
    title_url = f'{wiki_url}?action=opensearch&search={requested_area}'
    wiki_title_answer = request_api(title_url)

    if wiki_title_answer and wiki_title_answer[1]:
        logging.info("wiki_title_answer worked !")
        wiki_title = wiki_title_answer[1][0]
        wiki_extract = getting_wiki_extract(wiki_title)
        return wiki_extract

    else:
        logging.info("wiki request failed on start...")
        return None


def getting_wiki_extract(wiki_title):
    """
    Getting wiki extract
    :param wiki_title:
    :return: wiki extract
    """
    if wiki_title is not None:
        logging.info("wiki_title worked !")
        wiki_extract = getting_wiki_sentence(wiki_title)
        return wiki_extract
    else:
        logging.info("wiki request failed at the end...")
        return None


def getting_wiki_sentence(wiki_title):
    """
    Get an extract of a wiki page
    :param wiki_title: Wiki title
    :return: wiki extract
    """
    wiki_url = "https://fr.wikipedia.org/w/api.php"
    logging.info(f"get_wiki_extract : url = {wiki_url} / tirle = {wiki_title} (logic.py)")
    prop_sentence = "extracts&exsentences"
    first_sentence_url = f"{wiki_url}?action=query&titles={wiki_title}&prop={prop_sentence}=1&format=json&explaintext"
    first_sentence = request_api(first_sentence_url)
    wiki_extract = ""

    if first_sentence is not None:
        for page_id in first_sentence['query']['pages']:
            wiki_extract = first_sentence['query']['pages'][page_id]['extract']
        return wiki_extract
    else:
        logging.error(f"getting wiki extract failed with title {wiki_title}")
        return None
