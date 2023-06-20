// slice.js
import { createSlice } from '@reduxjs/toolkit';

const buyArraySlice = createSlice({
  name: 'buyArray',
  initialState: [],
  reducers: {
    updateBuyArray: (state, action) => {
      const { itemName, itemPrice, buyValue } = action.payload;
      state.push({ itemName,itemPrice, buyValue });
    },
  },
});

export const { updateBuyArray } = buyArraySlice.actions;

export default buyArraySlice.reducer;
