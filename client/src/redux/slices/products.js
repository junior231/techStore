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
  isReviewRemoved: false,
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
      state.isReviewRemoved = false;
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
    setReviewRemovalFlag: (state) => {
      state.error = null;
      state.isReviewRemoved = true;
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
  setReviewRemovalFlag,
} = productSlice.actions;
export default productSlice.reducer;

export const productsSelector = (state) => state.products;
