import React, { Component, createRef } from "react";
import {
  Button,
  Container,
} from "reactstrap";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import { withToastManager } from "react-toast-notifications";

import Navbar from "./Navbar";

import ManageStory from '../presentation/ManageStory';

import { authCheck } from "../../actions/users";
import { createStory } from "../../actions/stories";

import { TOAST_ERROR, TOAST_SUCCESS } from "../../constants/TOAST_CONFIG";

import s3 from "../../utils/s3";

import checkToken from "../../helpers/checkToken";

class CreateStoryPage extends Component {
  state = {
    body: "",
    title: "",
    subtitle: "",
    category: "",
    image: "",
    showPreview: false,
    loading: false,
  };

  editorRef = createRef();

  componentDidMount() {
    checkToken(this.props);
  }

  handleState = (state, value) => this.setState({ [state]: value });

  saveStory = () => {
    this.setState({
      ...this.state,
      loading: true,
    });
    const { id } = this.props.auth;
    const { toastManager } = this.props;
    const { title, subtitle, body, image, category } = this.state;
    const storyObj = {
      title,
      subtitle,
      body,
      category,
      image,
      created_by: id,
    };
    return this.props.createStory(storyObj).then((res) => {
      this.setState({
        loading: false,
      });
      if (res.type === "CREATE_STORY_SUCCESS") {
        toastManager.add("Successfully created the story!", TOAST_SUCCESS);
        return this.props.history.push("/main");
      }
      return toastManager.add(
        "There was an error creating the story, please go over the info again or hit Mike up",
        TOAST_ERROR
      );
    });
  };

  handleUpload = e => {

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

    const { body, subtitle, image, title, category, showPreview } = this.state;

    const readyToSubmit =
      body &&
      body.length > 10 &&
      title &&
      title.length > 10 &&
      category !== "" &&
      subtitle &&
      subtitle.length > 10 &&
      image &&
      image.length > 10;

    const extraProps = {
      readyToSubmit,
      handleUpload: this.handleUpload,
      handleState: this.handleState,
    };

    return (
      <div>
        <Navbar />
        <Container>
          <ManageStory extra={extraProps} state={this.state} auth={this.props.auth} />
          {readyToSubmit && (
            <Button
              color="primary"
              onClick={() => this.handleState("showPreview", !showPreview)}
            >
              {showPreview ? "Edit Story" : "Show Preview"}
            </Button>
          )}
          {readyToSubmit && showPreview && (
            <Button color="success" onClick={() => this.saveStory()}>
              Save Story
            </Button>
          )}
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
      }),
      (dispatch) => bindActionCreators({ authCheck, createStory }, dispatch)
    )(CreateStoryPage)
  )
);