import React from "react";
import "./stylesheets/main.scss";
import { BrowserRouter as Router } from "react-router-dom";
import AnimatedSwitch from "./components/presentation/AnimatedSwitch";

function App() {
  return (
    <Router>
      <AnimatedSwitch />
    </Router>
  );
}

export default App;
