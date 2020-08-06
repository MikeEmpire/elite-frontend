import axios from "axios";

import apiUrl from "../constants/apiUrl";

import actionAxios from "../helpers/actionAxios";

export const GET_USERS_SUCCESS = "GET_USERS_SUCCESS";
const getUsersParams = {
  body: [],
  url: `/api/users`,
  actionType: `GET_USERS`,
  method: "get",
};
export const getUsers = () => (dispatch) =>
  actionAxios(getUsersParams, dispatch);

export const SIGN_IN_REQUEST = "SIGN_IN_REQUEST";
export const SIGN_IN_SUCCESS = "SIGN_IN_SUCCESS";
export const SIGN_IN_FAILURE = "SIGN_IN_FAILURE";
export const signIn = (submitObj) => (dispatch) => {
  dispatch({ type: SIGN_IN_REQUEST });
  return axios
    .post(`${apiUrl}/api/users/signin`, submitObj)
    .then((res) => {
      localStorage.removeItem("token");
      // set local storage token
      const { token } = res.data;
      localStorage.setItem("token", token);
      return dispatch({ type: SIGN_IN_SUCCESS, payload: res.data });
      // redirect to /portal
    })
    .catch((err) => {
      return dispatch({
        type: SIGN_IN_FAILURE,
        payload: err,
        error: true,
      });
    });
};

export const AUTH_CHECK_SUCCESS = "AUTH_CHECK_SUCCESS";

const authCheckParams = {
  body: [],
  url: "/api/users/check",
  actionType: "AUTH_CHECK",
  method: "post",
};
export const authCheck = () => (dispatch) =>
  actionAxios(authCheckParams, dispatch);
