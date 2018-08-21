"""File containing function utilised by the app"""
import requests
import config


def request_api(url):
    """Request the selected url and return data from the api as json"""
    data = requests.get(url)
    return data.json()


def get_data_from_google_maps(keywords):
    """Do request to the google maps API"""
    url = "https://maps.googleapis.com/maps/api/place/textsearch/json?input={}&key={}".format(keywords, config.KEY)
    data = request_api(url)
    # print(data)
    try:
        result_lat = data["results"][0]["geometry"]["location"]["lat"]
        result_long = data["results"][0]["geometry"]["location"]["lng"]
        try:
            address = data["results"][0]["formatted_address"]
            return result_lat, result_long, address
        except KeyError:
            return result_lat, result_long, ''
    except IndexError:
        pass
