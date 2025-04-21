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

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function createCards() {
  const cardsContainer = document.getElementById("cards-container");
  shuffle(phrases);
  phrases.forEach((phrase) => {
    const cardElement = document.createElement("div");
    cardElement.classList.add("card");
    cardElement.setAttribute("data-organe", phrase.organ);

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
    if (selections.find(sel => sel.phraseText === flippedCard.textContent)) {
      flippedCard = null;
      return;
    }

    const selectedOrgane = organElement.getAttribute("data-name");
    const correctOrgane = flippedCard.getAttribute("data-organe");

    const organ = organs.find(o => o.name === selectedOrgane);
    organ.count++;
    countDisplay.textContent = organ.count;

    selections.push({
      phraseText: flippedCard.textContent,
      selectedOrgane: selectedOrgane,
      correctOrgane: correctOrgane,
      correct: selectedOrgane === correctOrgane
    });

    flippedCard.style.backgroundColor = "#f4f4f9";
    organElement.classList.add("selected");
    flippedCard = null;
  }
}

function getExplanation(correct, selectedOrgane, correctOrgane) {
  const details = {
    "Rein": "Les reins filtrent le sang et éliminent les toxines.",
    "Vessie": "La vessie stocke l'urine avant son élimination.",
    "Uretères": "Les uretères transportent l'urine des reins à la vessie.",
    "Urètre": "L'urètre est le canal qui permet à l'urine de sortir du corps."
  };

  return correct
    ? `✅ Correct ! ${details[selectedOrgane]}`
    : `❌ Incorrect. Tu as choisi "${selectedOrgane}". La bonne réponse est "${correctOrgane}" : ${details[correctOrgane]}`;
}

let explanationIndex = 0;

document.getElementById("validate-btn").addEventListener("click", () => {
  if (selections.length < phrases.length) {
    alert("Veuillez associer toutes les phrases aux organes avant de valider.");
    return;
  }

  localStorage.setItem('selections', JSON.stringify(selections));

  const correctCount = selections.filter(s => s.correct).length;
  showPopup(`Score : ${correctCount} / ${selections.length}<br><br><button id="start-explanations">Voir la correction</button>`);
});

function showPopup(content) {
  const popup = document.getElementById("popup-modal");
  const popupText = document.getElementById("popup-text");

  popupText.innerHTML = content;
  popup.classList.remove("hidden");

  document.getElementById("next-explanation-btn").classList.add("hidden");
  document.getElementById("final-recap-btn").classList.add("hidden");

  const startBtn = document.getElementById("start-explanations");
  if (startBtn) {
    startBtn.addEventListener("click", () => {
      explanationIndex = 0;
      showNextExplanation();
    });
  }
}

function showNextExplanation() {
  const popup = document.getElementById("popup-modal");
  const popupText = document.getElementById("popup-text");
  const nextBtn = document.getElementById("next-explanation-btn");
  const finalBtn = document.getElementById("final-recap-btn");

  const selection = selections[explanationIndex];
  const text = `<strong>Phrase :</strong> "${selection.phraseText}"<br><br>${getExplanation(selection.correct, selection.selectedOrgane, selection.correctOrgane)}`;

  popupText.innerHTML = text;
  nextBtn.classList.remove("hidden");
  finalBtn.classList.add("hidden");

  nextBtn.onclick = () => {
    explanationIndex++;
    if (explanationIndex < selections.length) {
      showNextExplanation();
    } else {
      nextBtn.classList.add("hidden");
      popupText.innerHTML = "Fin des corrections ! Tu peux consulter le récapitulatif final.";
      finalBtn.classList.remove("hidden");
    }
  };

  finalBtn.onclick = () => {
    popup.classList.add("hidden");
    window.location.href = "rein1correction.html";
  };
}

document.getElementById("restart-btn").addEventListener("click", () => {
  resetGame();
  createCards();
  createOrgans();
});

function resetGame() {
  selections = [];
  flippedCard = null;
  document.getElementById("cards-container").innerHTML = "";
  document.getElementById("organs-container").innerHTML = "";
  document.getElementById("message").textContent = "";
}

createCards();
createOrgans();