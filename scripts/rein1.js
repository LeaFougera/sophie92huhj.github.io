const organs = [
  { img: "../photos/rein1/rein.png", name: "Rein", count: 0, color: "#4b0082" },      
  { img: "../photos/rein1/vessie.png", name: "Vessie", count: 0, color: "#ffd200" },   
  { img: "../photos/rein1/ureteres.png", name: "Uretères", count: 0, color: "#81d4fa" }, 
  { img: "../photos/rein1/uretre.png", name: "Urètre", count: 0, color: "#ffa500" }     
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
    card.textContent = "";
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
    counter.style.backgroundColor = organ.color;

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
  const alreadySelected = selections.find(sel => sel.phraseText === phraseText);
  if (alreadySelected) return;

  if (!card.classList.contains("card-back") && flippedCard === card) {
    card.classList.add("card-back");
    card.textContent = "";
    flippedCard = null;
  } else if (card.classList.contains("card-back") && !flippedCard) {
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
    flippedCard.style.border = `3px solid ${organ.color}`;
    flippedCard.style.boxShadow = `0 0 10px ${organ.color}`;
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

function showModal() {
  document.getElementById("customModal").classList.remove("hidden");
}

function hideModal() {
  document.getElementById("customModal").classList.add("hidden");
}

document.querySelector(".close-button").addEventListener("click", hideModal);

function showModalExplanation(index) {
  const modalText = document.getElementById("modalText");
  const nextBtn = document.getElementById("next-explanation-btn");
  const finishBtn = document.getElementById("finish-correction-btn");

  const wrongSelections = selections.filter(sel => !sel.correct);

  if (index < wrongSelections.length) {
    const sel = wrongSelections[index];
    modalText.innerHTML = `
      <strong>Phrase :</strong> "${sel.phraseText}"<br>
      ${getExplanation(sel.correct, sel.selectedOrgane, sel.correctOrgane)}
    `;
    nextBtn.classList.remove("hidden");
    finishBtn.classList.add("hidden");
  } else {
    const correctCount = selections.filter(s => s.correct).length;
  
    const ancienBest = parseInt(localStorage.getItem("bestScoreJeu5")) || 0;
    if (correctCount > ancienBest) {
      localStorage.setItem("bestScoreJeu5", correctCount);
    }
  
    modalText.innerHTML = `
      <strong>Score final :</strong> ${correctCount} sur ${selections.length}<br><br>
      <a href="rein1correction.html"><button>Voir le récapitulatif final</button></a>
    `;
    nextBtn.classList.add("hidden");
    finishBtn.classList.remove("hidden");
  }
  

  showModal();
}

document.getElementById("next-explanation-btn").addEventListener("click", () => {
  currentCorrectionIndex++;
  showModalExplanation(currentCorrectionIndex);
});

document.getElementById("finish-correction-btn").addEventListener("click", () => {
  hideModal();
  resetGame();
  createCards();
  createOrgans();
});



document.getElementById("validate-btn").addEventListener("click", () => {
  if (selections.length < phrases.length) {
    alert("Veuillez associer toutes les phrases aux organes avant de valider.");
    return;
  }

  // Sauvegarde
  localStorage.setItem("selections", JSON.stringify(selections));

  // Colorer les cartes
  selections.forEach(sel => {
    const allCards = document.querySelectorAll(".card");
    allCards.forEach(card => {
      if (card.getAttribute("data-text") === sel.phraseText) {
        card.classList.add(sel.correct ? "correct" : "incorrect");
      }
    });
  });

  document.getElementById("see-results-btn").classList.remove("hidden");
  document.getElementById("validate-btn").classList.add("hidden");
});



function resetGame() {
  selections = [];
  flippedCard = null;
  currentCorrectionIndex = 0;
  document.getElementById("cards-container").innerHTML = "";
  document.getElementById("organs-container").innerHTML = "";
  organs.forEach(organ => {
    organ.count = 0;
  });
// Cache le bouton "Voir les résultats"
document.getElementById("see-results-btn").classList.add("hidden");

// Réaffiche le bouton "Valider"
document.getElementById("validate-btn").classList.remove("hidden");
}


createCards();
createOrgans();

document.getElementById("see-results-btn").addEventListener("click", () => {
  currentCorrectionIndex = 0;
  showModalExplanation(currentCorrectionIndex);
});