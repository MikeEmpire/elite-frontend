import { GET_USERS_SUCCESS } from "../actions/users";

const initialState = {
  stories: [],
};

export default function stories(state = initialState, action) {
  switch (action.type) {
    case GET_USERS_SUCCESS: {
      return {
        users: action.payload.users
      }
    }

    default:
      return state;
  }
}
