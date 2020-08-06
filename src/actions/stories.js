import actionAxios from "../helpers/actionAxios";

const getStoriesParams = {
  body: [],
  url: "/api/stories",
  actionType: `GET_STORIES`,
  method: "get",
};

export const GET_STORIES_SUCCESS = "GET_STORIES_SUCCESS";
export const getStories = () => (dispatch) =>
  actionAxios(getStoriesParams, dispatch);

export const CREATE_STORY_SUCCESS = "CREATE_STORY_SUCCESS";
export const createStory = (story) => (dispatch) => {
  const createStoryParams = {
    body: story,
    url: "/api/stories",
    actionType: "CREATE_STORY",
    method: "post",
  };
  return actionAxios(createStoryParams, dispatch);
};

export const EDIT_STORY_SUCCESS = "EDIT_STORY_SUCCESS";
export const editStory = (story) => (dispatch) => {
  const editStoryParams = {
    body: story,
    url: `/api/stories/${story.id}`,
    actionType: "EDIT_STORY",
    method: "put",
  };
  return actionAxios(editStoryParams, dispatch);
};
