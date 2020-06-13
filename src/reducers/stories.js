import update from "immutability-helper";

import { GET_STORIES_SUCCESS } from "../actions/stories";

const initialState = {
  stories: [],
};

export default function stories(state = initialState, action) {
  switch (action.type) {
    case GET_STORIES_SUCCESS: {
      console.log(action.payload);
      return update(state, {
        stories: { $push: [action.payload.stories] },
      });
    }

    default:
      return state;
  }
}
