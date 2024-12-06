import { Node } from './Node';
import { Edge } from './Edge';
import { Station } from './Station';

export class Layout {
  constructor(layoutId, layoutName, layoutVersion, layoutLevelId, layoutDescription, nodes = [], edges = [], stations = []) {
    this.layoutId = layoutId;
    this.layoutName = layoutName;
    this.layoutVersion = layoutVersion;
    this.layoutLevelId = layoutLevelId;
    this.layoutDescription = layoutDescription;
    this.nodes = nodes;
    this.edges = edges;
    this.stations = stations;
  }

  static addNode(layout, newNodePosition) {
    if (!layout) {
      console.warn('Layout.addNode called with null layout:', layout);
      return layout;
    }
    if (newNodePosition === null || newNodePosition.x === null || newNodePosition.y === null) {
      console.warn('Layout.addNode called with invalid position:', newNodePosition);
      return layout;
    }

    const nodeId = `node-${layout.nodes.length + 1}`;
    const nodeName = `Node ${layout.nodes.length + 1}`;
    const newNode = {
      nodeId: nodeId,
      nodeName: nodeName,
      nodePosition: { x: newNodePosition.x, y: newNodePosition.y },
      nodeDescription: null,
      mapId: null,
      vehicleTypeNodeProperties: [],
    }
    layout.nodes.push(newNode);
    return [layout, newNode];
  }

  

  static toCytoscape(nodes, edges, stations) {
    if (!nodes) {
      console.log('Layout.toCytoscape called with null nodes', nodes);
    };

    const cyto_layout = [];

    if (nodes) {
      cyto_layout.push(...Object.values(nodes).map(node => Node.toCytoscape(node)));
      if (edges) {
        cyto_layout.push(...Edge.edgesToCytoscape(Object.values(edges)));
      }
      if (stations) {
        // cyto_layout.push(...Layout.stations.map(station => Station.toCytoscape(station)));
      }
      return cyto_layout;
    }
    return [];
  }

  static fromJSON(json) {
    if (!json) {
      return new Layout();
    }
    console.log('Layout.fromJSON called with json:', json);

    const nodes = json.nodes ? json.nodes.map(node => Node.fromJSON(node)) : [];
    const edges = json.edges ? json.edges.map(edge => Edge.fromJSON(edge)) : [];
    const stations = json.stations ? json.stations.map(station => Station.fromJSON(station)) : [];

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
      nodes: this.nodes ? this.nodes.map(node => node.toJSON()) : [],
      edges: this.edges ? this.edges.map(edge => edge.toJSON()) : [],
      stations: this.stations ? this.stations.map(station => station.toJSON()) : []
    };
  }
}
