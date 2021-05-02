const express = require("express");
const app = express();
const path = require("path");

// const firebase = require("firebase");

// var firebaseConfig = {
//   apiKey: "AIzaSyAJw6CcAorLyduoCQPVJanGPyAzPG5hgPg",
//   authDomain: "ru-hacks-2021-db.firebaseapp.com",
//   projectId: "ru-hacks-2021-db",
//   storageBucket: "ru-hacks-2021-db.appspot.com",
//   messagingSenderId: "33955195190",
//   appId: "1:33955195190:web:95fa3d4e8ed96bbe62eb97",
//   measurementId: "G-MP89RF45PV",
// };

// Initialize Firebase
// firebase.initializeApp(firebaseConfig);
// var firestore = firebase.firestore();

// const docRef = firestore.doc("samples/cleaningData");

// const outputHeader = document.getElementById("sanitizedOutput");
// const inputTextField = document.getElementById("latestSanitizedStatus");
// const saveStatusButton = document.getElementById("saveStatus");
// // Required for side-effects
// require("firebase/firestore");

// Initialize Cloud Firestore through Firebase
// firebase.initializeApp({
//   apiKey: "AIzaSyAJw6CcAorLyduoCQPVJanGPyAzPG5hgPg",
//   authDomain: "ru-hacks-2021-db.firebaseapp.com",
//   projectId: "ru-hacks-2021-db",
// });

// var db = firebase.firestore();

// db.collection("users")
//   .add({
//     first: "Ada",
//     last: "Lovelace",
//     born: 1815,
//   })
//   .then((docRef) => {
//     console.log("Document written with ID: ", docRef.id);
//   })
//   .catch((error) => {
//     console.error("Error adding document: ", error);
//   });

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.render("");
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("Serving on Port 3000");
});
