
export default class Node {
  constructor(data) {
    this.id = data.nodeId;
    this.label = data.nodeName;
    this.description = data.nodeDescription;
    this.position = data.nodePosition;
  }

  toCytoscape() {
    return {
      group: 'nodes',
      data: {
        id: this.id,
        label: this.label,
        description: this.description,
        position: this.position,
      },
      position: this.position,
    };
  }
}