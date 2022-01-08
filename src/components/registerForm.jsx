import React from "react";
import Joi from "joi-browser";
import { loadProgressBar } from 'axios-progress-bar';
import { toast } from "react-toastify";
import * as authService from "../services/authService";
import 'axios-progress-bar/dist/nprogress.css';
import Form from "./common/form";

class RegisterForm extends Form {
  state = {
    data: { username: "", password: "", email: "" },
    errors: {}
  };

  schema = {
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

  doSubmit = async () => {
    try {
      loadProgressBar()
      const data = { ...this.state.data };
      this.setState({ data });
      const response = await authService.register(this.state.data);
      this.props.history.push("/login");
    } catch (ex) {
      if (ex.response && ex.response.status === 422) {
        Object.keys(ex.response.data.errors).forEach(key => {
            toast.error(key + ex.response.data.errors[key][0]);
        });
      }
    }
  };

  render() {
    return (
      <div>
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username")}
          {this.renderInput("email", "Email")}
          {this.renderInput("password", "Password", "password")}
          {this.renderButton("Register")}
        </form>
      </div>
    );
  }
}

export default RegisterForm;
