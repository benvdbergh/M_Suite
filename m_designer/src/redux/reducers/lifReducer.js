import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  project: null,
};

const lifSlice = createSlice({
  name: 'lif',
  initialState,
  reducers: {
    setProject(state, action) {
      console.log('setProject called with payload:', action.payload);
      state.project = action.payload;
    },
    updateElement(state, action) {
      const { id, newData } = action.payload;
      console.log('updateElement called with id:', id, 'and newData:', newData);
      const updatedNodes = state.project.layouts[0].nodes.map(node =>
        node.nodeId === id ? { ...node, ...newData } : node
      );
      state.project.layouts[0].nodes = updatedNodes;
    },
    addNode(state, action) {
      console.log('addNode called with payload:', action.payload);
      const newNode = action.payload;
      state.project.layouts[0].nodes.push(newNode);
    },
    addEdge(state, action) {
      console.log('addEdge called with payload:', action.payload);
      const newEdge = action.payload;
      state.project.layouts[0].edges.push(newEdge);
    },
  },
});

export const { setProject, updateElement, addNode, addEdge } = lifSlice.actions;
export default lifSlice.reducer;
