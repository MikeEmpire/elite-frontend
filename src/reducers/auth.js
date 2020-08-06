import { AUTH_CHECK_SUCCESS } from '../actions/users';

const initialState = {
    auth: []
}

export default function auth(state = initialState, action) {
    switch (action.type) {
        case AUTH_CHECK_SUCCESS: {
          return {
            auth: action.payload.user,
          };
        }
        default:
            return state
    }
}