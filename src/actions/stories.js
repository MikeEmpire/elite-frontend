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

export const CREATE_STORY_REQUEST = "CREATE_STORY_REQUEST";
export const CREATE_STORY_SUCCESS = "CREATE_STORY_SUCCESS";
export const CREATE_STORY_FAILURE = "CREATE_STORY_FAILURE";
export const createStory = (story) => (dispatch) => {
  dispatch({ type: CREATE_STORY_REQUEST });
  nprogress.start();
  return axios
    .post(`${apiUrl}/api/stories`, {
      ...story,
    })
    .then((res) => {
      nprogress.done();
      return dispatch({ type: CREATE_STORY_SUCCESS, payload: res.data });
    })
    .catch((err) => {
      nprogress.done();
      nprogress.remove();

      return dispatch({
        type: CREATE_STORY_FAILURE,
        payload: err,
        error: true,
      });
    });
};
