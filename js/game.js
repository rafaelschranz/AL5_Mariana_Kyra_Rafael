const cards = document.querySelectorAll(".card");
let matched = 0;
let cardOne, cardTwo;
let disableDeck = false;
const wrapper = document.querySelector(".wrapper");
const playGameText = document.querySelector(".modal-box h2");
const discountText = document.querySelector(".modal-box h3");
const winningMessage = document.querySelector(".winning-message");

// Function to show the popup
function showPopup() {
  const section = document.querySelector("section");
  section.classList.add("active");
}

// Set a timeout to show the popup after 10 seconds
setTimeout(showPopup, 1000);

// Add event listeners to close the popup
const section = document.querySelector("section");
const overlay = document.querySelector(".overlay");
const closeBtn = document.querySelector(".close-btn");

overlay.addEventListener("click", () => section.classList.remove("active"));
closeBtn.addEventListener("click", () => section.classList.remove("active"));

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

// (1) Variablen initialisieren
const formContainer = document.getElementById("formContainer");
const gameContainer = document.getElementById("game-container");
const submitButton = document.getElementById("submit");
const emailField = document.getElementById("email");

// (2) Interaktionen festlegen

submitButton.addEventListener("click", async (event) => {
  event.preventDefault();
  onClickSubmit();
});

const onClickSubmit = async () => {
  // Speichert die Daten in der Datenbank
  await databaseClient.insertInto("user", {
    email: emailField.value,
  });
};
