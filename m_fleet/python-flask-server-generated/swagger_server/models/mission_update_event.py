# coding: utf-8

from __future__ import absolute_import
from datetime import date, datetime  # noqa: F401

from typing import List, Dict  # noqa: F401

from swagger_server.models.base_model_ import Model
from swagger_server.models.fulfillment_mission import FulfillmentMission  # noqa: F401,E501
from swagger_server.models.all_of_mission_update_event_event_type import AllOfMissionUpdateEventEventType  # noqa: F401,E501
from swagger_server import util


class MissionUpdateEvent(Model):
    """NOTE: This class is auto generated by the swagger code generator program.

    Do not edit the class manually.
    """
    def __init__(self, event_type: AllOfMissionUpdateEventEventType=None, created: str=None, fulfillment_mission: FulfillmentMission=None):  # noqa: E501
        """MissionUpdateEvent - a model defined in Swagger

        :param event_type: The event_type of this MissionUpdateEvent.  # noqa: E501
        :type event_type: AllOfMissionUpdateEventEventType
        :param created: The created of this MissionUpdateEvent.  # noqa: E501
        :type created: str
        :param fulfillment_mission: The fulfillment_mission of this MissionUpdateEvent.  # noqa: E501
        :type fulfillment_mission: FulfillmentMission
        """
        self.swagger_types = {
            'event_type': AllOfMissionUpdateEventEventType,
            'created': str,
            'fulfillment_mission': FulfillmentMission
        }

        self.attribute_map = {
            'event_type': 'eventType',
            'created': 'created',
            'fulfillment_mission': 'fulfillmentMission'
        }
        self._event_type = event_type
        self._created = created
        self._fulfillment_mission = fulfillment_mission

    @classmethod
    def from_dict(cls, dikt) -> 'MissionUpdateEvent':
        """Returns the dict as a model

        :param dikt: A dict.
        :type: dict
        :return: The MissionUpdateEvent of this MissionUpdateEvent.  # noqa: E501
        :rtype: MissionUpdateEvent
        """
        return util.deserialize_model(dikt, cls)

    @property
    def event_type(self) -> AllOfMissionUpdateEventEventType:
        """Gets the event_type of this MissionUpdateEvent.

        The type of this event  # noqa: E501

        :return: The event_type of this MissionUpdateEvent.
        :rtype: AllOfMissionUpdateEventEventType
        """
        return self._event_type

    @event_type.setter
    def event_type(self, event_type: AllOfMissionUpdateEventEventType):
        """Sets the event_type of this MissionUpdateEvent.

        The type of this event  # noqa: E501

        :param event_type: The event_type of this MissionUpdateEvent.
        :type event_type: AllOfMissionUpdateEventEventType
        """

        self._event_type = event_type

    @property
    def created(self) -> str:
        """Gets the created of this MissionUpdateEvent.

        When this event was created. If the event originated in the AMR subsystem, the event creation time published by the AMR subsystem will be set, else the event creation time in VTS will be set  # noqa: E501

        :return: The created of this MissionUpdateEvent.
        :rtype: str
        """
        return self._created

    @created.setter
    def created(self, created: str):
        """Sets the created of this MissionUpdateEvent.

        When this event was created. If the event originated in the AMR subsystem, the event creation time published by the AMR subsystem will be set, else the event creation time in VTS will be set  # noqa: E501

        :param created: The created of this MissionUpdateEvent.
        :type created: str
        """

        self._created = created

    @property
    def fulfillment_mission(self) -> FulfillmentMission:
        """Gets the fulfillment_mission of this MissionUpdateEvent.


        :return: The fulfillment_mission of this MissionUpdateEvent.
        :rtype: FulfillmentMission
        """
        return self._fulfillment_mission

    @fulfillment_mission.setter
    def fulfillment_mission(self, fulfillment_mission: FulfillmentMission):
        """Sets the fulfillment_mission of this MissionUpdateEvent.


        :param fulfillment_mission: The fulfillment_mission of this MissionUpdateEvent.
        :type fulfillment_mission: FulfillmentMission
        """

        self._fulfillment_mission = fulfillment_mission
