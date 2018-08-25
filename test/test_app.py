"""File containing all the unit tests for the application"""

import unittest
from unittest.mock import patch
import json
import logic
from views import app


class TestFlaskApp(unittest.TestCase):
    """Unit test class for """

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
    """test all functions in the 'utils.py' file"""

    def test_cleaning_request(self):
        """Cleaning request"""
        test_result = logic.cleaning_request("Je suis allé au marché")
        self.assertEqual(test_result, "allé marché")

    # Todo : Add other functions


if __name__ == "__main__":
    unittest.main()
