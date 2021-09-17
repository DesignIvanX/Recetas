import React from "react";
import { Router, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Recipe from "./pages/Recipe";
import Timer from "./pages/Timer";
import "./App.css";
import IfOffline from "./pages/IfOffline";
import { createBrowserHistory } from "history";
import ReactGa from "react-ga";

const history = createBrowserHistory();

ReactGa.initialize("UA-00000-01");
ReactGa.pageview(window.location.pathname + window.location.search);

history.listen(function () {
  ReactGa.pageview(window.location.pathname + window.location.search);
});

export default class App extends React.Component {
  render() {
    return (
      <Router history={history}>
        <div>
          <header>
            <Link to="/">
              Recetas <IfOffline>Offline</IfOffline>
            </Link>
            <Link to="/timer" className="timerLink">
              Timer
            </Link>
          </header>

          <main>
            <Route exact path="/" component={Home} />
            <Route path="/recipe/:recipeId" component={Recipe} />
            <Route path="/timer" component={Timer} />
          </main>
        </div>
      </Router>
    );
  }
}
