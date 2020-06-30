import React, { Component } from "react";
import { withToastManager } from "react-toast-notifications";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { authCheck } from "../../actions/users";

import CreateStoryPage from "./CreateStoryPage";
import ManageStoryPage from "./ManageStoryPage";
import Navbar from './Navbar'
import checkToken from "../../helpers/checkToken";

class Portal extends Component {
  state = {
    manage: false,
  };
  componentDidMount() {
    checkToken(this.props);
  }
  render() {
    const content = !this.state.manage ? (
      <CreateStoryPage />
    ) : (
      <ManageStoryPage />
    );
    return (
      <div>
          <Navbar />
        Switch goes here
        <div>{content}</div>
      </div>
    );
  }
}

export default withToastManager(
  withRouter(
    connect(
      (state) => ({ auth: state.users.auth }),
      (dispatch) => bindActionCreators({ authCheck }, dispatch)
    )(Portal)
  )
);
