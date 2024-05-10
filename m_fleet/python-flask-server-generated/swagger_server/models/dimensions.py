# coding: utf-8

from __future__ import absolute_import
from datetime import date, datetime  # noqa: F401

from typing import List, Dict  # noqa: F401

from swagger_server.models.base_model_ import Model
from swagger_server.models.all_of_dimensions_unit_system import AllOfDimensionsUnitSystem  # noqa: F401,E501
from swagger_server import util


class Dimensions(Model):
    """NOTE: This class is auto generated by the swagger code generator program.

    Do not edit the class manually.
    """
    def __init__(self, length: float=None, width: float=None, height: float=None, weight_limit: float=None, weight: float=None, unit_system: AllOfDimensionsUnitSystem=None):  # noqa: E501
        """Dimensions - a model defined in Swagger

        :param length: The length of this Dimensions.  # noqa: E501
        :type length: float
        :param width: The width of this Dimensions.  # noqa: E501
        :type width: float
        :param height: The height of this Dimensions.  # noqa: E501
        :type height: float
        :param weight_limit: The weight_limit of this Dimensions.  # noqa: E501
        :type weight_limit: float
        :param weight: The weight of this Dimensions.  # noqa: E501
        :type weight: float
        :param unit_system: The unit_system of this Dimensions.  # noqa: E501
        :type unit_system: AllOfDimensionsUnitSystem
        """
        self.swagger_types = {
            'length': float,
            'width': float,
            'height': float,
            'weight_limit': float,
            'weight': float,
            'unit_system': AllOfDimensionsUnitSystem
        }

        self.attribute_map = {
            'length': 'length',
            'width': 'width',
            'height': 'height',
            'weight_limit': 'weightLimit',
            'weight': 'weight',
            'unit_system': 'unitSystem'
        }
        self._length = length
        self._width = width
        self._height = height
        self._weight_limit = weight_limit
        self._weight = weight
        self._unit_system = unit_system

    @classmethod
    def from_dict(cls, dikt) -> 'Dimensions':
        """Returns the dict as a model

        :param dikt: A dict.
        :type: dict
        :return: The Dimensions of this Dimensions.  # noqa: E501
        :rtype: Dimensions
        """
        return util.deserialize_model(dikt, cls)

    @property
    def length(self) -> float:
        """Gets the length of this Dimensions.

        Defines the length of the object in the length units of the specified units system  # noqa: E501

        :return: The length of this Dimensions.
        :rtype: float
        """
        return self._length

    @length.setter
    def length(self, length: float):
        """Sets the length of this Dimensions.

        Defines the length of the object in the length units of the specified units system  # noqa: E501

        :param length: The length of this Dimensions.
        :type length: float
        """

        self._length = length

    @property
    def width(self) -> float:
        """Gets the width of this Dimensions.

        Defines the width of the object in the length units of the specified units system  # noqa: E501

        :return: The width of this Dimensions.
        :rtype: float
        """
        return self._width

    @width.setter
    def width(self, width: float):
        """Sets the width of this Dimensions.

        Defines the width of the object in the length units of the specified units system  # noqa: E501

        :param width: The width of this Dimensions.
        :type width: float
        """

        self._width = width

    @property
    def height(self) -> float:
        """Gets the height of this Dimensions.

        Defines the height of the object in the length units of the specified units system  # noqa: E501

        :return: The height of this Dimensions.
        :rtype: float
        """
        return self._height

    @height.setter
    def height(self, height: float):
        """Sets the height of this Dimensions.

        Defines the height of the object in the length units of the specified units system  # noqa: E501

        :param height: The height of this Dimensions.
        :type height: float
        """

        self._height = height

    @property
    def weight_limit(self) -> float:
        """Gets the weight_limit of this Dimensions.

        Defines the weight limit of the load in the weight units of the specified units system  # noqa: E501

        :return: The weight_limit of this Dimensions.
        :rtype: float
        """
        return self._weight_limit

    @weight_limit.setter
    def weight_limit(self, weight_limit: float):
        """Sets the weight_limit of this Dimensions.

        Defines the weight limit of the load in the weight units of the specified units system  # noqa: E501

        :param weight_limit: The weight_limit of this Dimensions.
        :type weight_limit: float
        """

        self._weight_limit = weight_limit

    @property
    def weight(self) -> float:
        """Gets the weight of this Dimensions.

        Defines the weight of the load in the weight units of the specified units system  # noqa: E501

        :return: The weight of this Dimensions.
        :rtype: float
        """
        return self._weight

    @weight.setter
    def weight(self, weight: float):
        """Sets the weight of this Dimensions.

        Defines the weight of the load in the weight units of the specified units system  # noqa: E501

        :param weight: The weight of this Dimensions.
        :type weight: float
        """

        self._weight = weight

    @property
    def unit_system(self) -> AllOfDimensionsUnitSystem:
        """Gets the unit_system of this Dimensions.

        The unit system used as the units for all the measurements in the object  # noqa: E501

        :return: The unit_system of this Dimensions.
        :rtype: AllOfDimensionsUnitSystem
        """
        return self._unit_system

    @unit_system.setter
    def unit_system(self, unit_system: AllOfDimensionsUnitSystem):
        """Sets the unit_system of this Dimensions.

        The unit system used as the units for all the measurements in the object  # noqa: E501

        :param unit_system: The unit_system of this Dimensions.
        :type unit_system: AllOfDimensionsUnitSystem
        """

        self._unit_system = unit_system
