import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAUHuFxebNTMcDJrIXJmyPbo_vtn877Z3w",
  authDomain: "olx-clone-fb1cf.firebaseapp.com",
  projectId: "olx-clone-fb1cf",
  storageBucket: "olx-clone-fb1cf.appspot.com",
  messagingSenderId: "509631391392",
  appId: "1:509631391392:web:f4943ad0caadccc2550bc5",
  measurementId: "G-X0MQVE1D1Q",
};

export default firebase.initializeApp(firebaseConfig);
