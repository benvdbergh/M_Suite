// Graph.js
import Node from './Node';
import Edge from './Edge';

export default class Graph {
  constructor(layout) {
    this.nodes = [];
    this.edges = [];
    
    if (layout) {
      if (layout.nodes) {
        this.nodes = layout.nodes.map(nodeData => new Node(nodeData));
      }
      if (layout.edges) {
        this.edges = this.processEdges(layout.edges);
      }
    }

    // console.log('Graph constructor created with nodes:', this.nodes);
  }
  
  processEdges(edgesData) {
    // console.log('processEdges called with edgesData:', edgesData);
    const edgeMap = new Map();
    if (edgesData) {
      edgesData.forEach(edgeData => {
        const existingEdge = Array.from(edgeMap.values()).find(edge =>
          (edge.source === edgeData.source && edge.target === edgeData.target)
        );

        if (!existingEdge && edgeData.source && edgeData.target) {
          edgeMap.set(edgeData.id, new Edge(edgeData));
        }
      });
      return Array.from(edgeMap.values());
    }
    return [];
  }

  addNode(nodeData) {
    const newNode = new Node(nodeData);
    this.nodes.push(newNode);
    return newNode;
  }

  removeNode(nodeId) {
    this.nodes = this.nodes.filter(node => node.id !== nodeId);
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
    // console.log('toCytoscape called with this.nodes:', this.nodes);

    if (this.nodes && this.edges) {
      return [
        ...this.nodes.map(node => {
          const nodeData = node.toCytoscape();
          return {
            ...nodeData,
            position: { ...nodeData.position } // Create a deep copy of the position object
          };
        }),
        ...this.edges.map(edge => edge.toCytoscape()),
      ];
    } 
    return [];
  }
}