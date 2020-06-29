import { GET_STORIES_SUCCESS, GET_STORIES_REQUEST } from "../actions/stories";

const initialState = {
  stories: [],
};

export default function stories(state = initialState, action) {
  switch (action.type) {
    case GET_STORIES_REQUEST: {
      return {
        stories: "loading",
      };
    }
    case GET_STORIES_SUCCESS: {
      return {
        stories: action.payload.stories,
      };
    }

    default:
      return state;
  }
}
