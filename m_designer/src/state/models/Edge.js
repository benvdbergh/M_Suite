import { Action } from './Action';
import { LoadRestriction } from './LoadRestriction';

export class Edge {
  constructor(edgeId, startNodeId, endNodeId, edgeName = null, edgeDescription = null, vehicleTypeEdgeProperties = null, bidirectional = false
  ) {
    this.edgeId = edgeId;
    this.edgeName = edgeName;
    this.edgeDescription = edgeDescription;
    this.startNodeId = startNodeId;
    this.endNodeId = endNodeId;
    this.bidirectional = bidirectional;
    this.vehicleTypeEdgeProperties = vehicleTypeEdgeProperties;
  }

  static addEdge(edges, startNodeId, endNodeId) {
    if (!edges ||!startNodeId || !endNodeId) {
      console.warn('Layout.addEdge called with invalid node ids:', startNodeId, endNodeId);
      return null;
    }

    const edgeId = `edge-${Object.keys(edges).length + 1}`;
    const edgeName = `Edge ${Object.keys(edges).length + 1}`;
    const newEdge = {
      edgeId: edgeId,
      edgeName: edgeName,
      startNodeId: startNodeId,
      endNodeId: endNodeId,
      edgeDescription: null,
    };
    edges[edgeId] = newEdge;
    return newEdge;
  }

  static edgesToCytoscape(edges) {
    const cyto_edges = [];

    if (edges.length > 0) {
      edges.forEach(edge => {
        const existingEdge = cyto_edges.find(cyto_edge =>
          (cyto_edge.data.source === edge.startNodeId && cyto_edge.data.target === edge.endNodeId)
        );

        const existingEdgeBidirectional = cyto_edges.find(cyto_edge =>
          (cyto_edge.data.source === edge.endNodeId && cyto_edge.data.target === edge.startNodeId)
        );
        
        if (existingEdgeBidirectional) {
          existingEdgeBidirectional.data.bidirectional = true;
          existingEdgeBidirectional.data.sourceArrowShape = 'triangle';
        } else if (!existingEdge && edge.startNodeId && edge.endNodeId) {
          const cyto_edge = {
            group: 'edges',
            id: edge.edgeId,
            data: {
              id: edge.edgeId,
              source: edge.startNodeId,
              target: edge.endNodeId,
              label: edge.edgeName,
              description: edge.edgeDescription,
              bidirectional: false,
              sourceArrowShape: 'none',
              targetArrowShape: 'triangle',
            }
          };
          
          cyto_edges.push(cyto_edge);
        }
      });
      return cyto_edges;
    }
    return [];
  }

  static fromJSON(json) {
    const vehicleTypeEdgeProperties = json.vehicleTypeEdgeProperties.map(prop => VehicleTypeEdgeProperty.fromJSON(prop));
    return new Edge(
      json.edgeId,
      json.edgeName,
      json.edgeDescription,
      json.startNodeId,
      json.endNodeId,
      vehicleTypeEdgeProperties
    );
  }

  toJSON() {
    return {
      edgeId: this.edgeId,
      edgeName: this.edgeName,
      edgeDescription: this.edgeDescription,
      startNodeId: this.startNodeId,
      endNodeId: this.endNodeId,
      vehicleTypeEdgeProperties: this.vehicleTypeEdgeProperties.map(prop => prop.toJSON())
    };
  }

  toCytoscape() {
    return {
      group: 'edges',
      data: {
        id: this.edgeId,
        source: this.startNodeId,
        target: this.endNodeId,
        label: this.edgeName,
        description: this.edgeDescription,
        bidirectional: this.bidirectional,
        sourceArrowShape: this.bidirectional ? 'triangle' : 'none',
        targetArrowShape: 'triangle',
      },
    };
  }
}

export class VehicleTypeEdgeProperty {
  constructor(vehicleTypeId, vehicleOrientation, orientationType, rotationAllowed, rotationAtStartNodeAllowed, rotationAtEndNodeAllowed, maxSpeed, maxRotationSpeed, minHeight, maxHeight, loadRestriction, actions, trajectory, reentryAllowed) {
    this.vehicleTypeId = vehicleTypeId;
    this.vehicleOrientation = vehicleOrientation;
    this.orientationType = orientationType;
    this.rotationAllowed = rotationAllowed;
    this.rotationAtStartNodeAllowed = rotationAtStartNodeAllowed;
    this.rotationAtEndNodeAllowed = rotationAtEndNodeAllowed;
    this.maxSpeed = maxSpeed;
    this.maxRotationSpeed = maxRotationSpeed;
    this.minHeight = minHeight;
    this.maxHeight = maxHeight;
    this.loadRestriction = loadRestriction;
    this.actions = actions;
    this.trajectory = trajectory;
    this.reentryAllowed = reentryAllowed;
  }

  static fromJSON(json) {
    const loadRestriction = LoadRestriction.fromJSON(json.loadRestriction);
    const actions = json.actions.map(action => Action.fromJSON(action));
    const trajectory = Trajectory.fromJSON(json.trajectory);
    return new VehicleTypeEdgeProperty(
      json.vehicleTypeId,
      json.vehicleOrientation,
      json.orientationType,
      json.rotationAllowed,
      json.rotationAtStartNodeAllowed,
      json.rotationAtEndNodeAllowed,
      json.maxSpeed,
      json.maxRotationSpeed,
      json.minHeight,
      json.maxHeight,
      loadRestriction,
      actions,
      trajectory,
      json.reentryAllowed
    );
  }

  toJSON() {
    return {
      vehicleTypeId: this.vehicleTypeId,
      vehicleOrientation: this.vehicleOrientation,
      orientationType: this.orientationType,
      rotationAllowed: this.rotationAllowed,
      rotationAtStartNodeAllowed: this.rotationAtStartNodeAllowed,
      rotationAtEndNodeAllowed: this.rotationAtEndNodeAllowed,
      maxSpeed: this.maxSpeed,
      maxRotationSpeed: this.maxRotationSpeed,
      minHeight: this.minHeight,
      maxHeight: this.maxHeight,
      loadRestriction: this.loadRestriction.toJSON(),
      actions: this.actions.map(action => action.toJSON()),
      trajectory: this.trajectory.toJSON(),
      reentryAllowed: this.reentryAllowed
    };
  }
}

export class Trajectory{
  constructor(degree, knotVector, controlPoints) {
    this.degree = degree;
    this.knotVector = knotVector;
    this.controlPoints = controlPoints;
  }

  static fromJSON(json) {
    const controlPoints = json.controlPoints.map(point => ControlPoint.fromJSON(point));
    return new Trajectory(
      json.degree,
      json.knotVector,
      controlPoints
    );
  }

  toJSON() {
    return {
      degree: this.degree,
      knotVector: this.knotVector,
      controlPoints: this.controlPoints.map(point => point.toJSON())
    };
  }
}

export class ControlPoint {
  constructor(x, y, weight) {
    this.x = x;
    this.y = y;
    this.weight = weight;
  }

  static fromJSON(json) {
    return new ControlPoint(
      json.x,
      json.y,
      json.weight
    );
  }

  toJSON() {
    return {
      x: this.x,
      y: this.y,
      weight: this.weight
    };
  }
}