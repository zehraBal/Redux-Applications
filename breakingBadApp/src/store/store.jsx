import { applyMiddleware, legacy_createStore as createStore } from "redux";
import { thunk } from "redux-thunk";
import { characterReducer } from "./reducers/reducer";
export const store = createStore(characterReducer, applyMiddleware(thunk));
