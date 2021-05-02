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

// Check if webcam access is supported.
function getUserMediaSupported() {
  return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
}

// If webcam supported, add event listener to button for when user
// wants to activate it to call enableCam function which we will
// define in the next step.
if (getUserMediaSupported()) {
  enableWebcamButton.addEventListener("click", enableCam);
} else {
  console.warn("getUserMedia() is not supported by your browser");
}

// Placeholder function for next step. Paste over this in the next step.
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

// Enable the live webcam view and start classification.
function enableCam(event) {
  // Only continue if the COCO-SSD has finished loading.
  if (!model) {
    return;
  }

  // Hide the button once clicked.
  event.target.classList.add("removed");

  // getUsermedia parameters to force video but not audio.
  const constraints = {
    video: true,
  };

  // Activate the webcam stream.
  navigator.mediaDevices.getUserMedia(constraints).then(function (stream) {
    video.srcObject = stream;
    video.addEventListener("loadeddata", predictWebcam);
  });
}

// Placeholder function for next step.
function predictWebcam() {}

// Pretend model has loaded so we can try out the webcam code.
var model = true;
demosSection.classList.remove("invisible");

// Store the resulting model in the global scope of our app.
var model = undefined;

// Before we can use COCO-SSD class we must wait for it to finish
// loading. Machine Learning models can be large and take a moment
// to get everything needed to run.
// Note: cocoSsd is an external object loaded from our index.html
// script tag import so ignore any warning in Glitch.
cocoSsd.load().then(function (loadedModel) {
  model = loadedModel;
  // Show demo section now model is ready to use.
  demosSection.classList.remove("invisible");
});

var children = [];

var detectBottle = true;
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
  // Now let's start classifying a frame in the stream.
  model.detect(video).then(function (predictions) {
    // Remove any highlighting we did previous frame.
    for (let i = 0; i < children.length; i++) {
      liveView.removeChild(children[i]);
    }

    children.splice(0);

    // Now lets loop through predictions and draw them to the live view if
    // they have a high confidence score.
    for (let n = 0; n < predictions.length; n++) {
      // If we are over 66% sure we are sure we classified it right, draw it!
      console.log(n);

      if (predictions[n].score > 0.85) {
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

        if (chairCounter >= 0 && predictions[n].class == "chair") {
          const p = document.createElement("p");
          p.innerText = "Chair has been touched " + chairCounter + " times";

          //   predictions[n].class +
          //   " - with " +
          //   Math.round(parseFloat(predictions[n].score) * 100) +
          //   "% confidence.";
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
          wait(800);
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

    // Call this function again to keep predicting when the browser is ready.
    window.requestAnimationFrame(predictWebcam);
  });
}
