import React from "react";
import { Link } from "react-router-dom";
import { Col } from "reactstrap";

const FeaturedStory = (props) => {
  const { storyInfo, users } = props;
  const { image, title, subtitle, category, created_by, id } = storyInfo;
  let user = "";
  if (Array.isArray(users)) {
    const userId = created_by;
    const userObj = users.find((u) => u.id === userId);
    if (userObj) {
      user = `${userObj.first_name} ${userObj.last_name}`;
    } else {
      user = "Loading";
    }
  }
  return (
    <Col>
      <Link to={`/main/${id}`}>
        <div className="story featured">
          <img
            alt="Featured article for elite application"
            className="story--image featured"
            src={image}
          />
          <h6 className="story--category">{category}</h6>
          <h1 className="story--title">{title}</h1>
          <p className="story--subtitle">{subtitle}</p>
          <p className="story--author">By {user}</p>
        </div>
      </Link>
    </Col>
  );
};

export default FeaturedStory;
