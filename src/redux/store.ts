import { configureStore } from '@reduxjs/toolkit';
import insightsReducer from './insightsslice';

export const store = configureStore({
  reducer: {
    insights: insightsReducer, // Add insights reducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

