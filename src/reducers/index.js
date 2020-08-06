import { combineReducers } from "redux";

import stories from "./stories";
import users from './users'
import auth from './auth';

const rootReducer = combineReducers({
  auth,
  stories,
  users
});

export default rootReducer;
