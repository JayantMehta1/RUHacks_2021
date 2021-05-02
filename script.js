// // // const model = mobilenet.load()
// // const video = document.getElementById("webcam");
// // const liveView = document.getElementById("liveView");
// // const demosSection = document.getElementById("demos");
// // const enableWebcamButton = document.getElementById("webcamButton");

// // // const model = await mobilenet.load()
// // // const status = document.getElementById('status')
// // // const video = document.getElementById('video')
// // // const canvas = document.getElementById('canvas')
// // // const context = canvas.getContext('2d')

// // // Check if webcam access is supported.
// // // function getUserMediaSupported() {
// // //   return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
// // // }

// // const stream = navigator.mediaDevices.getUserMedia({
// //   audio: false,
// //   video: {
// //       facingMode: 'environment'
// //   }
// // })

// // // If webcam supported, add event listener to button for when user
// // // wants to activate it to call enableCam function which we will
// // // define in the next step.
// // if (stream) {
// //   enableWebcamButton.addEventListener("click", enableCam);
// // } else {
// //   console.warn("getUserMedia() is not supported by your browser");
// // }

// // // Placeholder function for next step. Paste over this in the next step.
// // function enableCam(event) {}

// // // Enable the live webcam view and start classification.
// // function enableCam(event) {
// //   // Only continue if the COCO-SSD has finished loading.
// //   if (!model) {
// //     return;
// //   }

// //   // Hide the button once clicked.
// //   event.target.classList.add("removed");

// //   // getUsermedia parameters to force video but not audio.
// //   const constraints = {
// //     video: true,
// //   };

// //   // Activate the webcam stream.
// //   navigator.mediaDevices.getUserMedia(constraints).then(function (stream) {
// //     video.srcObject = stream;
// //     video.addEventListener("loadeddata", predictWebcam);
// //   });
// // }

// // // Placeholder function for next step.
// // function predictWebcam() {}

// // // Pretend model has loaded so we can try out the webcam code.
// // var model = true;
// // demosSection.classList.remove("invisible");

// // // Store the resulting model in the global scope of our app.
// // var model = undefined;

// // // Before we can use COCO-SSD class we must wait for it to finish
// // // loading. Machine Learning models can be large and take a moment
// // // to get everything needed to run.
// // // Note: cocoSsd is an external object loaded from our index.html
// // // script tag import so ignore any warning in Glitch.
// // mobilenet.load().then(function (loadedModel) {
// //   model = loadedModel;
// //   // Show demo section now model is ready to use.
// //   demosSection.classList.remove("invisible");
// // });

// // var children = [];

// // let counter = 0;

// // let increaseCount = false;

// // function predictWebcam() {
// //   console.log(counter);

// //   // Now let's start classifying a frame in the stream.
// //   model.classify(video).then(function (predictions) {
// //     console.log(predictions)

// //     // Remove any highlighting we did previous frame.
// //     for (let i = 0; i < children.length; i++) {
// //       liveView.removeChild(children[i]);
// //     }

// //     children.splice(0);

// //     // Now lets loop through predictions and draw them to the live view if
// //     // they have a high confidence score.
// //     for (let n = 0; n < predictions.length; n++) {
// //       // If we are over 66% sure we are sure we classified it right, draw it!
// //       if (predictions[n].score > 0.55) {
// //         if (increaseCount != true && predictions[n].class == "person") {
// //           console.log("PERSONz");
// //           counter += 1;
// //           increaseCount = true;
// //         }

// //         const p = document.createElement("p");
// //         p.innerText = "This object has been touched " + counter + " times";
// //         //   predictions[n].class +
// //         //   " - with " +
// //         //   Math.round(parseFloat(predictions[n].score) * 100) +
// //         //   "% confidence.";
// //         p.style =
// //           "margin-left: " +
// //           predictions[n].bbox[0] +
// //           "px; margin-top: " +
// //           (predictions[n].bbox[1] - 10) +
// //           "px; width: " +
// //           (predictions[n].bbox[2] - 10) +
// //           "px; top: 0; left: 0;";

// //         const highlighter = document.createElement("div");
// //         if (counter <= 5) {
// //           highlighter.setAttribute("class", "highlighter");
// //         } else if (counter > 5 && counter <= 10) {
// //           highlighter.setAttribute("class", "highlighter2");
// //         } else {
// //           highlighter.setAttribute("class", "highlighter3");
// //         }

// //         highlighter.style =
// //           "left: " +
// //           predictions[n].bbox[0] +
// //           "px; top: " +
// //           predictions[n].bbox[1] +
// //           "px; width: " +
// //           predictions[n].bbox[2] +
// //           "px; height: " +
// //           predictions[n].bbox[3] +
// //           "px;";

// //         liveView.appendChild(highlighter);
// //         liveView.appendChild(p);
// //         children.push(highlighter);
// //         children.push(p);
// //       } else {
// //         increaseCount = false;
// //       }
// //     }

// //     // Call this function again to keep predicting when the browser is ready.
// //     window.requestAnimationFrame(predictWebcam);
// //   });
// // }

// const video = document.getElementById("webcam");
// const liveView = document.getElementById("liveView");
// const demosSection = document.getElementById("demos");
// const enableWebcamButton = document.getElementById("webcamButton");

// // Check if webcam access is supported.
// function getUserMediaSupported() {
//   return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
// }

// // If webcam supported, add event listener to button for when user
// // wants to activate it to call enableCam function which we will
// // define in the next step.
// if (getUserMediaSupported()) {
//   enableWebcamButton.addEventListener("click", enableCam);
// } else {
//   console.warn("getUserMedia() is not supported by your browser");
// }

// // Placeholder function for next step. Paste over this in the next step.
// function enableCam(event) {}

// // Enable the live webcam view and start classification.
// function enableCam(event) {
//   // Only continue if the COCO-SSD has finished loading.
//   if (!model) {
//     return;
//   }

//   // Hide the button once clicked.
//   event.target.classList.add("removed");

//   // getUsermedia parameters to force video but not audio.
//   const constraints = {
//     video: true,
//   };

//   // Activate the webcam stream.
//   navigator.mediaDevices.getUserMedia(constraints).then(function (stream) {
//     video.srcObject = stream;
//     video.addEventListener("loadeddata", predictWebcam);
//   });
// }

// // Placeholder function for next step.
// function predictWebcam() {}

// // Pretend model has loaded so we can try out the webcam code.
// var model = true;
// demosSection.classList.remove("invisible");

// // Store the resulting model in the global scope of our app.
// var model = undefined;

// // Before we can use COCO-SSD class we must wait for it to finish
// // loading. Machine Learning models can be large and take a moment
// // to get everything needed to run.
// // Note: cocoSsd is an external object loaded from our index.html
// // script tag import so ignore any warning in Glitch.
// cocoSsd.load().then(function (loadedModel) {
//   model = loadedModel;
//   // Show demo section now model is ready to use.
//   demosSection.classList.remove("invisible");
// });

// var children = [];

// let incrementCounterArray = Array(100).fill(false);
// let counterArray = Array(100).fill(0);

// let objectMap = {
//     mouse: [false, 0],
//     bottle: [false, 0],
//     scissors: [false, 0]
// }

// let counter = 0;

// let increaseCount = false;

// function predictWebcam() {
//   console.log(counter);

//   // Now let's start classifying a frame in the stream.
//   model.detect(video).then(function (predictions) {
//     // Remove any highlighting we did previous frame.
//     for (let i = 0; i < children.length; i++) {
//       liveView.removeChild(children[i]);
//     }

//     children.splice(0);

//     // Now lets loop through predictions and draw them to the live view if
//     // they have a high confidence score.
//     for (let n = 0; n < predictions.length; n++) {
//       // If we are over 66% sure we are sure we classified it right, draw it!
//       if (predictions[n].score > 0.55) {
//         if (objectMap[predictions[n].class][0] != true && !!objectMap[predictions[n].class]) {
//           objectMap[predictions[n].class][1] += 1;
//           objectMap[predictions[n].class][0] = true;
//         }

//         const p = document.createElement("p");
//         p.innerText = predictions[n].class + "This object has been touched " + counterArray[n] + " times" + predictions[n].score;
//         //   predictions[n].class +
//         //   " - with " +
//         //   Math.round(parseFloat(predictions[n].score) * 100) +
//         //   "% confidence.";
//         p.style =
//           "margin-left: " +
//           predictions[n].bbox[0] +
//           "px; margin-top: " +
//           (predictions[n].bbox[1] - 10) +
//           "px; width: " +
//           (predictions[n].bbox[2] - 10) +
//           "px; top: 0; left: 0;";

//         const highlighter = document.createElement("div");
//         // if (counter <= 5) {
//         //   highlighter.setAttribute("class", "highlighter");
//         // } else if (counter > 5 && counter <= 10) {
//         //   highlighter.setAttribute("class", "highlighter2");
//         // } else {
//         //   highlighter.setAttribute("class", "highlighter3");
//         // }
//         highlighter.setAttribute("class", "highlighter");

//         highlighter.style =
//           "left: " +
//           predictions[n].bbox[0] +
//           "px; top: " +
//           predictions[n].bbox[1] +
//           "px; width: " +
//           predictions[n].bbox[2] +
//           "px; height: " +
//           predictions[n].bbox[3] +
//           "px;";

//         liveView.appendChild(highlighter);
//         liveView.appendChild(p);
//         children.push(highlighter);
//         children.push(p);
//       } else if (predictions[n].class in objectMap) {
//         objectMap[predictions[n].class][0] = false;
//       }
//     }

//     // Call this function again to keep predicting when the browser is ready.
//     window.requestAnimationFrame(predictWebcam);
//   });
// }

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

let mouseCounter = 0;
let bottleCounter = 0;
let keyboardCounter = 0;

let mouseIncreaseCount = false;
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

      if (predictions[n].score > 0.66) {
        console.log(predictions);
        if (keyboardIncreaseCount != true && predictions[n].class == "chair") {
          keyboardCounter += 1;
          keyboardIncreaseCount = true;
        }
        if (mouseIncreaseCount != true && predictions[n].class == "mouse") {
          mouseCounter += 1;
          mouseIncreaseCount = true;
        }
        if (bottleIncreaseCount != true && predictions[n].class == "bottle") {
          wait(1000);
          bottleCounter += 1;
          bottleIncreaseCount = true;
        }

        if (
          predictions[n].class == "chair" ||
          predictions[n].class == "mouse" ||
          predictions[n].class == "bottle"
        ) {
          const p = document.createElement("p");
          p.innerText =
            predictions[n].class +
            " has been touched " +
            keyboardCounter +
            " times. Confidence: " +
            predictions[n].score;

          console.log("MOUSE", mouseCounter);
          console.log("BOTTLE", bottleCounter);
          console.log("Chair", keyboardCounter);

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
          // if (counter <= 5) {
          //   highlighter.setAttribute("class", "highlighter");
          // } else if (counter > 5 && counter <= 10) {
          //   highlighter.setAttribute("class", "highlighter2");
          // } else {
          //   highlighter.setAttribute("class", "highlighter3");
          // }

          highlighter.setAttribute("class", "highlighter");

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
        if (predictions[n].class == "mouse") {
          mouseIncreaseCount = false;
        } else if (predictions[n].class == "bottle") {
          bottleIncreaseCount = false;
        } else if (predictions[n].class == "chair") {
          keyboardIncreaseCount = false;
        }
      }
    }

    // Call this function again to keep predicting when the browser is ready.
    window.requestAnimationFrame(predictWebcam);
  });
}
