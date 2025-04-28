const conseils = [
  { good: "Bois de l’eau tout au long de la journée", bad: "Bois quand tu as soif, c’est le meilleur indicateur de besoin" },
  { good: "Réduis ta consommation de sel, même sans problème de tension", bad: "Inutile de réduire le sel si ta tension est stable" },
  { good: "Mange équilibré et varié pour couvrir tous tes besoins", bad: "Manger à ta faim suffit à couvrir tes besoins essentiels" },
  { good: "Fais 30 minutes d’exercice par jour", bad: "Fais 30 minutes d’exercice par semaine" },
  { good: "Préfère les cuissons douces comme la vapeur", bad: "Tu peux frire tes aliments est si tu égouttes bien l’huile après" }
];

const explications = {
  "Bois de l’eau tout au long de la journée": "L’eau hydrate les reins et aide à filtrer les déchets. Boire régulièrement permet d'éviter les surcharges et de préserver leur bon fonctionnement.",
  "Bois quand tu as soif, c’est le meilleur indicateur de besoin": "La sensation de soif arrive souvent trop tard. Chez les personnes âgées ou malades, elle peut être altérée. Il vaut mieux boire régulièrement même sans soif.",
  "Réduis ta consommation de sel, même sans problème de tension": "Le sel surcharge les reins, favorise la rétention d’eau et peut nuire même sans hypertension visible. Moins de sel = reins protégés.",
  "Inutile de réduire le sel si ta tension est stable": "Faux. Le sel a d'autres impacts que la tension, notamment sur la fonction rénale et la rétention d'eau.",
  "Mange équilibré et varié pour couvrir tous tes besoins": "Un apport équilibré en vitamines, minéraux et protéines soutient les reins, évite les carences et réduit les déchets à filtrer.",
  "Manger à ta faim suffit à couvrir tes besoins essentiels": "On peut manger à sa faim mais mal. L’équilibre et la variété sont essentiels, surtout en cas de pathologie rénale.",
  "Fais 30 minutes d’exercice par jour": "L’activité physique régulière améliore la circulation, réduit l’hypertension et aide les reins à fonctionner efficacement.",
  "Fais 30 minutes d’exercice par semaine": "Une seule séance par semaine n’est pas suffisante pour bénéficier d’effets protecteurs sur les reins ou la santé en général.",
  "Préfère les cuissons douces comme la vapeur": "La cuisson vapeur conserve les nutriments sans ajouter de graisse ni de sel inutile. Idéal pour une alimentation protectrice des reins.",
  "Tu peux frire tes aliments est si tu égouttes bien l’huile après": "Même bien égouttée, la friture dénature les aliments, ajoute des toxines et surcharge les reins avec des graisses transformées."
};

const startZone = document.getElementById("start-zone");
const countdown = document.getElementById("countdown");
const timer = document.getElementById("timer");
const memorisationZone = document.getElementById("memorisation-zone");
const goodList = document.getElementById("good-list");
const badList = document.getElementById("bad-list");
const sortingZone = document.getElementById("sorting-zone");
const resultEl = document.getElementById("result");
const showErrorsBtn = document.getElementById("show-errors-btn");
const showErrorsContainer = document.getElementById("show-errors-btn-container");
const errorModal = document.getElementById("error-modal");
const errorText = document.getElementById("error-text");
const nextErrorBtn = document.getElementById("next-error-btn");
const endGameBtn = document.getElementById("end-game-btn");

let shuffledItems = [];
let currentIndex = 0;
let score = 0;
let errors = [];
let phraseZone; // déclaration globale

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

document.getElementById("start-btn").addEventListener("click", () => {
  startZone.classList.add("hidden");
  countdown.classList.remove("hidden");
  memorisationZone.classList.remove("hidden");

  goodList.innerHTML = "";
  badList.innerHTML = "";

  conseils.forEach(pair => {
    const liGood = document.createElement("li");
    liGood.textContent = pair.good;
    goodList.appendChild(liGood);

    const liBad = document.createElement("li");
    liBad.textContent = pair.bad;
    badList.appendChild(liBad);
  });

  let timeLeft = 10;
  timer.textContent = timeLeft;
  const interval = setInterval(() => {
    timeLeft--;
    timer.textContent = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(interval);
      startClassificationPhase();
    }
  }, 1000);
});

function startClassificationPhase() {
  countdown.classList.add("hidden");
  memorisationZone.classList.add("hidden");
  sortingZone.classList.remove("hidden");

  sortingZone.innerHTML = `
    <h2>🔍 Dans quelle colonne va ce conseil ?</h2>
    <div class="columns">
      <div class="column" id="good-column">
        <h3>Bon conseil</h3>
        <ul id="col-good"></ul>
      </div>
      <div class="column" id="bad-column">
        <h3>Faux bon conseil</h3>
        <ul id="col-bad"></ul>
      </div>
    </div>
    <div id="phrase-zone" class="choices"></div>
    <div id="answer-buttons">
      <button id="choose-good">✅ Bon conseil</button>
      <button id="choose-bad">❌ Faux bon conseil</button>
    </div>
  `;

  phraseZone = document.getElementById("phrase-zone"); // <== on récupère après injection

  shuffledItems = shuffle([
    ...conseils.map(c => ({ text: c.good, type: "good" })),
    ...conseils.map(c => ({ text: c.bad, type: "bad" }))
  ]);

  currentIndex = 0;
  score = 0;
  errors = [];

  showNextPhrase();

  document.getElementById("choose-good").addEventListener("click", () => handleAnswer("good"));
  document.getElementById("choose-bad").addEventListener("click", () => handleAnswer("bad"));
}

function showNextPhrase() {
  if (!phraseZone) return;
  if (currentIndex >= shuffledItems.length) return showScore();

  phraseZone.innerHTML = `<div class="choice">${shuffledItems[currentIndex].text}</div>`;
}

function handleAnswer(userChoice) {
  const item = shuffledItems[currentIndex];
  const correct = item.type === userChoice;

  const li = document.createElement("li");
  li.textContent = item.text;

  if (correct) {
    score++;
  } else {
    errors.push(item.text);
  }

  const col = userChoice === "good" ? document.getElementById("col-good") : document.getElementById("col-bad");
  col.appendChild(li);

  currentIndex++;
  showNextPhrase();
}

function showScore() {
  document.getElementById("answer-buttons").classList.add("hidden");
  phraseZone.classList.add("hidden");

  resultEl.textContent = `🎯 Score : ${score} / ${shuffledItems.length} bons placements`;
  resultEl.classList.remove("hidden");

  if (errors.length > 0) {
    showErrorsContainer.classList.remove("hidden");
    showErrorsBtn.addEventListener("click", showNextError);
  } else {
    endGameBtn.classList.remove("hidden");
  }
}

// Gestion des erreurs et popups
let currentErrorIndex = 0;

function showNextError() {
  if (currentErrorIndex < errors.length) {
    errorText.textContent = explications[errors[currentErrorIndex]];
    errorModal.classList.remove("hidden");
  }

  currentErrorIndex++;

  if (currentErrorIndex === errors.length) {
    nextErrorBtn.classList.add("hidden");
    endGameBtn.classList.remove("hidden");
  }
}

nextErrorBtn.addEventListener("click", () => {
  errorModal.classList.add("hidden");
  setTimeout(showNextError, 200);
});

endGameBtn.addEventListener("click", () => {
  errorModal.classList.add("hidden");
  showErrorsContainer.classList.add("hidden");
});
