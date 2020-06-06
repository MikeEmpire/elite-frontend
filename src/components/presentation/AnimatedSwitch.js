import React from "react";
import {
  Switch,
  Route,
  withRouter,
} from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import Splash from "./Splash";
import Main from "../containers/Main";

const AnimatedSwitch = withRouter(({ location }) => (
  <TransitionGroup>
    <CSSTransition key={location.key} classNames="fade" timeout={1000}>
      <Switch location={location}>
        <Route exact path="/">
          <Splash />
        </Route>
        <Route path="/main">
          <Main />
        </Route>
      </Switch>
    </CSSTransition>
  </TransitionGroup>
));

export default AnimatedSwitch;
