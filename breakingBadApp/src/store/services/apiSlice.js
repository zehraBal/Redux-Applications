import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const rickMortyApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "https://rickandmortyapi.com/api" }),
  tagTypes: ["Characters", "Locations", "Episodes"],
  endpoints: (builder) => ({
    getCharacters: builder.query({
      query: ({
        page = 1,
        name = "",
        status = "",
        species = "",
        gender = "",
      }) => ({
        url: "/character",
        params: { page, name, status, species, gender },
      }),
      transformResponse: (response) => ({
        results: response.results,
        info: response.info,
      }),
      providesTags: ["Characters"],
    }),

    getCharacterById: builder.query({
      query: (id) => `/character/${id}`,
      providesTags: (result, error, id) => [{ type: "Characters", id }],
    }),

    // Locations
    getLocations: builder.query({
      query: ({ page = 1, name = "", type = "", dimension = "" }) => ({
        url: "/location",
        params: { page, name, type, dimension },
      }),
      transformResponse: (response) => ({
        results: response.results,
        info: response.info,
      }),
      providesTags: ["Locations"],
    }),

    // Episodes
    getEpisodes: builder.query({
      query: ({ page = 1, name = "", episode = "" }) => ({
        url: "/episode",
        params: { page, name, episode },
      }),
      transformResponse: (response) => ({
        results: response.results,
        info: response.info,
      }),
      providesTags: ["Episodes"],
    }),

    getEpisodeById: builder.query({
      query: (id) => `/episode/${id}`,
      providesTags: (result, error, id) => [{ type: "Episodes", id }],
    }),
    getMultipleEpisodes: builder.query({
      query: (ids) => `/episode/${ids.join(",")}`,
      transformResponse: (response) =>
        Array.isArray(response) ? response : [response],
      providesTags: (result) =>
        result?.map(({ id }) => ({ type: "Episodes", id })) || [],
    }),
    // Get Multiple Characters
    getMultipleCharacters: builder.query({
      query: (ids) => `/character/${ids.join(",")}`,
      transformResponse: (response) =>
        Array.isArray(response) ? response : [response],
      providesTags: (result) =>
        result?.map(({ id }) => ({ type: "Characters", id })) || [],
    }),
    getCharacterEpisodes: builder.query({
      query: (characterId) => `/character/${characterId}`,
      transformResponse: (character) => character.episode,
    }),
  }),

  // endpoints fonksiyonunun kapanışı
});

// Export hooks
export const {
  useGetCharactersQuery,
  useLazyGetCharactersQuery,
  useGetCharacterByIdQuery,
  useGetLocationsQuery,
  useLazyGetLocationsQuery,
  useGetEpisodesQuery,
  useLazyGetEpisodesQuery,
  useGetEpisodeByIdQuery,
  useGetMultipleCharactersQuery,
  useGetMultipleEpisodesQuery,
  useGetCharacterEpisodesQuery,
} = rickMortyApi;
