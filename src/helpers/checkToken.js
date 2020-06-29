// props must include withRouter and auth check function
// refer to Portal.js setup

const checkToken = (props) => {
  if (!props.auth) {
    props.authCheck().then((res) => {
      if (res.type === "AUTH_CHECK_SUCCESS") {
        return null;
      }
      return props.history.push("/signin");
    });
  }
  return null;
};

export default checkToken;
