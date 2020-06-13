import axios from "axios";
import nprogress from "nprogress";

import apiUrl from "../constants/apiUrl";

export const GET_STORIES_REQUEST = "GET_STORIES_REQUEST";
export const GET_STORIES_SUCCESS = "GET_STORIES_SUCCESS";
export const GET_STORIES_FAILURE = "GET_STORIES_FAILURE";
export const getStories = () => (dispatch) => {
  dispatch({ type: GET_STORIES_REQUEST });
  nprogress.start();
  return axios
    .get(`${apiUrl}/api/stories`)
    .then((res) => {
      nprogress.done();

      return dispatch({ type: GET_STORIES_SUCCESS, payload: res.data });
    })
    .catch((err) => {
      nprogress.done();
      nprogress.remove();

      return dispatch({
        type: GET_STORIES_FAILURE,
        payload: err,
        error: true,
      });
    });
};
