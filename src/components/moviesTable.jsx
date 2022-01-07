import React, { Component } from "react";
import { Link } from "react-router-dom";
import Table from "./common/table";
import Like from "./common/like";
import Label from "./common/label";

class MoviesTable extends Component {
  columns = [
    {
      path: "title",
      label: "Title",
      content: movie => <Link to={`/movies/${movie.slug}`}>{movie.title}</Link>
    },
    {
      key: "tagList",
      label:"Tag",
      content: movie => (
        <Label text={movie.tagList} />
      )
    },
    { path: "author.username", label: "Author" },
    { path: "slug", label: "Slug" },
    { path: "favoritesCount", label: "FavoritesCount" },
    {
      key: "favorited",
      content: movie => (
        <Like liked={movie.favorited} onClick={() => this.props.onLike(movie)} />
      )
    },
    {
      key: "delete",
      content: movie => (
        <button
          onClick={() => this.props.onDelete(movie)}
          className="btn btn-danger btn-sm"
        >
          Delete
        </button>
      )
    }
  ];

  render() {
    const { movies, onSort, sortColumn } = this.props;

    return (
      <Table
        columns={this.columns}
        data={movies}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default MoviesTable;
