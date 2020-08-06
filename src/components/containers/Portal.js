import React, { Component } from "react";
import { withToastManager } from "react-toast-notifications";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Badge, Container } from "reactstrap";

import { authCheck, getUsers } from "../../actions/users";
import { getStories } from "../../actions/stories";

import CreateStoryPage from "./CreateStoryPage";
import ManageStoryPage from "./ManageStoryPage";
import Navbar from "./Navbar";
import checkToken from "../../helpers/checkToken";

class Portal extends Component {
  state = {
    manage: true,
  };
  componentDidMount() {
    checkToken(this.props);
    this.props.getStories();
    this.props.getUsers();
  }
  render() {
    const { stories, users } = this.props;
    const content = !this.state.manage ? (
      <CreateStoryPage users={users} />
    ) : (
      <ManageStoryPage stories={stories} users={users} />
    );
    const badgeColor = this.state.manage ? "secondary" : "dark";
    const badgeText = this.state.manage
      ? "Go To Create Mode"
      : "Go to Manage Mode";
    return (
      <div>
        <Navbar />
        <Container>
          <Badge
            color={badgeColor}
            onClick={() => this.setState({ manage: !this.state.manage })}
            style={{ cursor: "pointer" }}
          >
            {badgeText}
          </Badge>
          <div>{content}</div>
        </Container>
      </div>
    );
  }
}

export default withToastManager(
  withRouter(
    connect(
      (state) => ({
        auth: state.users.auth,
        stories: state.stories.stories,
        users: state.users.users,
      }),
      (dispatch) =>
        bindActionCreators({ authCheck, getUsers, getStories }, dispatch)
    )(Portal)
  )
);
