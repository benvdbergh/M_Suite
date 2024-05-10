import connexion
import six

from swagger_server.models.fulfillment_mission import FulfillmentMission  # noqa: E501
from swagger_server.models.http_error_response import HttpErrorResponse  # noqa: E501
from swagger_server.models.reason import Reason  # noqa: E501
from swagger_server.models.task import Task  # noqa: E501
from swagger_server import util


def fulfillment_missions_mission_id_tasks_get(mission_id):  # noqa: E501
    """Gets the complete set of tasks for a specified mission.

    Returns the array of tasks from the specified mission in the response body. # noqa: E501

    :param mission_id: The VTS ID or Host ID of the mission to get the tasks
    :type mission_id: str

    :rtype: List[Task]
    """
    return 'do some magic!'


def fulfillment_missions_mission_id_tasks_post(body, mission_id):  # noqa: E501
    """Adds an array of tasks to the current set of tasks.

    Adds the task(s) to the given specified mission. Tasks are re-sequenced based on the new sequence valuesspecified in the added tasks. Tasks cannot be inserted before or at the sequence number that is currently executing,even if it is paused. The updated mission with the new added task(s) and updated tasks is returned in the response body if successful. # noqa: E501

    :param body: The collection of tasks to add to the mission
    :type body: list | bytes
    :param mission_id: The VTS ID or Host ID of the mission to add the tasks to
    :type mission_id: str

    :rtype: FulfillmentMission
    """
    if connexion.request.is_json:
        body = [Task.from_dict(d) for d in connexion.request.get_json()]  # noqa: E501
    return 'do some magic!'


def fulfillment_missions_mission_id_tasks_task_id_get(mission_id, task_id):  # noqa: E501
    """Gets the specified task

    Returns the task by id from the specified missionId if found, # noqa: E501

    :param mission_id: The VTS ID or Host ID of the mission to get the task from
    :type mission_id: str
    :param task_id: The VTS ID or Host ID of the task to get
    :type task_id: str

    :rtype: Task
    """
    return 'do some magic!'


def fulfillment_missions_mission_id_tasks_task_id_put(body, mission_id, task_id):  # noqa: E501
    """Modifies a specified task within a mission.

    Modifies the specified task by merging in the given task with the existing task. Only writable fields can be updated. Tasks completed or executing cannot be modified. Modifying the sequence value of a task will re-sequence the remaining tasks accordingly.  The updated mission with the updated task and updated existing tasks is returned in the response body if successful # noqa: E501

    :param body: The modified task
    :type body: dict | bytes
    :param mission_id: The VTS ID or Host ID of the mission that contains the task to modify
    :type mission_id: str
    :param task_id: The VTS ID or Host ID of the task to modify
    :type task_id: str

    :rtype: FulfillmentMission
    """
    if connexion.request.is_json:
        body = Task.from_dict(connexion.request.get_json())  # noqa: E501
    return 'do some magic!'


def fulfillment_missions_mission_id_tasks_task_id_resume_put(body, mission_id, task_id):  # noqa: E501
    """Request to resume a task

    Resumes the specified suspended task. Tasks can be suspended for a few reasons: Suspended (stop task), Wait indefinitely (see Task Wait). The task will resume executing or start once it is ready to execute.  The updated mission with the resumed task is returned in the response body if successful. # noqa: E501

    :param body: The reason to resume the task
    :type body: dict | bytes
    :param mission_id: The VTS ID or Host ID of the mission to get the task from
    :type mission_id: str
    :param task_id: The VTS ID or Host ID of the task to resume
    :type task_id: str

    :rtype: FulfillmentMission
    """
    if connexion.request.is_json:
        body = Reason.from_dict(connexion.request.get_json())  # noqa: E501
    return 'do some magic!'


def fulfillment_missions_mission_id_tasks_task_id_stop_put(mission_id, task_id, body=None):  # noqa: E501
    """Request to stop a task.

    Stops the specified task from executing. The task will suspend if executing or not start if it&#x27;s not in progress. The task will remain suspended indefinitely until the mission is canceled or the task is resumed. The updated mission with the suspended task is returned in the response body if successful. # noqa: E501

    :param mission_id: The VTS ID or Host ID of the mission to get the task from
    :type mission_id: str
    :param task_id: The VTS ID or Host ID of the task to stop
    :type task_id: str
    :param body: The reason to stop the task
    :type body: dict | bytes

    :rtype: FulfillmentMission
    """
    if connexion.request.is_json:
        body = Reason.from_dict(connexion.request.get_json())  # noqa: E501
    return 'do some magic!'


def fulfillment_missions_mission_id_tasks_task_ids_delete(mission_id, task_ids):  # noqa: E501
    """Deletes the specified task(s) from the mission.

    Deletes the specified tasks from the mission. * Note: - Some tasks are not eligible for deletion, depending on their current status. For example, if a task is already in Executing or Finished state, it cannot be removed from the system. However, tasks that are still in the Enqueued state can be deleted. - The mission will execute the remaining tasks in accordance with the remaining sequence values. - The updated mission with the deleted tasks removed is returned in the response body if successful. # noqa: E501

    :param mission_id: The VTS ID or Host ID of the mission that contains the task to delete
    :type mission_id: str
    :param task_ids: The comma separated string of VTS IDs or Host IDs of the tasks to delete
    :type task_ids: str

    :rtype: FulfillmentMission
    """
    return 'do some magic!'
