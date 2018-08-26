"""
Handling views of the web application
"""
from flask import Flask, render_template, request, jsonify
from flask_assets import Environment, Bundle
import logic
import logging

app = Flask(__name__)
assets = Environment(app)
json = Bundle('static/json/stopwords.json', output='gen/packed.json')
assets.register('json', json)


@app.route('/', methods=['GET', 'POST'])
@app.route('/index', methods=['GET', 'POST'])
def index():
    """
    Index :return: web page template
    """
    return render_template('index.html')


@app.route('/google_api')
def calling_google_api():
    """
    Google personal api
    :return: json result
    """
    input_request = request.args.get('input_text', '')
    cleaned_request = logic.cleaning_request(input_request)
    try:
        maps_response = logic.google_maps_request(cleaned_request)
        if maps_response is not None and maps_response is not 'Failed':
            name, lat, lng, address = maps_response[0], maps_response[1], maps_response[2], maps_response[3]
            return jsonify(name, lat, lng, address)
        else:
            logging.exception("Google maps failed (views.py)")
            return jsonify('failed')

    except IndexError:
        logging.exception("Google maps failed (views.py)")
        return jsonify('failed')


@app.route('/wiki_api')
def calling_wiki_api():
    """
    Wiki personal api
    :return: json result
    """
    user_input = request.args.get('user_input', '')
    cleaned_request = logic.cleaning_request(user_input)
    data = logic.wiki_request(cleaned_request)
    if data:
        logging.info("Wiki wordked with cleaned request (views.py)")
        return jsonify(data)
    else:
        data = logic.wiki_loop_through_keywords(cleaned_request)
        if data:
            logging.info("Wiki wordked with cleagitned request (views.py)")
            return jsonify(data)
        else:
            logging.exception("Wiki failed (views.py)")
            return jsonify('failed')


@app.route('/query_place')
def query_place():
    """
    Query auto complete place
    :return: Place prediction
    """
    input_request = request.args.get('keywords', default=None)
    cleaned_request = logic.cleaning_request(input_request)
    try:
        place = logic.query_autocomplete_place(cleaned_request)
        if place is not None:
            logging.info("query place has worked (views.py)")
            return jsonify(place)
        else:
            logging.exception("query place failed (views.py)")
            return jsonify('failed')

    except TypeError:
        logging.exception("query place failed (views.py)")
        return jsonify('failed')
