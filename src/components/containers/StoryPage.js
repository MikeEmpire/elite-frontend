import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Container, Spinner } from "reactstrap";

import Story from "../presentation/Story";
import Navbar from "./Navbar";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getStories } from "../../actions/stories";
import { getUsers } from "../../actions/users";

class StoryPage extends Component {
  componentDidMount() {
    this.props.getStories();
    this.props.getUsers();
  }
  render() {
    const { stories, match, users } = this.props;
    let { id } = match.params;
    let author = { first_name: "", last_name: "" };
    id = Number(id);
    let story = () => "";
    if (stories.length === 0 || "loading") {
      story = () => <Spinner />;
    }

    if (stories.length > 0 && Array.isArray(stories)) {
      story = () => {
        const storyInfo = stories.find((s) => s.id === id);
        if (users.length > 0) {
          author = users.find((user) => user.id === storyInfo.created_by);
        }
        return <Story storyInfo={storyInfo} author={author} />;
      };
    }
    return (
      <div>
        <Navbar />
        <Container>{story()}</Container>
      </div>
    );
  }
}

export default withRouter(
  connect(
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
  )(StoryPage)
);
