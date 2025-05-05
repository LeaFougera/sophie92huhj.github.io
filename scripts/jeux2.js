function completer(num, el, couleur) {
    const ligne = document.querySelector(`.line.c${num}`);
    if (ligne && !ligne.classList.contains("completed")) {
      ligne.style.stroke = couleur;
      ligne.classList.add("completed");
    }
    if (!el.classList.contains("etape-complete")) {
      el.classList.add("etape-complete");
    }
  }
  
  // === Info-panel dynamique ===
  function afficherInfoJeu(topPx, leftPx, data) {
    const infoPanel = document.getElementById("info-panel");
    infoPanel.style.top = `${topPx}px`;
    infoPanel.style.left = `${leftPx}px`; // <-- AJOUTÉ
  
    document.getElementById("info-theme").textContent = data.theme;
    document.getElementById("info-duree").textContent = data.duree;
    document.getElementById("info-type").textContent = data.type;
    document.getElementById("info-score").textContent = data.score;
  
    infoPanel.style.display = "block";
  }
  
  
  function cacherInfoJeu() {
    document.getElementById("info-panel").style.display = "none";
  }

  // === Étape 1 : Jeu de Liaison (rein3) ===
  const bestScoreJeu1 = localStorage.getItem("bestScoreJeu1"); // sur 10
  const etape1 = document.querySelector(".image-jeu[href*='rein3.html']");
  const ligne1 = document.querySelector(".line.c1");
  
  if (bestScoreJeu1 && etape1 && ligne1 && !ligne1.classList.contains("completed")) {
    completer(1, etape1, "#66bb6a"); // par exemple vert
  }
  
  etape1.addEventListener("mouseenter", () => {
    afficherInfoJeu(250, 50, {
      theme: "Fonction rénale",
      duree: "5 min",
      type: "Association visuelle",
      score: bestScoreJeu1 ? `${bestScoreJeu1} / 10` : "Non joué"
    });
  });
  
  etape1.addEventListener("mouseleave", cacherInfoJeu);
  

  
  // === Étape 2 : Quiz (quiz.html) ===
  const bestScoreQuiz = localStorage.getItem("bestScoreQuiz"); // Exemple : 7
  const maxScoreQuiz = localStorage.getItem("maxScoreQuiz");   // Exemple : 10
  const etape2 = document.getElementById("etape2");            // à ajouter dans ton HTML
  const ligne2 = document.querySelector(".line.c2");           // ligne 2 → 3 (ajouter class="line c2" dans le SVG si pas encore fait)
  
  if (bestScoreQuiz && maxScoreQuiz && etape2 && ligne2 && !ligne2.classList.contains("completed")) {
    completer(2, etape2, "#66bb6a"); 
  }
  
  etape2.addEventListener("mouseenter", () => {
    afficherInfoJeu(120, 750, {  // top: 120px, left: 750px
      theme: "Causes et Symptômes",
      duree: "5 min",
      type: "Quiz",
      score: bestScoreQuiz ? `${bestScoreQuiz} / ${maxScoreQuiz}` : "Non joué"
    });
  });
  
  
  etape2.addEventListener("mouseleave", cacherInfoJeu);

  // === Étape 3 : Jeu de Conseils (conseils.html) ===
const scoreConseils = localStorage.getItem("scoreConseils"); // sur 20
const etape3 = document.querySelector(".image-jeu[href*='conseils.html']");
const ligne3 = document.querySelector(".line.c3"); // Assure-toi que ta ligne 3 a bien class="line c3"

if (scoreConseils && etape3 && ligne3 && !ligne3.classList.contains("completed")) {
  completer(3, etape3, "#66bb6a"); 
}

etape3.addEventListener("mouseenter", () => {
  afficherInfoJeu(120, 850, {
    theme: "Hygiène de vie",
    duree: "5 min",
    type: "Mémoire & Tri",
    score: scoreConseils ? `${scoreConseils} / 20` : "Non joué"
  });
});

etape3.addEventListener("mouseleave", cacherInfoJeu);

  // === Étape 4 : Jeu de Mémoire (rein1.html) ===
const bestScoreJeu4 = localStorage.getItem("bestScoreJeu4"); // sur 12
const etape4 = document.querySelector(".image-jeu[href*='rein1.html']");
const ligne4 = document.querySelector(".line.c4");

if (bestScoreJeu4 && etape4 && ligne4 && !ligne4.classList.contains("completed")) {
  completer(4, etape4, "#66bb6a");
}

etape4.addEventListener("mouseenter", () => {
  afficherInfoJeu(250, 160, {
    theme: "Système urinaire",
    duree: "5 min",
    type: "Mémoire & Association",
    score: bestScoreJeu4 ? `${bestScoreJeu4} / 12` : "Non joué"
  });
});

etape4.addEventListener("mouseleave", cacherInfoJeu);
