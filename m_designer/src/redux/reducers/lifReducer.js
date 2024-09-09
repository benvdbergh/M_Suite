import { createSlice } from '@reduxjs/toolkit';
import initialProject from '../../interfaces/map.json';

const initialState = {
  project: initialProject,
  selectedLayout: initialProject.layouts[0] || null,
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
      const { id, newPosition } = action.payload;
      const selectedLayout = state.selectedLayout;

      if (!selectedLayout || !selectedLayout.nodes) {
        console.error('Selected layout or nodes are not defined');
        return;
      }
  
      const nodeExists = selectedLayout.nodes.some(node => node.id === id);
      if (!nodeExists) {
        console.error(`Node with id ${id} does not exist in the selected layout`);
        return;
      }
  
      const updatedLayout = {
        ...selectedLayout,
        nodes: selectedLayout.nodes.map(node =>
          node.id === id ? { ...node, position: { ...newPosition } } : node
        ),
      };
  
      const updatedLayouts = state.project.layouts.map(layout =>
        layout.layoutId === selectedLayout.layoutId ? updatedLayout : layout
      );
  
      state.project = { ...state.project, layouts: updatedLayouts };
      state.selectedLayout = updatedLayout;
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
      // console.log('addEdge called with payload:', action.payload);
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
