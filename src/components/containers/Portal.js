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
import ImageUploader from "react-images-upload";

import Navbar from "./Navbar";
import STORY_CATEGORIES from "../../constants/STORY_CATEGORIES";

import Editor from "../presentation/Editor";
import StoryPreview from "../presentation/StoryPreview";

class Portal extends Component {
  state = {
    content: "",
    title: "",
    subtitle: "",
    category: "",
    coverImage: "",
    coverImageName: "",
    showPreview: false,
  };

  editorRef = createRef();

  handleState = (state, value) => this.setState({ [state]: value });

  onDrop = (pictureFiles, pictureDataURLs) =>
    this.setState({
      coverImageName: pictureFiles[0].name,
      coverImage: pictureDataURLs[0],
    });

  render() {
    const options = STORY_CATEGORIES.map((category) => (
      <option key={category} value={category}>
        {category}
      </option>
    ));

    const {
      content,
      subtitle,
      coverImage,
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
      coverImage &&
      coverImage.length > 10;

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
                    onChange={(e) => this.handleState("subtitle", e.target.value)}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="exampleFile">Cover Image</Label>
                  {this.state.coverImage !== "" &&
                  this.state.coverImageName !== "" ? (
                    <div>
                      <img
                        style={{ display: "block", width: "50%" }}
                        src={this.state.coverImage}
                      />
                      <Badge
                        color="info"
                        onClick={() =>
                          this.setState({
                            coverImageName: "",
                            coverImage: "",
                          })
                        }
                      >
                        Remove Image
                      </Badge>
                    </div>
                  ) : (
                    <ImageUploader
                      withIcon
                      buttonText="Select Image"
                      onChange={this.onDrop}
                      imgExtension={[".jpg", ".gif", ".png", ".gif", ".webp"]}
                      maxFileSize={5242880}
                    />
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
        </Container>
      </div>
    );
  }
}

export default Portal;
