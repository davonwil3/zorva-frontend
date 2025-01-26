import { configureStore } from '@reduxjs/toolkit';
import insightsReducer from './insightsslice';
import graphsReducer from './graphsslice';

export const store = configureStore({
  reducer: {
    insights: insightsReducer, // Add insights reducer
    graphs: graphsReducer, // Add graphs reducer
  },

});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

