const intialState = {
  user: "",
  token: null,
  loggedIn: false,
  error:null
};

const userReducer = (state = intialState, action) => {
  switch (action.type) {
    case "GET_USER":
      return {
        ...state,
        user: action.payload.username,
        token:action.payload.token,
        loggedIn: true
      };
    case "LOG_ERROR":
      return{
        ...state,
        error:action.payload.error
      }
    case "LOAD_USER":
        return{
          ...state,
          user: action.payload.username,
          token: action.payload.token,
          loggedIn:action.payload.loggedIn
        };
    default:
      return state;
  }
};

export default userReducer;
