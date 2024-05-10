import connexion
import six

from swagger_server.models.fulfillment_mission import FulfillmentMission  # noqa: E501
from swagger_server.models.fulfillment_missions_query_response import FulfillmentMissionsQueryResponse  # noqa: E501
from swagger_server.models.http_error_response import HttpErrorResponse  # noqa: E501
from swagger_server.models.subscription import Subscription  # noqa: E501
from swagger_server import util


def fulfillment_missions_get(limit=None, missionstates=None, page=None):  # noqa: E501
    """Gets all missions in the system 

    Gets the missions from the database. If no filter is specified, all missions in the database are returned.  * Note this may be large and should be used with caution.  Filtering by MissionStates is recommended; something along the lines of Requested, Pending, Executing to get all current Missions in the system. # noqa: E501

    :param limit: The number of missions that should be included on each page of results.
    :type limit: int
    :param missionstates: A comma separated list of states to filter the missions; if not provided all missions are returned
    :type missionstates: str
    :param page: The index of page that should be returned.
    :type page: int

    :rtype: FulfillmentMissionsQueryResponse
    """
    return 'do some magic!'


def fulfillment_missions_id_cancel_put(id, force=None):  # noqa: E501
    """Cancels the specified mission

    Cancels the specified mission. If a task is executing, the mission state will change to CancelPending until the AMR subsystem reports that the executing task has stopped/been completed. Once all tasks are stopped, the state is changed to Cancelled, and the mission is closed. Cancelled missions cannot be restarted. Upon successful reception of the cancellation request, the mission with the updated state and tasks is returned in the response body. # noqa: E501

    :param id: The VTS ID or Host ID of the mission to cancel; this can be the task Id or the host Id
    :type id: str
    :param force: The force flag will force the cancellation of the mission regardless of its state. Only if the mission is already completed or does not exist will the cancel be rejected. If the force flag is set, no attempt to drop the load or cancel the current task is made.
    :type force: bool

    :rtype: FulfillmentMission
    """
    return 'do some magic!'


def fulfillment_missions_id_get(id):  # noqa: E501
    """Gets the specified missions

    Retrieves the mission specified by the mission Id or mission HostId or returns not found # noqa: E501

    :param id: The VTS ID or Host ID of the mission to get
    :type id: str

    :rtype: FulfillmentMission
    """
    return 'do some magic!'


def fulfillment_missions_mission_or_task_id_syncfromrcs_post(mission_or_task_id):  # noqa: E501
    """Updates the status of current task in the mission with latest job state from RCS

    Updates the status of current task in the mission with latest job state from RCS. This API can be used to resume missions &#x27;stuck&#x27; because of events not reaching VTS from RCS The latest state of the mission is returned in the response body. # noqa: E501

    :param mission_or_task_id: The mission Id or task Id to sync with RCS
    :type mission_or_task_id: str

    :rtype: FulfillmentMission
    """
    return 'do some magic!'


async def fulfillment_missions_post(body):  # noqa: E501
    """Creates the new mission

    Creates a new mission in VTS. Once the fulfillment mission is created, if no sequence is designated in the tasks level, the first task will be executed fallows the FIFO order, and the mission will execute until completion. If the mission is created successfully, the new mission is returned to the response body. # noqa: E501

    :param body: The new mission to create
    :type body: dict | bytes

    :rtype: FulfillmentMission
    """
    if connexion.request.content_type == 'application/json':
        json_data = await connexion.request.json()
        print(json_data)
        body = FulfillmentMission.from_dict(json_data)  # noqa: E501
    return body


def fulfillment_missions_subscriptions_get():  # noqa: E501
    """Gets all mission event subscriptions in the system 

    Gets all mission event subscriptions from the database. # noqa: E501


    :rtype: List[Subscription]
    """
    return 'do some magic!'


def fulfillment_missions_subscriptions_id_delete(id):  # noqa: E501
    """Unsubscribes to mission events

    Unsubscribes from the specified subscription from VTS to stop receiving mission events. Upon successfully deleting the subscription, the deleted subscription object is returned in the response body. # noqa: E501

    :param id: The id of the subscription to cancel
    :type id: str

    :rtype: Subscription
    """
    return 'do some magic!'


def fulfillment_missions_subscriptions_post(body):  # noqa: E501
    """Subscribes to mission events

    Subscribes to mission events that will be published. Mission events include Task Updates including state changes, Mission State Changes. Upon successful creation of the subscription, a subscription object with the ID is returned in the response body. # noqa: E501

    :param body: The new subscription to create; only the callback url needs to be specified
    :type body: dict | bytes

    :rtype: Subscription
    """
    if connexion.request.is_json:
        body = Subscription.from_dict(connexion.request.get_json())  # noqa: E501
    return 'do some magic!'
