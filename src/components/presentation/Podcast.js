import React, { useState } from "react";
import {
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Col,
} from "reactstrap";

const Podcast = () => {
  const [dropdownOpen, setOpen] = useState(false);

  const toggle = () => setOpen(!dropdownOpen);

  return (
    <Col className="podcast--section">
      <div className="podcast--image--section">
        <h6 className="podcast--section--title">Podcast</h6>
        <img
          className="podcast--image"
          alt="elite podcast thumbnail"
          src="https://is4-ssl.mzstatic.com/image/thumb/Podcasts123/v4/0c/4a/6c/0c4a6cb4-1141-77aa-e685-70aa96e038c3/mza_11710141998161009032.jpg/268x0w.jpg"
        />
      </div>
      <div className="podcast--text--section">
        <h3 className="podcast--episode">Episode 4</h3>
        <h5 className="podcast--hashtag">#ElitePod</h5>
        <div className="dropdown--container">
          <ButtonDropdown isOpen={dropdownOpen} toggle={toggle}>
            <DropdownToggle caret color="warning">Tap In</DropdownToggle>
            <DropdownMenu>
              <DropdownItem><a href="https://open.spotify.com/show/2IJ0Qs6foGsb5IRS7JAJIr?si=KrhrnlyWRBSaIdgi6vTEyw" target="_blank">Spotify</a></DropdownItem>
              <DropdownItem><a href="https://podcasts.apple.com/us/podcast/elite/id1507723272" target="_blank">Apple Music</a></DropdownItem>
            </DropdownMenu>
          </ButtonDropdown>
        </div>
        <p>Subscribe or view our latest episode of the Elite podcast.</p>
      </div>
    </Col>
  );
};

export default Podcast;
