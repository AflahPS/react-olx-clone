import React, { useState, useContext } from "react";
import FirebaseContext from "../../utils/store/FirebaseContext";

import Logo from "../../olx-logo.png";
import "./Login.css";
import { useHistory } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const { firebase } = useContext(FirebaseContext);

  const handleLogin = async function (e) {
    e.preventDefault();
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      history.push("/");
    } catch (err) {
      console.log(err.message);
      alert(err.message);
    }
  };

  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo} alt="Logo"></img>
        <form>
          <label htmlFor="email">Email</label>
          <br />
          <input
            className="input"
            placeholder="Email Address"
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            name="email"
            required
          />
          <br />
          <label htmlFor="password">Password</label>
          <br />
          <input
            className="input"
            placeholder="Password"
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            name="password"
            required
          />
          <br />
          <br />
          <button onClick={(e) => handleLogin(e)}>Login</button>
        </form>
        <span className="clickable" onClick={() => history.push("/signup")}>
          Signup
        </span>
      </div>
    </div>
  );
}

export default Login;
