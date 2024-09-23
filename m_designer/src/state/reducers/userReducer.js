import { createSlice } from '@reduxjs/toolkit';
import { produce } from 'immer';

const initialState = {
  selectedProjectId: null,
  selectedLayoutId: null,
  selectedElement: {
    elementType: null,
    elementId: null
  },
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
    setSelectedElement(state, action) {
      const { projectId, layoutId, elementType, elementId } = action.payload;
      console.log('setSelectedElement called with:', projectId, layoutId, elementType, elementId);      
      if (projectId === state.selectedProjectId && layoutId === state.selectedLayoutId) {
        state.selectedElement = { elementType, elementId };
        state.selectedElement.elementType = elementType;
        state.selectedElement.elementId = elementId;
      }
    },
  },
});

export const { setSelectedLayoutId, setSelectedElement } = userSlice.actions;
export default userSlice.reducer;