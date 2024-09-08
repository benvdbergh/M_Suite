
export default class Node {
  constructor(data) {
    // console.log('Node constructor called with data:', data);
    this.id = data.id;
    this.label = data.label;
    this.description = data.description;
    this.position = data.position;
  }

  toCytoscape() {
    return {
      group: 'nodes',
      id: this.id,
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