// Graph.js
import Node from './Node';
import Edge from './Edge';

export class Graph {
  constructor(mapData) {
    this.nodes = mapData.layouts[0].nodes.map(nodeData => new Node(nodeData));
    this.edges = this.processEdges(mapData.layouts[0].edges);
  }
  
  processEdges(edgesData) {
    const edgeMap = new Map();
    edgesData.forEach(edgeData => {
      const edgeKey = [edgeData.startNodeId, edgeData.endNodeId].sort().join('-');
      if (!edgeMap.has(edgeKey)) {
        edgeMap.set(edgeKey, new Edge(edgeData));
      } else {
        edgeMap.get(edgeKey).bidirectional = true;
      }
    });
    return Array.from(edgeMap.values());
  }

  addNode(nodeData) {
    const newNode = new Node(nodeData);
    this.nodes.push(newNode);
    return newNode;
  }

  addEdge(edgeData) {
    const edgeKey = [edgeData.startNodeId, edgeData.endNodeId].sort().join('-');
    let newEdge;
    if (this.edges.some(edge => [edge.source, edge.target].sort().join('-') === edgeKey)) {
      newEdge = this.edges.find(edge => [edge.source, edge.target].sort().join('-') === edgeKey);
      newEdge.bidirectional = true;
    } else {
      newEdge = new Edge(edgeData);
      this.edges.push(newEdge);
    }
    return newEdge;
  }

  toCytoscape() {
    return [
      ...this.nodes.map(node => node.toCytoscape()),
      ...this.edges.map(edge => edge.toCytoscape()),
    ];
  }

  toMapData() {
    const edgesData = [];
    this.edges.forEach(edge => {
      edgesData.push({
        edgeId: edge.id,
        edgeName: edge.label,
        edgeDescription: edge.description,
        startNodeId: edge.source,
        endNodeId: edge.target,
      });
      if (edge.bidirectional) {
        edgesData.push({
          edgeId: `${edge.id}-reverse`,
          edgeName: edge.label,
          edgeDescription: edge.description,
          startNodeId: edge.target,
          endNodeId: edge.source,
        });
      }
    });

    return {
      layouts: [
        {
          nodes: this.nodes.map(node => ({
            nodeId: node.id,
            nodeName: node.label,
            nodeDescription: node.description,
            nodePosition: node.position,
          })),
          edges: edgesData,
        },
      ],
    };
  }
}