import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Container, Row } from "reactstrap";

import Navbar from "./Navbar";
import StoryList from "./StoryList";

import { getUsers } from "../../actions/users";
import { getStories } from "../../actions/stories";

class SportsPage extends Component {
  componentDidMount() {
    this.props.getStories();
    this.props.getUsers();
  }
  render() {
    const { stories, users } = this.props;
    return (
      <div className="home--content">
        <Navbar />
        <Container>
          <Row>
            <StoryList stories={stories} users={users} />
          </Row>
        </Container>
      </div>
    );
  }
}

export default connect(
  (state) => ({
    stories: state.stories.stories.filter(
      (story) => story.category === "Sports"
    ),
    users: state.users.users,
  }),
  (dispatch) =>
    bindActionCreators(
      {
        getStories,
        getUsers,
      },
      dispatch
    )
)(SportsPage);
