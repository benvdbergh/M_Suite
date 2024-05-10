# coding: utf-8

from __future__ import absolute_import

from flask import json
from six import BytesIO

from swagger_server.models.http_error_response import HttpErrorResponse  # noqa: E501
from swagger_server.models.subscription import Subscription  # noqa: E501
from swagger_server.test import BaseTestCase


class TestLoadLocationsController(BaseTestCase):
    """LoadLocationsController integration test stubs"""

    def test_load_locations_subscriptions_get(self):
        """Test case for load_locations_subscriptions_get

        Gets all load location event subscriptions in the system 
        """
        response = self.client.open(
            '/load-locations/subscriptions',
            method='GET')
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))

    def test_load_locations_subscriptions_id_delete(self):
        """Test case for load_locations_subscriptions_id_delete

        Unsubscribes to load location events
        """
        response = self.client.open(
            '/load-locations/subscriptions/{id}'.format(id='id_example'),
            method='DELETE')
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))

    def test_load_locations_subscriptions_post(self):
        """Test case for load_locations_subscriptions_post

        Subscribes to load location events
        """
        body = Subscription()
        response = self.client.open(
            '/load-locations/subscriptions',
            method='POST',
            data=json.dumps(body),
            content_type='application/json')
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))


if __name__ == '__main__':
    import unittest
    unittest.main()
