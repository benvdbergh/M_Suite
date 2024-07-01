# coding: utf-8

from __future__ import absolute_import
from datetime import date, datetime  # noqa: F401

from typing import List, Dict  # noqa: F401

from swagger_server.models.base_model_ import Model
from swagger_server import util


class VehicleStop(Model):
    """NOTE: This class is auto generated by the swagger code generator program.

    Do not edit the class manually.
    """
    def __init__(self, all_vehicles: bool=None, zone_ids: List[str]=None, vehicle_ids: List[str]=None, reason: str=None, area_codes: List[str]=None):  # noqa: E501
        """VehicleStop - a model defined in Swagger

        :param all_vehicles: The all_vehicles of this VehicleStop.  # noqa: E501
        :type all_vehicles: bool
        :param zone_ids: The zone_ids of this VehicleStop.  # noqa: E501
        :type zone_ids: List[str]
        :param vehicle_ids: The vehicle_ids of this VehicleStop.  # noqa: E501
        :type vehicle_ids: List[str]
        :param reason: The reason of this VehicleStop.  # noqa: E501
        :type reason: str
        :param area_codes: The area_codes of this VehicleStop.  # noqa: E501
        :type area_codes: List[str]
        """
        self.swagger_types = {
            'all_vehicles': bool,
            'zone_ids': List[str],
            'vehicle_ids': List[str],
            'reason': str,
            'area_codes': List[str]
        }

        self.attribute_map = {
            'all_vehicles': 'allVehicles',
            'zone_ids': 'zoneIds',
            'vehicle_ids': 'vehicleIds',
            'reason': 'reason',
            'area_codes': 'areaCodes'
        }
        self._all_vehicles = all_vehicles
        self._zone_ids = zone_ids
        self._vehicle_ids = vehicle_ids
        self._reason = reason
        self._area_codes = area_codes

    @classmethod
    def from_dict(cls, dikt) -> 'VehicleStop':
        """Returns the dict as a model

        :param dikt: A dict.
        :type: dict
        :return: The VehicleStop of this VehicleStop.  # noqa: E501
        :rtype: VehicleStop
        """
        return util.deserialize_model(dikt, cls)

    @property
    def all_vehicles(self) -> bool:
        """Gets the all_vehicles of this VehicleStop.

        If set to true all vehicles are stopped or resumed regardless of other fields. This is not supported by all AMR subsystems  # noqa: E501

        :return: The all_vehicles of this VehicleStop.
        :rtype: bool
        """
        return self._all_vehicles

    @all_vehicles.setter
    def all_vehicles(self, all_vehicles: bool):
        """Sets the all_vehicles of this VehicleStop.

        If set to true all vehicles are stopped or resumed regardless of other fields. This is not supported by all AMR subsystems  # noqa: E501

        :param all_vehicles: The all_vehicles of this VehicleStop.
        :type all_vehicles: bool
        """
        if all_vehicles is None:
            raise ValueError("Invalid value for `all_vehicles`, must not be `None`")  # noqa: E501

        self._all_vehicles = all_vehicles

    @property
    def zone_ids(self) -> List[str]:
        """Gets the zone_ids of this VehicleStop.

        Optional if the request is to stop or resume all vehicles in specified zones. All vehicles in the specified zones will be stopped or resumed. This is not supported by all AMR subsystems  # noqa: E501

        :return: The zone_ids of this VehicleStop.
        :rtype: List[str]
        """
        return self._zone_ids

    @zone_ids.setter
    def zone_ids(self, zone_ids: List[str]):
        """Sets the zone_ids of this VehicleStop.

        Optional if the request is to stop or resume all vehicles in specified zones. All vehicles in the specified zones will be stopped or resumed. This is not supported by all AMR subsystems  # noqa: E501

        :param zone_ids: The zone_ids of this VehicleStop.
        :type zone_ids: List[str]
        """

        self._zone_ids = zone_ids

    @property
    def vehicle_ids(self) -> List[str]:
        """Gets the vehicle_ids of this VehicleStop.

        Optional- defines the list of vehicles by ID to stop or resume. This is not supported by all AMR subsystems  # noqa: E501

        :return: The vehicle_ids of this VehicleStop.
        :rtype: List[str]
        """
        return self._vehicle_ids

    @vehicle_ids.setter
    def vehicle_ids(self, vehicle_ids: List[str]):
        """Sets the vehicle_ids of this VehicleStop.

        Optional- defines the list of vehicles by ID to stop or resume. This is not supported by all AMR subsystems  # noqa: E501

        :param vehicle_ids: The vehicle_ids of this VehicleStop.
        :type vehicle_ids: List[str]
        """

        self._vehicle_ids = vehicle_ids

    @property
    def reason(self) -> str:
        """Gets the reason of this VehicleStop.

        Reason to stop or resume. This is not supported by all AMR subsystems  # noqa: E501

        :return: The reason of this VehicleStop.
        :rtype: str
        """
        return self._reason

    @reason.setter
    def reason(self, reason: str):
        """Sets the reason of this VehicleStop.

        Reason to stop or resume. This is not supported by all AMR subsystems  # noqa: E501

        :param reason: The reason of this VehicleStop.
        :type reason: str
        """

        self._reason = reason

    @property
    def area_codes(self) -> List[str]:
        """Gets the area_codes of this VehicleStop.

        Defines the list of area codes for which vehicles should be stopped or resumed. This must be specified if the `allVehicles` is false. Areas are defined in the AMR subsystems. This is not supported by all AMR subsystems.  # noqa: E501

        :return: The area_codes of this VehicleStop.
        :rtype: List[str]
        """
        return self._area_codes

    @area_codes.setter
    def area_codes(self, area_codes: List[str]):
        """Sets the area_codes of this VehicleStop.

        Defines the list of area codes for which vehicles should be stopped or resumed. This must be specified if the `allVehicles` is false. Areas are defined in the AMR subsystems. This is not supported by all AMR subsystems.  # noqa: E501

        :param area_codes: The area_codes of this VehicleStop.
        :type area_codes: List[str]
        """

        self._area_codes = area_codes