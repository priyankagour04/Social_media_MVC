import { configureStore } from '@reduxjs/toolkit';

// Import  slices
import counterReducer from './features/counterSlice';

const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});

export default store;
