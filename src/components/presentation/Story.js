import React from "react";
import { Col } from "reactstrap";
import parse from "html-react-parser";

const Story = (props) => {
  const { storyInfo, author } = props;
  const { body, title, category, image } = storyInfo;
  const name = `${author.first_name} ${author.last_name}`;
  return (
    <Col className="story--view">
      <div className="story--meta--container">
        <h6 className="author--info">By {name}</h6>
      </div>
      <img
        alt="Featured article for elite"
        className="story--page--image"
        src={image}
      />
      <div className="content--container">
        <h6 className="story--category">{category}</h6>
        <h1 className="story--title">{title}</h1>
        {parse(body)}
      </div>
    </Col>
  );
};

export default Story;
