import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  characterFilters: {
    name: "",
    status: "",
    species: "",
    gender: "",
  },
  episodeFilters: {
    name: "",
    season: "",
    airDate: "",
  },
  locationFilters: {
    name: "",
    type: "",
    dimension: "",
  },
  activeTab: "characters",
};

export const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setCharacterFilter: (state, action) => {
      state.characterFilters = { ...state.characterFilters, ...action.payload };
    },
    resetCharacterFilters: (state) => {
      state.characterFilters = initialState.characterFilters;
    },
    setEpisodeFilter: (state, action) => {
      state.episodeFilters = { ...state.episodeFilters, ...action.payload };
    },
    resetEpisodeFilters: (state) => {
      state.episodeFilters = initialState.episodeFilters;
    },
    setLocationFilter: (state, action) => {
      state.locationFilters = { ...state.locationFilters, ...action.payload };
    },
    resetLocationFilters: (state) => {
      state.locationFilters = initialState.locationFilters;
    },
    setActiveTab: (state, action) => {
      state.activeTab = action.payload;
    },
  },
});

export const {
  setCharacterFilter,
  resetCharacterFilters,
  setEpisodeFilter,
  resetEpisodeFilters,
  setLocationFilter,
  resetLocationFilters,
  setActiveTab,
} = filtersSlice.actions;

export default filtersSlice.reducer;
