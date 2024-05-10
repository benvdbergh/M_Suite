# coding: utf-8

from __future__ import absolute_import
from datetime import date, datetime  # noqa: F401

from typing import List, Dict  # noqa: F401

from swagger_server.models.base_model_ import Model
from swagger_server.models.fulfillment_mission import FulfillmentMission  # noqa: F401,E501
from swagger_server.models.mission_warnings import MissionWarnings  # noqa: F401,E501
from swagger_server.models.all_of_mission_warning_event_event_type import AllOfMissionWarningEventEventType  # noqa: F401,E501
from swagger_server import util


class MissionWarningEvent(Model):
    """NOTE: This class is auto generated by the swagger code generator program.

    Do not edit the class manually.
    """
    def __init__(self, event_type: AllOfMissionWarningEventEventType=None, created: str=None, fulfillment_mission: FulfillmentMission=None, warning: MissionWarnings=None, message: str=None, task_host_id: str=None):  # noqa: E501
        """MissionWarningEvent - a model defined in Swagger

        :param event_type: The event_type of this MissionWarningEvent.  # noqa: E501
        :type event_type: AllOfMissionWarningEventEventType
        :param created: The created of this MissionWarningEvent.  # noqa: E501
        :type created: str
        :param fulfillment_mission: The fulfillment_mission of this MissionWarningEvent.  # noqa: E501
        :type fulfillment_mission: FulfillmentMission
        :param warning: The warning of this MissionWarningEvent.  # noqa: E501
        :type warning: MissionWarnings
        :param message: The message of this MissionWarningEvent.  # noqa: E501
        :type message: str
        :param task_host_id: The task_host_id of this MissionWarningEvent.  # noqa: E501
        :type task_host_id: str
        """
        self.swagger_types = {
            'event_type': AllOfMissionWarningEventEventType,
            'created': str,
            'fulfillment_mission': FulfillmentMission,
            'warning': MissionWarnings,
            'message': str,
            'task_host_id': str
        }

        self.attribute_map = {
            'event_type': 'eventType',
            'created': 'created',
            'fulfillment_mission': 'fulfillmentMission',
            'warning': 'warning',
            'message': 'message',
            'task_host_id': 'taskHostId'
        }
        self._event_type = event_type
        self._created = created
        self._fulfillment_mission = fulfillment_mission
        self._warning = warning
        self._message = message
        self._task_host_id = task_host_id

    @classmethod
    def from_dict(cls, dikt) -> 'MissionWarningEvent':
        """Returns the dict as a model

        :param dikt: A dict.
        :type: dict
        :return: The MissionWarningEvent of this MissionWarningEvent.  # noqa: E501
        :rtype: MissionWarningEvent
        """
        return util.deserialize_model(dikt, cls)

    @property
    def event_type(self) -> AllOfMissionWarningEventEventType:
        """Gets the event_type of this MissionWarningEvent.

        The type of this event  # noqa: E501

        :return: The event_type of this MissionWarningEvent.
        :rtype: AllOfMissionWarningEventEventType
        """
        return self._event_type

    @event_type.setter
    def event_type(self, event_type: AllOfMissionWarningEventEventType):
        """Sets the event_type of this MissionWarningEvent.

        The type of this event  # noqa: E501

        :param event_type: The event_type of this MissionWarningEvent.
        :type event_type: AllOfMissionWarningEventEventType
        """

        self._event_type = event_type

    @property
    def created(self) -> str:
        """Gets the created of this MissionWarningEvent.

        When this event was created. If the event originated in the AMR subsystem, the event creation time published by the AMR subsystem will be set, else the event creation time in VTS will be set  # noqa: E501

        :return: The created of this MissionWarningEvent.
        :rtype: str
        """
        return self._created

    @created.setter
    def created(self, created: str):
        """Sets the created of this MissionWarningEvent.

        When this event was created. If the event originated in the AMR subsystem, the event creation time published by the AMR subsystem will be set, else the event creation time in VTS will be set  # noqa: E501

        :param created: The created of this MissionWarningEvent.
        :type created: str
        """

        self._created = created

    @property
    def fulfillment_mission(self) -> FulfillmentMission:
        """Gets the fulfillment_mission of this MissionWarningEvent.


        :return: The fulfillment_mission of this MissionWarningEvent.
        :rtype: FulfillmentMission
        """
        return self._fulfillment_mission

    @fulfillment_mission.setter
    def fulfillment_mission(self, fulfillment_mission: FulfillmentMission):
        """Sets the fulfillment_mission of this MissionWarningEvent.


        :param fulfillment_mission: The fulfillment_mission of this MissionWarningEvent.
        :type fulfillment_mission: FulfillmentMission
        """

        self._fulfillment_mission = fulfillment_mission

    @property
    def warning(self) -> MissionWarnings:
        """Gets the warning of this MissionWarningEvent.


        :return: The warning of this MissionWarningEvent.
        :rtype: MissionWarnings
        """
        return self._warning

    @warning.setter
    def warning(self, warning: MissionWarnings):
        """Sets the warning of this MissionWarningEvent.


        :param warning: The warning of this MissionWarningEvent.
        :type warning: MissionWarnings
        """

        self._warning = warning

    @property
    def message(self) -> str:
        """Gets the message of this MissionWarningEvent.


        :return: The message of this MissionWarningEvent.
        :rtype: str
        """
        return self._message

    @message.setter
    def message(self, message: str):
        """Sets the message of this MissionWarningEvent.


        :param message: The message of this MissionWarningEvent.
        :type message: str
        """

        self._message = message

    @property
    def task_host_id(self) -> str:
        """Gets the task_host_id of this MissionWarningEvent.


        :return: The task_host_id of this MissionWarningEvent.
        :rtype: str
        """
        return self._task_host_id

    @task_host_id.setter
    def task_host_id(self, task_host_id: str):
        """Sets the task_host_id of this MissionWarningEvent.


        :param task_host_id: The task_host_id of this MissionWarningEvent.
        :type task_host_id: str
        """

        self._task_host_id = task_host_id
