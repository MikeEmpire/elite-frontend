import React, { Fragment } from "react";
import { Form, FormGroup, Input, Label, Badge } from "reactstrap";

import STORY_CATEGORIES from "../../constants/STORY_CATEGORIES";

const options = STORY_CATEGORIES.map((category) => (
  <option key={category} value={category}>
    {category}
  </option>
));

const StoryForm = (props) => {
  const { formData, handleFunc } = props;
  const { handleState, handleUpload } = handleFunc;
  const { title, image, subtitle, category, storyType } = formData;
  return (
    <Form>
      <FormGroup>
        <Label>Story Title</Label>
        <Input
          placeholder="Story Title Goes here"
          type="text"
          value={title}
          onChange={(e) => handleState("title", e.target.value)}
        />
      </FormGroup>
      <FormGroup>
        <Label>Subtitle</Label>
        <Input
          placeholder="Subtitle Goes here"
          type="text"
          value={subtitle}
          onChange={(e) => handleState("subtitle", e.target.value)}
        />
      </FormGroup>
      <FormGroup>
        <Label for="exampleFile" style={{ display: "block" }}>
          Cover Image
        </Label>
        {image === "" ? (
          <div>
            <input
              onChange={e => handleUpload(e)}
              type="file"
            />
          </div>
        ) : (
          <Fragment>
            <img
              alt="Placeholder for story"
              style={{ display: "block", width: "50%" }}
              src={image}
            />
            <Badge color="info" onClick={() => handleState("image", "")}>
              Remove Image
            </Badge>
          </Fragment>
        )}
      </FormGroup>
      <FormGroup>
        <Label>Category</Label>
        <Input
          type="select"
          onChange={(e) => handleState("category", e.target.value)}
          value={category}
        >
          <option value=""></option>
          {options}
        </Input>
      </FormGroup>
      <FormGroup>
        <Label>Story Type</Label>
        <Input
          type="select"
          onChange={e => handleState("storyType", e.target.value)}
          value={storyType}
          />
      </FormGroup>
    </Form>
  );
};

export default StoryForm;
