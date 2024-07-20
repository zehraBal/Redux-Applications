import axios from "axios";
export const GET_EPISODES = "GET_EPISODES";
export const HAS_NEXT_EPISODE = "HAS_NEXT_EPISODE";
export const FETCH_EPISODES_REQUEST = "FETCH_EPISODES_REQUEST";
export const FETCH_EPISODES_NEXT = "FETCH_EPISODES_NEXT";
export const FETCH_EPISODES_SUCCESS = "FETCH_EPISODES_SUCCESS";
export const FETCH_EPISODES_FAILURE = "FETCH_EPISODES_FAILURE";

export const getEpisodes = (data) => {
  return { type: GET_EPISODES, payload: data };
};

export const getNextEpisodes = (data) => {
  return { type: FETCH_EPISODES_NEXT, payload: data };
};

export const fetchEpisodesRequest = () => {
  return { type: FETCH_EPISODES_REQUEST };
};

export const fetchEpisodesFailure = (error) => {
  return { type: FETCH_EPISODES_FAILURE, payload: error };
};

export const hasNextEpisode = () => {
  return { type: HAS_NEXT_EPISODE };
};

export const fetchEpisodes = () => (dispatch) => {
  dispatch(fetchEpisodesRequest());
  axios
    .get(`https://rickandmortyapi.com/api/episode`)
    .then((res) => dispatch(getEpisodes(res.data.results)))
    .catch((err) => {
      console.warn(err);
      dispatch(fetchEpisodesFailure());
    });
};

export const fetchNextEpisodes = (page) => (dispatch) => {
  dispatch(fetchEpisodesRequest());
  axios
    .get(`https://rickandmortyapi.com/api/episode?page=${page}`)
    .then((res) => {
      if (res.status === 200) {
        dispatch(getNextEpisodes(res.data.results));
        if (res.data.info.next === null) dispatch(hasNextEpisode());
        console.log(res.data);
      }
    })
    .catch((err) => {
      dispatch(fetchEpisodesFailure(err.message));
    });
};
