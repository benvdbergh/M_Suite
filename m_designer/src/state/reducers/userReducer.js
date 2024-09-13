import { createSlice } from '@reduxjs/toolkit';
import { produce } from 'immer';

const initialState = {
  selectedProjectId: null,
  selectedLayoutId: null,
  selectedElementId: null,
  // Add other user-specific states here
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setSelectedLayoutId : produce((draft, action) => {
      const { projectId, layoutId } = action.payload;
      draft.selectedProjectId = projectId;
      draft.selectedLayoutId = layoutId;
    }),
    setSelectedElementId(state, action) {
      const { projectId, layoutId, elementId } = action.payload;
      if (projectId === state.selectedProjectId && layoutId === state.selectedLayoutId) {
        state.selectedElementId = elementId;
      }
    },
  },
});

export const { setSelectedLayoutId, setSelectedElementId, setLastCreatedNodeId } = userSlice.actions;
export default userSlice.reducer;