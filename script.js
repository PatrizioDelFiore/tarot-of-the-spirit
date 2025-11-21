// Le immagini sono nella stessa cartella di index.html:
// back.jpg, card_01.jpg, ..., card_34.jpg

const cards = [];

// Crea le 34 carte: card_01.jpg ... card_34.jpg
for (let i = 1; i <= 34; i++) {
  const num = String(i).padStart(2, "0");
  cards.push({
    id: i,
    image: `card_${num}.jpg`,
    title: `Card ${i}`,
    description: `Short description for card ${i}.`
  });
}

const spreadElement = document.getElementById("cards-spread");
const resetButton = document.getElementById("reset-button");
const bigImageElement = document.getElementById("big-card-image");
const bigCardContainer = document.getElementById("big-card-container");
const boardElement = document.querySelector(".board");

// Fisher–Yates shuffle
function shuffle(array) {
  const arr = array.slice();
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function renderBacks() {
  if (!spreadElement) return;

  spreadElement.innerHTML = "";

  if (bigCardContainer) {
    bigCardContainer.style.display = "none";
  }
  if (bigImageElement) {
    bigImageElement.src = "";
    bigImageElement.alt = "";
  }

  const shuffledCards = shuffle(cards);
  const total = shuffledCards.length;

  shuffledCards.forEach((card, index) => {
    const slot = document.createElement("div");
    slot.className = "card-slot";

    const img = document.createElement("img");
    img.src = "back.jpg";
    img.alt = "Tarot card back";

    img.addEventListener("click", () => {
      revealCard(card, slot);
    });

    slot.appendChild(img);
    spreadElement.appendChild(slot);

    const t = total > 1 ? index / (total - 1) : 0.5;
    const left = 10 + t * 80;
    const angle = (t - 0.5) * 26;
    const top = 50 + Math.sin((t - 0.5) * Math.PI) * 12;

    slot.style.left = `${left}%`;
    slot.style.top = `${top}%`;
    slot.style.transform = `translate(-50%, -50%) rotate(${angle}deg)`;
  });
}

function revealCard(card, slotElement) {
  slotElement.innerHTML = "";
  const img = document.createElement("img");
  img.src = card.image;
  img.alt = card.title;
  slotElement.appendChild(img);

  if (bigCardContainer) {
    bigCardContainer.style.display = "flex";
  }
  if (bigImageElement) {
    bigImageElement.src = card.image;
    bigImageElement.alt = card.title;
  }

  if (boardElement && typeof boardElement.scrollIntoView === "function") {
    boardElement.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

if (resetButton) {
  resetButton.addEventListener("click", renderBacks);
}

window.addEventListener("load", renderBacks);
