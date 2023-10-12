import axios from "axios";
import {
  setProducts,
  setError,
  setLoading,
  setProduct,
  productReviewed,
  resetError,
} from "../slices/products";

const GET_PRODUCTS = "/api/products";

export const getProducts = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const { data } = await axios.get(GET_PRODUCTS);
    dispatch(setProducts(data));
  } catch (error) {
    dispatch(
      setError(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
          ? error.message
          : "An unexpected error has occured. Please try again later."
      )
    );
  }
};

export const getProduct = (id) => async (dispatch) => {
  setLoading(true);
  try {
    const { data } = await axios.get(`/api/products/${id}`);
    dispatch(setProduct(data));
  } catch (error) {
    dispatch(
      setError(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
          ? error.message
          : "An unexpected error has occured. Please try again later."
      )
    );
  }
};

export const createProductReview =
  (productId, userId, comment, rating, title) => async (dispatch, getState) => {
    dispatch(setLoading(true));
    // destructure user.userInfo from getState
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

      const { data } = await axios.post(
        `/api/products/reviews/${productId}`,
        { userId, comment, rating, title },
        config
      );

      // update userInfo in localstorage as well
      localStorage.setItem("userInfo", JSON.stringify(data));
      dispatch(productReviewed());
    } catch (error) {
      dispatch(
        setError(
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
            ? error.message
            : "An unexpected error has occured. Please try again later."
        )
      );
    }
  };

export const resetProductError = () => async (dispatch) => {
  dispatch(resetError());
};
