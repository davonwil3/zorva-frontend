import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface graphsState {
  graphsSection: string; // Store the current toggle state
}

const initialState: graphsState = {
  graphsSection: 'create', // Default value
};

const graphsSlice = createSlice({
  name: 'graphs',
  initialState,
  reducers: {
    setGraphsSection: (state, action: PayloadAction<string>) => {
      state.graphsSection = action.payload;
    },
  },
});

export const { setGraphsSection } = graphsSlice.actions;
export default graphsSlice.reducer;
