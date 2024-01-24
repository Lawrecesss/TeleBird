import { combineReducers } from "redux";
import UserAuthReducer from "./UserAuthReducer";

const myReducer = combineReducers({
  user: UserAuthReducer,
});
export default myReducer;
