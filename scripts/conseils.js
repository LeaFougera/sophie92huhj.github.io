const conseils = [
  { good: "Bois de l’eau tout au long de la journée", bad: "Bois quand tu as soif, c’est le meilleur indicateur de besoin" },
  { good: "Réduis ta consommation de sel, même sans problème de tension", bad: "Inutile de réduire le sel si ta tension est stable" },
  { good: "Mange équilibré et varié pour couvrir tous tes besoins", bad: "Manger à ta faim suffit à couvrir tes besoins essentiels" },
  { good: "Fais 30 minutes d’exercice par jour", bad: "Fais 30 minutes d’exercice par semaine" },
  { good: "Préfère les cuissons douces comme la vapeur", bad: "Tu peux frire tes aliments si tu égouttes bien l’huile après" }
];

const startZone = document.getElementById("start-zone");
const startBtn = document.getElementById("start-btn");
const countdown = document.getElementById("countdown");
const timer = document.getElementById("timer");
const memorisationZone = document.getElementById("memorisation-zone");
const goodList = document.getElementById("good-list");
const badList = document.getElementById("bad-list");
const sortingZone = document.getElementById("sorting-zone");
const resultEl = document.getElementById("result");

// NOUVEAUX ÉLÉMENTS
let phraseContainer, btnGood, btnBad;

let shuffledItems = [];
let currentIndex = 0;
let score = 0;

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

startBtn.addEventListener("click", () => {
  startZone.classList.add("hidden");
  countdown.classList.remove("hidden");
  memorisationZone.classList.remove("hidden");

  // Afficher les phrases à mémoriser
  goodList.innerHTML = "";
  badList.innerHTML = "";
  conseils.forEach(pair => {
    const goodLi = document.createElement("li");
    goodLi.textContent = pair.good;
    goodList.appendChild(goodLi);

    const badLi = document.createElement("li");
    badLi.textContent = pair.bad;
    badList.appendChild(badLi);
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

  // Création de la structure
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

  phraseContainer = document.getElementById("phrase-zone");
  btnGood = document.getElementById("choose-good");
  btnBad = document.getElementById("choose-bad");

  shuffledItems = shuffle([
    ...conseils.map(c => ({ text: c.good, type: "good" })),
    ...conseils.map(c => ({ text: c.bad, type: "bad" }))
  ]);

  currentIndex = 0;
  score = 0;

  showNextPhrase();

  btnGood.addEventListener("click", () => handleAnswer("good"));
  btnBad.addEventListener("click", () => handleAnswer("bad"));
}

function showNextPhrase() {
  if (currentIndex >= shuffledItems.length) {
    return showScore();
  }

  const phrase = shuffledItems[currentIndex];
  phraseContainer.innerHTML = `<div class="choice">${phrase.text}</div>`;
}

function handleAnswer(userChoice) {
  const item = shuffledItems[currentIndex];
  const correct = item.type === userChoice;

  if (correct) score++;

  const li = document.createElement("li");
  li.textContent = item.text;

  if (userChoice === "good") {
    document.getElementById("col-good").appendChild(li);
  } else {
    document.getElementById("col-bad").appendChild(li);
  }

  currentIndex++;
  showNextPhrase();
}

function showScore() {
  document.getElementById("answer-buttons").classList.add("hidden");
  phraseContainer.classList.add("hidden");

  // On affiche les bonnes et mauvaises couleurs dans les colonnes
  const colGood = document.getElementById("col-good").children;
  const colBad = document.getElementById("col-bad").children;

  for (let li of colGood) {
    const correctItem = shuffledItems.find(item => item.text === li.textContent);
    li.classList.add(correctItem.type === "good" ? "correct" : "incorrect");
  }

  for (let li of colBad) {
    const correctItem = shuffledItems.find(item => item.text === li.textContent);
    li.classList.add(correctItem.type === "bad" ? "correct" : "incorrect");
  }

  resultEl.textContent = `🎯 Score : ${score} / ${shuffledItems.length} bons placements`;
  resultEl.classList.remove("hidden");
}

