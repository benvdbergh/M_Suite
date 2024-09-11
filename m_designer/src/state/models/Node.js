import { Action } from './Action';

export class Node {
    constructor(nodeId, nodeName, nodePosition, nodeDescription = null, mapId = null, vehicleTypeNodeProperties = null) {
      this.nodeId = nodeId;
      this.nodeName = nodeName;
      this.nodeDescription = nodeDescription;
      this.mapId = mapId;
      this.nodePosition = NodePosition.fromJSON(nodePosition);
      this.vehicleTypeNodeProperties = VehicleTypeNodeProperty.fromJSON(vehicleTypeNodeProperties);
    }

    static moveNode(node, newPosition) {
      if (!node || !newPosition) {
        console.warn('Node.moveNode called with invalid node or newPosition:', node, newPosition);
        return node;
      }
      if (newPosition.x === null || newPosition.y === null) {
        console.warn('Node.moveNode called with invalid position:', newPosition);
        return node;
      }
      node.nodePosition = { x: newPosition.x, y: newPosition.y };
      return node;
    }

    static fromJSON(json) {
      console.log('Node.fromJSON called with json:', json);
      const nodePosition = NodePosition.fromJSON(json.nodePosition);
      const vehicleTypeNodeProperties = json.vehicleTypeNodeProperties.map(prop => VehicleTypeNodeProperty.fromJSON(prop));
      return new Node(
        json.nodeId,
        json.nodeName,
        nodePosition,
        json.nodeDescription,
        json.mapId,
        vehicleTypeNodeProperties
      );
    }
  
    toJSON() {
      return {
        nodeId: this.nodeId,
        nodeName: this.nodeName,
        nodeDescription: this.nodeDescription,
        mapId: this.mapId,
        nodePosition: this.nodePosition.toJSON(),
        vehicleTypeNodeProperties: this.vehicleTypeNodeProperties ? this.vehicleTypeNodeProperties.map(prop => prop.toJSON()) : []
      };
    }

    static toCytoscape(node) {
      if (!node) {
        console.warn('Node.toCytoscape called with null node:', node);
        return null;
      }
      if (node.nodeId && node.nodeName && node.nodePosition) {
        return {
          group: 'nodes',
          id: node.nodeId,
          data: {
            id: node.nodeId,
            label: node.nodeName ? node.nodeName : node.nodeId,
            description: node.nodeDescription,
            position: { x: node.nodePosition.x, y: node.nodePosition.y },
          },
          position: { x: node.nodePosition.x, y: node.nodePosition.y },
        };
      }
      console.warn('Node.toCytoscape called with node with missing properties:', node);
      return null;
    }
  }
  
  export class NodePosition {
    constructor(x, y) {
      this.x = x;
      this.y = y;
    }
  
    static fromJSON(json) {
      if (!json) {  
        return null;
      }
      return new NodePosition(json.x, json.y);
    }
  
    toJSON() {
      return {
        x: this.x,
        y: this.y
      };
    }
  }
  
  export class VehicleTypeNodeProperty {
    constructor(vehicleTypeId, theta, actions) {
      this.vehicleTypeId = vehicleTypeId;
      this.theta = theta;
      this.actions = actions;
    }
  
    static fromJSON(json) {
      if (!json) {
        return null;
      }
      const actions = json.actions ? json.actions.map(action => Action.fromJSON(action)) : [];
      return new VehicleTypeNodeProperty(
        json.vehicleTypeId,
        json.theta,
        actions
      );
    }
  
    toJSON() {
      return {
        vehicleTypeId: this.vehicleTypeId,
        theta: this.theta,
        actions: this.actions ? this.actions.map(action => action.toJSON()) : []
      };
    }
  }