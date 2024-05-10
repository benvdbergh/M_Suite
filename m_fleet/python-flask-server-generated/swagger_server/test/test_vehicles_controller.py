# coding: utf-8

from __future__ import absolute_import

from flask import json
from six import BytesIO

from swagger_server.models.http_error_response import HttpErrorResponse  # noqa: E501
from swagger_server.models.inline_response200 import InlineResponse200  # noqa: E501
from swagger_server.models.subscription import Subscription  # noqa: E501
from swagger_server.models.vehicle import Vehicle  # noqa: E501
from swagger_server.models.vehicle_stop import VehicleStop  # noqa: E501
from swagger_server.test import BaseTestCase


class TestVehiclesController(BaseTestCase):
    """VehiclesController integration test stubs"""

    def test_vehicles_get(self):
        """Test case for vehicles_get

        Gets vehicles status data per the query parameter id's, if not parameter is specified the it will return all available vehicles
        """
        query_string = [('vehicle_ids', 'vehicle_ids_example')]
        response = self.client.open(
            '/vehicles',
            method='GET',
            query_string=query_string)
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))

    def test_vehicles_resume_put(self):
        """Test case for vehicles_resume_put

        Resume the vehicles in Whole warehouse or in a particular area. See request body
        """
        body = VehicleStop()
        response = self.client.open(
            '/vehicles/resume',
            method='PUT',
            data=json.dumps(body),
            content_type='application/json')
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))

    def test_vehicles_stop_put(self):
        """Test case for vehicles_stop_put

        Stop the vehicles in whole warehouse or in the specified area. See request body
        """
        body = VehicleStop()
        response = self.client.open(
            '/vehicles/stop',
            method='PUT',
            data=json.dumps(body),
            content_type='application/json')
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))

    def test_vehicles_subscriptions_get(self):
        """Test case for vehicles_subscriptions_get

        Gets all vehicle event subscriptions in the system 
        """
        response = self.client.open(
            '/vehicles/subscriptions',
            method='GET')
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))

    def test_vehicles_subscriptions_id_delete(self):
        """Test case for vehicles_subscriptions_id_delete

        Unsubscribes to Vehicle events
        """
        response = self.client.open(
            '/vehicles/subscriptions/{id}'.format(id='id_example'),
            method='DELETE')
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))

    def test_vehicles_subscriptions_post(self):
        """Test case for vehicles_subscriptions_post

        Subscribes to vehicle events
        """
        body = Subscription()
        response = self.client.open(
            '/vehicles/subscriptions',
            method='POST',
            data=json.dumps(body),
            content_type='application/json')
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))


if __name__ == '__main__':
    import unittest
    unittest.main()
