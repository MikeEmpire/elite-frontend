import React from "react";
import { useTrail, animated } from "react-spring";
import { Col } from "reactstrap";

import StoryThumbnail from "../presentation/StoryThumbnail";

const config = { mass: 5, tension: 1000, friction: 200 };

const StoryList = (props) => {
  const { stories, users } = props;
  const trail = useTrail(stories.length, {
    config,
    opacity: 1,
    height: "auto",
    x: 20,
    from: { opacity: 0, x: 20, height: 0 },
  });
  //   const name = `${author.first_name} ${author.last_name}`;
  return trail.map(({ x, height, ...rest }, index) => {
    let user = "";
    if (Array.isArray(users)) {
      const userId = stories[index].created_by;
      const userObj = users.find((u) => u.id === userId);
      if (userObj) {
        user = `${userObj.first_name} ${userObj.last_name}`;
      } else {
        user = "Loading";
      }
    }
    return (
      <Col key={stories[index].id} md={12}>
        {stories.length > 0 ? (
          <animated.div
            key={stories[index]}
            style={{
              ...rest,
              transform: x.interpolate((x) => `translate3d(0.${x}px,0)`),
            }}
          >
            <animated.div
              className="story story--thumbnail"
              style={{
                height,
              }}
            >
              <StoryThumbnail story={stories[index]} author={user} />
            </animated.div>
          </animated.div>
        ) : (
          <h2>Loading...</h2>
        )}
      </Col>
    );
  });
};

export default StoryList;
