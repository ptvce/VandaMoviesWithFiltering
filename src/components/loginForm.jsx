import React, {useState} from "react";
import Joi from "joi-browser";
import auth from "../services/authService";
import { toast } from "react-toastify";
import 'axios-progress-bar/dist/nprogress.css'
import Input from "./common/input";
import Form2, {validate, renderInput, renderSelect, renderButton } from "./common/form2";

function LoginForm(props) {

  const [state,setState] = useState({ 
    data: { email: "", password: "" },
    errors: {}
  });

  const schema = {
    email: Joi.string()
    .min(3)
    .required()
    .email({ minDomainAtoms: 2 })
    .label("Email"),
    password: Joi.string()
      .required()
      .label("Password")
  };

  const doSubmit = async () => {
    try {
      const { data } = state;
      await auth.login(data.email, data.password);
      const { state: loc } = props.location;
     window.location = loc ? loc.from.pathname : '/';
    } catch (ex) {
      if (ex.response && ex.response.status === 422) {
        Object.keys(ex.response.data.errors).forEach(key => {
            toast.error(key + ex.response.data.errors[key][0]);
        });
      }
    }
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
    setState({ errors: errors || {} });
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

    setState({ data, errors });
  };

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
      <h1>Login</h1>
      <form onSubmit={(event) => handleSubmit(event)}>
        {renderInput("email", "Email")}
        {renderInput("password", "Password", "password")}
        {renderButton("Login")}
      </form> 
    </div>
  );
}

export default LoginForm;
