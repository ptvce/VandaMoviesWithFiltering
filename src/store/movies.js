import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import moment from "moment";
import { apiCallBegan, apiCallFailed } from "../store/api";

const slice = createSlice({
  name: "movies",
  initialState: {
    list: [],
    loading: false,
    lastFetch: null,
  },
  reducers: {
    moviesReceived: (state, action) => {
      state.list = action.payload.articles;
      state.loading = false;
      state.lastFetch = Date.now();
    },
    movieAdded: (state, action) => {
      state.list.push(action.payload);
    },
    movieRemoved: (state, action) => {
      state.list.filter((movie) => movie.slug === action.payload.slug);
    },
    movieResolved: (state, action) => {
      const index = state.list.findIndex(
        (movie) => movie.slug === action.payload.slug
      );
      state.list[index].resolved = true;
    },
    movieAssignedToUser: (state, action) => {
      const { movieId, userId } = action.payload;
      const index = state.list.findIndex((movie) => movie.slug === movieId);
      state.list[index].userId = userId;
    },
  },
});

export const {
  movieAdded,
  movieRemoved,
  movieResolved,
  movieAssignedToUser,
  moviesReceived,
} = slice.actions;
export default slice.reducer;

//Action Creator
const url = "/articles";
export const getMovies = () => (dispatch, getState) => {
  const { lastFetch } = getState().entities.movies;
  const diffInMinutes = moment().diff(moment(lastFetch), "minutes");
  if (diffInMinutes < 10) return;

  dispatch(
    apiCallBegan({
      url: url,
      method: "get",
      onSuccess: moviesReceived.type,
      onError: apiCallFailed.type,
    })
  );
};

export const addMovie = (movie) =>
  apiCallBegan({
    url: url,
    method: "post",
    data: movie,
    onSuccess: movieAdded.type,
  });
//selector functions
//with memoize
export const getMoviesByUserId = (userId) =>
  createSelector(
    (state) => state.entities.movies,
    (movies) => movies.list.filter((movie) => movie.userId === userId)
  );
export const getUnResolvedMovies = createSelector(
  (state) => state.entities.movies,
  (movies) => movies.list.filter((movie) => !movie.resolved)
);

//not memoize
// export const getUnResolvedMovies = (state) =>
//   state.entities.movies.filter((movie) => !movie.resolved);
