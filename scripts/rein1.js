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
let currentCorrectionIndex = 0;

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function createCards() {
  const container = document.getElementById("cards-container");
  shuffle(phrases).forEach(phrase => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.setAttribute("data-organe", phrase.organ);
    card.textContent = phrase.text;
    card.addEventListener("click", () => flipCard(card));
    container.appendChild(card);
  });
}

function createOrgans() {
  const container = document.getElementById("organs-container");
  organs.forEach(organ => {
    const img = document.createElement("img");
    img.src = organ.img;
    img.alt = organ.name;
    img.setAttribute("data-name", organ.name);

    const counter = document.createElement("span");
    counter.classList.add("count-display");
    counter.textContent = organ.count;

    const box = document.createElement("div");
    box.classList.add("organ-container");
    box.appendChild(img);
    box.appendChild(counter);

    img.addEventListener("click", () => selectOrgane(img, counter));
    container.appendChild(box);
  });
}

function flipCard(card) {
  if (!flippedCard) {
    flippedCard = card;
    card.style.backgroundColor = "#fff";
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
    ? `✅ La phrase correspond bien à <strong>${selectedOrgane}</strong>.`
    : `❌ Tu as choisi <strong>${selectedOrgane}</strong> mais la bonne réponse était <strong>${correctOrgane}</strong>.<br><strong>Explication :</strong> ${details[correctOrgane]}`;
}

function showNextCorrection() {
  const messageDiv = document.getElementById("message");
  const nextButton = document.getElementById("next-correction");

  messageDiv.innerHTML = ""; // Reset affichage

  if (currentCorrectionIndex < selections.length) {
    const sel = selections[currentCorrectionIndex];
    const result = document.createElement("p");
    result.innerHTML = `<strong>Phrase :</strong> "${sel.phraseText}"<br>${getExplanation(sel.correct, sel.selectedOrgane, sel.correctOrgane)}<br>`;
    messageDiv.appendChild(result);
    currentCorrectionIndex++;

    if (currentCorrectionIndex === selections.length) {
      nextButton.textContent = "Voir le récapitulatif";
    }
  } else {
    const correctCount = selections.filter(s => s.correct).length;
    const final = document.createElement("p");
    final.innerHTML = `<strong>Score final :</strong> ${correctCount} sur ${selections.length}`;
    final.style.fontSize = "20px";
    messageDiv.appendChild(final);

    const link = document.createElement("a");
    link.href = "rein1correction.html";
    link.innerHTML = `<button>Voir le récapitulatif final</button>`;
    messageDiv.appendChild(link);

    nextButton.classList.add("hidden");
  }
}

document.getElementById("validate-btn").addEventListener("click", () => {
  if (selections.length < phrases.length) {
    alert("Veuillez associer toutes les phrases aux organes avant de valider.");
    return;
  }

  // Sauvegarde des données
  localStorage.setItem("selections", JSON.stringify(selections));

  currentCorrectionIndex = 0;
  showNextCorrection();

  // Afficher le bouton suivant
  let nextBtn = document.getElementById("next-correction");
  if (!nextBtn) {
    nextBtn = document.createElement("button");
    nextBtn.id = "next-correction";
    nextBtn.textContent = "Suivant";
    nextBtn.style.marginTop = "20px";
    nextBtn.addEventListener("click", showNextCorrection);
    document.querySelector(".container").appendChild(nextBtn);
  } else {
    nextBtn.classList.remove("hidden");
    nextBtn.textContent = "Suivant";
  }
});

document.getElementById("restart-btn").addEventListener("click", () => {
  resetGame();
  createCards();
  createOrgans();
});

function resetGame() {
  selections = [];
  flippedCard = null;
  currentCorrectionIndex = 0;
  document.getElementById("cards-container").innerHTML = "";
  document.getElementById("organs-container").innerHTML = "";
  document.getElementById("message").textContent = "";

  const nextBtn = document.getElementById("next-correction");
  if (nextBtn) nextBtn.classList.add("hidden");
}

createCards();
createOrgans();