import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import { connect } from "react-redux";

import Navbar from "../containers/Navbar";

import { getStories } from "../../actions/stories";
import { bindActionCreators } from "redux";
class Main extends Component {
  componentDidMount() {
    this.props.getStories();
  }
  render() {
    console.log(this.props);
    return (
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
  }
}

export default connect(
  (state) => {
    return {
      stories: state.stories,
    };
  },
  (dispatch) =>
    bindActionCreators(
      {
        getStories,
      },
      dispatch
    )
)(Main);
