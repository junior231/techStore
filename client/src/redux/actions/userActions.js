import axios from "axios";
import {
  setLoading,
  loginUser,
  logoutUser,
  setError,
  updateUserProfile,
  resetUpdate,
  setUserOrders,
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
  dispatch(resetUpdate());
  // remove userInfo from local storage
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

export const updateProfile =
  (id, name, email, password) => async (dispatch, getState) => {
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

      const { data } = await axios.put(
        `/api/users/profile/${id}`,
        { _id: id, name, email, password },
        config
      );

      // update userInfo in localstorage as well
      localStorage.setItem("userInfo", JSON.stringify(data));
      dispatch(updateUserProfile(data));
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

export const getUserOrders = () => async (dispatch, getState) => {
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
    const { data } = await axios.get(`/api/users/${userInfo._id}`, config);
    dispatch(setUserOrders(data));
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

export const resetUpdateSuccess = () => async (dispatch) => {
  dispatch(resetUpdate());
};
