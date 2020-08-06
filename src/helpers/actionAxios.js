import axios from "axios";

import apiUrl from "../constants/apiUrl";

const actionAxios = (params, dispatch) => {
  const ACTION = params.actionType;
  const { method } = params
  dispatch({ type: `${ACTION}_REQUEST` });
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: token,
    },
  };
  const url = `${apiUrl}${params.url}`;
  const body = params.body;

  return axios[method](url, body, config)
    .then((res) => dispatch({ type: `${ACTION}_SUCCESS`, payload: res.data }))
    .catch((err) =>
      dispatch({
        type: `${ACTION}_FAILURE`,
        payload: err,
        error: true,
      })
    );
};

export default actionAxios;
