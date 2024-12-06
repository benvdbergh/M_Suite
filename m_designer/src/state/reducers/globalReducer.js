import { createSlice } from '@reduxjs/toolkit';
import { Project } from '../models/Project';
import initialProjectData from '../../interfaces/map.json';
import { produce } from 'immer';
import { Node } from '../models/Node';
import { Edge } from '../models/Edge';

const initialProject = Project.fromJSON(initialProjectData).toJSON();

const { projectMetaInformation, layouts, nodes, edges, vehicleTypeNodeProperties, vehicleTypeEdgeProperties, stations} = Project.loadProject(initialProject);
const initialState = {
  projectMetaInformation: projectMetaInformation,
  layouts: layouts,
  nodes: nodes,
  edges: edges,
  vehicleTypeNodeProperties: vehicleTypeNodeProperties,
  vehicleTypeEdgeProperties: vehicleTypeEdgeProperties,
  stations: stations,
};
console.log("Layouts from global reducer: ", initialState)

const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    setNewProject(state, action) {
      console.log("Set new project with: ", initialProject)
      const { projectMetaInformation, layouts, nodes, edges, vehicleTypeNodeProperties, vehicleTypeEdgeProperties, stations } = Project.loadProject(initialProject);
      console.log('layouts from new  reducer: ', layouts)
      return {
        projectMetaInformation,
        layouts,
        nodes,
        edges,
        vehicleTypeNodeProperties,
        vehicleTypeEdgeProperties,
        stations
      }
    },
    setProject(state, action) {
      console.log("Set project with: ", action.payload)
      const { projectMetaInformation, layouts, nodes, edges, vehicleTypeNodeProperties, vehicleTypeEdgeProperties, stations } = Project.loadProject(action.payload);
      console.log('layouts from set reducer: ', layouts)
      return {
        projectMetaInformation,
        layouts,
        nodes,
        edges,
        vehicleTypeNodeProperties,
        vehicleTypeEdgeProperties,
        stations
      }
    },
    addNode : produce((draft, action) => {
      var { position } = action.payload;
      Node.addNode(draft.nodes, position);
      console.trace('New node added: ', draft.nodes[draft.nodes.length - 1]);
    }),
    updateNodePosition: produce((draft, action) => {
      const { nodeId, newPosition } = action.payload;

      if (nodeId && newPosition) {
        var node = draft.nodes[nodeId];
        node = Node.moveNode(node, newPosition);
        console.assert(node, `Node with id ${nodeId} not moved`);
      }
    }),
    addEdge: produce((draft, action) => {
      const { startNodeId, endNodeId } = action.payload;
      var newEdge = null;
      if (startNodeId && endNodeId) {
        newEdge = Edge.addEdge(draft.edges, startNodeId, endNodeId);
        console.trace('New edge created: ', newEdge);
      }
    }),
    extendPath : produce((draft, action) => {
      const { position } = action.payload;
      var newNode = null;
      var newEdge = null;

      if (position) {
        const keys = Object.keys(draft.nodes);
        const lastKey = keys[keys.length - 1];
        const lastNode = draft.nodes[lastKey];
        newNode = Node.addNode(draft.nodes, position);
        newEdge = Edge.addEdge(draft.edges, lastNode.nodeId, newNode.nodeId)
        console.assert(newEdge, `Edge between ${lastNode.nodeId} and ${newNode.nodeId} not created`);
      }
    }),
    extendPathFromNode : produce((draft, action) => {
      const { position, nodeId } = action.payload;
      var newNode = null;
      var newEdge = null;

      if (nodeId && position && position.x && position.y) {
        const lastNode = draft.nodes[nodeId];
        console.assert(lastNode, `Node with id ${nodeId} not found`);

        newNode = Node.addNode(draft.nodes, position);
        console.assert(newNode, `New node could not be added at ${position.x}, ${position.y}`);

        newEdge = Edge.addEdge(draft.edges, lastNode.nodeId, newNode.nodeId)
        console.assert(newEdge, `Edge between ${lastNode.nodeId} and ${newNode.nodeId} not created`);
      }
    }),
    closePath: produce((draft, action) => {
      const { lastNodeId, endNodeId} = action.payload;

      if (endNodeId) {
        var lastNode = draft.nodes[lastNodeId];
        if (!lastNode) {
          const keys = Object.keys(draft.nodes);
          const lastKey = keys[keys.length - 1];
          lastNode = draft.nodes[lastKey];
        }

				var endNode = draft.nodes[endNodeId];
				console.assert(lastNode, `Last node with id ${lastNodeId} not found`);
        console.assert(endNode, `End node with id ${endNodeId} not found`);
        
				if (lastNode && endNode) {
					var newEdge = null;
					newEdge = Edge.addEdge(draft.edges, lastNode.nodeId, endNode.nodeId);   
					console.assert(newEdge, `Edge between ${lastNode.nodeId} and ${endNode.nodeId} not created`);
				}
      }
    }),
    updateElement: produce((draft, action) => {
      const { elementId, newData } = action.payload;
      if (elementId && newData) {
        var element = draft.nodes[elementId] || draft.edges[elementId];
        if (element) {
          Object.assign(element, newData);
        }
      }
    }),
  },
});

export const { setNewProject, setProject, updateNodePosition, addNode, addEdge, extendPath, extendPathFromNode, closePath, updateElement } = globalSlice.actions;
export default globalSlice.reducer;