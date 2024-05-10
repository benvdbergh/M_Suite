# coding: utf-8

from __future__ import absolute_import

from flask import json
from six import BytesIO

from swagger_server.models.fulfillment_mission import FulfillmentMission  # noqa: E501
from swagger_server.models.fulfillment_missions_query_response import FulfillmentMissionsQueryResponse  # noqa: E501
from swagger_server.models.http_error_response import HttpErrorResponse  # noqa: E501
from swagger_server.models.subscription import Subscription  # noqa: E501
from swagger_server.test import BaseTestCase


class TestFulfillmentMissionsController(BaseTestCase):
    """FulfillmentMissionsController integration test stubs"""

    def test_fulfillment_missions_get(self):
        """Test case for fulfillment_missions_get

        Gets all missions in the system 
        """
        query_string = [('limit', 100),
                        ('missionstates', 'missionstates_example'),
                        ('page', 1)]
        response = self.client.open(
            '/fulfillment-missions',
            method='GET',
            query_string=query_string)
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))

    def test_fulfillment_missions_id_cancel_put(self):
        """Test case for fulfillment_missions_id_cancel_put

        Cancels the specified mission
        """
        query_string = [('force', true)]
        response = self.client.open(
            '/fulfillment-missions/{id}/cancel'.format(id='id_example'),
            method='PUT',
            query_string=query_string)
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))

    def test_fulfillment_missions_id_get(self):
        """Test case for fulfillment_missions_id_get

        Gets the specified missions
        """
        response = self.client.open(
            '/fulfillment-missions/{id}'.format(id='id_example'),
            method='GET')
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))

    def test_fulfillment_missions_mission_or_task_id_syncfromrcs_post(self):
        """Test case for fulfillment_missions_mission_or_task_id_syncfromrcs_post

        Updates the status of current task in the mission with latest job state from RCS
        """
        response = self.client.open(
            '/fulfillment-missions/{missionOrTaskId}/syncfromrcs'.format(mission_or_task_id='mission_or_task_id_example'),
            method='POST')
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))

    def test_fulfillment_missions_post(self):
        """Test case for fulfillment_missions_post

        Creates the new mission
        """
        body = FulfillmentMission()
        response = self.client.open(
            '/fulfillment-missions',
            method='POST',
            data=json.dumps(body),
            content_type='application/json')
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))

    def test_fulfillment_missions_subscriptions_get(self):
        """Test case for fulfillment_missions_subscriptions_get

        Gets all mission event subscriptions in the system 
        """
        response = self.client.open(
            '/fulfillment-missions/subscriptions',
            method='GET')
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))

    def test_fulfillment_missions_subscriptions_id_delete(self):
        """Test case for fulfillment_missions_subscriptions_id_delete

        Unsubscribes to mission events
        """
        response = self.client.open(
            '/fulfillment-missions/subscriptions/{id}'.format(id='id_example'),
            method='DELETE')
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))

    def test_fulfillment_missions_subscriptions_post(self):
        """Test case for fulfillment_missions_subscriptions_post

        Subscribes to mission events
        """
        body = Subscription()
        response = self.client.open(
            '/fulfillment-missions/subscriptions',
            method='POST',
            data=json.dumps(body),
            content_type='application/json')
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))


if __name__ == '__main__':
    import unittest
    unittest.main()
