import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import { connect } from "react-redux";

import { getStories } from "../../actions/stories";
import { getUsers } from "../../actions/users";
import { bindActionCreators } from "redux";

import Navbar from "./Navbar";
import Stories from "../presentation/Stories";

class Main extends Component {
  componentDidMount() {
    this.props.getStories();
    this.props.getUsers();
  }
  render() {
    const { stories, users } = this.props;
    return (
      <div className="home--content">
        <Navbar />
        <Container className="main--section">
          <Row>
            <Col className="featured--section" md={8}>
              <Stories stories={stories} users={users} />
            </Col>

            <Col className="side--section" md={4}>Side Content</Col>
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
      users: state.users.users,
    };
  },
  (dispatch) =>
    bindActionCreators(
      {
        getStories,
        getUsers,
      },
      dispatch
    )
)(Main);
