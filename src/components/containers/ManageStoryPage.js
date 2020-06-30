import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

class ManageStoryPage extends Component {
  state = {};

  render() {
    return (
      <div>
        <div>Stories Go Here</div>
        <div>edit panel goes here</div>
      </div>
    );
  }
}

export default connect(null, (dispatch) => bindActionCreators({}, dispatch))(
  ManageStoryPage
);
