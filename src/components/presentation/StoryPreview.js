import React from "react";
import { Container, Row, Col } from "reactstrap";
import parse from "html-react-parser";

const StoryPreview = (props) => {
  const { storyInfo } = props;
  const { content, title, category, coverImage } = storyInfo;

  return (
    <Container>
      <Row>
        <Col>
          <h1>Story Preview</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <img
            alt="Featured article for elite"
            className="story--image"
            src={coverImage}
          />
          <h6 className="story--category">{category}</h6>
          <h1 className="story--title">{title}</h1>
          <div className="content--container">{parse(content)}</div>
        </Col>
      </Row>
    </Container>
  );
};

export default StoryPreview;
