import axios from "axios";
import {
  getUsers,
  userDelete,
  resetError,
  setError,
  setLoading,
  getOrders,
  orderDelete,
  setDeliveredFlag,
} from "../slices/admin";

// get all users
export const getAllUsers = () => async (dispatch, getState) => {
  const {
    user: { userInfo },
  } = getState();

  try {
    // configure request header with Authorization
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.get(`api/users`, config);
    dispatch(getUsers(data));
  } catch (error) {
    dispatch(
      setError(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
          ? error.message
          : "Could not retrieve users."
      )
    );
  }
};

// delete user
export const deleteUser = (id) => async (dispatch, getState) => {
  const {
    user: { userInfo },
  } = getState();

  try {
    // configure request header with Authorization
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.delete(`api/users/${id}`, config);
    dispatch(userDelete(data));
  } catch (error) {
    dispatch(
      setError(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
          ? error.message
          : "Could not delete user."
      )
    );
  }
};

// get all orders
export const getAllOrders = () => async (dispatch, getState) => {
  dispatch(setLoading(true));
  const {
    user: { userInfo },
  } = getState();

  try {
    // configure request header with Authorization
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.get(`api/orders`, config);
    dispatch(getOrders(data));
  } catch (error) {
    dispatch(
      setError(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
          ? error.message
          : "Could not retrieve orders."
      )
    );
  }
};

// delete order
export const deleteOrder = (id) => async (dispatch, getState) => {
  const {
    user: { userInfo },
  } = getState();

  try {
    // configure request header with Authorization
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.delete(`api/orders/${id}`, config);
    dispatch(orderDelete(data));
  } catch (error) {
    dispatch(
      setError(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
          ? error.message
          : "Could not delete order."
      )
    );
  }
};

// handle order delivery status
export const setDelivered = (id) => async (dispatch, getState) => {
  dispatch(setLoading(true));
  const {
    user: { userInfo },
  } = getState();

  try {
    // configure request header with Authorization
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        "Content-Type": "application/json",
      },
    };
    await axios.put(`api/orders/${id}`, {}, config);
    dispatch(setDeliveredFlag());
  } catch (error) {
    dispatch(
      setError(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
          ? error.message
          : "Order could not be updated."
      )
    );
  }
};

export const resetErrorandRemoval = () => async (dispatch) => {
  dispatch(resetError());
};
