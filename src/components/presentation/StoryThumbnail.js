import React, { Fragment } from "react";

const StoryThumbnail = (props) => {
  const { story, author } = props;
  const { category, title, image } = story;
  return (
    <Fragment>
      <div className="story--image--container">
        <img
          alt="Featured article for elite"
          className="story--image"
          src={image}
        />
      </div>
      <div className="story--thumbnail--info--container">
        <h6 className="story--category story--category--thumbnail">{category}</h6>
        <h1 className="story--title story--title--thumbnail">{title}</h1>
        <p className="story--author">By {author}</p>
      </div>
    </Fragment>
  );
};

export default StoryThumbnail;
