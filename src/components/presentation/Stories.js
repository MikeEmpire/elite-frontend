import React from "react";
import { useTrail, animated } from "react-spring";
import { Col } from "reactstrap";

const config = { mass: 5, tension: 1000, friction: 200 };

const Stories = (props) => {
  const { stories, users } = props;
  const trail = useTrail(stories.length, {
    config,
    opacity: 1,
    height: "auto",
    x: 20,
    from: { opacity: 0, x: 20, height: 0 },
  });
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
      <Col key={stories[index].id}>
        {stories.length > 0 ? (
          <animated.div
            key={stories[index]}
            style={{
              ...rest,
              transform: x.interpolate((x) => `translate3d(0.${x}px,0)`),
            }}
          >
            <animated.div
              className="story"
              style={{
                height,
                borderBottom:
                  index === 0 ? "7px solid rgba(251, 233, 188, 0.5)" : null,
              }}
            >
              <img
                alt="Featured article for elite"
                className="story--image"
                src={stories[index].image}
              />
              <h6 className="story--category">{stories[index].category}</h6>
              <h1 className="story--title">{stories[index].title}</h1>
              {/* <p className="story--subtitle">{stories[index].subtitle}</p> */}
              <p className="story--author">By {user}</p>
            </animated.div>
          </animated.div>
        ) : (
          <h2>Loading...</h2>
        )}
      </Col>
    );
  });
};

export default Stories;
