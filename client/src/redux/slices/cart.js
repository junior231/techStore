import { createSlice } from "@reduxjs/toolkit";

const calculateSubTotal = (cartState) => {
  let result = 0;
  cartState.map((item) => (result += item.qty * item.price));
  return Number(result).toFixed(2);
};

export const initialState = {
  loading: false,
  error: null,
  // if cartItems exists in local storage set as cart else empty array
  cart: JSON.parse(localStorage.getItem("cartItems")) ?? [],
  expressShipping: false,
  // if cartItems exist in local storage, calculate sub total, else 0
  subTotal: localStorage.getItem("cartItems")
    ? calculateSubTotal(JSON.parse(localStorage.getItem("cartItems")))
    : 0,
};

// update loacl storage with cartItems and subtotal
const updateLocalStorage = (cart) => {
  localStorage.setItem("cartItems", JSON.stringify(cart));
  localStorage.setItem("subtotal", JSON.stringify(calculateSubTotal(cart)));
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
    },
    addCartItem: (state, { payload }) => {
      const existingItem = state.cart.find((item) => item.id === payload.id);

      if (existingItem) {
        state.cart = state.cart.map((item) =>
          item.id === existingItem.id ? payload : item
        );
      } else {
        state.cart = [...state.cart, payload];
      }
      state.loading = false;
      state.error = null;
      updateLocalStorage(state.cart);
      state.subTotal = calculateSubTotal(state.cart);
    },
    setError: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    },
    cartItemRemoval: (state, { payload }) => {
      // update cart by filtering item with payload ie id
      state.cart = [...state.cart].filter((item) => item.id !== payload);
      updateLocalStorage(state.cart);
      state.subTotal = calculateSubTotal(state.cart);
      state.loading = false;
      state.error = null;
    },
  },
});

export const { setError, setLoading, addCartItem, cartItemRemoval } =
  cartSlice.actions;
export default cartSlice.reducer;

export const cartSelector = (state) => state.cart;
