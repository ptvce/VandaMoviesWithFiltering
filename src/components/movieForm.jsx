import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { getMovieByMovieId, saveMovie } from "../services/movieService";
import { getGenres } from "../services/genreService";
import {  toast } from 'react-toastify';
import { loadProgressBar } from 'axios-progress-bar';
import 'axios-progress-bar/dist/nprogress.css';

class MovieForm extends Form {
  state = {
    data: {
      title: "",
      tags: "",
      description: "",
      body: ""
    },
    genres: [],
    errors: {}
  };

  schema = {
    title: Joi.string()
      .required()
      .label("Title"),
    tags: Joi.string()
       .required()
       .label("Tag"),
    description: Joi.string()
      .required()
       .min(0)
       .max(50)
      .label("Number in Stock"),
    body: Joi.string()
      .required()
       .min(0)
       .max(100)
      .label("Daily Rental Rate")
  };

  async populateGenres() {
    const {data} = await getGenres();
    const data2 = [];
    for(let i=0; i<data.tags.length;i++)
    {
      data2.push({ _id: i, name: data.tags[i] });
    }
    this.setState({ genres: data2 });

  }
  async populateMovie(){
    const movieId = this.props.match.params.slug;
     if (movieId === "new") return;

     const {data: movie} = getMovieByMovieId(movieId);
     if (!movie) return this.props.history.replace("/not-found");

    this.setState({ data: this.mapToViewModel(movie) });
  }
  async componentDidMount() {
    await this.populateGenres();
    await this.populateMovie(); 
  }

  mapToViewModel(movie) {
    return {
      title: movie.title,
      //tags: movie.tags._id,
      slug: movie.slug,
      favoritesCount: movie.favoritesCount
    };
  }

  doSubmit = async () => {

    try {
      loadProgressBar()
      const { data } = this.state;
      await saveMovie(data);
      toast.success("Movie added successful")
    } catch (ex) {
      if (ex.response && ex.response.status === 422) {
        Object.keys(ex.response.data.errors).forEach((key) => {
          toast.error(ex.response.data.errors[key][0]);
        });
      }
    }

    this.props.history.push("/movies");
  };

  render() {
    return (
      <div>
        <h1>Movie Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title")}
          {this.renderSelect("tags", "Tags", this.state.genres)}
          {this.renderInput("description", "Director", "text")}
          {this.renderInput("body", "Description")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default MovieForm;
