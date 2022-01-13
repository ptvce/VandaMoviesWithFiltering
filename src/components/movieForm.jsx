import React, { useEffect, useState } from "react";
import Joi from "joi-browser";
import { getMovieByMovieId, saveMovie } from "../services/movieService";
import { getGenres } from "../services/genreService";
import {  toast } from 'react-toastify';
import 'axios-progress-bar/dist/nprogress.css';
import Input from "./common/input";
import Select from "./common/select";

function MovieForm (props) {

  const [state,setState] = useState({
    data: {
      title: "",
      tags: "",
      description: "",
      body: ""
    },
    genres: [],
    errors: {}
  });

  const schema = {
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

  const populateGenres = async () => {
    const {data} = await getGenres();
    const data2 = [];
    for(let i=0; i<data.tags.length;i++)
    {
      data2.push({ _id: i, name: data.tags[i] });
    }
    setState({ genres: data2,
      data: state.data,
      errors: state.errors
    });
  }
  const populateMovie = async () => {
    const movieId = props.match.params.slug;
     if (movieId === "new") return;

     const {data: movie} = await getMovieByMovieId(movieId);
     if (!movie) return props.history.replace("/not-found");

    setState({ data: mapToViewModel(movie) ,
      genres: state.genres,
      errors: state.errors
    });
  }
  
  useEffect(() => {
     populateGenres();
     populateMovie(); 
  },[]);

  const mapToViewModel = (movie) => {
    return {
      title: movie.title,
      //tags: movie.tags._id,
      slug: movie.slug,
      favoritesCount: movie.favoritesCount
    };
  }

  const doSubmit = async () => {
    try {
      const { data } = state;
      await saveMovie(data);
      toast.success("Movie added successful")
    } catch (ex) {
      if (ex.response && ex.response.status === 422) {
        Object.keys(ex.response.data.errors).forEach((key) => {
          toast.error(ex.response.data.errors[key][0]);
        });
      }
    }

    props.history.push("/movies");
  };

  const validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(state.data, schema, options);
    if (!error) return null;

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  const validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema1 = { [name]: schema[name] };
    const { error } = Joi.validate(obj, schema1);
    return error ? error.details[0].message : null;
  };

  const handleSubmit = e => {
    e.preventDefault();

    const errors = validate();
    setState({ errors: errors || {} ,
      genres: state.genres,
      data: state.data,
    });
    if (errors) return;

    doSubmit();
  };

  const handleChange = ({ currentTarget: input }) => {
    const errors = { ...state.errors };
    const errorMessage = validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const data = { ...state.data };
    data[input.name] = input.value;

    setState({ data, errors ,
      genres: state.genres,
    });
  };

  const renderSelect = (name, label, options) => {
    const { data, errors } = state;

    return (
      <Select
        name={name}
        value={data[name]}
        label={label}
        options={options}
        onChange={handleChange}
        error={errors[name]}
      />
    );
  }

  const renderInput = (name, label, type = "text") => {
    const { data, errors } = state;

    return (
      <Input
        type={type}
        name={name}
        value={data[name]}
        label={label}
        onChange={(event) => handleChange(event)}
        error={errors[name]}
      />
    );
  }

  const renderButton = (label) => {
    return (
      <button disabled={validate()} className="btn btn-primary">
        {label}
      </button>
    );
  }

  return (
        <div>
          <h1>Movie Form</h1>
          <form onSubmit={(event) => handleSubmit(event)}>
            {renderInput("title", "Title")}
            {renderSelect("tags", "Tags", state.genres)}
            {renderInput("description", "Director", "text")}
            {renderInput("body", "Description")}
            {renderButton("Save")}
          </form>
        </div>
      );

}

export default MovieForm;