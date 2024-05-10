import connexion
import six

from swagger_server.models.http_error_response import HttpErrorResponse  # noqa: E501
from swagger_server.models.load import Load  # noqa: E501
from swagger_server.models.load_types import LoadTypes  # noqa: E501
from swagger_server import util


def loads_delete(body):  # noqa: E501
    """Removes the load unit from the warehouse

    Removes the load unit from the warehouse # noqa: E501

    :param body: The load unit to be removed from to the warehouse
    :type body: dict | bytes

    :rtype: Load
    """
    if connexion.request.is_json:
        body = Load.from_dict(connexion.request.get_json())  # noqa: E501
    return 'do some magic!'


def loads_get(load_host_ids, type):  # noqa: E501
    """Gets load information from AMR subsystem for the specified type and load host ids

    This API is typically used to retrieve current location of the load.  If load does not exist for a given load host id, no record is returned for that load host id. # noqa: E501

    :param load_host_ids: A comma separated list of load host Ids to filter the loads; At least one load host id must be provided
    :type load_host_ids: str
    :param type: The type of load to be retrieved
    :type type: dict | bytes

    :rtype: List[Load]
    """
    if connexion.request.is_json:
        type = LoadTypes.from_dict(connexion.request.get_json())  # noqa: E501
    return 'do some magic!'


def loads_post(body):  # noqa: E501
    """Adds the load unit into the warehouse

    Adds the load unit into the warehouse to carry out the fulfillment order. # noqa: E501

    :param body: The new load unit to add to the warehouse
    :type body: dict | bytes

    :rtype: Load
    """
    if connexion.request.is_json:
        body = Load.from_dict(connexion.request.get_json())  # noqa: E501
    return 'do some magic!'
