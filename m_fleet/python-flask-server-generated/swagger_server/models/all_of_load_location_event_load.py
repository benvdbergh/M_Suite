# coding: utf-8

from __future__ import absolute_import
from datetime import date, datetime  # noqa: F401

from typing import List, Dict  # noqa: F401

from swagger_server.models.base_model_ import Model
from swagger_server.models.load import Load  # noqa: F401,E501
from swagger_server.models.meta_data import MetaData  # noqa: F401,E501
from swagger_server import util


class AllOfLoadLocationEventLoad(Model):
    """NOTE: This class is auto generated by the swagger code generator program.

    Do not edit the class manually.
    """
    def __init__(self, load_host_id: str=None, load_type_id: str=None, location_id: str=None, count: int=None, type: str=None, dimensions: object=None, custom_meta_data: List[MetaData]=None, load_id: str=None, status: str=None):  # noqa: E501
        """AllOfLoadLocationEventLoad - a model defined in Swagger

        :param load_host_id: The load_host_id of this AllOfLoadLocationEventLoad.  # noqa: E501
        :type load_host_id: str
        :param load_type_id: The load_type_id of this AllOfLoadLocationEventLoad.  # noqa: E501
        :type load_type_id: str
        :param location_id: The location_id of this AllOfLoadLocationEventLoad.  # noqa: E501
        :type location_id: str
        :param count: The count of this AllOfLoadLocationEventLoad.  # noqa: E501
        :type count: int
        :param type: The type of this AllOfLoadLocationEventLoad.  # noqa: E501
        :type type: str
        :param dimensions: The dimensions of this AllOfLoadLocationEventLoad.  # noqa: E501
        :type dimensions: object
        :param custom_meta_data: The custom_meta_data of this AllOfLoadLocationEventLoad.  # noqa: E501
        :type custom_meta_data: List[MetaData]
        :param load_id: The load_id of this AllOfLoadLocationEventLoad.  # noqa: E501
        :type load_id: str
        :param status: The status of this AllOfLoadLocationEventLoad.  # noqa: E501
        :type status: str
        """
        self.swagger_types = {
            'load_host_id': str,
            'load_type_id': str,
            'location_id': str,
            'count': int,
            'type': str,
            'dimensions': object,
            'custom_meta_data': List[MetaData],
            'load_id': str,
            'status': str
        }

        self.attribute_map = {
            'load_host_id': 'loadHostId',
            'load_type_id': 'loadTypeId',
            'location_id': 'locationId',
            'count': 'count',
            'type': 'type',
            'dimensions': 'dimensions',
            'custom_meta_data': 'customMetaData',
            'load_id': 'loadId',
            'status': 'status'
        }
        self._load_host_id = load_host_id
        self._load_type_id = load_type_id
        self._location_id = location_id
        self._count = count
        self._type = type
        self._dimensions = dimensions
        self._custom_meta_data = custom_meta_data
        self._load_id = load_id
        self._status = status

    @classmethod
    def from_dict(cls, dikt) -> 'AllOfLoadLocationEventLoad':
        """Returns the dict as a model

        :param dikt: A dict.
        :type: dict
        :return: The AllOfLoadLocationEventLoad of this AllOfLoadLocationEventLoad.  # noqa: E501
        :rtype: AllOfLoadLocationEventLoad
        """
        return util.deserialize_model(dikt, cls)

    @property
    def load_host_id(self) -> str:
        """Gets the load_host_id of this AllOfLoadLocationEventLoad.

        Client identifier for this load. Mandatory for Pick and Drop task types.  # noqa: E501

        :return: The load_host_id of this AllOfLoadLocationEventLoad.
        :rtype: str
        """
        return self._load_host_id

    @load_host_id.setter
    def load_host_id(self, load_host_id: str):
        """Sets the load_host_id of this AllOfLoadLocationEventLoad.

        Client identifier for this load. Mandatory for Pick and Drop task types.  # noqa: E501

        :param load_host_id: The load_host_id of this AllOfLoadLocationEventLoad.
        :type load_host_id: str
        """

        self._load_host_id = load_host_id

    @property
    def load_type_id(self) -> str:
        """Gets the load_type_id of this AllOfLoadLocationEventLoad.

        The ID of the type of load  # noqa: E501

        :return: The load_type_id of this AllOfLoadLocationEventLoad.
        :rtype: str
        """
        return self._load_type_id

    @load_type_id.setter
    def load_type_id(self, load_type_id: str):
        """Sets the load_type_id of this AllOfLoadLocationEventLoad.

        The ID of the type of load  # noqa: E501

        :param load_type_id: The load_type_id of this AllOfLoadLocationEventLoad.
        :type load_type_id: str
        """

        self._load_type_id = load_type_id

    @property
    def location_id(self) -> str:
        """Gets the location_id of this AllOfLoadLocationEventLoad.

        The ID of the location of the load  # noqa: E501

        :return: The location_id of this AllOfLoadLocationEventLoad.
        :rtype: str
        """
        return self._location_id

    @location_id.setter
    def location_id(self, location_id: str):
        """Sets the location_id of this AllOfLoadLocationEventLoad.

        The ID of the location of the load  # noqa: E501

        :param location_id: The location_id of this AllOfLoadLocationEventLoad.
        :type location_id: str
        """

        self._location_id = location_id

    @property
    def count(self) -> int:
        """Gets the count of this AllOfLoadLocationEventLoad.

        The count of object within the load  # noqa: E501

        :return: The count of this AllOfLoadLocationEventLoad.
        :rtype: int
        """
        return self._count

    @count.setter
    def count(self, count: int):
        """Sets the count of this AllOfLoadLocationEventLoad.

        The count of object within the load  # noqa: E501

        :param count: The count of this AllOfLoadLocationEventLoad.
        :type count: int
        """

        self._count = count

    @property
    def type(self) -> str:
        """Gets the type of this AllOfLoadLocationEventLoad.

        The type of load  # noqa: E501

        :return: The type of this AllOfLoadLocationEventLoad.
        :rtype: str
        """
        return self._type

    @type.setter
    def type(self, type: str):
        """Sets the type of this AllOfLoadLocationEventLoad.

        The type of load  # noqa: E501

        :param type: The type of this AllOfLoadLocationEventLoad.
        :type type: str
        """

        self._type = type

    @property
    def dimensions(self) -> object:
        """Gets the dimensions of this AllOfLoadLocationEventLoad.

        The dimensions of the load  # noqa: E501

        :return: The dimensions of this AllOfLoadLocationEventLoad.
        :rtype: object
        """
        return self._dimensions

    @dimensions.setter
    def dimensions(self, dimensions: object):
        """Sets the dimensions of this AllOfLoadLocationEventLoad.

        The dimensions of the load  # noqa: E501

        :param dimensions: The dimensions of this AllOfLoadLocationEventLoad.
        :type dimensions: object
        """

        self._dimensions = dimensions

    @property
    def custom_meta_data(self) -> List[MetaData]:
        """Gets the custom_meta_data of this AllOfLoadLocationEventLoad.

        A collection of custom meta data to store with the load  # noqa: E501

        :return: The custom_meta_data of this AllOfLoadLocationEventLoad.
        :rtype: List[MetaData]
        """
        return self._custom_meta_data

    @custom_meta_data.setter
    def custom_meta_data(self, custom_meta_data: List[MetaData]):
        """Sets the custom_meta_data of this AllOfLoadLocationEventLoad.

        A collection of custom meta data to store with the load  # noqa: E501

        :param custom_meta_data: The custom_meta_data of this AllOfLoadLocationEventLoad.
        :type custom_meta_data: List[MetaData]
        """

        self._custom_meta_data = custom_meta_data

    @property
    def load_id(self) -> str:
        """Gets the load_id of this AllOfLoadLocationEventLoad.

        The VTS ID of the load  # noqa: E501

        :return: The load_id of this AllOfLoadLocationEventLoad.
        :rtype: str
        """
        return self._load_id

    @load_id.setter
    def load_id(self, load_id: str):
        """Sets the load_id of this AllOfLoadLocationEventLoad.

        The VTS ID of the load  # noqa: E501

        :param load_id: The load_id of this AllOfLoadLocationEventLoad.
        :type load_id: str
        """

        self._load_id = load_id

    @property
    def status(self) -> str:
        """Gets the status of this AllOfLoadLocationEventLoad.

        The status of the load  # noqa: E501

        :return: The status of this AllOfLoadLocationEventLoad.
        :rtype: str
        """
        return self._status

    @status.setter
    def status(self, status: str):
        """Sets the status of this AllOfLoadLocationEventLoad.

        The status of the load  # noqa: E501

        :param status: The status of this AllOfLoadLocationEventLoad.
        :type status: str
        """

        self._status = status
