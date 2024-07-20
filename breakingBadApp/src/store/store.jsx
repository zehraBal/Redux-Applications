import {
  applyMiddleware,
  combineReducers,
  legacy_createStore as createStore,
} from "redux";
import { thunk } from "redux-thunk";
import { characterReducer } from "./reducers/characterReducer";
import { episodeReducer } from "./reducers/episodeReducer";
const rootReducer = combineReducers({
  stars: characterReducer,
  shows: episodeReducer,
});
export const store = createStore(rootReducer, applyMiddleware(thunk));
