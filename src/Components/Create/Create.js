import React, { Fragment, useContext, useState } from "react";
import "./Create.css";
import Header from "../Header/Header";
import { AuthContext } from "../../utils/store/AuthContext";
import FirebaseContext from "../../utils/store/FirebaseContext";
import { useHistory } from "react-router-dom";

const Create = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");

  const history = useHistory();
  const { user } = useContext(AuthContext);
  const { firebase } = useContext(FirebaseContext);

  const handleUpload = async () => {
    try {
      const uploaded = await firebase
        .storage()
        .ref(`/upload/images/products/${image.name}`)
        .put(image);
      const url = await uploaded.ref.getDownloadURL();
      await firebase.firestore().collection("products").add({
        name,
        category,
        price,
        image: url,
        userId: user.uid,
        createdAt: new Date().toLocaleString(),
      });
      history.push("/");
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
          <label htmlFor="name">Name</label>
          <br />
          <input
            className="input"
            type="text"
            id="name"
            onChange={(e) => setName(e.target.value)}
            value={name}
            name="name"
          />
          <br />
          <label htmlFor="category">Category</label>
          <br />
          <input
            className="input"
            type="text"
            onChange={(e) => setCategory(e.target.value)}
            value={category}
            id="category"
            name="category"
          />
          <br />
          <label htmlFor="price">Price</label>
          <br />
          <input
            className="input"
            type="number"
            onChange={(e) => setPrice(e.target.value)}
            value={price}
            id="price"
            name="Price"
          />
          <br />
          <br />
          <img
            alt="Posts"
            width="200px"
            height="200px"
            src={image ? URL.createObjectURL(image) : ""}
          ></img>
          <br />
          <input onChange={(e) => setImage(e.target.files[0])} type="file" />
          <br />
          <button onClick={handleUpload} className="uploadBtn">
            upload and Submit
          </button>
        </div>
      </card>
    </Fragment>
  );
};

export default Create;
