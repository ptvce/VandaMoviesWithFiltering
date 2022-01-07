import http from "./httpService";
import { apiUrl } from "../config.json";
import auth from "./authService";

const apiEndpoint = apiUrl + "/articles";

const token = auth.getJwt();
var header = {
  headers: {
    Authorization: `Token ${token}`,
    "content-type": "application/json",
  },
};

function movieUrl(slug) {
  return `${apiEndpoint}/${slug}`;
}

export function getMovies() {
  return http.get(apiEndpoint);
}

export function getMovie(movieId) {
  return http.get(movieUrl(movieId));
}

export function saveMovie(movie) {
  let request = {};
  request.article = {};
  request.article.title = movie.title;
  request.article.description = movie.description;
  request.article.body = movie.body;
  request.article.tagList = [];
  request.article.tagList.push(movie.tags);
  if (movie._id) {
    const body = { ...movie };
    delete body._id;
    return http.put(movieUrl(movie._id), body);
  }
  return http.post(apiEndpoint, request);
}

export function deleteMovie(slug) {
  return http.delete(movieUrl(slug));
}
