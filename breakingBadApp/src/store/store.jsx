import {
  applyMiddleware,
  combineReducers,
  legacy_createStore as createStore,
} from "redux";
import { thunk } from "redux-thunk";
import { characterReducer } from "./reducers/characterReducer";
import { episodeReducer } from "./reducers/episodeReducer";
import { locateReducer } from "./reducers/locateReducer";
const rootReducer = combineReducers({
  stars: characterReducer,
  shows: episodeReducer,
  locate: locateReducer,
});
export const store = createStore(rootReducer, applyMiddleware(thunk));
