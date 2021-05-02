const myFullpage = new fullpage("#fullpage", {
  //hey
  autoScrolling: false,
  // navigation: true,
  // navigationPosition: "left",
  // navigationTooltips: ['First page', 'Second page', 'Third and last page'],
  // anchors: ["firstPage", "secondPage", "3rdPage"],
  // showActiveTooltip: true,
});

var config = {
  apiKey: "AIzaSyDHwne23j84mNvY8m2TQvRU3Szcp_cQ_ng",
  authDomain: "sanitizeme-ru-hacks-2021.firebaseapp.com",
  databaseURL: "https://sanitizeme-ru-hacks-2021-default-rtdb.firebaseio.com",
  projectId: "sanitizeme-ru-hacks-2021",
  storageBucket: "sanitizeme-ru-hacks-2021.appspot.com",
  messagingSenderId: "944776195377",
  appId: "1:944776195377:web:a5c9daeee6fff063909410",
  measurementId: "G-Q7C1QFH7JM",
};

var freeze = true;

var itemsInFrame = [];

function resetSystem() {
  bottleCounter = 0;
  chairCounter = 0;
  writeData();
}

firebase.initializeApp(config);

function writeData() {
  var rand = Math.floor(Math.random() * (10000000 - 0) + 10000000);
  rand = rand.toString();
  var items = itemsInFrame.join(", ");
  var time = new Date().toString().slice(0, 21);
  firebase.database().ref(rand).set({
    object: items,
    name: "staff",
    time: time,
  });

  getData();
}

function getData() {
  firebase
    .database()
    .ref("/")
    .orderByChild("time")
    .once("value", function (snapshot) {
      var x = "";

      snapshot.forEach(function (childSnapshot) {
        var childKey = childSnapshot.key;
        var childData = childSnapshot.val();

        // const p = document.createElement("p");
        // p.innerText = childData['object'] + " cleaned by " + childData['name'] + " at " + childData['time'];

        x =
          x +
          "<h1 class='second-page-p py-2'>" +
          "<strong>" +
          childData["object"] +
          "</strong>" +
          " cleaned at " +
          "<strong>" +
          childData["time"] +
          "</strong>" +
          "</h1>";
      });
      document.getElementById("data").innerHTML = x;
    });
}

function emptyData() {
  firebase
    .database()
    .ref("/")
    .orderByChild("name")
    .once("value", function (snapshot) {
      snapshot.forEach(function (childSnapshot) {
        childSnapshot.ref.remove();
        console.log("Removed!");
      });
    });
}

const video = document.getElementById("webcam");
const liveView = document.getElementById("liveView");
const demosSection = document.getElementById("demos");
const enableWebcamButton = document.getElementById("webcamButton");

function getUserMediaSupported() {
  return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
}

if (getUserMediaSupported()) {
  enableWebcamButton.addEventListener("click", enableCam);
} else {
  console.warn("getUserMedia() is not supported by your browser");
}

function enableCam(event) {}

// function updateStatus() {
//   // saveStatusButton.addEventListener("click", function () {
//   //   const textToSave = inputTextField.value;
//   //   console.log(textToSave);
//   //   docRef
//   //     .set({
//   //       sanitizedStatus: textToSave,
//   //     })
//   //     .then(function () {
//   //       console.log("status saved");
//   //     })
//   //     .catch(function (error) {
//   //       console.log(error);
//   //     });
//   // });
// }

function enableCam(event) {
  if (!model) {
    return;
  }

  event.target.classList.add("removed");

  const constraints = {
    video: true,
  };

  navigator.mediaDevices.getUserMedia(constraints).then(function (stream) {
    video.srcObject = stream;
    video.addEventListener("loadeddata", predictWebcam);
  });
}

function predictWebcam() {}

var model = true;
demosSection.classList.remove("invisible");

var model = undefined;

cocoSsd.load().then(function (loadedModel) {
  model = loadedModel;
  demosSection.classList.remove("invisible");
});

var children = [];

var detectBottle = false;
var detectChair = true;

function removeItem() {
  var nameValue = document.getElementById("uniqueID").value;

  if (nameValue == "bottle") {
    detectBottle = false;
    bottleCounter = 0;
  }
  if (nameValue == "chair") {
    detectChair = false;
    chairCounter = 0;
  }

  document.getElementById("uniqueID").value = "";
}

function addItem() {
  var nameValue = document.getElementById("uniqueID2").value;
  if (nameValue == "bottle") {
    detectBottle = true;
    bottleCounter = 0;
  }
  if (nameValue == "chair") {
    detectChair = true;
    chairCounter = 0;
  }

  document.getElementById("uniqueID2").value = "";
}

let chairCounter = -1;
let bottleCounter = -1;
let keyboardCounter = -1;

let chairIncreaseCount = false;
let bottleIncreaseCount = false;
let keyboardIncreaseCount = false;

function wait(ms) {
  var start = new Date().getTime();
  var end = start;
  while (end < start + ms) {
    end = new Date().getTime();
  }
}

function predictWebcam() {
  itemsInFrame = [];
  model.detect(video).then(function (predictions) {
    for (let i = 0; i < children.length; i++) {
      liveView.removeChild(children[i]);
    }

    children.splice(0);

    for (let n = 0; n < predictions.length; n++) {
      console.log(n);

      if (predictions[n].score > 0.7) {
        itemsInFrame.push(predictions[n].class);
        console.log(predictions);
        if (
          keyboardIncreaseCount != true &&
          predictions[n].class == "keyboard"
        ) {
          keyboardCounter += 1;
          keyboardIncreaseCount = true;
        }
        if (chairIncreaseCount != true && predictions[n].class == "chair") {
          chairCounter += 1;
          chairIncreaseCount = true;
          itemsInFrame.push(predictions[n].class);
        }
        if (bottleIncreaseCount != true && predictions[n].class == "bottle") {
          bottleCounter += 1;
          bottleIncreaseCount = true;
          itemsInFrame.push(predictions[n].class);
        }

        if (
          chairCounter >= 0 &&
          predictions[n].class == "chair" &&
          detectChair
        ) {
          const p = document.createElement("p");
          p.innerText = "Chair has been touched " + chairCounter + " times";

          p.style =
            "margin-left: " +
            predictions[n].bbox[0] +
            "px; margin-top: " +
            (predictions[n].bbox[1] - 10) +
            "px; width: " +
            (predictions[n].bbox[2] - 10) +
            "px; top: 0; left: 0;";

          const highlighter = document.createElement("div");

          if (chairCounter <= 5) {
            highlighter.setAttribute("class", "highlighter");
          } else if (chairCounter > 5 && chairCounter <= 10) {
            highlighter.setAttribute("class", "highlighter2");
          } else {
            highlighter.setAttribute("class", "highlighter3");
          }

          highlighter.style =
            "left: " +
            predictions[n].bbox[0] +
            "px; top: " +
            predictions[n].bbox[1] +
            "px; width: " +
            predictions[n].bbox[2] +
            "px; height: " +
            predictions[n].bbox[3] +
            "px;";

          liveView.appendChild(highlighter);
          liveView.appendChild(p);
          children.push(highlighter);
          children.push(p);
        }

        console.log(detectBottle);
        if (predictions[n].class == "bottle" && detectBottle) {
          const p = document.createElement("p");
          p.innerText = "Bottle has been touched " + bottleCounter;

          p.style =
            "margin-left: " +
            predictions[n].bbox[0] +
            "px; margin-top: " +
            (predictions[n].bbox[1] - 10) +
            "px; width: " +
            (predictions[n].bbox[2] - 10) +
            "px; top: 0; left: 0;";

          const highlighter = document.createElement("div");
          if (bottleCounter <= 5) {
            highlighter.setAttribute("class", "highlighter");
          } else if (bottleCounter > 5 && bottleCounter <= 10) {
            highlighter.setAttribute("class", "highlighter2");
          } else {
            highlighter.setAttribute("class", "highlighter3");
          }

          highlighter.style =
            "left: " +
            predictions[n].bbox[0] +
            "px; top: " +
            predictions[n].bbox[1] +
            "px; width: " +
            predictions[n].bbox[2] +
            "px; height: " +
            predictions[n].bbox[3] +
            "px;";

          liveView.appendChild(highlighter);
          liveView.appendChild(p);
          children.push(highlighter);
          children.push(p);
        }
      } else {
        if (predictions[n].class == "chair") {
          chairIncreaseCount = false;
          wait(1600);
        }
        if (predictions[n].class == "bottle") {
          bottleIncreaseCount = false;
          wait(800);
        }
        if (predictions[n].class == "keyboard") {
          keyboardIncreaseCount = false;
        }
      }
    }

    var res = "";
    if (
      bottleCounter > 10 &&
      itemsInFrame.includes("bottle") &&
      chairCounter > 10 &&
      itemsInFrame.includes("chair")
    ) {
      res = "bottle, chair";
    } else if (bottleCounter > 10 && itemsInFrame.includes("bottle")) {
      res = "bottle";
    } else if (chairCounter > 10 && itemsInFrame.includes("chair")) {
      res = "chair";
    } else {
      res = "none";
    }

    document.getElementById("ugent").innerHTML =
      "Items that require urgent cleaning: " + res;
    window.requestAnimationFrame(predictWebcam);
  });
}
