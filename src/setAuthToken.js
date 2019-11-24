import axios from "./axios";

// Okay, now we have set the headers and add the Authorization to a token. 
//Now, we need to save this token and set the current user as a logged in user.

const setAuthToken = token => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = token;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};

export default setAuthToken;
