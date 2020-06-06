import React from "react";
import "./stylesheets/main.scss";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useLocation,
  useParams,
} from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import Splash from "./components/presentation/Splash";
import Main from "./components/containers/Main";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Splash />
        </Route>
        <Route path="/main">
          <Main />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
