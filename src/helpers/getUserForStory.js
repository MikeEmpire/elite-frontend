const getUserForStory = (users, story) => {
  let user = "";
  if (Array.isArray(users)) {
    user = users.find((user) => user.id === story.created_by);
    if (typeof user === "object") {
      user = `${user.first_name} ${user.last_name}`;
    }
  }
  return user
};

export default getUserForStory;