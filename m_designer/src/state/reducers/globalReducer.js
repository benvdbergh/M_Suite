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
      const { selectedLayoutId, position } = action.payload;
      var layout = draft.project.layouts.find(l => l.layoutId === selectedLayoutId);

      if (layout) {
        layout = Layout.addNode(layout, position);
      }
    }),
    updateNodePosition: produce((draft, action) => {
      const { layoutId, nodeId, newPosition } = action.payload;
      var layout = draft.project.layouts.find(l => l.layoutId === layoutId);

      if (layout) {
        var node = layout.nodes.find(n => n.nodeId === nodeId);
        node = Node.moveNode(node, newPosition);
      }
    }),
    addEdge: produce((draft, action) => {
      const { layoutId, startNodeId, endNodeId } = action.payload;
      const layout = draft.project.layouts.find(l => l.layoutId === layoutId);

      if (layout) {
        layout.addEdge(startNodeId, endNodeId);
      }
    }),
  },
});

export const { setNewProject, setProject, updateNodePosition, addNode, addEdge } = globalSlice.actions;
export default globalSlice.reducer;