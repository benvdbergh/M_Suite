import connexion
import six

from swagger_server.models.http_error_response import HttpErrorResponse  # noqa: E501
from swagger_server.models.inline_response200 import InlineResponse200  # noqa: E501
from swagger_server.models.subscription import Subscription  # noqa: E501
from swagger_server.models.vehicle import Vehicle  # noqa: E501
from swagger_server.models.vehicle_stop import VehicleStop  # noqa: E501
from swagger_server import util


def vehicles_get(vehicle_ids=None):  # noqa: E501
    """Gets vehicles status data per the query parameter id&#x27;s, if not parameter is specified the it will return all available vehicles

    Gets the vehicle status info for the specified vehicles. One can request the vehicles by warehouse, by zone, or by specific vehicle Ids # noqa: E501

    :param vehicle_ids: The comma-separated list of vehicle id&#x27;s to get status data from.
    :type vehicle_ids: str

    :rtype: List[Vehicle]
    """
    return 'do some magic!'


def vehicles_resume_put(body):  # noqa: E501
    """Resume the vehicles in Whole warehouse or in a particular area. See request body

    Commands the AMR subsystem to resume suspended areas, vehicles, or the whole warehouse that was suspended by a Stop Vehicles request. If allVehicles is set to true then all vehicles will be resumed. For resuming vehicles in a particular area we need to make allVehicles as false # noqa: E501

    :param body: The vehicles to resume
    :type body: dict | bytes

    :rtype: List[Vehicle]
    """
    if connexion.request.is_json:
        body = VehicleStop.from_dict(connexion.request.get_json())  # noqa: E501
    return 'do some magic!'


def vehicles_stop_put(body):  # noqa: E501
    """Stop the vehicles in whole warehouse or in the specified area. See request body

      Commands the AMR subsystem to suspend all the vehicles specified in the body of the request. If allVehicles is set to true, then all vehicles will be stopped. For stopping vehicles in a particular area, we need to make allVehicles false. Currently, this only supports Vehicle Ids, Areas, or the whole warehouse. # noqa: E501

    :param body: The vehicles to stop
    :type body: dict | bytes

    :rtype: List[Vehicle]
    """
    if connexion.request.is_json:
        body = VehicleStop.from_dict(connexion.request.get_json())  # noqa: E501
    return 'do some magic!'


def vehicles_subscriptions_get():  # noqa: E501
    """Gets all vehicle event subscriptions in the system 

    Gets all vehicle event subscriptions from the database. # noqa: E501


    :rtype: List[Subscription]
    """
    return 'do some magic!'


def vehicles_subscriptions_id_delete(id):  # noqa: E501
    """Unsubscribes to Vehicle events

    Unsubscribes from the specified subscription from VTS to stop receiving messages. Upon successful deletion of the subscription, the deleted subscription object is returned in the response body. # noqa: E501

    :param id: The id of the subscription to cancel
    :type id: str

    :rtype: InlineResponse200
    """
    return 'do some magic!'


def vehicles_subscriptions_post(body):  # noqa: E501
    """Subscribes to vehicle events

    Subscribes to vehicle events that will be published. Vehicle events include updates about vehicles that are allocated in active VTS missions. Upon successful creation of the subscription, a subscription object with the ID is returned in the response body. # noqa: E501

    :param body: The new subscription to create; only the callback url needs to be specified
    :type body: dict | bytes

    :rtype: Subscription
    """
    if connexion.request.is_json:
        body = Subscription.from_dict(connexion.request.get_json())  # noqa: E501
    return 'do some magic!'
