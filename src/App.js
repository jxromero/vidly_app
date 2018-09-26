import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import MovieFrom from "./components/movieform";
import Movies from "./components/movies";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import NotFound from "./components/not-found";
import NavBar from "./components/navbar";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import CartForm from "./components/cartform";

class App extends Component {
  state = {};
  render() {
    return (
      <main className="container">
        <NavBar />
        <Switch>
          <Route path="/cart" component={CartForm} />
          <Route path="/register" component={RegisterForm} />
          <Route path="/login" component={LoginForm} />
          <Route path="/movies/:id" component={MovieFrom} />
          <Route path="/movies" component={Movies} />
          <Route path="/customers" component={Customers} />
          <Route path="/rentals" component={Rentals} />
          <Route path="/not-found" component={NotFound} />
          {/* add exact to read more specifically */}
          <Redirect from="/" exact to="/movies" />
          <Redirect to="/not-found" />
        </Switch>
      </main>
    );
  }
}

export default App;
