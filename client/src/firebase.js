import firebase from "firebase";
import "firebase/auth";
//firebase configaration
const firebaseConfig = {
  apiKey: "AIzaSyDpuh4Dvn4OKZdSiaPloGelme48M3IVUsg",
  authDomain: "e-commerce-1507c.firebaseapp.com",
  databaseURL: "https://e-commerce-1507c.firebaseio.com",
  projectId: "e-commerce-1507c",
  storageBucket: "e-commerce-1507c.appspot.com",
  messagingSenderId: "666844767910",
  appId: "1:666844767910:web:c3410ab8bced77bc3c3667",
  measurementId: "G-CJQQPYZDMD"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
//export
export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();