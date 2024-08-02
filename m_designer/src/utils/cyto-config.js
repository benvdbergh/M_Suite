// Define the common style outside of the component function
export const cytoscapeStyles = [
  {
    selector: 'node',
    style: {
      'background-color': '#666',
      'label': 'data(label)',
      'width': 20,
      'height': 20,
      'shape': 'ellipse',
    }
  },
  {
    selector: 'edge',
    style: {
      'width': 5,
      'line-color': '#ccc',
      'curve-style': 'bezier',
      'control-point-step-size': 40,
      'target-arrow-shape': 'data(targetArrowShape)',
      'source-arrow-shape': 'data(sourceArrowShape)',
      'source-arrow-color': '#ccc',
      'target-arrow-color': '#ccc',
    }
  }
];

export const gridOptions = {
  snapToGridOnRelease: true,
  snapToGridDuringDrag: true,
  gridSpacing: 40,
  snapToGridCenter: false,
  drawGrid: true,
  zoomDash: true,
  panGrid: true,
  gridStackOrder: 0,
  gridColor: '#dedede',
  lineWidth: 1.0,
};