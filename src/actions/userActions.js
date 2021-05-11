import axios from "axios";

export const getUser = (user) => {
  return async function (dispatch) {
    try {
      const { data } = await axios.post("http://localhost:5000/signin", user);
      localStorage.setItem('auth-token',data.token);
      dispatch({
        type: "GET_USER",
        payload: data,
      });
    } catch (err) {
      dispatch({
        type: "LOG_ERROR",
        payload: { error:err.response.data.message },
      });
    }
  };
};

export const loadUser = (token) => {
  return async function (dispatch) {
    try {
      const { data } = await axios.post("http://localhost:5000/validate", null,
      {
        headers: {
          "x-auth-token": token
        }
      }
    );
      dispatch({
        type: "LOAD_USER",
        payload: { ...data, token, loggedIn:true },
      });
    } catch (err) {
      console.log('Error');
      dispatch({
        type: "LOG_ERROR",
        payload: { error:err.response.data.message },
      });
    }
  };
};
