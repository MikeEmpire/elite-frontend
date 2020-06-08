import React, { Component, createRef, Fragment } from "react";
import { Button, Container, Form, FormGroup, Input, Label } from "reactstrap";

import Navbar from "./Navbar";
import STORY_CATEGORIES from "../../constants/STORY_CATEGORIES";

import Editor from "../presentation/Editor";
import StoryPreview from "../presentation/StoryPreview";

class Portal extends Component {
  state = {
    content: "",
    title: "",
    category: "",
    showPreview: false,
  };

  editorRef = createRef();

  handleState = (state, value) => this.setState({ [state]: value });

  render() {
    const options = STORY_CATEGORIES.map((category) => (
      <option key={category} value={category}>
        {category}
      </option>
    ));

    const { content, title, category, showPreview } = this.state;

    const readyToSubmit =
      content &&
      content.length > 10 &&
      title &&
      title.length > 10 &&
      category !== "";

    const storyInfo = {
      content,
      title,
      category,
    };

    return (
      <div>
        <Navbar />
        <Container>
          {showPreview ? (
            <StoryPreview storyInfo={storyInfo} />
          ) : (
            <Fragment>
              <h1>Create A Story Below</h1>
              <Form>
                <FormGroup>
                  <Label>Story Title</Label>
                  <Input
                    placeholder="Story Title Goes here"
                    type="text"
                    onBlur={(e) => this.handleState("title", e.target.value)}
                  />
                </FormGroup>
                <FormGroup>
                  <Label>Category</Label>
                  <Input
                    type="select"
                    onChange={(e) =>
                      this.handleState("category", e.target.value)
                    }
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
