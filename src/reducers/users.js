import { GET_USERS_SUCCESS, SIGN_IN_SUCCESS } from "../actions/users";

const initialState = {
  users: [],
};

export default function users(state = initialState, action) {
  switch (action.type) {
    case GET_USERS_SUCCESS: {
      return {
        users: action.payload.users,
      };
    }

    case SIGN_IN_SUCCESS: {
      return {
        auth: action.payload.user,
      };
    }

    default:
      return state;
  }
}
