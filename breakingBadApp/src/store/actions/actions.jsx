import axios from "axios";
export const GET_CHARACTERS = "GET_CHARACTERS";
export const FETCH_NEXT_PAGE = "FETCH_NEXT_PAGE";
export const FETCH_CHARACTERS_REQUEST = "FETCH_CHARACTERS_REQUEST";
export const FETCH_CHARACTERS_SUCCESS = "FETCH_CHARACTERS_SUCCESS";
export const FETCH_CHARACTERS_FAILURE = "FETCH_CHARACTERS_FAILURE";
export const HAS_NEXT_PAGE = "HAS_NEXT_PAGE";

export const getCharacters = (data) => {
  return { type: GET_CHARACTERS, payload: data };
};

export const getNextPage = (data) => {
  return { type: FETCH_NEXT_PAGE, payload: data };
};
export const fetchCharactersRequest = () => {
  return { type: FETCH_CHARACTERS_REQUEST };
};

export const fetchCharactersFailure = (error) => {
  return { type: FETCH_CHARACTERS_FAILURE, payload: error };
};

export const hasNextPage = () => {
  return { type: HAS_NEXT_PAGE };
};
export const fetchCharacters = () => (dispatch) => {
  dispatch(fetchCharactersRequest());
  axios
    .get(`https://rickandmortyapi.com/api/character/?page=1`)
    .then((res) => {
      if (res.status === 200) {
        dispatch(getCharacters(res.data.results));
      }
    })
    .catch((err) => {
      dispatch(fetchCharactersFailure(err.message));
    });
};

export const fetchNextPage = (page) => (dispatch) => {
  dispatch(fetchCharactersRequest());
  axios
    .get(`https://rickandmortyapi.com/api/character/?page=${page}`)
    .then((res) => {
      if (res.status === 200) {
        dispatch(getNextPage(res.data.results));
        if (res.data.info.next === null) dispatch(hasNextPage());
        console.log(res.data);
      }
    })
    .catch((err) => {
      dispatch(fetchCharactersFailure(err.message));
    });
};
