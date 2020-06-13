import { GET_STORIES_SUCCESS } from "../actions/stories";

const initialState = {
  stories: [],
};

export default function stories(state = initialState, action) {
  switch (action.type) {
    case GET_STORIES_SUCCESS: {
        console.log(action)
      return {
        stories: action.payload.stories
      }
    }

    default:
      return state;
  }
}
