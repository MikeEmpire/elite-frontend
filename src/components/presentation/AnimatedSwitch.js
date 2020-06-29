import React from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import Splash from "./Splash";
import Main from "../containers/Main";
import Portal from "../containers/Portal";
import SignIn from "../containers/SignIn";

const AnimatedSwitch = withRouter(({ location }) => (
  <TransitionGroup>
    <CSSTransition key={location.key} classNames="fade" timeout={1000}>
      <Switch location={location}>
        <Route exact path="/" children={<Splash />} />
        <Route path="/main" children={<Main />} />
        <Route path="/portal" children={<Portal />} />
        <Route path="/signin" children={<SignIn />} />
      </Switch>
    </CSSTransition>
  </TransitionGroup>
));

export default AnimatedSwitch;
