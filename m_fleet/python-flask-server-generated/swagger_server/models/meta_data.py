# coding: utf-8

from __future__ import absolute_import
from datetime import date, datetime  # noqa: F401

from typing import List, Dict  # noqa: F401

from swagger_server.models.base_model_ import Model
from swagger_server import util


class MetaData(Model):
    """NOTE: This class is auto generated by the swagger code generator program.

    Do not edit the class manually.
    """
    def __init__(self, key: str=None, value: str=None):  # noqa: E501
        """MetaData - a model defined in Swagger

        :param key: The key of this MetaData.  # noqa: E501
        :type key: str
        :param value: The value of this MetaData.  # noqa: E501
        :type value: str
        """
        self.swagger_types = {
            'key': str,
            'value': str
        }

        self.attribute_map = {
            'key': 'key',
            'value': 'value'
        }
        self._key = key
        self._value = value

    @classmethod
    def from_dict(cls, dikt) -> 'MetaData':
        """Returns the dict as a model

        :param dikt: A dict.
        :type: dict
        :return: The MetaData of this MetaData.  # noqa: E501
        :rtype: MetaData
        """
        return util.deserialize_model(dikt, cls)

    @property
    def key(self) -> str:
        """Gets the key of this MetaData.

        The key to identify the meta data  # noqa: E501

        :return: The key of this MetaData.
        :rtype: str
        """
        return self._key

    @key.setter
    def key(self, key: str):
        """Sets the key of this MetaData.

        The key to identify the meta data  # noqa: E501

        :param key: The key of this MetaData.
        :type key: str
        """

        self._key = key

    @property
    def value(self) -> str:
        """Gets the value of this MetaData.

        The data to store  # noqa: E501

        :return: The value of this MetaData.
        :rtype: str
        """
        return self._value

    @value.setter
    def value(self, value: str):
        """Sets the value of this MetaData.

        The data to store  # noqa: E501

        :param value: The value of this MetaData.
        :type value: str
        """

        self._value = value
