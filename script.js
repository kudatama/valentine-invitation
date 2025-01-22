"use strict";

const titleElement = document.querySelector(".title");
const buttonsContainer = document.querySelector(".buttons");
const yesButton = document.querySelector(".btn--yes");
const noButton = document.querySelector(".btn--no");
const catImg = document.querySelector(".cat-img");

// Select the main music element
const audio = document.getElementById("valentine-music");

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

// Handle "No" button click
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

    // Play the boom sound effect on every click, without delay
    const boomAudio = new Audio('boom.mp3');  // Create a new Audio object each time
    boomAudio.play().catch((error) => {
      console.error("Error playing boom sound:", error);
    });

    // Stop further interactions after reaching MAX_IMAGES
    if (noCount === MAX_IMAGES) {
      play = false;
    }
  }
});

// Handle "Yes" button click
yesButton.addEventListener("click", handleYesClick);

function handleYesClick() {
  titleElement.innerHTML = "Yayyy!! :3";
  buttonsContainer.classList.add("hidden");
  changeImage("yes");

  // Set the audio to start at 20 seconds
  if (audio) {
    audio.currentTime = 19.75; // Start the audio at 20 seconds
    audio.play().catch((error) => {
      console.error("Error playing audio:", error);
    });
  }
}

function resizeYesButton() {
  const computedStyle = window.getComputedStyle(yesButton);
  const fontSize = parseFloat(computedStyle.getPropertyValue("font-size"));
  const newFontSize = fontSize * 1.5;

  yesButton.style.fontSize = `${newFontSize}px`;
}

function generateMessage(noCount) {
  const messages = [
    "No",
    "Are you sure?",
    "Why not?",
    "Don't do this to me >:(",
    "Please... ",
    "): Okay.. I'll just cry in the corner.",
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
