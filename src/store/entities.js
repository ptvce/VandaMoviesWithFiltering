import { combineReducers } from "redux";
import movieReducer from "./movies";
import genreReducer from "./genres";
import userReducer from "./users";

export default combineReducers({
  movies: movieReducer,
  genres: genreReducer,
  users: userReducer,
});
