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
  
  // === Étape 2 : Quiz (quiz.html) ===
  const bestScoreQuiz = localStorage.getItem("bestScoreQuiz"); // Exemple : 7
  const maxScoreQuiz = localStorage.getItem("maxScoreQuiz");   // Exemple : 10
  const etape2 = document.getElementById("etape2");            // à ajouter dans ton HTML
  const ligne2 = document.querySelector(".line.c2");           // ligne 2 → 3 (ajouter class="line c2" dans le SVG si pas encore fait)
  
  if (bestScoreQuiz && maxScoreQuiz && etape2 && ligne2 && !ligne2.classList.contains("completed")) {
    completer(2, etape2, "#66bb6a"); // Bleu pour quizz
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
  