from flask import Flask, render_template, request, jsonify
import logic
import json

app = Flask(__name__)


@app.route('/', methods=['GET', 'POST'])
@app.route('/index', methods=['GET', 'POST'])
def index():
    return render_template('index.html')


@app.route('/google_api')
def google_api():
    keywords = request.args.get('keywords', default=None)
    special_characters = ['.', ',', '!', ':', '\'', ':', '&', ';', '-', '?']
    list_keywords = []

    for char in keywords:
        if char in special_characters:
            keywords = keywords.replace(char, ' ')
    array_of_words = keywords.split()

    with open('static/json/stopwords.json', 'r') as file:
        stopwords = json.load(file)
        for word in array_of_words:
            if word.lower() not in stopwords:
                list_keywords.append(word)
    cleaned_request = " ".join(list_keywords)

    try:
        lat, lng, address = logic.get_data_from_google_maps(cleaned_request)
        return jsonify(lat, lng, address)
    except TypeError:
        return jsonify('failed')


if __name__ == "__main__":
    app.run()
