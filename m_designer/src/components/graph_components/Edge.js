// Edge.js
export default class Edge {
  constructor(data) {
    this.id = data.edgeId;
    this.source = data.startNodeId;
    this.target = data.endNodeId;
    this.label = data.edgeName;
    this.description = data.edgeDescription;
    this.bidirectional = data.bidirectional || false;
  }

  toCytoscape() {
    return {
      group: 'edges',
      data: {
        id: this.id,
        source: this.source,
        target: this.target,
        label: this.label,
        description: this.description,
        bidirectional: this.bidirectional,
        sourceArrowShape: this.bidirectional ? 'triangle' : 'none',
        targetArrowShape: 'triangle',
      },
    };
  }

  setPairedEdge(edge) {
    this.pairedEdge = edge;
  }

  isBidirectional() {
    return !!this.pairedEdge;
  }
}