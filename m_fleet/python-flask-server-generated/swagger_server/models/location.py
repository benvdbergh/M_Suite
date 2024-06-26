# coding: utf-8

from __future__ import absolute_import
from datetime import date, datetime  # noqa: F401

from typing import List, Dict  # noqa: F401

from swagger_server.models.base_model_ import Model
from swagger_server import util


class Location(Model):
    """NOTE: This class is auto generated by the swagger code generator program.

    Do not edit the class manually.
    """
    def __init__(self, id: str=None, warehouse_id: str=None, zone_id: str=None, area_code: str=None, x: int=None, y: int=None):  # noqa: E501
        """Location - a model defined in Swagger

        :param id: The id of this Location.  # noqa: E501
        :type id: str
        :param warehouse_id: The warehouse_id of this Location.  # noqa: E501
        :type warehouse_id: str
        :param zone_id: The zone_id of this Location.  # noqa: E501
        :type zone_id: str
        :param area_code: The area_code of this Location.  # noqa: E501
        :type area_code: str
        :param x: The x of this Location.  # noqa: E501
        :type x: int
        :param y: The y of this Location.  # noqa: E501
        :type y: int
        """
        self.swagger_types = {
            'id': str,
            'warehouse_id': str,
            'zone_id': str,
            'area_code': str,
            'x': int,
            'y': int
        }

        self.attribute_map = {
            'id': 'id',
            'warehouse_id': 'warehouseId',
            'zone_id': 'zoneId',
            'area_code': 'areaCode',
            'x': 'x',
            'y': 'y'
        }
        self._id = id
        self._warehouse_id = warehouse_id
        self._zone_id = zone_id
        self._area_code = area_code
        self._x = x
        self._y = y

    @classmethod
    def from_dict(cls, dikt) -> 'Location':
        """Returns the dict as a model

        :param dikt: A dict.
        :type: dict
        :return: The Location of this Location.  # noqa: E501
        :rtype: Location
        """
        return util.deserialize_model(dikt, cls)

    @property
    def id(self) -> str:
        """Gets the id of this Location.


        :return: The id of this Location.
        :rtype: str
        """
        return self._id

    @id.setter
    def id(self, id: str):
        """Sets the id of this Location.


        :param id: The id of this Location.
        :type id: str
        """

        self._id = id

    @property
    def warehouse_id(self) -> str:
        """Gets the warehouse_id of this Location.


        :return: The warehouse_id of this Location.
        :rtype: str
        """
        return self._warehouse_id

    @warehouse_id.setter
    def warehouse_id(self, warehouse_id: str):
        """Sets the warehouse_id of this Location.


        :param warehouse_id: The warehouse_id of this Location.
        :type warehouse_id: str
        """

        self._warehouse_id = warehouse_id

    @property
    def zone_id(self) -> str:
        """Gets the zone_id of this Location.


        :return: The zone_id of this Location.
        :rtype: str
        """
        return self._zone_id

    @zone_id.setter
    def zone_id(self, zone_id: str):
        """Sets the zone_id of this Location.


        :param zone_id: The zone_id of this Location.
        :type zone_id: str
        """

        self._zone_id = zone_id

    @property
    def area_code(self) -> str:
        """Gets the area_code of this Location.


        :return: The area_code of this Location.
        :rtype: str
        """
        return self._area_code

    @area_code.setter
    def area_code(self, area_code: str):
        """Sets the area_code of this Location.


        :param area_code: The area_code of this Location.
        :type area_code: str
        """

        self._area_code = area_code

    @property
    def x(self) -> int:
        """Gets the x of this Location.


        :return: The x of this Location.
        :rtype: int
        """
        return self._x

    @x.setter
    def x(self, x: int):
        """Sets the x of this Location.


        :param x: The x of this Location.
        :type x: int
        """

        self._x = x

    @property
    def y(self) -> int:
        """Gets the y of this Location.


        :return: The y of this Location.
        :rtype: int
        """
        return self._y

    @y.setter
    def y(self, y: int):
        """Sets the y of this Location.


        :param y: The y of this Location.
        :type y: int
        """

        self._y = y
