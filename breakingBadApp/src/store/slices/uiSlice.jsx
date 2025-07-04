import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  theme: "dark",
};

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    toggleTheme: (state) => {
      state.theme = state.theme === "dark" ? "light" : "dark";
    },
  },
});

export const { setLoading, toggleTheme } = uiSlice.actions;
export default uiSlice.reducer;
