export class Project {
    constructor(metaInformation, layouts) {
      this.metaInformation = metaInformation;
      this.layouts = layouts;
    }
  
    static fromJSON(json) {
      const metaInformation = MetaInformation.fromJSON(json.metaInformation);
      const layouts = json.layouts.map(layout => Layout.fromJSON(layout));
      return new Project(metaInformation, layouts);
    }
  
    toJSON() {
      return {
        metaInformation: this.metaInformation.toJSON(),
        layouts: this.layouts.map(layout => layout.toJSON())
      };
    }
  }
  
  export class MetaInformation {
    constructor(projectIdentification, creator, exportTimestamp, lifVersion) {
      this.projectIdentification = projectIdentification;
      this.creator = creator;
      this.exportTimestamp = exportTimestamp;
      this.lifVersion = lifVersion;
    }
  
    static fromJSON(json) {
      return new MetaInformation(
        json.projectIdentification,
        json.creator,
        json.exportTimestamp,
        json.lifVersion
      );
    }
  
    toJSON() {
      return {
        projectIdentification: this.projectIdentification,
        creator: this.creator,
        exportTimestamp: this.exportTimestamp,
        lifVersion: this.lifVersion
      };
    }
  }
  
  export class Layout {
    constructor(layoutId, layoutName, layoutVersion, layoutLevelId, layoutDescription, nodes, edges, stations) {
      this.layoutId = layoutId;
      this.layoutName = layoutName;
      this.layoutVersion = layoutVersion;
      this.layoutLevelId = layoutLevelId;
      this.layoutDescription = layoutDescription;
      this.nodes = nodes;
      this.edges = edges;
      this.stations = stations;
    }
  
    static fromJSON(json) {
      const nodes = json.nodes.map(node => Node.fromJSON(node));
      const edges = json.edges.map(edge => Edge.fromJSON(edge));
      const stations = json.stations.map(station => Station.fromJSON(station));
      return new Layout(
        json.layoutId,
        json.layoutName,
        json.layoutVersion,
        json.layoutLevelId,
        json.layoutDescription,
        nodes,
        edges,
        stations
      );
    }
  
    toJSON() {
      return {
        layoutId: this.layoutId,
        layoutName: this.layoutName,
        layoutVersion: this.layoutVersion,
        layoutLevelId: this.layoutLevelId,
        layoutDescription: this.layoutDescription,
        nodes: this.nodes.map(node => node.toJSON()),
        edges: this.edges.map(edge => edge.toJSON()),
        stations: this.stations.map(station => station.toJSON())
      };
    }
  }
  
  export class Node {
    constructor(nodeId, nodeName, nodeDescription, mapId, nodePosition, vehicleTypeNodeProperties) {
      this.nodeId = nodeId;
      this.nodeName = nodeName;
      this.nodeDescription = nodeDescription;
      this.mapId = mapId;
      this.nodePosition = nodePosition;
      this.vehicleTypeNodeProperties = vehicleTypeNodeProperties;
    }
  
    static fromJSON(json) {
      const nodePosition = NodePosition.fromJSON(json.nodePosition);
      const vehicleTypeNodeProperties = json.vehicleTypeNodeProperties.map(prop => VehicleTypeNodeProperty.fromJSON(prop));
      return new Node(
        json.nodeId,
        json.nodeName,
        json.nodeDescription,
        json.mapId,
        nodePosition,
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
        vehicleTypeNodeProperties: this.vehicleTypeNodeProperties.map(prop => prop.toJSON())
      };
    }
  }
  
  export class NodePosition {
    constructor(x, y) {
      this.x = x;
      this.y = y;
    }
  
    static fromJSON(json) {
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
      const actions = json.actions.map(action => Action.fromJSON(action));
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
        actions: this.actions.map(action => action.toJSON())
      };
    }
  }
  
  export class Action {
    constructor(actionType, actionDescription, required, blockingType, actionParameters) {
      this.actionType = actionType;
      this.actionDescription = actionDescription;
      this.required = required;
      this.blockingType = blockingType;
      this.actionParameters = actionParameters;
    }
  
    static fromJSON(json) {
      const actionParameters = json.actionParameters.map(param => ActionParameter.fromJSON(param));
      return new Action(
        json.actionType,
        json.actionDescription,
        json.required,
        json.blockingType,
        actionParameters
      );
    }
  
    toJSON() {
      return {
        actionType: this.actionType,
        actionDescription: this.actionDescription,
        required: this.required,
        blockingType: this.blockingType,
        actionParameters: this.actionParameters.map(param => param.toJSON())
      };
    }
  }
  
  export class ActionParameter {
    constructor(key, value) {
      this.key = key;
      this.value = value;
    }
  
    static fromJSON(json) {
      return new ActionParameter(json.key, json.value);
    }
  
    toJSON() {
      return {
        key: this.key,
        value: this.value
      };
    }
  }
  
  export class Edge {
    constructor(edgeId, edgeName, edgeDescription, startNodeId, endNodeId, vehicleTypeEdgeProperties) {
      this.edgeId = edgeId;
      this.edgeName = edgeName;
      this.edgeDescription = edgeDescription;
      this.startNodeId = startNodeId;
      this.endNodeId = endNodeId;
      this.vehicleTypeEdgeProperties = vehicleTypeEdgeProperties;
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
  
  export class LoadRestriction {
    constructor(unloaded, loaded, loadSetNames) {
      this.unloaded = unloaded;
      this.loaded = loaded;
      this.loadSetNames = loadSetNames;
    }
  
    static fromJSON(json) {
      return new LoadRestriction(
        json.unloaded,
        json.loaded,
        json.loadSetNames
      );
    }
  
    toJSON() {
      return {
        unloaded: this.unloaded,
        loaded: this.loaded,
        loadSetNames: this.loadSetNames
      };
    }
  }
  
  export class Trajectory {
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
  
  export class Station {
    constructor(stationId, interactionNodeIds, stationName, stationDescription, stationHeight, stationPosition) {
      this.stationId = stationId;
      this.interactionNodeIds = interactionNodeIds;
      this.stationName = stationName;
      this.stationDescription = stationDescription;
      this.stationHeight = stationHeight;
      this.stationPosition = stationPosition;
    }
  
    static fromJSON(json) {
      const stationPosition = StationPosition.fromJSON(json.stationPosition);
      return new Station(
        json.stationId,
        json.interactionNodeIds,
        json.stationName,
        json.stationDescription,
        json.stationHeight,
        stationPosition
      );
    }
  
    toJSON() {
      return {
        stationId: this.stationId,
        interactionNodeIds: this.interactionNodeIds,
        stationName: this.stationName,
        stationDescription: this.stationDescription,
        stationHeight: this.stationHeight,
        stationPosition: this.stationPosition.toJSON()
      };
    }
  }
  
  export class StationPosition {
    constructor(x, y, theta) {
      this.x = x;
      this.y = y;
      this.theta = theta;
    }
  
    static fromJSON(json) {
      return new StationPosition(
        json.x,
        json.y,
        json.theta
      );
    }
  
    toJSON() {
      return {
        x: this.x,
        y: this.y,
        theta: this.theta
      };
    }
  }