// store.js
import { configureStore } from '@reduxjs/toolkit';
import buyArrayReducer from './slice';

const store = configureStore({
  reducer: {
    buyArray: buyArrayReducer,
  },
});

export default store;
