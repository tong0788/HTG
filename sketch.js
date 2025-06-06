let video;
let handPose;
let hands = [];
let circleX = 320;
let circleY = 240;
let startTime;

function preload() {
  // Initialize HandPose model
  handPose = ml5.handPose({ flipped: true });
}

function setup() {
  createCanvas(windowWidth, windowHeight); // Fullscreen canvas
  video = createCapture(VIDEO);
  video.size(windowWidth, windowHeight);
  video.hide();

  // Start detecting hands
  handPose.on("predict", gotHands);
  handPose.start(video);

  startTime = millis(); // Record the start time
}

function gotHands(results) {
  hands = results;
}

function draw() {
  image(video, 0, 0, windowWidth, windowHeight); // Adjust video to fullscreen

  // Draw a circle controlled by the hand position
  fill(255, 0, 0);
  noStroke();

  if (hands.length > 0) {
    let hand = hands[0]; // Use the first detected hand
    let indexFinger = hand.annotations.indexFinger; // Get index finger keypoints

    if (indexFinger && indexFinger.length > 0) {
      let tip = indexFinger[3]; // Tip of the index finger
      circleX = lerp(circleX, tip[0], 0.2); // Smooth movement
      circleY = lerp(circleY, tip[1], 0.2);
    }
  }

  ellipse(circleX, circleY, 30, 30);

  // Display text in the center-top
  fill(255);
  textSize(20);
  textAlign(CENTER, TOP);
  text("TKUET413730861魏彤紜", width / 2, 10);

  // Display elapsed time in the top-right corner
  let elapsedTime = floor((millis() - startTime) / 1000); // Convert to seconds
  textAlign(RIGHT, TOP);
  text(elapsedTime + " 秒", width - 10, 10);
}

function mousePressed() {
  console.log(hands); // Log hand data for debugging
}
