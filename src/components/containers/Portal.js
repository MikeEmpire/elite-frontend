import React, { Component } from "react";
import { Button, Container, Form, FormGroup, Input, Label } from "reactstrap";

import Navbar from "./Navbar";
import JoditEditor from "jodit-react";
import STORY_CATEGORIES from "../../constants/STORY_CATEGORIES";

class Portal extends Component {
  state = {
    content: "",
    title: "",
    category: "",
    showPreview: false,
  };

  handleState = (state, value) => this.setState({ [state]: value });

  render() {
    const config = {
      readonly: false,
    };

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
      category &&
      category.length > 10;

    return (
      <div>
        <Navbar />
        <Container>
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
                onChange={(e) => this.handleState("category", e.target.value)}
              >
                <option value=""></option>
                {options}
              </Input>
            </FormGroup>
          </Form>
          <JoditEditor
            value={this.state.content}
            config={config}
            tabIndex={1} // tabIndex of textarea
            onBlur={(newContent) => this.handleState("content", newContent)} // preferred to use only this option to update the content for performance reasons
          />
          {readyToSubmit && (
            <Button
              color="success"
              onClick={() => this.handleState("showPreview", !showPreview)}
            >
              Preview Story
            </Button>
          )}
        </Container>
      </div>
    );
  }
}

export default Portal;
