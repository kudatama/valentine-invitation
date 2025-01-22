"use strict";

// DOM Elements
const titleElement = document.querySelector(".title");
const buttonsContainer = document.querySelector(".buttons");
const yesButton = document.querySelector(".btn--yes");
const noButton = document.querySelector(".btn--no");
const catImg = document.querySelector(".cat-img");

// Audio Elements
const boomAudio = new Audio('boom.mp3'); // Sound when "No" is clicked
const valentineAudio = document.getElementById("valentine-music"); // Background music

const MAX_NO_CLICKS = 5; // Maximum "No" clicks before stopping interaction
let noClickCount = 0; // Tracks how many times "No" was clicked
let interactionsEnabled = true; // Controls whether further interactions are allowed

// Text and messages
const yesButtonTexts = ["Yes", "No", "Just kidding", "Okay", "Fine", "Alright fine."];
const noButtonMessages = [
  "No",
  "Are you sure?",
  "Why not?",
  "Don't do this to me >:(",
  "Please...",
  "I'll just cry in the corner."
];

// Functions
function updateYesButtonText() {
  yesButton.textContent = yesButtonTexts[Math.min(noClickCount, yesButtonTexts.length - 1)];
}

function updateNoButtonText() {
  noButton.textContent = noClickCount === 1 ? "Yes" : "No";
}

function updateTitleMessage() {
  titleElement.textContent = noButtonMessages[Math.min(noClickCount, noButtonMessages.length - 1)];
}

function changeCatImage() {
  const imageIndex = noClickCount <= MAX_NO_CLICKS ? noClickCount : MAX_NO_CLICKS;
  catImg.src = `img/cat-${imageIndex}.jpg`;
}

function playBoomSound() {
  boomAudio.currentTime = 0.2;
  boomAudio.play(); // Play the boom sound when "No" is clicked
}

function resizeYesButton() {
  // Only resize the "Yes" button if we haven't reached the max "No" clicks
  if (noClickCount < MAX_NO_CLICKS) {
    const currentFontSize = parseFloat(window.getComputedStyle(yesButton).getPropertyValue("font-size"));
    let newFontSize = currentFontSize * 1.5;

    // Special case for the last "No" click
    if (noClickCount === MAX_NO_CLICKS) {
      newFontSize = currentFontSize * 1.1; // Reduce size for the final text
    }

    yesButton.style.fontSize = `${newFontSize}px`;
  }
}

function playMusic(startTime, duration = null) {
  if (valentineAudio) {
    valentineAudio.currentTime = startTime;
    valentineAudio.play().catch(err => console.error("Error playing music:", err));

    // Optional duration to stop music only during specific actions
    if (duration) {
      setTimeout(() => valentineAudio.pause(), duration);
    }
  }
}

function randomizeNoButtonPosition() {
  const randomX = Math.floor(Math.random() * (window.innerWidth - noButton.offsetWidth));
  const randomY = Math.floor(Math.random() * (window.innerHeight - noButton.offsetHeight));
  
  // Use transform to position the No button randomly
  noButton.style.position = "absolute"; // Ensure the button is positioned absolutely
  noButton.style.left = `${randomX}px`;
  noButton.style.top = `${randomY}px`;
}

// Event Listeners
noButton.addEventListener("click", () => {
  noClickCount++;
  updateYesButtonText();
  updateNoButtonText();
  updateTitleMessage();
  changeCatImage();
  resizeYesButton();
  
  playBoomSound(); // Always play the boom sound on every "No" click
  
  // Play music for the first "No" click
  if (noClickCount === 1) {
    playMusic(0, 19500); // Play from 0 to 19.5 seconds
  }

  // After max "No" clicks, randomize "No" button position for subsequent clicks
  if (noClickCount === MAX_NO_CLICKS) {
    interactionsEnabled = false;
    // No button doesn't randomize yet after the max "No"
  }

  // For subsequent clicks after max "No", randomize button position
  if (noClickCount > MAX_NO_CLICKS) {
    randomizeNoButtonPosition(); // Randomize position of the "No" button after the max "No"
  }
});

yesButton.addEventListener("click", () => {
  // Handles the "Yes" button click
  titleElement.textContent = "Yayyy!! :3";
  buttonsContainer.classList.add("hidden");
  catImg.src = `img/cat-yes.jpg`; // Display the final "Yes" image

  // Resume music from 19.75 seconds until the end
  playMusic(19.75);
});
