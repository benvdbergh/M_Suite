# coding: utf-8

from __future__ import absolute_import

from flask import json
from six import BytesIO

from swagger_server.models.http_error_response import HttpErrorResponse  # noqa: E501
from swagger_server.models.subscription import Subscription  # noqa: E501
from swagger_server.test import BaseTestCase


class TestSubscriptionsController(BaseTestCase):
    """SubscriptionsController integration test stubs"""

    def test_subscriptions_get(self):
        """Test case for subscriptions_get

        Gets all subscriptions in the system 
        """
        response = self.client.open(
            '/subscriptions',
            method='GET')
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))


if __name__ == '__main__':
    import unittest
    unittest.main()
