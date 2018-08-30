"""
WebApp Python Side - Logic
"""
import json
import logging
import requests
from gr_app.config import ROOT, KEY

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
    with open(ROOT + '/static/json/stopwords.json', 'r') as file:
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
    url = f"https://maps.googleapis.com/maps/api/place/textsearch/json?input={user_request}&key={KEY}"

    data = request_api(url)
    if data['status'] == 'OK':
        try:
            maps_response = assign_maps_data(data, user_request)
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


def assign_maps_data(data, user_request):
    """
    Assign data
    :param data: Maps data in json
    :param user_request: Use it in case there's no address
    :return: name, lat, lng, address
    """

    if data['status'] == 'OK':
        logging.info('Place found (logic.py)')
        logging.info(data)
        try:
            lat = data["results"][0]["geometry"]["location"]["lat"]
            lng = data["results"][0]["geometry"]["location"]["lng"]
            address = data["results"][0]["formatted_address"]
            name = data["results"][0]["name"]
            result = [name, lat, lng, address]
            return result
        except IndexError:
            logging.error("Formatted address not found (logic.py)")
            try:
                result = [name, lat, lng, user_request]
                return result
            except IndexError:
                logging.error("Index error assign maps data (logic.py)")
                return None
    else:
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
    url = f"{autocomplete_url}?key={KEY}&language=fr?&input={input_request}"
    data = request_api(url)

    if data["status"] == 'OK':
        place = data["predictions"][0]["description"]
        logging.info("query autocomplete place worked !(logic.py)")
        return place
    else:
        logging.exception("query autocomplete place failed (logic.py)")
        return None


'''
WIKI ENCYCLOPEDIA
Python Functions

'''


def wiki_cleaned_request(user_request):
    """
    Cleaning request for wiki encyclopedia
    :param user_request: Request with recurrent words
    :return: clever request
    """
    user_request = user_request.split(' ')

    keywords_list = []

    # Using stopwords file
    with open(ROOT + '/static/json/wiki_stopwords.json', 'r') as file:
        stopwords = json.load(file)

        # Parsing each word in array
        for word in user_request:

            # If the current word is not a stop_word
            if word.lower() not in stopwords:
                # Append in the list
                keywords_list.append(word)

    if keywords_list:
        logging.info("There is clever words ! (logic.py)")
        clever_request = " ".join(keywords_list)

    else:
        logging.info("There's no clever words... (logic.py)")
        clever_request = None

    return clever_request


def wiki_loop_through_keywords(request):
    """
    Wiki testing each word in request
    :param request: request
    :return: wiki answer
    """
    logging.info(f"wiki loop through {request} (logic.py)")
    request = request.split(' ')

    for i, _ in enumerate(request):
        wiki_answer = wiki_request(request[i])
        # Using the first result
        if wiki_answer:
            logging.info(f"wiki find this answer : {wiki_answer} (logic.py)")
            return wiki_answer
        i += 1
    return None


def wiki_request(requested_area):
    """
    Getting wiki answer
    :param requested_area: The requested area
    :return: Wiki answer about requested area
    """
    logging.info(f"wiki request {requested_area} (logic.py)")
    wiki_url = "https://fr.wikipedia.org/w/api.php"
    clever_request = wiki_cleaned_request(requested_area)

    if clever_request is not None:
        search_term = cleaning_request(clever_request)
    else:
        search_term = cleaning_request(requested_area)

    title_url = f"{wiki_url}?action=opensearch&search={search_term}"
    wiki_title_answer = request_api(title_url)

    if wiki_title_answer is not None:
        wiki_responses = wiki_title_answer[2]
        for response in wiki_responses:
            if len(response) > 1:
                return response
        logging.info("wiki request failed with clever request(logic.py)")
        return None

    else:
        title_url = f"{wiki_url}?action=opensearch&search={requested_area}"
        wiki_title_answer = request_api(title_url)

        if wiki_title_answer is not None:
            wiki_responses = wiki_title_answer[2]
            for response in wiki_responses:
                if len(response) > 1:
                    return response
            logging.info("wiki request failed with requested area(logic.py)")
            return None
