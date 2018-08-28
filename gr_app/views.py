"""
Handling views of the web application
"""
# Flask
from flask import Flask, render_template, request, jsonify

# Logs
import logging

# Grand-py Robot
import gr_app.logic

app = Flask(__name__)


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
    cleaned_request = gr_app.logic.cleaning_request(input_request)
    if cleaned_request:
        place = gr_app.logic.query_autocomplete_place(cleaned_request)
        try:
            maps_response = gr_app.logic.google_maps_request(place)
            if maps_response is not None and maps_response is not 'Failed':
                name, lat, lng, address = maps_response[0], maps_response[1], maps_response[2], maps_response[3]
                return jsonify(name, lat, lng, address)
            else:
                logging.exception("Google maps failed (views.py)")
                return jsonify('failed')

        except IndexError:
            logging.exception("Google maps failed (views.py)")
            return jsonify('failed')
    else:
        logging.exception("Google maps failed because of the request emptiness(views.py)")
        return jsonify('failed')


@app.route('/wiki_api')
def calling_wiki_api():
    """
    Wiki personal api
    :return: json result
    """
    user_input = request.args.get('user_input', '')
    cleaned_request = gr_app.logic.cleaning_request(user_input)
    if cleaned_request:
        data = gr_app.logic.wiki_request(cleaned_request)
        if data:
            logging.info("Wiki wordked with cleaned request (views.py)")
            return jsonify(data)
        else:
            data = gr_app.logic.wiki_loop_through_keywords(cleaned_request)
            if data:
                logging.info("Wiki wordked with cleagitned request (views.py)")
                return jsonify(data)
            else:
                logging.exception("Wiki failed (views.py)")
                return jsonify('failed')
    else:
        logging.exception("Wiki failed because of the request emptiness(views.py)")
        return jsonify('failed')
