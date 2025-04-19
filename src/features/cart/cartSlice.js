import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      state.cart.push(action.payload);
    },
    removeItem(state, action) {
      state.cart = state.cart.filter((item) => item.pizzaId !== action.payload);
    },
    decreaseItemQuantity: function (state, action) {
      state.cart.forEach((item) => {
        if (item.pizzaId === action.payload) {
          item.quantity--;
          item.totalPrice = item.quantity * item.unitPrice;
          if (item.quantity === 0)
            cartSlice.caseReducers.removeItem(state, action);
        }
      });
    },
    increaseItemQuantity: function (state, action) {
      state.cart.forEach((item) => {
        if (item.pizzaId === action.payload) {
          item.quantity++;
          item.totalPrice = item.quantity * item.unitPrice;
        }
      });
    },
    clearCart(state) {
      state.cart = [];
    },
  },
});

export const {
  addItem,
  removeItem,
  decreaseItemQuantity,
  increaseItemQuantity,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;

// export const getCurrentQunatityById = (id) => (state) =>
//   state.cart.cart.find((item) => item.pizzaId === id)?.quantity ?? 0;

export const getCurrentQunatityById = (id) => (state) =>
  state.cart.cart.reduce(
    (res, item) => (item.pizzaId === id ? item.quantity : res),
    0,
  );

export const getCart = (state) => state.cart.cart;

export const getTotalPizzaQuantity = (state) =>
  state.cart.cart.reduce((res, item) => res + item.quantity, 0);

export const getTotalPizzaCost = (state) =>
  state.cart.cart.reduce((res, item) => res + item.totalPrice, 0);
