import { lightTheme } from '../theme';

const primaryColor = lightTheme.palette.primary.main;

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
    }
  },
  {
    selector: '.selected',
    style: {
      'background-color': primaryColor,
      'line-color': primaryColor,
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

export const cxtMenuOptions = (updateElement) => ({
  menuRadius: function (ele) {
    return ele.isNode() ? 70 : 100;
  },
  outsideMenuCancel: 1,
  selector: 'node',
  openMenuEvents: 'cxttapstart',
  commands: [
    {
      content: '<i class="fa fa-trash"></i>', // Delete icon
      select: function (ele) {
        updateElement(ele.id(), null)
        ele.remove();
      }
    },
    {
      content: '<i class="fa fa-edit"></i>', // Edit icon
      select: function (ele) {
        ele.unselect();
      }
    },
    {
      content: '<i class="fa fa-cut"></i>', // Cut icon
      select: function (ele) {
        ele.unselect();
      }
    },
  ]
});