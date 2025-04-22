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

// === Étape 1 : Quiz (VIDE) ===
// (Aucun changement ici, le jeu 1 ne fait rien)

// === Étape 2 : Mémoire (VIDE) ===
// (Aucun changement ici, le jeu 2 ne fait rien)

// === Étape 3 : Conseils (VIDE) ===
// (Aucun changement ici, le jeu 3 ne fait rien)

// === Étape 4 : Quiz sur les reins ===
const bestScore = localStorage.getItem("bestScoreQuiz");
const maxScore = localStorage.getItem("maxScoreQuiz");

if (bestScore && maxScore) {
  const etape4 = document.getElementById("etape4");
  const ligne4 = document.querySelector(".line.c4"); // Ligne qui relie le jeu 4 au jeu 5
  
  // Compléter la ligne du jeu 4 -> jeu 5 avec la couleur après avoir terminé le jeu 4
  if (etape4 && ligne4 && !ligne4.classList.contains("completed")) {
    completer(4, etape4, "#ffa726"); // Utilise la couleur orange pour le lien entre 4 et 5
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

// === Étape 4 : Quiz sur les reins (seule étape active) ===
const etapeQuiz = document.getElementById("etape4");
etapeQuiz.addEventListener("mouseenter", () => {
  afficherInfoJeu(320, { // Carte descriptive pour le jeu 4
    theme: "Insuffisance rénale",
    niveau: "Intermédiaire",
    duree: "4-5 min",
    type: "Quiz",
    score: bestScore && maxScore ? `${bestScore}/${maxScore}` : "Non joué"
  });
});
etapeQuiz.addEventListener("mouseleave", cacherInfoJeu);


// === Étape 7 : Jeu de Liaison (rein3.html) ===
const bestScoreRein3 = localStorage.getItem("scoreFinal");
const etape7 = document.getElementById("etape7");
const ligne7 = document.querySelector(".line.c7"); // Ligne qui relie le jeu 7 au jeu 8

if (bestScoreRein3 && etape7 && ligne7 && !ligne7.classList.contains("completed")) {
  completer(7, etape7, "#ef5350"); // Couleur rouge pour la difficulté "difficile"
}

etape7.addEventListener("mouseenter", () => {
  afficherInfoJeu(620, {
    theme: "Diagnostic rénal",
    niveau: "Difficile",
    duree: "6-8 min",
    type: "Jeu de liaison",
    score: bestScoreRein3 ? `${bestScoreRein3} / 10` : "Non joué"
  });
});

etape7.addEventListener("mouseleave", cacherInfoJeu);
