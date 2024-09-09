// Edge.js
export default class Edge {
  constructor(data) {
    // console.log('Edge constructor called with data:', data);
    this.id = data.id;
    this.source = data.source;
    this.target = data.target;
    this.label = data.label;
    this.description = data.description;
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