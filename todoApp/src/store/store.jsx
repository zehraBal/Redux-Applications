import { combineReducers, legacy_createStore as createStore } from "redux";
import { todoReducer, showToDoReducer } from "./reducers/reducers";
const rootReducer = combineReducers({
  todo: todoReducer,
  show: showToDoReducer,
});
export const store = createStore(rootReducer);
