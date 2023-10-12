import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  loading: false,
  error: null,
  products: [],
  product: null,
  reviewSent: false,
};

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
    },
    setProducts: (state, { payload }) => {
      state.loading = false;
      state.error = null;
      state.products = payload;
    },
    setProduct: (state, { payload }) => {
      state.product = payload;
      state.loading = false;
      state.error = null;
    },
    setError: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    },
    productReviewed: (state) => {
      state.loading = false;
      state.error = null;
      state.reviewSent = true;
    },
    resetError: (state) => {
      state.error = null;
      state.reviewSent = false;
    },
  },
});

export const {
  setError,
  setLoading,
  setProducts,
  setProduct,
  productReviewed,
  resetError,
} = productSlice.actions;
export default productSlice.reducer;

export const productsSelector = (state) => state.products;
