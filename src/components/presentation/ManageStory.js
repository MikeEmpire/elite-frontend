import React, { Fragment } from "react";
import { Button } from "reactstrap";

import Editor from "./Editor";
import StoryForm from "./StoryForm";
import StoryPreview from "./StoryPreview";
import ListStoryFormatter from '../containers/ListStoryFormatter';

const ManageStory = (props) => {
  const { state, auth, extra } = props;
  const { readyToSubmit, handleState, handleUpload } = extra;
  const handleFunc = { handleState, handleUpload };
  const { showPreview, body, storyType } = state;
  return showPreview ? (
    <StoryPreview storyInfo={state} author={auth} />
  ) : (
    <Fragment>
      {readyToSubmit && (
        <Button
          color="primary"
          onClick={() => handleState("showPreview", !showPreview)}
        >
          {showPreview ? "Edit Story" : "Show Preview"}
        </Button>
      )}
      <StoryForm formData={state} handleFunc={handleFunc} />
      {storyType === "Default" ? (
        <Editor stateContent={body} handleChange={handleState} />
      ) : (
        <ListStoryFormatter />
      )}
    </Fragment>
  );
};

export default ManageStory;
