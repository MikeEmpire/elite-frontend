import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";

import Navbar from "./Navbar";
import SignUpForm from "../presentation/SignUpForm";

export default class SignIn extends Component {
  render() {
    return (
      <div className="sign-in-page">
        <Navbar />
        <Container>
          <Row>
            <Col>
              <div className="sign-in-container">
                <h2>Sign In</h2>
                <SignUpForm />
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
