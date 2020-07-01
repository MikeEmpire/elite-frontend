import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { getStories } from "../../actions/stories";

class ManageStories extends Component {
  componentDidMount() {
    this.props.getStories();
  }
  state = {};
  render() {
    const { stories } = this.props;
    
    return <div>Manage Stories page</div>;
  }
}

export default connect(
  (state) => ({
    stories: state.stories.stories,
  }),
  (dispatch) => bindActionCreators({ getStories }, dispatch)
)(ManageStories);
