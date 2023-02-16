import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import FirebaseContext from "../../utils/store/FirebaseContext";

import Logo from "../../olx-logo.png";
import "./Signup.css";

export default function Signup() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const { firebase } = useContext(FirebaseContext);
  const history = useHistory();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCred = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);
      await userCred.user.updateProfile({ displayName: username });
      console.log(userCred.user);
      await firebase.firestore().collection("users").add({
        id: userCred.user.uid,
        email,
        username,
        phone,
      });
      history.push("/login");
    } catch (err) {
      console.log(err);
      alert(err.message);
    }
  };

  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo} alt="Logo"></img>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Username</label>
          <br />
          <input
            className="input"
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
            name="name"
          />
          <br />
          <label htmlFor="email">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            name="email"
          />
          <br />
          <label htmlFor="phone">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            name="phone"
          />
          <br />
          <label htmlFor="password">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            name="password"
          />
          <br />
          <br />
          <button>Signup</button>
        </form>
        <span className="clickable" onClick={() => history.push("/login")}>
          Login
        </span>
      </div>
    </div>
  );
}
