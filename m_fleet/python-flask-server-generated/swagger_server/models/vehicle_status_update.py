# coding: utf-8

from __future__ import absolute_import
from datetime import date, datetime  # noqa: F401

from typing import List, Dict  # noqa: F401

from swagger_server.models.base_model_ import Model
from swagger_server.models.vehicle import Vehicle  # noqa: F401,E501
from swagger_server.models.all_of_vehicle_status_update_event_type import AllOfVehicleStatusUpdateEventType  # noqa: F401,E501
from swagger_server import util


class VehicleStatusUpdate(Model):
    """NOTE: This class is auto generated by the swagger code generator program.

    Do not edit the class manually.
    """
    def __init__(self, event_type: AllOfVehicleStatusUpdateEventType=None, vehicles: List[Vehicle]=None):  # noqa: E501
        """VehicleStatusUpdate - a model defined in Swagger

        :param event_type: The event_type of this VehicleStatusUpdate.  # noqa: E501
        :type event_type: AllOfVehicleStatusUpdateEventType
        :param vehicles: The vehicles of this VehicleStatusUpdate.  # noqa: E501
        :type vehicles: List[Vehicle]
        """
        self.swagger_types = {
            'event_type': AllOfVehicleStatusUpdateEventType,
            'vehicles': List[Vehicle]
        }

        self.attribute_map = {
            'event_type': 'eventType',
            'vehicles': 'vehicles'
        }
        self._event_type = event_type
        self._vehicles = vehicles

    @classmethod
    def from_dict(cls, dikt) -> 'VehicleStatusUpdate':
        """Returns the dict as a model

        :param dikt: A dict.
        :type: dict
        :return: The VehicleStatusUpdate of this VehicleStatusUpdate.  # noqa: E501
        :rtype: VehicleStatusUpdate
        """
        return util.deserialize_model(dikt, cls)

    @property
    def event_type(self) -> AllOfVehicleStatusUpdateEventType:
        """Gets the event_type of this VehicleStatusUpdate.

        Defines Vehicle events, Including updates about all vehicles and assigned vehicles that are allocated in active VTS mission  # noqa: E501

        :return: The event_type of this VehicleStatusUpdate.
        :rtype: AllOfVehicleStatusUpdateEventType
        """
        return self._event_type

    @event_type.setter
    def event_type(self, event_type: AllOfVehicleStatusUpdateEventType):
        """Sets the event_type of this VehicleStatusUpdate.

        Defines Vehicle events, Including updates about all vehicles and assigned vehicles that are allocated in active VTS mission  # noqa: E501

        :param event_type: The event_type of this VehicleStatusUpdate.
        :type event_type: AllOfVehicleStatusUpdateEventType
        """

        self._event_type = event_type

    @property
    def vehicles(self) -> List[Vehicle]:
        """Gets the vehicles of this VehicleStatusUpdate.

        Stores Vehicle status updates Including updates about all vehicles and assigned vehicles that are allocated in active VTS mission  # noqa: E501

        :return: The vehicles of this VehicleStatusUpdate.
        :rtype: List[Vehicle]
        """
        return self._vehicles

    @vehicles.setter
    def vehicles(self, vehicles: List[Vehicle]):
        """Sets the vehicles of this VehicleStatusUpdate.

        Stores Vehicle status updates Including updates about all vehicles and assigned vehicles that are allocated in active VTS mission  # noqa: E501

        :param vehicles: The vehicles of this VehicleStatusUpdate.
        :type vehicles: List[Vehicle]
        """

        self._vehicles = vehicles
