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

export const SIGN_IN_REQUEST = "SIGN_IN_REQUEST";
export const SIGN_IN_SUCCESS = "SIGN_IN_SUCCESS";
export const SIGN_IN_FAILURE = "SIGN_IN_FAILURE";
export const signIn = (submitObj) => (dispatch) => {
  dispatch({ type: SIGN_IN_REQUEST });
  nprogress.start();
  return axios
    .post(`${apiUrl}/api/users/signin`, submitObj)
    .then((res) => {
      localStorage.removeItem("token");
      nprogress.done();
      // set local storage token
      const { token } = res.data;
      localStorage.setItem("token", token);
      return dispatch({ type: SIGN_IN_SUCCESS, payload: res.data });
      // redirect to /portal
    })
    .catch((err) => {
      nprogress.done();
      nprogress.remove();

      return dispatch({
        type: SIGN_IN_FAILURE,
        payload: err,
        error: true,
      });
    });
};

export const AUTH_CHECK_REQUEST = "AUTH_CHECK_REQUEST";
export const AUTH_CHECK_SUCCESS = "AUTH_CHECK_SUCCESS";
export const AUTH_CHECK_FAILURE = "AUTH_CHECK_FAILURE";
export const authCheck = () => (dispatch) => {
  dispatch({ type: AUTH_CHECK_REQUEST });
  nprogress.start();
  const token = localStorage.getItem("token");
  return axios
    .post(`${apiUrl}/api/users/check`, {}, {
      headers: {
        Authorization: token,
      },
    })
    .then((res) => {
      return dispatch({ type: AUTH_CHECK_SUCCESS, payload: res.data });
    })
    .catch((err) => {
      nprogress.done();
      nprogress.remove();

      return dispatch({
        type: AUTH_CHECK_FAILURE,
        payload: err,
        error: true,
      });
    });
};
