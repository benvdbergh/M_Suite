# coding: utf-8

from __future__ import absolute_import
from datetime import date, datetime  # noqa: F401

from typing import List, Dict  # noqa: F401

from swagger_server.models.base_model_ import Model
from swagger_server import util


class InlineResponse200(Model):
    """NOTE: This class is auto generated by the swagger code generator program.

    Do not edit the class manually.
    """
    def __init__(self, id: str=None, message_type: str=None, callback_url: str=None):  # noqa: E501
        """InlineResponse200 - a model defined in Swagger

        :param id: The id of this InlineResponse200.  # noqa: E501
        :type id: str
        :param message_type: The message_type of this InlineResponse200.  # noqa: E501
        :type message_type: str
        :param callback_url: The callback_url of this InlineResponse200.  # noqa: E501
        :type callback_url: str
        """
        self.swagger_types = {
            'id': str,
            'message_type': str,
            'callback_url': str
        }

        self.attribute_map = {
            'id': 'id',
            'message_type': 'messageType',
            'callback_url': 'callbackUrl'
        }
        self._id = id
        self._message_type = message_type
        self._callback_url = callback_url

    @classmethod
    def from_dict(cls, dikt) -> 'InlineResponse200':
        """Returns the dict as a model

        :param dikt: A dict.
        :type: dict
        :return: The inline_response_200 of this InlineResponse200.  # noqa: E501
        :rtype: InlineResponse200
        """
        return util.deserialize_model(dikt, cls)

    @property
    def id(self) -> str:
        """Gets the id of this InlineResponse200.

        Set by VTS when the subscription is made; uniquely identifies the subscription  # noqa: E501

        :return: The id of this InlineResponse200.
        :rtype: str
        """
        return self._id

    @id.setter
    def id(self, id: str):
        """Sets the id of this InlineResponse200.

        Set by VTS when the subscription is made; uniquely identifies the subscription  # noqa: E501

        :param id: The id of this InlineResponse200.
        :type id: str
        """

        self._id = id

    @property
    def message_type(self) -> str:
        """Gets the message_type of this InlineResponse200.

        The type of messages to subscribe - mission/vehicles  # noqa: E501

        :return: The message_type of this InlineResponse200.
        :rtype: str
        """
        return self._message_type

    @message_type.setter
    def message_type(self, message_type: str):
        """Sets the message_type of this InlineResponse200.

        The type of messages to subscribe - mission/vehicles  # noqa: E501

        :param message_type: The message_type of this InlineResponse200.
        :type message_type: str
        """
        if message_type is None:
            raise ValueError("Invalid value for `message_type`, must not be `None`")  # noqa: E501

        self._message_type = message_type

    @property
    def callback_url(self) -> str:
        """Gets the callback_url of this InlineResponse200.

        The url for the subscription; events will be posted to this url  # noqa: E501

        :return: The callback_url of this InlineResponse200.
        :rtype: str
        """
        return self._callback_url

    @callback_url.setter
    def callback_url(self, callback_url: str):
        """Sets the callback_url of this InlineResponse200.

        The url for the subscription; events will be posted to this url  # noqa: E501

        :param callback_url: The callback_url of this InlineResponse200.
        :type callback_url: str
        """
        if callback_url is None:
            raise ValueError("Invalid value for `callback_url`, must not be `None`")  # noqa: E501

        self._callback_url = callback_url