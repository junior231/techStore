import axios from "axios";
import { setProducts, setError, setLoading } from "../slices/products";

const API_ENDPOINT = "/api/products";

export const getProducts = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const { data } = await axios.get(API_ENDPOINT);
    dispatch(setProducts(data));
  } catch (error) {
    const { data } = error.response && error.response;
    const { message } = error && error.message;
    dispatch(
      setError(
        data
          ? data.message
          : message
          ? message
          : "An unexpected message has occured. Please try again later."
      )
    );
  }
};