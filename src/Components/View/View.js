/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useState, useEffect } from "react";

import FirebaseContext from "../../utils/store/FirebaseContext";
import { PostContext } from "../../utils/store/PostContext";

import "./View.css";
function View() {
  const [user, setUser] = useState("");

  const { post } = useContext(PostContext);
  const { firebase } = useContext(FirebaseContext);

  useEffect(() => {
    const { userId } = post;
    firebase
      .firestore()
      .collection("users")
      .where("id", "==", userId)
      .get()
      .then((user) => {
        user.forEach((doc) => setUser(doc.data()));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img src={post.image} alt="" />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {post.price} </p>
          <span>{post.name}</span>
          <p>{post.category}</p>
          <span>{post.createdAt}</span>
        </div>
        <div className="contactDetails">
          <p>Seller details</p>
          <p>{user && user.username}</p>
          <p>{user && user.phone}</p>
        </div>
      </div>
    </div>
  );
}
export default View;
