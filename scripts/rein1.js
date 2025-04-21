const organs = [
  { img: "../photos/rein.png", name: "Rein", count: 0 },
  { img: "../photos/vessie.png", name: "Vessie", count: 0 },
  { img: "../photos/uretères.png", name: "Uretères", count: 0 },
  { img: "../photos/uretre.png", name: "Urètre", count: 0 }
];

const phrases = [
  { text: "Un organe qui filtre le sang et élimine les toxines.", organ: "Rein" },
  { text: "Les reins sont responsables de la production de l'urine.", organ: "Rein" },
  { text: "Un organe qui stocke l'urine avant l'élimination.", organ: "Vessie" },
  { text: "La vessie est une poche musculaire qui contient l'urine.", organ: "Vessie" },
  { text: "Les tubes qui transportent l'urine des reins à la vessie.", organ: "Uretères" },
  { text: "Les uretères sont des conduits qui permettent le passage de l'urine.", organ: "Uretères" },
  { text: "Le canal qui permet à l'urine de sortir du corps.", organ: "Urètre" },
  { text: "L'urètre est un tube qui relie la vessie à l'extérieur.", organ: "Urètre" }
];

let selections = [];
let flippedCard = null;

function shuffle(phrases) {
  for (let i = phrases.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [phrases[i], phrases[j]] = [phrases[j], phrases[i]];
  }
  return phrases;
}

function createCards() {
  const cardsContainer = document.getElementById("cards-container");
  shuffle(phrases);

  phrases.forEach((phrase, index) => {
    const cardElement = document.createElement("div");
    cardElement.classList.add("card");
    cardElement.setAttribute("data-organe", phrase.organ);
    cardElement.setAttribute("data-index", index);

    const cardText = document.createElement("div");
    cardText.textContent = phrase.text;
    cardElement.appendChild(cardText);

    cardElement.addEventListener("click", () => flipCard(cardElement));

    cardsContainer.appendChild(cardElement);
  });
}

function createOrgans() {
  const organsContainer = document.getElementById("organs-container");

  organs.forEach((organ) => {
    const organElement = document.createElement("img");
    organElement.src = organ.img;
    organElement.alt = organ.name;
    organElement.setAttribute("data-name", organ.name);

    const countDisplay = document.createElement("span");
    countDisplay.classList.add("count-display");
    countDisplay.textContent = organ.count;

    const organContainer = document.createElement("div");
    organContainer.classList.add("organ-container");
    organContainer.appendChild(organElement);
    organContainer.appendChild(countDisplay);

    organElement.addEventListener("click", () => selectOrgane(organElement, countDisplay));

    organsContainer.appendChild(organContainer);
  });
}

function flipCard(cardElement) {
  if (!flippedCard) {
    flippedCard = cardElement;
    cardElement.style.backgroundColor = "#fff";
  }
}

function selectOrgane(organElement, countDisplay) {
  if (flippedCard) {
    // Empêche plusieurs sélections pour une même carte
    if (selections.find(sel => sel.phraseText === flippedCard.textContent)) {
      flippedCard = null;
      return;
    }

    const selectedOrgane = organElement.getAttribute("data-name");
    const flippedCardOrgane = flippedCard.getAttribute("data-organe");

    const organ = organs.find(o => o.name === selectedOrgane);
    organ.count++;
    countDisplay.textContent = organ.count;

    selections.push({
      phraseText: flippedCard.textContent,
      selectedOrgane: selectedOrgane,
      correctOrgane: flippedCardOrgane,
      correct: selectedOrgane === flippedCardOrgane
    });

    organElement.classList.add("selected");
    flippedCard.style.backgroundColor = "#f4f4f9";
    flippedCard = null;
  }
}

document.getElementById("validate-btn").addEventListener("click", () => {
  localStorage.setItem('selections', JSON.stringify(selections));
  window.location.href = "rein1correction.html";
});

document.getElementById("restart-btn").addEventListener("click", () => {
  resetGame();
  createCards();
  createOrgans();
});

function resetGame() {
  selections = [];
  document.getElementById("message").textContent = "";
  document.getElementById("restart-btn").classList.add("hidden");
  document.getElementById("cards-container").innerHTML = "";
  document.getElementById("organs-container").innerHTML = "";
  document.getElementById("correction-link").classList.add("hidden");
}

createCards();
createOrgans();