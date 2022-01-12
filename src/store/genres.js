import { createSlice, createStore } from "@reduxjs/toolkit";
import { apiCallBegan, apiCallFailed } from "../store/api";
import moment from "moment";
import { last } from "lodash";

const slice = createSlice({
  name: "genres",
  initialState: {
    list: [],
    loading: false,
    lastFetch: null,
  },
  reducers: {
    genresReceived: (state, action) => {
      state.list = action.payload.tags;
      state.loading = false;
      state.lastFetch = Date.now();
    },
    genresRequestFailed: (state, action) => {
      state.loading = false;
    },
  },
});

export const { genresReceived } = slice.actions;
export default slice.reducer;

//Action Creator
const url = "/tags";
export const getGenres = () => (dispatch, getState) => {
  const { lastFetch } = getState().entities.genres;
  const diffInMinutes = moment().diff(moment(lastFetch), "minutes");
  if (diffInMinutes < 10) return;

  dispatch(
    apiCallBegan({
      url: url,
      onSuccess: genresReceived.type,
      onError: apiCallFailed.type,
    })
  );
};
