import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import { connect } from "react-redux";

import { getStories } from "../../actions/stories";
import { bindActionCreators } from "redux";

import Navbar from "./Navbar";
import Stories from "../presentation/Stories";

class Main extends Component {
  componentDidMount() {
    this.props.getStories();
  }
  render() {
    const { stories } = this.props;
    return (
      <div className="home--content">
        <Navbar />
        <Container className="main--section">
          <Row>
            <Col md={8}>
              <Stories stories={stories} />
            </Col>

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
      stories: state.stories.stories,
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
