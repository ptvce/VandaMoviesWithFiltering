import React from "react";
import Joi from "joi-browser";
import auth from "../services/authService";
import { toast } from "react-toastify";
import { loadProgressBar } from 'axios-progress-bar'
import 'axios-progress-bar/dist/nprogress.css'
import Form from "./common/form";

class LoginForm extends Form {
  state = {
    data: { email: "", password: "" },
    errors: {}
  };

  schema = {
    email: Joi.string()
    .min(3)
    .required()
    .email({ minDomainAtoms: 2 })
    .label("Email"),
    password: Joi.string()
      .required()
      .label("Password")
  };

  doSubmit = async () => {
    try {
      loadProgressBar()
      const { data } = this.state;
      await auth.login(data.email, data.password);
      const { state } = this.props.location;
     window.location = state ? state.from.pathname : '/'; //ارسال کاربر به صفحه ای که ازش اومده
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
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("email", "Email")}
          {this.renderInput("password", "Password", "password")}
          {this.renderButton("Login")}
        </form>
      </div>
    );
  }
}

export default LoginForm;
