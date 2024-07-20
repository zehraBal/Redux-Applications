import {
  FETCH_LOCATIONS_FAILURE,
  FETCH_LOCATIONS_NEXT,
  FETCH_LOCATIONS_REQUEST,
  GET_LOCATIONS,
  HAS_NEXT_LOCATION,
} from "../actions/locateActions";

const initialLocation = {
  locations: [],
  page: 2,
  isLoading: false,
  hasNext: true,
};

export const locateReducer = (state = initialLocation, action) => {
  switch (action.type) {
    case GET_LOCATIONS:
      return {
        ...state,
        locations: [...action.payload],
      };
    case FETCH_LOCATIONS_NEXT:
      let newPage = state.page + 1;
      return {
        ...state,
        locations: [...state.locations, ...action.payload],
        isLoading: false,
        page: newPage,
      };
    case FETCH_LOCATIONS_FAILURE:
      return { ...state, isLoading: false, error: action.payload };
    case FETCH_LOCATIONS_REQUEST:
      return { ...state, isLoading: true, error: null };
    case HAS_NEXT_LOCATION:
      return { ...state, hasNext: false };
    default:
      return state;
  }
};
