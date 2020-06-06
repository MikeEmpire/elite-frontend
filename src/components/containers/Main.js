import React from "react";
import Navbar from "../containers/Navbar";
import { Container, Row, Col } from "reactstrap";
const Main = () => (
  <div className="home--content">
    <Navbar />
    <Container>
      <Row>
        <Col md={8}>Featured Content</Col>
        <Col md={4}>Side Content</Col>
      </Row>
    </Container>
  </div>
);

export default Main;
