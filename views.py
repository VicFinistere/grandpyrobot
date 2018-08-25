from flask import Flask, render_template, request, jsonify
import logic
import logging

app = Flask(__name__)


@app.route('/', methods=['GET', 'POST'])
@app.route('/index', methods=['GET', 'POST'])
def index():
    return render_template('index.html')


@app.route('/google_api')
def google_api():
    input_request = request.args.get('input_text', '')
    cleaned_request = logic.cleaning_request(input_request)
    try:
        name, lat, lng, address = logic.google_maps_request(cleaned_request)
        logging.info("Google maps worked")
        return jsonify(name, lat, lng, address)

    except TypeError:
        logging.exception("Google maps failed")
        return jsonify('failed')


@app.route('/wiki_api')
def wiki_api():
    user_input = request.args.get('user_input', '')
    cleaned_request = logic.cleaning_request(user_input)
    data = logic.wiki_request(cleaned_request)
    if data:
        logging.info("Wiki wordked with cleaned request")
        return jsonify(data)
    else:
        data = logic.wiki_loop_through_keywords(cleaned_request)
        if data:
            logging.info("Wiki wordked with cleaned request")
            return jsonify(data)
        else:
            logging.exception("Wiki failed")
            return jsonify('wiki failed')


@app.route('/query_place')
def query_place():
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

    except TypeError as e:
        logging.exception("query place failed (views.py)")
        return jsonify('failed')
