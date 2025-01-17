import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface InsightsState {
  insightsSection: string; // Store the current toggle state
}

const initialState: InsightsState = {
  insightsSection: 'quick', // Default value
};

const insightsSlice = createSlice({
  name: 'insights',
  initialState,
  reducers: {
    setInsightsSection: (state, action: PayloadAction<string>) => {
      state.insightsSection = action.payload;
    },
  },
});

export const { setInsightsSection } = insightsSlice.actions;
export default insightsSlice.reducer;
