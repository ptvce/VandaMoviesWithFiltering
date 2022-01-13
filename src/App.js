import React, { Component, useState, useEffect } from "react";
import { Route, Redirect, Switch } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import Movies from "./components/movies";
import MovieForm from "./components/movieForm";
import About from "./components/about";
import NotFound from "./components/notFound";
import NavBar from "./components/navBar";
import LoginForm from "./components/loginForm";
import LogoutForm from "./components/logoutForm";
import RegisterForm from "./components/registerForm";
import auth from "./services/authService";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function App() {
  const [state, setState] = useState({ user: "" });
  useEffect(() => {
    const user = auth.getCurrentUser();
    setState({ user });
  }, []);

  return (
    <React.Fragment>
      <ToastContainer />
      <NavBar user={state.user} />
      <main className="container">
        <Switch>
          <Route path="/register" component={RegisterForm} />
          <Route path="/login" component={LoginForm} />
          <Route path="/logout" component={LogoutForm} />
          <Route
            path="/movies/:slug"
            render={(props) => {
              if (!state.user) return <Redirect to="/login" />;
              return <MovieForm {...props} />;
            }}
          />
          <Route
            path="/movies"
            render={(props) => <Movies {...props} user={state.user} />}
          />
          <Route path="/about" component={About} />
          <Route path="/not-found" component={NotFound} />
          <Redirect from="/" exact to="/movies" />
          <Redirect to="/not-found" />
        </Switch>
      </main>
    </React.Fragment>
  );
}
export default App;
