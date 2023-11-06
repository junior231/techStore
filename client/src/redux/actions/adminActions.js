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
import {
  setProductUpdatedFlag,
  setProducts,
  setProductDeletedFlag,
  setProductUploadedFlag,
  setReviewRemovalFlag,
} from "../slices/products";

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

// update product
export const updateProduct =
  (brand, name, category, stock, price, id, productIsNew, description, image) =>
  async (dispatch, getState) => {
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
      const { data } = await axios.put(
        `api/products`,
        {
          brand,
          category,
          stock,
          price,
          productIsNew,
          description,
          name,
          id,
          image,
        },
        config
      );
      dispatch(setProducts(data));
      dispatch(setProductUpdatedFlag());
    } catch (error) {
      dispatch(
        setError(
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
            ? error.message
            : "Product could not be updated."
        )
      );
    }
  };

// delete product
export const deleteProduct = (id) => async (dispatch, getState) => {
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
    const { data } = await axios.delete(
      `api/products/${id}`,

      config
    );
    dispatch(setProducts(data));
    dispatch(setProductDeletedFlag());
    dispatch(resetError());
  } catch (error) {
    dispatch(
      setError(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
          ? error.message
          : "Product could not be deleted."
      )
    );
  }
};

// upload product
export const uploadProduct = (newProduct) => async (dispatch, getState) => {
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
    const { data } = await axios.post(`api/products`, newProduct, config);
    dispatch(setProducts(data));
    dispatch(setProductUploadedFlag());
  } catch (error) {
    dispatch(
      setError(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
          ? error.message
          : "Product could not be uploaded."
      )
    );
  }
};

export const removeReview =
  (productId, reviewId) => async (dispatch, getState) => {
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
      const { data } = await axios.put(
        `api/products/${productId}/${reviewId}`,
        {},
        config
      );
      dispatch(setProducts(data));
      dispatch(setReviewRemovalFlag());
    } catch (error) {
      dispatch(
        setError(
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
            ? error.message
            : "Review could not be removed."
        )
      );
    }
  };
