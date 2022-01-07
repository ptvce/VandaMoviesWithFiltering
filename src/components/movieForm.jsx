import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { getMovie, saveMovie } from "../services/movieService";
import { getGenres } from "../services/genreService";

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
    //_id: Joi.string(),
    title: Joi.string()
      .required()
      .label("Title"),
    tags: Joi.string()
       .required()
       .label("Genre"),
    description: Joi.string()
      .required()
       .min(0)
       .max(100)
      .label("Number in Stock"),
    body: Joi.string()
      .required()
       .min(0)
       .max(10)
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

     const {data: movie} = getMovie(movieId);
     if (!movie) return this.props.history.replace("/not-found");

    this.setState({ data: this.mapToViewModel(movie) });
  }
  async componentDidMount() {
    await this.populateGenres();
    await this.populateMovie(); 
  }

  mapToViewModel(movie) {
    return {
     // _id: movie._id,
      title: movie.title,
      //tags: movie.tags._id,
      slug: movie.slug,
      favoritesCount: movie.favoritesCount
    };
  }

  doSubmit = () => {

    saveMovie(this.state.data);

    this.props.history.push("/movies");
  };

  render() {
    return (
      <div>
        <h1>Movie Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title")}
          {this.renderSelect("tags", "Tags", this.state.genres)}
          {this.renderInput("description", "Description", "text")}
          {this.renderInput("body", "Body")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default MovieForm;
