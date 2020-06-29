import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { withToastManager } from "react-toast-notifications";
import { Container, Row, Col } from "reactstrap";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import Navbar from "./Navbar";
import SignUpForm from "../presentation/SignUpForm";

import { signIn } from "../../actions/users";
import { TOAST_ERROR, TOAST_SUCCESS } from "../../constants/TOAST_CONFIG";

class SignIn extends Component {
  state = {
    email: "",
    password: "",
    loading: false,
  };
  handleSignIn = () => {
    const { toastManager } = this.props;
    const submitObject = {
      email: this.state.email,
      password: this.state.password,
    };
    this.setState({
      loading: true,
    });
    return this.props.signIn(submitObject).then((res) => {
      if (res.type === "SIGN_IN_SUCCESS") {
        toastManager.add("Successfully logged in!", TOAST_SUCCESS);
        return this.props.history.push("/portal");
      }
      const { message } = res.payload.response.data;
      toastManager.add(message, TOAST_ERROR);
      return this.setState({
        loading: false,
        showError: true,
        errorMesage: message,
      });
    });
  };
  updateState = (key, value) =>
    this.setState({
      [key]: value,
    });
  render() {
    return (
      <div className="sign-in-page">
        <Navbar />
        <Container>
          <Row>
            <Col>
              <div className="sign-in-container">
                <h2>Sign In</h2>
                <SignUpForm
                  updateState={this.updateState}
                  state={this.state}
                  handleConfirm={this.handleSignIn}
                />
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default withToastManager(
  withRouter(
    connect(null, (dispatch) => bindActionCreators({ signIn }, dispatch))(
      SignIn
    )
  )
);
