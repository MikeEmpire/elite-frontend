import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

class ManageStoryPage extends Component {
  state = {};

  render() {
    const { stories } = this.props;
    const storyContent = stories.map((story) => (
      <div key={story.id} className="story">
        <img />
        <h6 className="story--category">{story.category}</h6>
        <h1>{story.title}</h1>
        <p></p>
      </div>
    ));
    return (
      <div>
        {storyContent}
        <div>edit panel goes here</div>
      </div>
    );
  }
}

export default connect(null, (dispatch) => bindActionCreators({}, dispatch))(
  ManageStoryPage
);
