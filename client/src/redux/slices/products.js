import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  loading: false,
  error: null,
  products: [],
  product: null,
  reviewSent: false,
  isProductUpdated: false,
  isProductDeleted: false,
  isProductUploaded: false,
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
      state.isProductUpdated = false;
      state.isProductDeleted = false;
      state.isProductUploaded = false;
    },
    setProductUpdatedFlag: (state) => {
      state.isProductUpdated = true;
      state.loading = false;
    },
    setProductDeletedFlag: (state) => {
      state.isProductDeleted = true;
      state.loading = false;
    },
    setProductUploadedFlag: (state) => {
      state.isProductUploaded = true;
      state.loading = false;
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
  setProductUpdatedFlag,
  setProductDeletedFlag,
  setProductUploadedFlag,
} = productSlice.actions;
export default productSlice.reducer;

export const productsSelector = (state) => state.products;
