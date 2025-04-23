const organs = [
  { img: "../photos/rein1/rein.png", name: "Rein", count: 0 },
  { img: "../photos/rein1/vessie.png", name: "Vessie", count: 0 },
  { img: "../photos/rein1/ureteres.png", name: "Uretères", count: 0 },
  { img: "../photos/rein1/uretre.png", name: "Urètre", count: 0 }
];

const phrases = [
  { text: "Un organe qui filtre le sang et élimine les toxines.", organ: "Rein" },
  { text: "Organe vital en forme de haricot, chargé de filtrer le sang pour éliminer les déchets et l’excès d’eau", organ: "Rein" },
  { text: "Chaque jour, il traite environ 180 litres de sang pour produire 1,5 litre d’urine.", organ: "Rein" },
  { text: "Un organe qui stocke l'urine avant l'élimination.", organ: "Vessie" },
  { text: "Elle peut contenir jusqu’à 500 ml d’urine avant de déclencher l’envie d’uriner.", organ: "Vessie" },
  { text: "Elle se contracte pour permettre l'écavuation de l'urine par l'urètre.", organ: "Vessie" },
  { text: "Les tubes qui transportent l'urine des reins à la vessie.", organ: "Uretères" },
  { text: "Grâce à de petites contractions, ils font descendre l'urine même si l'on est allongé.", organ: "Uretères" },
  { text: "Ils mesurent environ 25cm de long chez l'adulte.", organ: "Uretères" },
  { text: "Le canal qui permet à l'urine de sortir du corps.", organ: "Urètre" },
  { text: "Il est plus court chez la femme et plus long chez l'homme, car il traverse le pénis.", organ: "Urètre" },
  { text: "Il est controlé par un sphincter qui permet de retenir ou de libérer l'urine volontairement.", organ: "Urètre" }
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
    card.classList.add("card", "card-back");
    card.setAttribute("data-organe", phrase.organ);
    card.setAttribute("data-text", phrase.text);
    card.textContent = ""; // caché au départ
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
  const phraseText = card.getAttribute("data-text");

  // Si déjà associée, on ne peut plus la re-cacher ni re-retourner
  const alreadySelected = selections.find(sel => sel.phraseText === phraseText);
  if (alreadySelected) return;

  // Si la carte est déjà retournée et sélectionnée => on la re-cache
  if (!card.classList.contains("card-back") && flippedCard === card) {
    card.classList.add("card-back");
    card.textContent = "";
    flippedCard = null;
  }
  // Si la carte est encore face cachée => on la retourne
  else if (card.classList.contains("card-back") && !flippedCard) {
    card.classList.remove("card-back");
    card.textContent = phraseText;
    flippedCard = card;
  }
}

function selectOrgane(organElement, countDisplay) {
  if (flippedCard) {
    const selectedOrgane = organElement.getAttribute("data-name");
    const correctOrgane = flippedCard.getAttribute("data-organe");

    if (selections.find(sel => sel.phraseText === flippedCard.getAttribute("data-text"))) {
      flippedCard = null;
      return;
    }

    const organ = organs.find(o => o.name === selectedOrgane);
    organ.count++;
    countDisplay.textContent = organ.count;

    selections.push({
      phraseText: flippedCard.getAttribute("data-text"),
      selectedOrgane: selectedOrgane,
      correctOrgane: correctOrgane,
      correct: selectedOrgane === correctOrgane
    });

    flippedCard.style.backgroundColor = "#f4f4f9";
    flippedCard.classList.remove("card-back");
    flippedCard = null;

    organElement.classList.add("selected");
  }
}

const details = {
  "Rein": "Les reins sont deux organes en forme de haricot situés dans la partie arrière de l’abdomen...",
  "Vessie": "La vessie est un organe creux, musculaire et extensible qui sert de réservoir à l’urine...",
  "Uretères": "Les uretères sont deux conduits longs et étroits qui relient chaque rein à la vessie...",
  "Urètre": "L’urètre est le canal qui permet à l’urine d’être évacuée vers l’extérieur du corps..."
};

function getExplanation(correct, selectedOrgane, correctOrgane) {
  return correct
    ? `✅ Bonne réponse ! <br><strong>Explication :</strong> ${details[selectedOrgane]}`
    : `❌ Tu as choisi <strong>${selectedOrgane}</strong> mais la bonne réponse était <strong>${correctOrgane}</strong>.<br><strong>Explication :</strong> ${details[correctOrgane]}`;
}

function showNextCorrection() {
  const messageDiv = document.getElementById("message");
  const nextButton = document.getElementById("next-correction");

  messageDiv.innerHTML = "";

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

    const previousBest = localStorage.getItem("scoreRein1");
    if (!previousBest || correctCount > parseInt(previousBest)) {
      localStorage.setItem("scoreRein1", correctCount);
    }

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

  // Colorer les cartes : vert ou rouge
  selections.forEach(sel => {
    const allCards = document.querySelectorAll(".card");
    allCards.forEach(card => {
      if (card.getAttribute("data-text") === sel.phraseText) {
        card.classList.add(sel.correct ? "correct" : "incorrect");
      }
    });
  });

  currentCorrectionIndex = 0;
  showNextCorrection();

  // Afficher bouton suivant
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