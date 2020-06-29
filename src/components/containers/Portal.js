import React, { Component, createRef, Fragment } from "react";
import {
  Button,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Badge,
} from "reactstrap";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import { withToastManager } from "react-toast-notifications";

import Navbar from "./Navbar";

import Editor from "../presentation/Editor";
import StoryPreview from "../presentation/StoryPreview";

import { authCheck } from "../../actions/users";
import { createStory } from "../../actions/stories";

import STORY_CATEGORIES from "../../constants/STORY_CATEGORIES";
import { TOAST_ERROR, TOAST_SUCCESS } from "../../constants/TOAST_CONFIG";

import s3 from "../../utils/s3";

import checkToken from "../../helpers/checkToken";

class Portal extends Component {
  state = {
    content: "",
    title: "",
    subtitle: "",
    category: "",
    coverImageUrl: "",
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
    const { title, subtitle, content, coverImageUrl, category } = this.state;
    const storyObj = {
      title,
      subtitle,
      body: content,
      category,
      image: coverImageUrl,
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

  handleUpload = () => {
    const file = this.uploadInput.files[0];
    // Split the filename to get the name and type
    const fileName = file.name.split(".")[0];
    return s3.uploadFile(file, fileName).then((res) =>
      this.setState({
        coverImageUrl: res.location,
      })
    );
  };

  render() {
    const options = STORY_CATEGORIES.map((category) => (
      <option key={category} value={category}>
        {category}
      </option>
    ));

    const {
      content,
      subtitle,
      coverImageUrl,
      title,
      category,
      showPreview,
    } = this.state;

    const readyToSubmit =
      content &&
      content.length > 10 &&
      title &&
      title.length > 10 &&
      category !== "" &&
      subtitle &&
      subtitle.length > 10 &&
      coverImageUrl &&
      coverImageUrl.length > 10;

    return (
      <div>
        <Navbar />
        <Container>
          {showPreview ? (
            <StoryPreview storyInfo={this.state} />
          ) : (
            <Fragment>
              <h1>Create A Story Below</h1>
              {readyToSubmit && (
                <Button
                  color="primary"
                  onClick={() => this.handleState("showPreview", !showPreview)}
                >
                  {showPreview ? "Edit Story" : "Show Preview"}
                </Button>
              )}
              <Form>
                <FormGroup>
                  <Label>Story Title</Label>
                  <Input
                    placeholder="Story Title Goes here"
                    type="text"
                    value={title}
                    onChange={(e) => this.handleState("title", e.target.value)}
                  />
                </FormGroup>
                <FormGroup>
                  <Label>Subtitle</Label>
                  <Input
                    placeholder="Subtitle Goes here"
                    type="text"
                    value={subtitle}
                    onChange={(e) =>
                      this.handleState("subtitle", e.target.value)
                    }
                  />
                </FormGroup>
                <FormGroup>
                  {this.state.url !== "" && <img src={this.state.url} />}
                </FormGroup>
                <FormGroup>
                  <Label for="exampleFile" style={{ display: "block" }}>
                    Cover Image
                  </Label>
                  {this.state.coverImageUrl === "" ? (
                    <div>
                      <input
                        onChange={() => this.handleUpload()}
                        ref={(ref) => {
                          this.uploadInput = ref;
                        }}
                        type="file"
                      />
                    </div>
                  ) : (
                    <Fragment>
                      <img
                        alt="Placeholder for story"
                        style={{ display: "block", width: "50%" }}
                        src={this.state.coverImageUrl}
                      />
                      <Badge
                        color="info"
                        onClick={() =>
                          this.setState({
                            coverImageUrl: "",
                          })
                        }
                      >
                        Remove Image
                      </Badge>
                    </Fragment>
                  )}
                </FormGroup>
                <FormGroup>
                  <Label>Category</Label>
                  <Input
                    type="select"
                    onChange={(e) =>
                      this.handleState("category", e.target.value)
                    }
                    value={category}
                  >
                    <option value=""></option>
                    {options}
                  </Input>
                </FormGroup>
              </Form>
              <Editor stateContent={content} handleChange={this.handleState} />
            </Fragment>
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
    )(Portal)
  )
);
