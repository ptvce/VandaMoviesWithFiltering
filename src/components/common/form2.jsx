import React, { useState } from 'react';
import Input from "./input";
import Select from "./select";
import Joi from "joi-browser";

export default function Form2 () {
const [state,setState] = useState( {data: {}, errors: {}});
    
      const validate = (schema) => {
        const options = { abortEarly: false };
        const { error } = Joi.validate(state.data, schema, options);
        if (!error) return null;
    
        const errors = {};
        for (let item of error.details) errors[item.path[0]] = item.message;
        return errors;
      };
    
      const validateProperty = ({ name, value }) => {
        const obj = { [name]: value };
        const schema = { [name]: schema[name] };
        const { error } = Joi.validate(obj, schema);
        return error ? error.details[0].message : null;
      };
    
    //   const handleSubmit = e => {
    //     e.preventDefault();
    
    //     const errors = validate();
    //     setState({ errors: errors || {} ,
    //       genres: state.genres,
    //       data: state.data,
    //     });
    //     if (errors) return;
    
    //     doSubmit();
    //   };
    
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
          console.log("render input", state)
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

      
}

export const {validate, renderInput, renderSelect, renderButton } = Form2