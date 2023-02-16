import React, { useContext, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import { AuthContext } from "./utils/store/AuthContext";

import Home from "./Pages/Home";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import Create from "./Pages/Create";
import ViewPost from "./Pages/ViewPost";
import FirebaseContext from "./utils/store/FirebaseContext";

function App() {
  const { setUser } = useContext(AuthContext);
  const { firebase } = useContext(FirebaseContext);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      console.log(user);
    });
  });

  return (
    <div>
      <Router>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/signup">
          <Signup />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/create">
          <Create />
        </Route>
        <Route exact path="/view-post">
          <ViewPost />
        </Route>
      </Router>
    </div>
  );
}

export default App;
