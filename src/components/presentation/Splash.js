import React from "react";
import { Link } from "react-router-dom";

const Splash = () => (
  <div className="splash--container">
    <h1 className="site-title font-1">Elite</h1>
    <h4 className="font-2" id="foreign-text">
      /e'lét,å'lét/
    </h4>
    <h6 className="font-2">
      A select group that is superior in terms of ability of qualities to the
      rest of a group or society
    </h6>
    <Link to="/main">
      <h6 className="font-1" style={{ opacity: ".7" }}>Click here to continue</h6>
    </Link>
  </div>
);

export default Splash;
