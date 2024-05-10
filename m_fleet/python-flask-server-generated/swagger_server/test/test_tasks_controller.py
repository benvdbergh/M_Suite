# coding: utf-8

from __future__ import absolute_import

from flask import json
from six import BytesIO

from swagger_server.models.fulfillment_mission import FulfillmentMission  # noqa: E501
from swagger_server.models.http_error_response import HttpErrorResponse  # noqa: E501
from swagger_server.models.reason import Reason  # noqa: E501
from swagger_server.models.task import Task  # noqa: E501
from swagger_server.test import BaseTestCase


class TestTasksController(BaseTestCase):
    """TasksController integration test stubs"""

    def test_fulfillment_missions_mission_id_tasks_get(self):
        """Test case for fulfillment_missions_mission_id_tasks_get

        Gets the complete set of tasks for a specified mission.
        """
        response = self.client.open(
            '/fulfillment-missions/{missionId}/tasks'.format(mission_id='mission_id_example'),
            method='GET')
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))

    def test_fulfillment_missions_mission_id_tasks_post(self):
        """Test case for fulfillment_missions_mission_id_tasks_post

        Adds an array of tasks to the current set of tasks.
        """
        body = [Task()]
        response = self.client.open(
            '/fulfillment-missions/{missionId}/tasks'.format(mission_id='mission_id_example'),
            method='POST',
            data=json.dumps(body),
            content_type='application/json')
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))

    def test_fulfillment_missions_mission_id_tasks_task_id_get(self):
        """Test case for fulfillment_missions_mission_id_tasks_task_id_get

        Gets the specified task
        """
        response = self.client.open(
            '/fulfillment-missions/{missionId}/tasks/{taskId}'.format(mission_id='mission_id_example', task_id='task_id_example'),
            method='GET')
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))

    def test_fulfillment_missions_mission_id_tasks_task_id_put(self):
        """Test case for fulfillment_missions_mission_id_tasks_task_id_put

        Modifies a specified task within a mission.
        """
        body = Task()
        response = self.client.open(
            '/fulfillment-missions/{missionId}/tasks/{taskId}'.format(mission_id='mission_id_example', task_id='task_id_example'),
            method='PUT',
            data=json.dumps(body),
            content_type='application/json')
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))

    def test_fulfillment_missions_mission_id_tasks_task_id_resume_put(self):
        """Test case for fulfillment_missions_mission_id_tasks_task_id_resume_put

        Request to resume a task
        """
        body = Reason()
        response = self.client.open(
            '/fulfillment-missions/{missionId}/tasks/{taskId}/resume'.format(mission_id='mission_id_example', task_id='task_id_example'),
            method='PUT',
            data=json.dumps(body),
            content_type='application/json')
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))

    def test_fulfillment_missions_mission_id_tasks_task_id_stop_put(self):
        """Test case for fulfillment_missions_mission_id_tasks_task_id_stop_put

        Request to stop a task.
        """
        body = Reason()
        response = self.client.open(
            '/fulfillment-missions/{missionId}/tasks/{taskId}/stop'.format(mission_id='mission_id_example', task_id='task_id_example'),
            method='PUT',
            data=json.dumps(body),
            content_type='application/json')
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))

    def test_fulfillment_missions_mission_id_tasks_task_ids_delete(self):
        """Test case for fulfillment_missions_mission_id_tasks_task_ids_delete

        Deletes the specified task(s) from the mission.
        """
        response = self.client.open(
            '/fulfillment-missions/{missionId}/tasks/{taskIds}'.format(mission_id='mission_id_example', task_ids='task_ids_example'),
            method='DELETE')
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))


if __name__ == '__main__':
    import unittest
    unittest.main()
