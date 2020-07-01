import React, { Fragment } from "react";
import { Button } from 'reactstrap';

import Editor from './Editor';
import StoryForm from "./StoryForm";
import StoryPreview from './StoryPreview';

const ManageStory = (props) => {
  const { state, auth, extra } = props;
  const { readyToSubmit, handleState, handleUpload } = extra;
  const handleFunc = { handleState, handleUpload }
  const { showPreview, body } = state;
  return showPreview ? (
    <StoryPreview storyInfo={state} author={auth} />
  ) : (
    <Fragment>
      <h1>Create A Story Below</h1>
      {readyToSubmit && (
        <Button
          color="primary"
          onClick={() => handleState("showPreview", !showPreview)}
        >
          {showPreview ? "Edit Story" : "Show Preview"}
        </Button>
      )}
      <StoryForm formData={state} handleFunc={handleFunc} />
      <Editor stateContent={body} handleChange={handleState} />
    </Fragment>
  );
};

export default ManageStory;
