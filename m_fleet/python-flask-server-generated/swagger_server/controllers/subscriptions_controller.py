import connexion
import six

from swagger_server.models.http_error_response import HttpErrorResponse  # noqa: E501
from swagger_server.models.subscription import Subscription  # noqa: E501
from swagger_server import util


def subscriptions_get():  # noqa: E501
    """Gets all subscriptions in the system 

    Gets the subscriptions from the database. # noqa: E501


    :rtype: List[Subscription]
    """
    return 'do some magic!'
