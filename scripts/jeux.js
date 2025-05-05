function completer(num, el, couleur) {
  const ligne = document.querySelector(`.line.c${num}`);
  if (ligne && !ligne.classList.contains("completed")) {
    // Applique la couleur appropriée en fonction du jeu terminé
    ligne.style.stroke = couleur; // Utilise la couleur en fonction du groupe d'étapes
    ligne.classList.add("completed");
  }
  if (!el.classList.contains("etape-complete")) {
    el.classList.add("etape-complete");
  }
}


// === Info-panel dynamique ===
function afficherInfoJeu(topPx, data) {
  const infoPanel = document.getElementById("info-panel");
  document.getElementById("info-theme").textContent = data.theme;
  document.getElementById("info-niveau").textContent = data.niveau;
  document.getElementById("info-duree").textContent = data.duree;
  document.getElementById("info-type").textContent = data.type;
  document.getElementById("info-score").textContent = data.score;

  infoPanel.style.top = `${topPx}px`;
  infoPanel.style.display = "block";
}

function cacherInfoJeu() {
  document.getElementById("info-panel").style.display = "none";
}

// === Étape 1 : Jeu de Liaison (rein3.html) ===
const bestScoreRein3 = localStorage.getItem("scoreFinal");
const etape1 = document.getElementById("etape1");
const ligne1 = document.querySelector(".line.c1"); // Ligne 1 → 2

if (bestScoreRein3 && etape1 && ligne1 && !ligne1.classList.contains("completed")) {
  completer(1, etape1, "#66bb6a"); // Vert pour niveau débutant
}

etape1.addEventListener("mouseenter", () => {
  afficherInfoJeu(20, {
    theme: "Diagnostic rénal",
    niveau: "Débutant",
    duree: "5 min",
    type: "Jeu de liaison",
    score: bestScoreRein3 ? `${bestScoreRein3} / 10` : "Non joué"
  });
});
etape1.addEventListener("mouseleave", cacherInfoJeu);

// === Étape 4 : Jeu rein1.html ===
const bestScoreRein1 = localStorage.getItem("scoreRein1"); // stocke une clé comme "scoreRein1"
const etape4 = document.getElementById("etape4");
const ligne4 = document.querySelector(".line.c4"); // ligne entre étape 4 → 5

if (bestScoreRein1 && etape4 && ligne4 && !ligne4.classList.contains("completed")) {
  completer(4, etape4, "#ffa726"); // orange pour "intermédiaire"
}

etape4.addEventListener("mouseenter", () => {
  afficherInfoJeu(320, {
    theme: "Fonction des reins",
    niveau: "Intermédiaire",
    duree: "5 min",
    type: "Quiz",
    score: bestScoreRein1 ? `${bestScoreRein1} / 10` : "Non joué"
  });
});

etape4.addEventListener("mouseleave", cacherInfoJeu);


// === Étape 7 : Quiz rein2.html ===
const bestScore = localStorage.getItem("bestScoreQuiz");
const maxScore = localStorage.getItem("maxScoreQuiz");
const etape7 = document.getElementById("etape7");
const ligne7 = document.querySelector(".line.c7"); // Ligne 7 → 8

if (bestScore && maxScore && etape7 && ligne7 && !ligne7.classList.contains("completed")) {
  completer(7, etape7, "#ef5350"); // Rouge pour difficile
}

etape7.addEventListener("mouseenter", () => {
  afficherInfoJeu(620, {
    theme: "Insuffisance rénale",
    niveau: "Difficile",
    duree: "4-5 min",
    type: "Quiz",
    core: bestScore ? `${bestScore}/${maxScore}` : "Non joué"
  });
});
etape7.addEventListener("mouseleave", cacherInfoJeu);