const cards = document.querySelectorAll(".card");
let matched = 0;
let cardOne, cardTwo;
let disableDeck = false;
const wrapper = document.querySelector(".wrapper");
const playGameText = document.querySelector(".modal-box h2");
const discountText = document.querySelector(".modal-box h3");
const winningMessage = document.querySelector(".winning-message");

// JavaScript
document.addEventListener("DOMContentLoaded", () => {
  const section = document.querySelector("section");
  const overlay = document.querySelector(".overlay");
  const closeBtn = document.querySelector(".close-btn");

  // Function to show the popup
  function showPopup() {
    section.classList.add("active");
  }

  // Set a timeout to show the popup after 10 seconds
  setTimeout(showPopup, 5000);

  // Add event listeners to close the popup
  overlay.addEventListener("click", () => section.classList.remove("active"));
  closeBtn.addEventListener("click", () => section.classList.remove("active"));
});

function flipCard({ target: clickedCard }) {
  if (cardOne !== clickedCard && !disableDeck) {
    clickedCard.classList.add("flip");
    if (!cardOne) {
      return (cardOne = clickedCard);
    }
    cardTwo = clickedCard;
    disableDeck = true;
    let cardOneImg = cardOne.querySelector(".back-view img").src,
      cardTwoImg = cardTwo.querySelector(".back-view img").src;
    matchCards(cardOneImg, cardTwoImg);
  }
}

function matchCards(img1, img2) {
  if (img1 === img2) {
    matched++;
    if (matched == 8) {
      setTimeout(() => {
        handleWin();
      }, 1000);
    }
    cardOne.removeEventListener("click", flipCard);
    cardTwo.removeEventListener("click", flipCard);
    cardOne = cardTwo = "";
    return (disableDeck = false);
  }
  setTimeout(() => {
    cardOne.classList.add("shake");
    cardTwo.classList.add("shake");
  }, 400);
  setTimeout(() => {
    cardOne.classList.remove("shake", "flip");
    cardTwo.classList.remove("shake", "flip");
    cardOne = cardTwo = "";
    disableDeck = false;
  }, 1200);
}

function handleWin() {
  wrapper.style.display = "none";
  playGameText.style.display = "none";
  discountText.style.display = "none";
  winningMessage.style.display = "block";
}

function shuffleCard() {
  matched = 0;
  disableDeck = false;
  cardOne = cardTwo = "";
  let arr = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
  arr.sort(() => (Math.random() > 0.5 ? 1 : -1));
  cards.forEach((card, i) => {
    card.classList.remove("flip");
    let imgTag = card.querySelector(".back-view img");
    imgTag.src = `images/img-${arr[i]}.png`;
    card.addEventListener("click", flipCard);
  });
}

shuffleCard();
cards.forEach((card) => {
  card.addEventListener("click", flipCard);
});

//send Data to Database

// Variables
const formContainer = document.getElementById("formContainer");
const submitButton = document.getElementById("submit");
const emailField = document.getElementById("email");
const surnameField = document.getElementById("surname");
const nameField = document.getElementById("name");

// Event Listener for submit button
submitButton.addEventListener("click", async (event) => {
  event.preventDefault();
  const isValid = validateForm();
  if (isValid) {
    showSpinner();
    await onClickSubmit();
  }
});

// Validation Functions
function validateForm() {
  let isValid = true;

  if (!validateEmail(emailField.value)) {
    showErrorMessage("email-error", "Invalid email address.");
    isValid = false;
  } else {
    hideErrorMessage("email-error");
  }

  if (!validateName(surnameField.value)) {
    showErrorMessage(
      "surname-error",
      "Invalid surname. Only letters, hyphens, apostrophes, and spaces are allowed. Minimum 2, maximum 100 characters."
    );
    isValid = false;
  } else {
    hideErrorMessage("surname-error");
  }

  if (!validateName(nameField.value)) {
    showErrorMessage(
      "name-error",
      "Invalid name. Only letters, hyphens, apostrophes, and spaces are allowed. Minimum 2, maximum 100 characters."
    );
    isValid = false;
  } else {
    hideErrorMessage("name-error");
  }

  return isValid;
}

function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validateName(name) {
  const nameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ' -]{2,100}$/;
  return nameRegex.test(name.trim());
}

function showErrorMessage(elementId, message) {
  const errorElement = document.getElementById(elementId);
  errorElement.textContent = message;
  errorElement.style.display = "block";
}

function hideErrorMessage(elementId) {
  const errorElement = document.getElementById(elementId);
  errorElement.style.display = "none";
}

async function onClickSubmit() {
  await databaseClient.insertInto("user", {
    email: emailField.value,
    surname: surnameField.value,
    name: nameField.value,
  });
  hideSpinner();
  showSuccessMessage();
  formContainer.classList.add("hidden");
}

function showSpinner() {
  spinner.style.display = "block";
}

function hideSpinner() {
  spinner.style.display = "none";
}

function showSuccessMessage() {
  successMessage.style.display = "block";
}
