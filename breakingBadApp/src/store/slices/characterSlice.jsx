import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  favorites: [],
  selectedCharacter: null,
};

export const charactersSlice = createSlice({
  name: "characters",
  initialState,
  reducers: {
    addFavorite: (state, action) => {
      state.favorites.push(action.payload);
    },
    setSelectedCharacter: (state, action) => {
      state.selectedCharacter = action.payload;
    },
  },
});

export const { addFavorite, selectedCharacter } = charactersSlice.actions;

export default charactersSlice.reducer;
