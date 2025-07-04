import { configureStore } from "@reduxjs/toolkit";
import { rickMortyApi } from "./services/apiSlice";
import filtersReducer from "./slices/filtersSlice";
import uiReducer from "./slices/uiSlice";
import charactersReducer from "./slices/characterSlice";

export const store = configureStore({
  reducer: {
    [rickMortyApi.reducerPath]: rickMortyApi.reducer,
    filters: filtersReducer,
    ui: uiReducer,
    characters: charactersReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(rickMortyApi.middleware),
});
