import axios from "axios";
import {
  setLoading,
  loginUser,
  logoutUser,
  setError,
  registerUser,
} from "../slices/user";

export const login = (email, password) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    // configure request header
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    // dispatch post request with user email and password, and headers
    const { data } = await axios.post(
      "/api/users/login",
      { email, password },
      config
    );
    dispatch(loginUser(data));
    localStorage.setItem("userInfo", JSON.stringify(data));
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

export const logout = () => async (dispatch) => {
  // remove userInfor from local storage
  localStorage.removeItem("userInfo");
  // dispatch logout user reducer fn
  dispatch(logoutUser());
};

export const register = (name, email, password) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    // configure request header
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    // dispatch post request with user email and password, and headers
    const { data } = await axios.post(
      "/api/users/register",
      { name, email, password },
      config
    );
    dispatch(loginUser(data));
    localStorage.setItem("userInfo", JSON.stringify(data));
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
