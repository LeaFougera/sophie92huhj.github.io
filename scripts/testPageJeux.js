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
  
  // === Étape 1 : Quiz ===
  const bestScore = localStorage.getItem("bestScoreQuiz");
  const maxScore = localStorage.getItem("maxScoreQuiz");
  
  if (bestScore && maxScore) {
    const etape1 = document.getElementById("etape1");
    const ligne1 = document.querySelector(".line.c1");
    if (etape1 && ligne1 && !ligne1.classList.contains("completed")) {
      completer(1, etape1, "#66bb6a");
    }
  }
  
  // === Étape 2 : Mémoire ===
  const bestMemo = localStorage.getItem("bestScoreMemoire");
  
  if (bestMemo) {
    const etape2 = document.getElementById("etape2");
    const ligne2 = document.querySelector(".line.c2");
    if (etape2 && ligne2 && !ligne2.classList.contains("completed")) {
      completer(2, etape2, "#66bb6a");
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
  
  // === Quiz
  const etapeQuiz = document.getElementById("etape1");
  etapeQuiz.addEventListener("mouseenter", () => {
    afficherInfoJeu(20, {
      theme: "Capitales",
      niveau: "Débutant",
      duree: "5 min",
      type: "Quizz",
      score: bestScore && maxScore ? `${bestScore}/${maxScore}` : "Non joué"
    });
  });
  etapeQuiz.addEventListener("mouseleave", cacherInfoJeu);
  
  // === Mémoire
  const etapeMemoire = document.getElementById("etape2");
  etapeMemoire.addEventListener("mouseenter", () => {
    afficherInfoJeu(120, {
      theme: "Mémoire visuelle",
      niveau: "Débutant",
      duree: "8 min",
      type: "Jeu de mémoire",
      score: bestMemo ? `${bestMemo} essais` : "Non joué"
    });
  });
  etapeMemoire.addEventListener("mouseleave", cacherInfoJeu);
  