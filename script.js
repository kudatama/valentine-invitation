"use strict";

const titleElement = document.querySelector(".title");
const buttonsContainer = document.querySelector(".buttons");
const yesButton = document.querySelector(".btn--yes");
const noButton = document.querySelector(".btn--no");
const catImg = document.querySelector(".cat-img");

// Select the audio elements
const boomAudio = new Audio('boom.mp3'); // Use boom sound

const MAX_IMAGES = 5;

let play = true;
let noCount = 0;

// Array of "Yes" button texts corresponding to "No" click counts
const yesTexts = [
  "Yes",          // Initial text
  "Yeah",         // After 1st "No"
  "Just kidding", // After 2nd "No"
  "Okay",         // After 3rd "No"
  "Fine",         // After 4th "No"
  "Alright fine." // After 5th "No"
];

noButton.addEventListener("click", function () {
  if (play) {
    noCount++;

    // Update the "Yes" button text based on the noCount
    if (noCount < yesTexts.length) {
      yesButton.textContent = yesTexts[noCount];
    }

    const imageIndex = Math.min(noCount, MAX_IMAGES);
    changeImage(imageIndex);
    resizeYesButton();
    updateNoButtonText();

    // Play the "boom" sound starting at 0.25 seconds into the sound
    playBoomSound();

    // Stop further interactions after reaching MAX_IMAGES
    if (noCount === MAX_IMAGES) {
      play = false;
    }
  }
});

yesButton.addEventListener("click", handleYesClick);

function handleYesClick() {
  titleElement.innerHTML = "Yayyy!! :3";
  buttonsContainer.classList.add("hidden");
  changeImage("yes");

  // Set the audio to start at 20 seconds
  const audio = document.getElementById("valentine-music");
  if (audio) {
    audio.currentTime = 19.75; // Start the audio at 20 seconds
    audio.play().catch((error) => {
      console.error("Error playing audio:", error);
    });
  }
}

function playBoomSound() {
  boomAudio.currentTime = 0.2; // Start the boom sound at 0.25 seconds
  boomAudio.play(); // Play the sound from the 0.25 second mark
}

function resizeYesButton() {
  const computedStyle = window.getComputedStyle(yesButton);
  const fontSize = parseFloat(computedStyle.getPropertyValue("font-size"));
  let newFontSize = fontSize * 1.5;

  // Adjust the font size for "Alright fine." so it isn't too big
  if (noCount === MAX_IMAGES) {
    newFontSize = fontSize * 1.1; // Reduce the size when "Alright fine." appears
  }

  yesButton.style.fontSize = `${newFontSize}px`;
}

function generateMessage(noCount) {
  const messages = [
    "No",
    "Are you sure?",
    "Why not?",
    "Don't do this to me >:(",
    "Please... ",
    "I'll just cry in the corner.",
  ];

  const messageIndex = Math.min(noCount, messages.length - 1);
  return messages[messageIndex];
}

function changeImage(image) {
  catImg.src = `img/cat-${image}.jpg`;
}

function updateNoButtonText() {
  // No button text stays as "No"
  titleElement.innerHTML = generateMessage(noCount); // Update main message
}
