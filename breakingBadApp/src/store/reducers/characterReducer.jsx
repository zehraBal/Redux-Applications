import {
  FETCH_CHARACTERS_FAILURE,
  FETCH_CHARACTERS_REQUEST,
  FETCH_NEXT_PAGE,
  GET_CHARACTERS,
  HAS_NEXT_PAGE,
} from "../actions/charActions";

const initialCharacter = {
  characters: [],
  isLoading: false,
  error: null,
  page: 2,
  hasNext: true,
};
export const characterReducer = (state = initialCharacter, action) => {
  switch (action.type) {
    case GET_CHARACTERS:
      return {
        ...state,
        characters: [...action.payload],
        isLoading: false,
      };
    case FETCH_NEXT_PAGE:
      let newPage = state.page + 1;
      return {
        ...state,
        characters: [...state.characters, ...action.payload],
        isLoading: false,
        page: newPage,
      };
    case FETCH_CHARACTERS_FAILURE:
      return { ...state, isLoading: false, error: action.payload };
    case FETCH_CHARACTERS_REQUEST:
      return { ...state, isLoading: true, error: null };
    case HAS_NEXT_PAGE:
      return { ...state, hasNext: false };
    default:
      return state;
  }
};
