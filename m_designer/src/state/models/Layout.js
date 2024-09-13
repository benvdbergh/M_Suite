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

  static addEdge(layout, startNodeId, endNodeId) {
    if (!layout) {
      console.warn('Layout.addEdge called with null layout:', layout);
      return layout;
    }
    if (!startNodeId || !endNodeId) {
      console.warn('Layout.addEdge called with invalid node ids:', startNodeId, endNodeId);
      return layout;
    }

    const edgeId = `edge-${layout.edges.length + 1}`;
    const edgeName = `Edge ${layout.edges.length + 1}`;
    const newEdge = {
      edgeId: edgeId,
      edgeName: edgeName,
      startNodeId: startNodeId,
      endNodeId: endNodeId,
      edgeDescription: null,
    };
    layout.edges.push(newEdge);
    return [layout, newEdge];
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

  static toCytoscape(layout) {
    if (!layout) {
      console.log('Layout.toCytoscape called with null layout', layout);
      return [];
    }

    const cyto_layout = [];

    if (layout.nodes) {
      cyto_layout.push(...layout.nodes.map(node => Node.toCytoscape(node)));

      if (layout.edges) {
        cyto_layout.push(...Layout.edgesToCytoscape(layout.edges));
      }
      if (layout.stations) {
        // cyto_layout.push(...Layout.stations.map(station => Station.toCytoscape(station)));
      }
      return cyto_layout;
    }

    console.warn('Layout.toCytoscape but layout has no nodes:', layout);
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
