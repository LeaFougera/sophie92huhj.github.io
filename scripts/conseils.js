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
const choices = document.getElementById("choices");
const validateBtn = document.getElementById("validate-btn");
const resultEl = document.getElementById("result");

let draggedElement = null;

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

// ▶️ Lancement du jeu
startBtn.addEventListener("click", () => {
  startZone.classList.add("hidden");
  countdown.classList.remove("hidden");
  memorisationZone.classList.remove("hidden");

  // Affiche les bons et mauvais conseils
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

  // Timer
  let timeLeft = 10;
  timer.textContent = timeLeft;
  const interval = setInterval(() => {
    timeLeft--;
    timer.textContent = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(interval);
      showDragDropPhase();
    }
  }, 1000);
});

// 🧩 Phase drag & drop
function showDragDropPhase() {
  countdown.classList.add("hidden");
  memorisationZone.classList.add("hidden");
  sortingZone.classList.remove("hidden");

  const allItems = shuffle([
    ...conseils.map(c => ({ text: c.good, type: "good" })),
    ...conseils.map(c => ({ text: c.bad, type: "bad" }))
  ]);

  choices.innerHTML = "";
  allItems.forEach(item => {
    const div = document.createElement("div");
    div.className = "choice";
    div.textContent = item.text;
    div.setAttribute("data-type", item.type);
    div.setAttribute("draggable", true);

    // Utiliser l'élément réel pour drag
    div.addEventListener("dragstart", (e) => {
      draggedElement = div;
      div.classList.add("dragging");

      // Utiliser le vrai bloc comme image de drag
      e.dataTransfer.setDragImage(div, 10, 10);
    });

    div.addEventListener("dragend", () => {
      draggedElement = null;
      div.classList.remove("dragging");
    });

    choices.appendChild(div);
  });
}

// 📥 Gestion du drop
document.querySelectorAll(".drop-zone").forEach(zone => {
  zone.addEventListener("dragover", e => e.preventDefault());

  zone.addEventListener("drop", e => {
    e.preventDefault();
    if (draggedElement) {
      zone.appendChild(draggedElement);
      draggedElement = null;
    }
  });
});

// ✅ Vérification
validateBtn.addEventListener("click", () => {
  let score = 0;

  document.querySelectorAll(".drop-zone").forEach(zone => {
    const expected = zone.getAttribute("data-type");

    [...zone.children].forEach(child => {
      const actual = child.getAttribute("data-type");
      if (actual === expected) score++;
    });
  });

  resultEl.textContent = `🎯 Score : ${score} / 10 bons placements`;
  resultEl.classList.remove("hidden");
});
