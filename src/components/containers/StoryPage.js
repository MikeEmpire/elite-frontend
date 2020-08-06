import React, { Component, createRef } from "react";
import { withRouter } from "react-router-dom";
import { Container, Spinner } from "reactstrap";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { getStories } from "../../actions/stories";
import { getUsers } from "../../actions/users";

import Navbar from "./Navbar";

import Story from "../presentation/Story";
import ReadingProgress from "../presentation/ReadingProgress";

class StoryPage extends Component {
  constructor(props) {
    super(props);
    this.story = createRef();
  }
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
      <>
        <Navbar />
        <ReadingProgress target={this.story} />
        <div ref={this.story}>
          <Container>{story()}</Container>
        </div>
      </>
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
