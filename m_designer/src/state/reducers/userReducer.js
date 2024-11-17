import { createSlice } from '@reduxjs/toolkit';
import { produce } from 'immer';

const initialState = {
  selectedProjectId: null,
  selectedLayoutId: null,
  selectedElement: {
    elementType: null,
    elementId: null
  },
  selectedVehicleTypeId: null,
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
    setSelectedElement : produce((state, action) => {
      const { projectId, layoutId, elementType, elementId } = action.payload;
    
      if (projectId === state.selectedProjectId && layoutId === state.selectedLayoutId) {
        state.selectedElement = { elementType, elementId };
        state.selectedElement.elementType = elementType;
        state.selectedElement.elementId = elementId;
      }
    }),
    setSelectedVehicleTypeId : produce((state, action) => {
      const { projectId, layoutId, vehicleTypeId } = action.payload;
      if (projectId === state.selectedProjectId && layoutId === state.selectedLayoutId) {
        state.selectedVehicleType = vehicleTypeId;
      }
    }),
  },
});

export const { setSelectedLayoutId, setSelectedElement, setSelectedVehicleType } = userSlice.actions;
export default userSlice.reducer;