import React from "react";
import { Container, Row, Col } from "reactstrap";

import Story from "./Story";

const StoryPreview = (props) => {
  const { storyInfo, author } = props;

  return (
    <Container>
      <Row>
        <Col>
          <h1>Story Preview</h1>
        </Col>
      </Row>
      <Row>
        <Story storyInfo={storyInfo} author={author} />
      </Row>
    </Container>
  );
};

export default StoryPreview;
