/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useContext, useEffect } from "react";

import Heart from "../../assets/Heart";
import "./Post.css";
import FirebaseContext from "../../utils/store/FirebaseContext";
import { PostContext } from "../../utils/store/PostContext";
import { useHistory } from "react-router-dom";

function Posts() {
  const { firebase } = useContext(FirebaseContext);
  const { setPost } = useContext(PostContext);
  const [products, setProducts] = useState([]);

  const history = useHistory();

  useEffect(() => {
    firebase
      .firestore()
      .collection("products")
      .get()
      .then((snaps) => {
        const allPosts = snaps.docs.map((product) => {
          return { ...product.data(), id: product.id };
        });
        setProducts(allPosts);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const handleGetView = async (product) => {
    setPost(product);
    history.push("/view-post");
  };

  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="cards">
          {products.map((product) => {
            return (
              <div
                id={product.id}
                onClick={() => handleGetView(product)}
                className="card"
              >
                <div className="favorite">
                  <Heart></Heart>
                </div>
                <div className="image">
                  <img src={product.image} alt="" />
                </div>
                <div className="content">
                  <p className="rate">&#x20B9; {product.price}</p>
                  <span className="kilometer">{product.category}</span>
                  <p className="name">{product.name}</p>
                </div>
                <div className="date">
                  <span>{product.createdAt}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className="cards">
          <div className="card">
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src="../../../Images/R15V3.jpg" alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; 250000</p>
              <span className="kilometer">Two Wheeler</span>
              <p className="name"> YAMAHA R15V3</p>
            </div>
            <div className="date">
              <span>10/5/2021</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Posts;
