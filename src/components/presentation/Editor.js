import React, { Fragment, useState, useRef } from "react";
import { Button } from "reactstrap";
import JoditEditor from "jodit-react";

const Editor = (props) => {
  const { handleChange, stateContent } = props;
  const editor = useRef(null);
  const [content, setContent] = useState("");

  const isSaved = content === stateContent;

  const config = {
    readonly: false, // all options from https://xdsoft.net/jodit/doc/
  };

  return (
    <Fragment>
      <JoditEditor
        ref={editor}
        value={content}
        config={config}
        tabIndex={1} // tabIndex of textarea
        onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
      />
      {content.length > 10 && (
        <Button
          disabled={isSaved}
          color="success"
          onClick={() => handleChange("content", content)}
        >
          {isSaved ? "Saved!" : "Save"}
        </Button>
      )}
    </Fragment>
  );
};

export default Editor;
