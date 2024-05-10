import connexion
import six

from swagger_server.models.http_error_response import HttpErrorResponse  # noqa: E501
from swagger_server.models.subscription import Subscription  # noqa: E501
from swagger_server import util


def load_locations_subscriptions_get():  # noqa: E501
    """Gets all load location event subscriptions in the system 

    Gets all load location event subscriptions from the database. # noqa: E501


    :rtype: List[Subscription]
    """
    return 'do some magic!'


def load_locations_subscriptions_id_delete(id):  # noqa: E501
    """Unsubscribes to load location events

    Unsubscribes from the specified subscription from VTS to stop receiving load location events. Upon successfully deleting the subscription, the deleted subscription object is returned in the response body. # noqa: E501

    :param id: The id of the subscription to cancel
    :type id: str

    :rtype: Subscription
    """
    return 'do some magic!'


def load_locations_subscriptions_post(body):  # noqa: E501
    """Subscribes to load location events

    Subscribes to load location events that will be published. Load location events are sent when load is moved around the warehouse by the AMR subsystem. Upon successful creation of the subscription, a subscription object with the ID is returned in the response body. # noqa: E501

    :param body: The new subscription to create; only the callback url needs to be specified
    :type body: dict | bytes

    :rtype: Subscription
    """
    if connexion.request.is_json:
        body = Subscription.from_dict(connexion.request.get_json())  # noqa: E501
    return 'do some magic!'
