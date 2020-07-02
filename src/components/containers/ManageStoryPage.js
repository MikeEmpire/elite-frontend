import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Badge, Button, Input, Label, FormGroup } from "reactstrap";

import { getUsers } from "../../actions/users";

import StoryThumbnail from "../presentation/StoryThumbnail";
import ManageStory from "../presentation/ManageStory";

import s3 from "../../utils/s3";
class ManageStoryPage extends Component {
  state = {
    query: "",
    body: "",
    title: "",
    subtitle: "",
    category: "",
    image: "",
    showPreview: false,
    loading: false,
    selectedStory: {},
    selectedUser: {},
  };

  handleState = (state, value) => this.setState({ [state]: value });

  editStory = () => {
    const { title, subtitle, body, image, category } = this.state;

    const storyObj = {
      title,
      subtitle,
      body,
      category,
      image,
    };
    return null;
  };

  handleUpload = (e) => {
    const file = e.target.files[0];
    // Split the filename to get the name and type
    const fileName = file.name.split(".")[0];
    return s3.uploadFile(file, fileName).then((res) =>
      this.setState({
        image: res.location,
      })
    );
  };

  render() {
    const { stories, users } = this.props;
    const {
      query,
      title,
      subtitle,
      body,
      category,
      image,
      showPreview,
    } = this.state;
    const readyToSubmit =
      title &&
      title.length > 2 &&
      subtitle &&
      subtitle.length > 2 &&
      body &&
      body.length > 2 &&
      category &&
      category.length > 2 &&
      image &&
      image.length > 2;

    const extraProps = {
      readyToSubmit,
      handleUpload: this.handleUpload,
      handleState: this.handleState,
    };
    let filteredStories = [];
    if (stories.length > 0) {
      filteredStories = stories.filter((s) =>
        s.title.toLowerCase().includes(query.toLowerCase())
      );
    }
    const storyContent =
      Object.keys(this.state.selectedStory).length === 0 ? (
        filteredStories.map((story) => {
          let user = "";
          if (Array.isArray(users)) {
            user = users.find((user) => user.id === story.created_by);
            if (typeof user === "object") {
              user = `${user.first_name} ${user.last_name}`;
            }
          }
          const { title, subtitle, body, category, image } = story;
          return (
            <div
              className="story story--thumbnail"
              key={story.id}
              onClick={() =>
                this.setState({
                  ...this.state,
                  title,
                  subtitle,
                  body,
                  category,
                  image,
                  selectedStory: story,
                  selectedUser: user,
                })
              }
            >
              <StoryThumbnail story={story} author={user} />
            </div>
          );
        })
      ) : (
        <div className="story story--thumbnail">
          <StoryThumbnail
            story={this.state.selectedStory}
            author={this.state.selectedUser}
          />{" "}
          <Badge
            color="warning"
            onClick={() =>
              this.setState({
                ...this.state,
                title: "",
                subtitle: "",
                body: "",
                category: "",
                image: "",
                selectedStory: {},
                selectedUser: {},
              })
            }
          >
            Deselect story
          </Badge>
        </div>
      );
    return (
      <div className="manage--story--page">
        <FormGroup>
          <Label>Search Stories</Label>
          <Input
            onChange={(e) => this.setState({ query: e.target.value })}
            placeholder="Search by article title"
          />
        </FormGroup>
        {storyContent}
        {readyToSubmit && (
          <ManageStory
            extra={extraProps}
            state={this.state}
            auth={this.props.auth}
          />
        )}
        {readyToSubmit && (
          <Button
            color="primary"
            onClick={() => this.handleState("showPreview", !showPreview)}
          >
            {showPreview ? "Edit Story" : "Show Preview"}
          </Button>
        )}
      </div>
    );
  }
}

export default connect(
  (state) => ({
    auth: state.auth.auth,
    users: state.users.users,
  }),
  (dispatch) => bindActionCreators({ getUsers }, dispatch)
)(ManageStoryPage);
