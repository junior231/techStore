import axios from "axios";
import { getUsers, userDelete, resetError, setError } from "../slices/admin";

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
          : "Could not retrieve users."
      )
    );
  }
};

export const resetErrorandRemoval = () => async (dispatch) => {
  dispatch(resetError());
};
