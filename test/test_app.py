"""File containing all the unit tests for the application"""

import unittest
import logic
from views import app


class TestFlaskApp(unittest.TestCase):
    """Unit test class to test the App """

    def setUp(self):
        app.testing = True
        self.app = app.test_client()

    def test_index_by_default_url(self):
        rv = self.app.get('/')
        self.assertEqual(rv.status_code, 200)

    def test_index_by_index_url(self):
        rv = self.app.get('/index')
        self.assertEqual(rv.status_code, 200)


class TestLogic(unittest.TestCase):
    """test all functions in the 'logic.py' file"""

    """
    Request any api an return JSON Data for response
    """
    def test_request_api(self):
        """
        Request api
        :return: JSON Data
        """
        url = "https://fr.wikipedia.org/w/api.php?action=opensearch&search='openclassrooms'"
        test_result = logic.request_api(url)
        self.assertEqual(test_result, ["'openclassrooms'", ['OpenClassrooms'], ["OpenClassrooms est une école en ligne "
                                                                                "qui propose à ses membres des cours "
                                                                                "certifiants et des parcours "
                                                                                "débouchant sur un métier d'avenir, "
                                                                                "réalisés en interne, par des écoles,"
                                                                                " des universités, ou encore par des "
                                                                                "entreprises partenaires comme "
                                                                                "Microsoft ou IBM."],
                                                                                ['https://fr.wikipedia.org/wiki/'
                                                                                 'OpenClassrooms']])
    """
    Cleaning Request : Use to remove stopwords in a request string
    """
    def test_cleaning_request(self):
        """
        Parse a string
        :return: cleaned request
        """
        test_result = logic.cleaning_request("Est-ce que tu connais l'adresse d'Openclassroom's ?")
        self.assertEqual(test_result, 'Openclassroom')

    '''
    GOOGLE  MAPS
    Python Functions
    '''

    def test_google_maps_request(self):
        """
        Google maps request
        :return: maps_response : [name, lat, lng, address ]
        """
        test_result = logic.google_maps_request("Openclassrooms, Paris")
        self.assertEqual(test_result, ['Openclassrooms', 48.8747578, 2.350564700000001,
                                       '7 Cité Paradis, 75010 Paris, France'])

    def test_assign_maps_data(self):
        """
        Assign data
        :return: name, lat, lng, address
        """
        data = {'html_attributions': [], 'results': [{'formatted_address': '7 Cité Paradis, 75010 Paris, France',
                                                      'geometry': {
                                                          'location': {'lat': 48.8747578, 'lng': 2.350564700000001}},
                                                      'name': 'Openclassrooms'}],
                'status': 'OK'}
        test_result = logic.assign_maps_data(data)
        self.assertEqual(test_result, ['Openclassrooms', 48.8747578, 2.350564700000001,
                                       '7 Cité Paradis, 75010 Paris, France'])

    def test_query_autocomplete_place(self):
        """
        Query for a place by auto completion
        :return: The first place returned by the query place api
        """
        test_result = logic.query_autocomplete_place('Openclas')
        self.assertEqual(test_result, 'Openclassrooms, Cité Paradis, Paris, France')

    '''
    WIKI ENCYCLOPEDIA
    Python Functions

    '''

    def test_wiki_loop_through_keywords(self):
        """
        Wiki testing each word in request
        :return: wiki answer
        """
        test_result = logic.wiki_loop_through_keywords('qdqsd sqsd Openclassrooms')
        self.assertEqual(test_result,
                         'OpenClassrooms est une école en ligne qui propose à ses membres des cours certifiants '
                         'et des parcours débouchant sur un métier d\'avenir, réalisés en interne, par des écoles, '
                         'des universités, ou encore par des entreprises partenaires comme Microsoft ou IBM.'
                         ' Jusqu\'en 2018, n\'importe quel membre du site pouvait être auteur,'
                         ' via un outil nommé "Course Lab".')

    def test_wiki_request(self):
        """
        Getting wiki answer
        :return: Wiki answer about requested area
        """
        test_result = logic.wiki_request("Openclassrooms")
        self.assertEqual(test_result,
                         'OpenClassrooms est une école en ligne qui propose à ses membres des cours certifiants et des '
                         'parcours débouchant sur un métier d\'avenir, réalisés en interne, par des écoles, des '
                         'universités, ou encore par des entreprises partenaires comme Microsoft ou IBM. '
                         'Jusqu\'en 2018, n\'importe quel membre du site pouvait être auteur, '
                         'via un outil nommé "Course Lab".')

    def test_getting_wiki_sentence(self):
        """
        Get an extract of a wiki page
        :return: wiki sentence
        """
        test_result = logic.wiki_request("Openclassrooms")
        self.assertEqual(test_result,
                         'OpenClassrooms est une école en ligne qui propose à ses membres des cours certifiants et des '
                         'parcours débouchant sur un métier d\'avenir, réalisés en interne, par des écoles, des '
                         'universités, ou encore par des entreprises partenaires comme Microsoft ou IBM. '
                         'Jusqu\'en 2018, n\'importe quel membre du site pouvait être auteur, '
                         'via un outil nommé "Course Lab".')


if __name__ == "__main__":
    unittest.main()
