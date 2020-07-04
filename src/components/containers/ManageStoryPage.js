import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Badge, Button, Input, Label, FormGroup } from "reactstrap";
import { withToastManager } from "react-toast-notifications";

import { editStory, getStories } from "../../actions/stories";

import StoryThumbnail from "../presentation/StoryThumbnail";
import ManageStory from "../presentation/ManageStory";

import SetFeaturedModalContent from "../modals/SetFeaturedModalContent";

import s3 from "../../utils/s3";
import { TOAST_SUCCESS, TOAST_ERROR } from "../../constants/TOAST_CONFIG";
import getUserForStory from "../../helpers/getUserForStory";

const originalState = {
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
class ManageStoryPage extends Component {
  state = originalState;

  handleState = (state, value) => this.setState({ [state]: value });

  saveEditedStory = () => {
    this.setState({
      loading: true,
    });
    const { toastManager } = this.props;
    const { title, subtitle, body, image, category } = this.state;

    const storyObj = {
      title,
      subtitle,
      body,
      category,
      image,
      id: this.state.selectedStory.id,
    };

    return this.props.editStory(storyObj).then((res) => {
      this.setState({
        loading: false,
      });
      if (res.type === "EDIT_STORY_SUCCESS") {
        toastManager.add("Successfully edited the story!", TOAST_SUCCESS);
        this.props.getStories();
        return this.setState(originalState);
      }
      return toastManager.add(
        "There was an error editing your story. Hit up Mike to get it fixed",
        TOAST_ERROR
      );
    });
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

    const modalProps = {
      reduxArr: {
        stories,
        users,
      },
      func: {
        getStories: this.props.getStories,
        editStory: this.props.editStory,
      },
    };
    const storyContent =
      Object.keys(this.state.selectedStory).length === 0 ? (
        filteredStories.map((story) => {
          const user = getUserForStory(users, story);
          const { title, subtitle, body, category, image, is_featured } = story;
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
                  is_featured,
                  selectedStory: story,
                  selectedUser: user,
                })
              }
            >
              <StoryThumbnail story={story} author={user} />
              {is_featured && <Badge>Featured Story</Badge>}
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
        {/* <Badge>Set Featured Story</Badge> */}
        <SetFeaturedModalContent
          modalProps={modalProps}
          currentlyFeaturedStory={stories.find((a) => a.is_featured)}
        />
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
        {readyToSubmit && showPreview && (
          <Button color="success" onClick={() => this.saveEditedStory()}>
            Save Edited Story
          </Button>
        )}
      </div>
    );
  }
}

export default withToastManager(
  connect(
    (state) => ({
      auth: state.auth.auth,
      users: state.users.users,
    }),
    (dispatch) => bindActionCreators({ editStory, getStories }, dispatch)
  )(ManageStoryPage)
);
