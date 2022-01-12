import { createSlice } from "@reduxjs/toolkit";
import { act } from "react-test-renderer";
import { createSelector } from "reselect";

let lastId = 0;
const slice = createSlice({
  name: "users",
  initialState: [],
  reducers: {
    userAdded: (state, action) => {
      state.push({
        id: ++lastId,
        name: action.payload.name,
      });
    },
  },
});

export const { userAdded } = slice.actions;
export default slice.reducer;
