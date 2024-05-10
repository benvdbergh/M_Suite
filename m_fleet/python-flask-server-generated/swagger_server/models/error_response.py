# coding: utf-8

from __future__ import absolute_import
from datetime import date, datetime  # noqa: F401

from typing import List, Dict  # noqa: F401

from swagger_server.models.base_model_ import Model
from swagger_server import util


class ErrorResponse(Model):
    """NOTE: This class is auto generated by the swagger code generator program.

    Do not edit the class manually.
    """
    def __init__(self, message: str=None):  # noqa: E501
        """ErrorResponse - a model defined in Swagger

        :param message: The message of this ErrorResponse.  # noqa: E501
        :type message: str
        """
        self.swagger_types = {
            'message': str
        }

        self.attribute_map = {
            'message': 'message'
        }
        self._message = message

    @classmethod
    def from_dict(cls, dikt) -> 'ErrorResponse':
        """Returns the dict as a model

        :param dikt: A dict.
        :type: dict
        :return: The ErrorResponse of this ErrorResponse.  # noqa: E501
        :rtype: ErrorResponse
        """
        return util.deserialize_model(dikt, cls)

    @property
    def message(self) -> str:
        """Gets the message of this ErrorResponse.

        The response body for HTTP errors reported back to the client  # noqa: E501

        :return: The message of this ErrorResponse.
        :rtype: str
        """
        return self._message

    @message.setter
    def message(self, message: str):
        """Sets the message of this ErrorResponse.

        The response body for HTTP errors reported back to the client  # noqa: E501

        :param message: The message of this ErrorResponse.
        :type message: str
        """

        self._message = message
