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

const details = {
  "Rein": `
    Les reins sont deux organes en forme de haricot situés dans la partie arrière de l’abdomen.
    Leur rôle principal est de filtrer le sang pour en éliminer les déchets (toxines) et l’excès d’eau,
    formant ainsi l’urine. Ils participent aussi à la régulation de la pression artérielle,
    de l’équilibre acido-basique et de la production de certaines hormones.
    Chaque jour, ils filtrent environ 180 litres de sang pour produire près de 1,5 litre d’urine.`,
  
  "Vessie": `
    La vessie est un organe creux, musculaire et extensible qui sert de réservoir à l’urine.
    Elle reçoit l’urine des uretères et peut contenir en moyenne entre 400 et 600 ml de liquide.
    Lorsqu’elle est pleine, elle envoie un signal au cerveau qui déclenche l’envie d’uriner.
    Elle se contracte ensuite pour expulser l’urine via l’urètre.`,

  "Uretères": `
    Les uretères sont deux conduits longs et étroits (environ 25 à 30 cm) qui relient chaque rein à la vessie.
    Leur paroi musculaire permet des contractions (péristaltisme) qui font progresser l’urine vers la vessie,
    même si la personne est allongée ou en mouvement.
    Ils sont essentiels pour le bon écoulement de l’urine sans reflux vers les reins.`,

  "Urètre": `
    L’urètre est le canal qui permet à l’urine stockée dans la vessie d’être évacuée vers l’extérieur du corps.
    Il est court chez la femme (environ 3 à 4 cm) et plus long chez l’homme (environ 15 à 20 cm), 
    car il traverse le pénis. Chez l’homme, il transporte aussi le sperme lors de l’éjaculation.
    Un sphincter (muscle circulaire) permet de contrôler volontairement la miction (action d’uriner).`
};

function getExplanation(correct, selectedOrgane, correctOrgane) {
  return correct
    ? `✅ Bonne réponse ! <br><strong>Explication :</strong> ${details[selectedOrgane]}`
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