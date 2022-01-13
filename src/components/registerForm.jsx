import React, { useState } from "react";
import Joi from "joi-browser";
import { loadProgressBar } from 'axios-progress-bar';
import { toast } from "react-toastify";
import * as authService from "../services/authService";
import 'axios-progress-bar/dist/nprogress.css';
import Input from "./common/input";

function RegisterForm(props) {

  const [state, setState] = useState({
    data: { username: "", password: "", email: "" },
    errors: {}
  })
 
  const schema = {
    username: Joi.string()
      .required()
      .label("Username"),
    password: Joi.string()
      .required()
      .min(5)
      .label("Password"),
    email: Joi.string()
      .min(3)
      .required()
      .email({ minDomainAtoms: 2 })
      .label("Email")
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

  const handleChange = ({ currentTarget: input }) => {
    const errors = { ...state.errors };
    const errorMessage = validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const data = { ...state.data };
    data[input.name] = input.value;

    setState({ data, errors });
  };

  const doSubmit = async () => {
    try {
      const data = { ...state.data };
      setState({ data, errors:state.errors});
      const response = await authService.register(state.data);
      props.history.push("/login");
    } catch (ex) {
      if (ex.response && ex.response.status === 422) {
        Object.keys(ex.response.data.errors).forEach(key => {
            toast.error(key + ex.response.data.errors[key][0]);
        });
      }
    }
  };

  const handleSubmit = e => {
    e.preventDefault();

    const errors = validate();
    setState({ errors: errors || {} });
    if (errors) return;

    doSubmit();
  };

  const renderInput = (name, label, type = "text") => {
    const { data, errors } = state;

    return (
      <Input
        type={type}
        name={name}
        value={data[name]}
        label={label}
        onChange={handleChange}
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
      <h1>Register</h1>
      <form onSubmit={(event) => handleSubmit(event)}>
        {renderInput("username", "Username")}
        {renderInput("email", "Email")}
        {renderInput("password", "Password", "password")}
        {renderButton("Register")}
      </form>
    </div>
  );
}
export default RegisterForm;
