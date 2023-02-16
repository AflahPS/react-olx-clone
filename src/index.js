import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import FirebaseContext from "./utils/store/FirebaseContext";
import AuthStateContext from "./utils/store/AuthContext";
import Post from "./utils/store/PostContext";
import firebase from "./utils/firebase/config";

ReactDOM.render(
  <FirebaseContext.Provider value={{ firebase }}>
    <Post>
      <AuthStateContext>
        <App />
      </AuthStateContext>
    </Post>
  </FirebaseContext.Provider>,
  document.getElementById("root")
);
