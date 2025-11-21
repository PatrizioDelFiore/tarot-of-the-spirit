const galleryCards = [];

for (let i = 1; i <= 34; i++) {
  const num = String(i).padStart(2, "0");
  galleryCards.push({
    id: i,
    image: `card_${num}.jpg`,
    title: `Card ${i}`
  });
}

const galleryGrid = document.getElementById("gallery-grid");
const galleryBigImage = document.getElementById("gallery-big-card-image");

function renderGallery() {
  if (!galleryGrid) return;

  galleryGrid.innerHTML = "";

  galleryCards.forEach((card) => {
    const cell = document.createElement("div");
    cell.className = "gallery-card";

    const img = document.createElement("img");
    img.src = card.image;
    img.alt = card.title;

    cell.addEventListener("click", () => {
      showBigCard(card);
    });

    cell.appendChild(img);
    galleryGrid.appendChild(cell);
  });
}

function showBigCard(card) {
  if (!galleryBigImage) return;

  galleryBigImage.src = card.image;
  galleryBigImage.alt = card.title;
  galleryBigImage.style.display = "block";
  galleryBigImage.scrollIntoView({ behavior: "smooth", block: "center" });
}

window.addEventListener("load", renderGallery);

