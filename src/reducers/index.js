import { combineReducers } from "redux";

import stories from "./stories";
import users from './users'

const rootReducer = combineReducers({
  stories,
  users
});

export default rootReducer;
