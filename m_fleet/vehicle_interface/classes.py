from typing import List, Dict, Union

class Action:
    def __init__(self, actionType: str, actionId: str, actionDescription: str, blockingType: str, actionParameters: List[Dict]):
        self.actionType = actionType
        self.actionId = actionId
        self.actionDescription = actionDescription #boop
        self.blockingType = blockingType
        self.actionParameters = actionParameters


class Edge:
    def __init__(self, edgeId: str, sequenceId: int, released: bool, startNodeId: str, endNodeId: str, maxSpeed: float, maxHeight: float, minHeight: float, orientation: float, orientationType: str, direction: str, rotationAllowed: bool, maxRotationSpeed: float, length: float, trajectory: Dict[str, Union[int, List[float], List[Dict[str, Union[float, str]]]]], actions: List[Action]):
        self.edgeId = edgeId
        self.sequenceId = sequenceId
        self.released = released
        self.startNodeId = startNodeId
        self.endNodeId = endNodeId
        self.maxSpeed = maxSpeed
        self.maxHeight = maxHeight
        self.minHeight = minHeight
        self.orientation = orientation
        self.orientationType = orientationType
        self.direction = direction
        self.rotationAllowed = rotationAllowed
        self.maxRotationSpeed = maxRotationSpeed
        self.length = length
        self.trajectory = trajectory
        self.actions = actions

class Node:
    def __init__(self, nodeId: str, sequenceId: int, released: bool, nodePosition: Dict[str, Union[float, str]], actions: List[Action]):
        self.nodeId = nodeId
        self.sequenceId = sequenceId
        self.released = released
        self.nodePosition = nodePosition
        self.actions = actions

class Order:
    def __init__(self, headerId: int, timestamp: str, version: str, manufacturer: str, serialNumber: str, orderId: str, orderUpdateId: int, zoneSetId: str, nodes: List[Node], edges: List[Edge]):
        self.headerId = headerId
        self.timestamp = timestamp
        self.version = version
        self.manufacturer = manufacturer
        self.serialNumber = serialNumber
        self.orderId = orderId
        self.orderUpdateId = orderUpdateId
        self.zoneSetId = zoneSetId
        self.nodes = nodes
        self.edges = edges