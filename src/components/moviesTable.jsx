import React, { Component } from "react";
import { Link } from "react-router-dom";
import Table from "./common/table";
import Like from "./common/like";
import Label from "./common/label";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";


function MoviesTable (props) {

  const { movies, onSort, sortColumn } = props;

  const commitChanges = ( movie ) => {
    confirmAlert({
      title: "Delete Article",
      message: "Are you sure to delete Article?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            if (movie) {
              props.onDelete(movie)
            }
          },
        },
        {
          label: "No",
          onClick: () => "Click No",
        },
      ],
    });
  };

  const columns = [
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
    {
      key: "favorited",
      content: movie => (
        <Like liked={movie.favorited} onClick={() => props.onLike(movie)} />
      )
    },
    {
      key: "delete",
      content: movie => (
        <button
          onClick={() => commitChanges(movie)}
          className="btn btn-danger btn-sm"
        >
          Delete
        </button>
      )
    }
  ];

  return (
    <Table
      columns={columns}
      data={movies}
      sortColumn={sortColumn}
      onSort={onSort}
    />
  );
}
export default MoviesTable;