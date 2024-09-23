import { createSlice } from '@reduxjs/toolkit';
import { Project } from '../models/Project';
import initialProjectData from '../../interfaces/map.json';
import { produce } from 'immer';
import { Layout } from '../models/Layout';
import { Node } from '../models/Node';

const initialProject = Project.fromJSON(initialProjectData).toJSON();

const globalSlice = createSlice({
  name: 'global',
  initialState: {
    project: initialProject
  },
  reducers: {
    setNewProject(state, action) {
      return {
        project: initialProject
      }
    },
    setProject(state, action) {
      state.project = Project.fromJSON(action.payload).toJSON();
    },
    addNode : produce((draft, action) => {
      const { layoutId, position } = action.payload;
      var layout = draft.project.layouts.find(l => l.layoutId === layoutId);
      var newNode = null; 
      if (layout) {
        [ layout, newNode] = Layout.addNode(layout, position);
        console.log('New node added: ', newNode);
      }
    }),
    updateNodePosition: produce((draft, action) => {
      const { layoutId, nodeId, newPosition } = action.payload;
      var layout = draft.project.layouts.find(l => l.layoutId === layoutId);

      if (layout) {
        var node = layout.nodes.find(n => n.nodeId === nodeId);
        node = Node.moveNode(node, newPosition);
        console.log('Node moved: ', node);
      }
    }),
    addEdge: produce((draft, action) => {
      const { layoutId, startNodeId, endNodeId } = action.payload;
      var layout = draft.project.layouts.find(l => l.layoutId === layoutId);
      var newEdge = null;
      if (layout) {
        [layout, newEdge] = Layout.addEdge(layout, startNodeId, endNodeId);
        console.log('New edge created: ', newEdge);
      }
    }),
    extendPath : produce((draft, action) => {
      const { layoutId, position } = action.payload;
      var layout = draft.project.layouts.find(l => l.layoutId === layoutId);
      var newNode = null;
      var newEdge = null;

      if (layout) {
        const lastNode = layout.nodes[layout.nodes.length - 1];
        [layout, newNode] = Layout.addNode(layout, position);
        console.log('New node created: ', newNode);
        [layout, newEdge] = Layout.addEdge(layout, lastNode.nodeId, newNode.nodeId)
        console.log('New edge created: ', newEdge);
      }
    }),
    updateElement: produce((draft, action) => {
      const { projectId, layoutId, elementId, newData } = action.payload;
      const project = draft.project;
      if (project.metaInformation.projectIdentification !== projectId) {
        return;
      }

      const layout = project.layouts.find(l => l.layoutId === layoutId);
      if (!layout) {
        return;
      }

      let element = layout.nodes.find(n => n.nodeId === elementId);
      if (!element) {
        element = layout.edges.find(e => e.edgeId === elementId);
      }

      if (element) {
        Object.assign(element, newData);
      }
    }),
  },
});

export const { setNewProject, setProject, updateNodePosition, addNode, addEdge, extendPath, updateElement } = globalSlice.actions;
export default globalSlice.reducer;