import { createSlice, createSelector } from "@reduxjs/toolkit";

const basketSlice = createSlice({
  name: "basket",
  initialState: {
    items: [],
  },
  reducers: {
    addToBasket: (state, action) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromBasket: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find((item) => item.id === id);
      if (item) {
        item.quantity = quantity;
      }
    },
    clearBasket: (state) => {
      state.items = [];
    },
  },
});

// Selectors
export const selectBasketItems = (state) => state.basket.items;

export const selectBasketTotal = createSelector([selectBasketItems], (items) =>
  items.reduce((total, item) => total + item.price * item.quantity, 0)
);

export const { addToBasket, removeFromBasket, updateQuantity, clearBasket } =
  basketSlice.actions;
export default basketSlice.reducer;
