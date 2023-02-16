import React, { useContext } from "react";
import { useHistory } from "react-router-dom";

import "./Header.css";
import OlxLogo from "../../assets/OlxLogo";
import Search from "../../assets/Search";
import Arrow from "../../assets/Arrow";
import SellButton from "../../assets/SellButton";
import SellButtonPlus from "../../assets/SellButtonPlus";
import { AuthContext } from "../../utils/store/AuthContext";
import FirebaseContext from "../../utils/store/FirebaseContext";

function Header() {
  const { user, setUser } = useContext(AuthContext);
  const { firebase } = useContext(FirebaseContext);
  const history = useHistory();

  async function handleLogout() {
    try {
      await firebase.auth().signOut();
      setUser(null);
      history.push("/login");
    } catch (err) {
      console.log(err.message);
    }
  }

  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div onClick={() => history.push("/")} className="brandName">
          <OlxLogo></OlxLogo>
        </div>
        <div className="placeSearch">
          <Search></Search>
          <input type="text" />
          <Arrow></Arrow>
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car,mobile phone and more..."
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff"></Search>
          </div>
        </div>
        <div className="language">
          <span> ENGLISH </span>
          <Arrow></Arrow>
        </div>
        <div className="loginPage">
          {user ? (
            <span>{user.displayName}</span>
          ) : (
            <span className="clickable" onClick={() => history.push("/login")}>
              Login
            </span>
          )}
          <hr />
        </div>

        {user ? (
          <span className="clickable" onClick={() => handleLogout()}>
            Logout
          </span>
        ) : (
          ``
        )}

        <div className="sellMenu">
          <SellButton></SellButton>
          <div className="sellMenuContent">
            <SellButtonPlus></SellButtonPlus>
            <span onClick={() => history.push("/create")}>SELL</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
