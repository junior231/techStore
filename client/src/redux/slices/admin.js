import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  loading: false,
  error: null,
  userList: null,
  isUserRemoved: false,
  orders: null,
  isOrderRemoved: false,
  isOrderDelivered: false,
};

export const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
    },
    setError: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    },
    getUsers: (state, { payload }) => {
      state.userList = payload;
      state.error = null;
      state.loading = false;
    },
    getOrders: (state, { payload }) => {
      state.orders = payload;
      state.error = null;
      state.loading = false;
    },
    userDelete: (state) => {
      state.error = null;
      state.loading = false;
      state.isUserRemoved = true;
    },
    orderDelete: (state) => {
      state.error = null;
      state.loading = false;
      state.isOrderRemoved = true;
    },
    resetError: (state) => {
      state.error = null;
      state.loading = false;
      state.isUserRemoved = false;
      state.isOrderDelivered = false;
      state.isOrderRemoved = false;
    },
    setDeliveredFlag: (state) => {
      state.isOrderDelivered = true;
      state.loading = false;
    },
  },
});

export const {
  setError,
  setLoading,
  getUsers,
  userDelete,
  resetError,
  setDeliveredFlag,
  orderDelete,
  getOrders,
} = adminSlice.actions;
export default adminSlice.reducer;

export const adminSelector = (state) => state.admin;
