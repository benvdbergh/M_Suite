import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  project: null,
  selectedLayout: null,
};

const lifSlice = createSlice({
  name: 'lif',
  initialState,
  reducers: {
    setProject(state, action) {
      state.project = action.payload;
      if (action.payload.layouts && action.payload.layouts.length > 0) {
        state.selectedLayout = action.payload.layouts[0];
      }
    },
    updateNodePosition(state, action) {
      const { id, newData } = action.payload;
      console.log('updateElement called with id:', id, 'and newData:', newData);
      const updatedNodes = state.project.layouts[0].nodes.map(node =>
        node.nodeId === id ? { ...node, ...newData } : node
      );
      state.project.layouts[0].nodes = updatedNodes;
    },
    addNode(state, action) {
      const newNode = action.payload;

      const selectedLayout = state.selectedLayout;

      const updatedLayout = {
        ...selectedLayout,
        nodes: [...selectedLayout.nodes, newNode],
      };

      const updatedLayouts = state.project.layouts.map(layout =>
        layout.layoutId === selectedLayout.layoutId ? updatedLayout : layout
      );

      state.project = { ...state.project, layouts: updatedLayouts };
      state.selectedLayout = updatedLayout;
    },
    addEdge(state, action) {
      console.log('addEdge called with payload:', action.payload);
      const newEdge = action.payload;
      const selectedLayout = state.selectedLayout;
      const updatedLayout = {
        ...selectedLayout,
        edges: [...selectedLayout.edges, newEdge],
      };
      const updatedLayouts = state.project.layouts.map(layout =>
        layout.layoutId === selectedLayout.layoutId ? updatedLayout : layout
      );
      state.project = { ...state.project, layouts: updatedLayouts };
      state.selectedLayout = updatedLayout;
    },
    setSelectedLayout(state, action) {
      state.selectedLayout = action.payload;
    },
  },
});

export const { setProject, updateNodePosition, addNode, addEdge, setSelectedLayout } = lifSlice.actions;
export default lifSlice.reducer;
