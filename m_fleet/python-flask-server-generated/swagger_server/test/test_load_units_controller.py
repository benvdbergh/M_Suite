# coding: utf-8

from __future__ import absolute_import

from flask import json
from six import BytesIO

from swagger_server.models.http_error_response import HttpErrorResponse  # noqa: E501
from swagger_server.models.load import Load  # noqa: E501
from swagger_server.models.load_types import LoadTypes  # noqa: E501
from swagger_server.test import BaseTestCase


class TestLoadUnitsController(BaseTestCase):
    """LoadUnitsController integration test stubs"""

    def test_loads_delete(self):
        """Test case for loads_delete

        Removes the load unit from the warehouse
        """
        body = Load()
        response = self.client.open(
            '/loads',
            method='DELETE',
            data=json.dumps(body),
            content_type='application/json')
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))

    def test_loads_get(self):
        """Test case for loads_get

        Gets load information from AMR subsystem for the specified type and load host ids
        """
        query_string = [('load_host_ids', 'load_host_ids_example'),
                        ('type', LoadTypes())]
        response = self.client.open(
            '/loads',
            method='GET',
            query_string=query_string)
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))

    def test_loads_post(self):
        """Test case for loads_post

        Adds the load unit into the warehouse
        """
        body = Load()
        response = self.client.open(
            '/loads',
            method='POST',
            data=json.dumps(body),
            content_type='application/json')
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))


if __name__ == '__main__':
    import unittest
    unittest.main()
