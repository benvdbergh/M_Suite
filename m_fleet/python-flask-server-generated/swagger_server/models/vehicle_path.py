# coding: utf-8

from __future__ import absolute_import
from datetime import date, datetime  # noqa: F401

from typing import List, Dict  # noqa: F401

from swagger_server.models.base_model_ import Model
from swagger_server import util


class VehiclePath(Model):
    """NOTE: This class is auto generated by the swagger code generator program.

    Do not edit the class manually.
    """
    def __init__(self, x: int=None, y: int=None, location_id: str=None):  # noqa: E501
        """VehiclePath - a model defined in Swagger

        :param x: The x of this VehiclePath.  # noqa: E501
        :type x: int
        :param y: The y of this VehiclePath.  # noqa: E501
        :type y: int
        :param location_id: The location_id of this VehiclePath.  # noqa: E501
        :type location_id: str
        """
        self.swagger_types = {
            'x': int,
            'y': int,
            'location_id': str
        }

        self.attribute_map = {
            'x': 'x',
            'y': 'y',
            'location_id': 'locationId'
        }
        self._x = x
        self._y = y
        self._location_id = location_id

    @classmethod
    def from_dict(cls, dikt) -> 'VehiclePath':
        """Returns the dict as a model

        :param dikt: A dict.
        :type: dict
        :return: The VehiclePath of this VehiclePath.  # noqa: E501
        :rtype: VehiclePath
        """
        return util.deserialize_model(dikt, cls)

    @property
    def x(self) -> int:
        """Gets the x of this VehiclePath.

        X coordinate of particular vehicle assigned to a task  # noqa: E501

        :return: The x of this VehiclePath.
        :rtype: int
        """
        return self._x

    @x.setter
    def x(self, x: int):
        """Sets the x of this VehiclePath.

        X coordinate of particular vehicle assigned to a task  # noqa: E501

        :param x: The x of this VehiclePath.
        :type x: int
        """

        self._x = x

    @property
    def y(self) -> int:
        """Gets the y of this VehiclePath.

        Y coordinate of particular vehicle assigned to a task  # noqa: E501

        :return: The y of this VehiclePath.
        :rtype: int
        """
        return self._y

    @y.setter
    def y(self, y: int):
        """Sets the y of this VehiclePath.

        Y coordinate of particular vehicle assigned to a task  # noqa: E501

        :param y: The y of this VehiclePath.
        :type y: int
        """

        self._y = y

    @property
    def location_id(self) -> str:
        """Gets the location_id of this VehiclePath.

        Current location of particular vehicle assigned to a task  # noqa: E501

        :return: The location_id of this VehiclePath.
        :rtype: str
        """
        return self._location_id

    @location_id.setter
    def location_id(self, location_id: str):
        """Sets the location_id of this VehiclePath.

        Current location of particular vehicle assigned to a task  # noqa: E501

        :param location_id: The location_id of this VehiclePath.
        :type location_id: str
        """

        self._location_id = location_id