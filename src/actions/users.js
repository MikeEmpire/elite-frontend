import axios from "axios";
import nprogress from "nprogress";

import apiUrl from "../constants/apiUrl";

export const GET_USERS_REQUEST = "GET_USERS_REQUEST";
export const GET_USERS_SUCCESS = "GET_USERS_SUCCESS";
export const GET_USERS_FAILURE = "GET_USERS_FAILURE";
export const getUsers = () => (dispatch) => {
  dispatch({ type: GET_USERS_REQUEST });
  nprogress.start();
  return axios
    .get(`${apiUrl}/api/users`)
    .then((res) => {
      nprogress.done();
      return dispatch({ type: GET_USERS_SUCCESS, payload: res.data });
    })
    .catch((err) => {
      nprogress.done();
      nprogress.remove();

      return dispatch({
        type: GET_USERS_FAILURE,
        payload: err,
        error: true,
      });
    });
};
