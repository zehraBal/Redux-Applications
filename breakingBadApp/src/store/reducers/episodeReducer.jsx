import {
  FETCH_EPISODES_FAILURE,
  FETCH_EPISODES_NEXT,
  FETCH_EPISODES_REQUEST,
  GET_EPISODES,
  HAS_NEXT_EPISODE,
} from "../actions/episodeActions";

const initialEpisode = {
  episodes: [],
  page: 2,
  isLoading: false,
  hasNext: true,
};
export const episodeReducer = (state = initialEpisode, action) => {
  switch (action.type) {
    case GET_EPISODES:
      return {
        ...state,
        episodes: [...action.payload],
      };
    case FETCH_EPISODES_NEXT:
      let newPage = state.page + 1;
      return {
        ...state,
        episodes: [...state.episodes, ...action.payload],
        isLoading: false,
        page: newPage,
      };
    case FETCH_EPISODES_FAILURE:
      return { ...state, isLoading: false, error: action.payload };
    case FETCH_EPISODES_REQUEST:
      return { ...state, isLoading: true, error: null };
    case HAS_NEXT_EPISODE:
      return { ...state, hasNext: false };
    default:
      return state;
  }
};
