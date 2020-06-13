import React from "react";
import { useTrail, animated } from "react-spring";

const config = { mass: 5, tension: 1000, friction: 200 };

const Stories = (props) => {
  const { stories, users } = props;
  const trail = useTrail(stories.length, {
    config,
    opacity: 1,
    height: 80,
    x: 20,
    from: { opacity: 0, x: 20, height: 0 },
  });
  return (
    <div>
      {trail.map(({ x, height, ...rest }, index) => {
        let user = "";
        if (Array.isArray(users)) {
          const userId = stories[index].created_by;
          const userObj = users.find((u) => u.id === userId);
          user = `${userObj.first_name} ${userObj.last_name}`;
        }
        return (
          <div key={stories[index].id}>
            {stories.length > 0 ? (
              <animated.div
                key={stories[index]}
                style={{
                  ...rest,
                  transform: x.interpolate((x) => `translate3d(0.${x}px,0)`),
                }}
              >
                <animated.div style={{ height }}>
                  <img
                    alt="Featured article for elite"
                    className="story--image"
                    src={stories[index].image}
                  />
                  <h6 className="story--category">{stories[index].category}</h6>
                  <h1 className="story--title">{stories[index].title}</h1>
                  <p className="story--subtitle">{stories[index].subtitle}</p>
                  <p className="story--author">By {user}</p>
                </animated.div>
              </animated.div>
            ) : (
              <h2>Loading...</h2>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Stories;