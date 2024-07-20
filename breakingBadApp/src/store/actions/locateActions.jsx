import axios from "axios";
export const GET_LOCATIONS = "GET_LOCATIONS";
export const HAS_NEXT_LOCATION = "HAS_NEXT_LOCATION";
export const FETCH_LOCATIONS_REQUEST = "FETCH_LOCATIONS_REQUEST";
export const FETCH_LOCATIONS_NEXT = "FETCH_LOCATIONS_NEXT";
export const FETCH_LOCATIONS_SUCCESS = "FETCH_LOCATIONS_SUCCESS";
export const FETCH_LOCATIONS_FAILURE = "FETCH_LOCATIONS_FAILURE";

export const getLocations = (data) => {
  return { type: GET_LOCATIONS, payload: data };
};

export const getNextLocations = (data) => {
  return { type: FETCH_LOCATIONS_NEXT, payload: data };
};

export const fetchLocationsRequest = () => {
  return { type: FETCH_LOCATIONS_REQUEST };
};

export const fetchLocationsFailure = (error) => {
  return { type: FETCH_LOCATIONS_FAILURE, payload: error };
};

export const hasNextLocation = () => {
  return { type: HAS_NEXT_LOCATION };
};

export const fetchLocations = () => (dispatch) => {
  dispatch(fetchLocationsRequest());
  axios
    .get(`https://rickandmortyapi.com/api/location`)
    .then((res) => dispatch(getLocations(res.data.results)))
    .catch((err) => {
      console.warn(err);
      dispatch(fetchLocationsFailure());
    });
};

export const fetchNextLocations = (page) => (dispatch) => {
  dispatch(fetchLocationsRequest());
  axios
    .get(`https://rickandmortyapi.com/api/location?page=${page}`)
    .then((res) => {
      if (res.status === 200) {
        dispatch(getNextLocations(res.data.results));
        if (res.data.info.next === null) dispatch(hasNextLocation());
        console.log(res.data);
      }
    })
    .catch((err) => {
      dispatch(fetchLocationsFailure(err.message));
    });
};
