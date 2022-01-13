import React, { Component, useEffect,useState } from "react";
import { Link } from "react-router-dom";
import MoviesTable from "./moviesTable";
import ListGroup from "./common/listGroup";
import Pagination from "./common/pagination";
import { deleteMovie, getMoviesByUser } from "../services/movieService";
import auth from "../services/authService";
import { getGenres } from "../services/genreService";
import { paginate } from "../utils/paginate";
import _ from "lodash";
import SearchBox from "./searchBox";
import { checkPropTypes } from "prop-types";


function Movies(props) {

  const [state, setState] = useState({
  movies: [],
  genres: [],
  currentPage: 1,
  pageSize: 4,
  searchQuery: "",
  selectedGenre: null,
  sortColumn: { path: "title", order: "asc" }
});
const populate = async () => {
  const currentUser = auth.getCurrentUser();
  if (currentUser === null)
  {
      props.history.push("/login");
      return;
  }
  const user = currentUser.username;

  const {data} = await getGenres();
  const genres = [{ _id: "", name: "All Tags" }];

  for(let i=0; i<=data.tags.length;i++)
  {
    genres.push({ _id: i, name: data.tags[i] });
  }
  const {data: movies}  = await getMoviesByUser(user); 
  console.log("state default",state)
  setState({ movies: movies.articles , genres,
    currentPage: 1,
    pageSize: 4,
    searchQuery: "",
    selectedGenre: null,
    sortColumn: { path: "title", order: "asc" } });
}

useEffect(() => {
  populate();
},[]);

const getPagedData = () => {
  const {
    pageSize,
    currentPage,
    sortColumn,
    selectedGenre,
    searchQuery,
    movies: allMovies,
    genres
  } = state;

  console.log("state after getpaged",state);
  let filtered = allMovies;
  if (searchQuery !== "" && searchQuery != undefined)
  {
    filtered = allMovies.filter(m =>
      m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
    );
  }
  else if (selectedGenre && selectedGenre._id !== "")
  {
    const nestedArray = allMovies.map((element) => {
      return {...element, subElements: element.tagList.filter((subElement) => subElement === selectedGenre.name)};
    });
    filtered = nestedArray.filter((v) => v.subElements.length != 0);
  }
  const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

  const movies = paginate(sorted, currentPage, pageSize);

  return { totalCount: filtered.length, data: movies };
};

const { length: count } = state.movies;
const { pageSize, currentPage, sortColumn, searchQuery } = state;
if (count === 0) return <p>There are no movies in the database.</p>;
 console.log("before getpaged", state)
 const { totalCount, data: movies } = getPagedData();


  const handleGenreSelect = genre => {
    setState({ selectedGenre: genre, searchQuery: "", currentPage: 1 ,
    movies: state.movies , genres: state.genres, 
    pageSize: state.pageSize,
    sortColumn: state.sortColumn
  });
  };

  
  const handleSearch = query => {
    setState({ searchQuery: query, selectedGenre: null, currentPage: 1 ,
      movies: state.movies , genres: state.genres, 
      pageSize: state.pageSize,
      sortColumn: state.sortColumn
    });
  };

  const handleDelete = async movie => {
    const originalMovies = state.movies;
    const movies = originalMovies.filter(m => m.slug !== movie.slug);
    setState({ movies: movies , genres: state.genres, currentPage: state.currentPage,
      pageSize: state.pageSize,
      searchQuery: state.searchQuery,
      selectedGenre: state.selectedGenre,
      sortColumn: sortColumn });

    await deleteMovie(movie.slug);
  };

  const handleLike = movie => {
    const movies = [...state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].favorited = !movies[index].favorited;
    setState({ movies , genres: state.genres, currentPage: state.currentPage,
      pageSize: state.pageSize,
      searchQuery: state.searchQuery,
      selectedGenre: state.selectedGenre,
      sortColumn: state.sortColumn });
  };

  const handlePageChange = page => {
    setState({ movies: state.movies , genres: state.genres, currentPage: page,
      pageSize: state.pageSize,
      searchQuery: state.searchQuery,
      selectedGenre: state.selectedGenre,
      sortColumn: sortColumn });
  };


  const handleSort = sortColumn => {
    setState({ movies: state.movies , genres: state.genres, currentPage: state.currentPage,
      pageSize: state.pageSize,
      searchQuery: state.searchQuery,
      selectedGenre: state.selectedGenre,
      sortColumn: sortColumn });
  };

 
  return (
    <div className="row">
      <div className="col-3">
        <ListGroup
          items={state.genres}
          selectedItem={state.selectedGenre}
          onItemSelect={handleGenreSelect}
        />
      </div> 
       <div className="col">
        <Link
          to="/movies/new"
          className="btn btn-primary"
          style={{ marginBottom: 20 }}
        >
          New Movie
        </Link>
        <p>Showing {totalCount} movies in the database.</p> 
        <SearchBox value={searchQuery} onChange={handleSearch} />
        <MoviesTable
          movies={movies}
          sortColumn={sortColumn}
          onLike={handleLike}
          onDelete={handleDelete}
          onSort={handleSort}
        />
        <Pagination
          itemsCount={totalCount}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}

export default Movies;
