const questions = [
    {
      question: "Quelle est la capitale de la France ?",
      options: ["Paris", "Lyon", "Marseille"],
      answer: "Paris",
      explanation: "Paris est la capitale de la France depuis plus de 1 000 ans."
    },
    {
      question: "Quelle est la capitale de l'Italie ?",
      options: ["Rome", "Milan", "Naples"],
      answer: "Rome",
      explanation: "Rome est la capitale de l'Italie, connue comme la 'Ville éternelle'."
    },
    {
      question: "Quelle est la capitale du Japon ?",
      options: ["Kyoto", "Tokyo", "Osaka"],
      answer: "Tokyo",
      explanation: "Tokyo est la capitale moderne du Japon depuis 1868, après Kyoto."
    }
  ];
  
  let currentQuestion = 0;
  let score = 0;
  
  const questionEl = document.getElementById("question");
  const answersEl = document.getElementById("answers");
  const scoreEl = document.getElementById("score");
  
  function showQuestion() {
    const q = questions[currentQuestion];
    questionEl.textContent = q.question;
    answersEl.innerHTML = "";
  
    q.options.forEach(option => {
      const btn = document.createElement("button");
      btn.textContent = option;
      btn.onclick = () => checkAnswer(btn, option === q.answer);
      answersEl.appendChild(btn);
    });
  }
  
  function checkAnswer(button, isCorrect) {
    const q = questions[currentQuestion];
  
    if (isCorrect) {
      button.classList.add("correct");
      score++;
    } else {
      button.classList.add("wrong");
    }
  
    // Désactiver tous les boutons
    Array.from(answersEl.children).forEach(btn => {
      btn.disabled = true;
      if (btn.textContent === q.answer) {
        btn.classList.add("correct");
      }
    });
  
    // Afficher l'explication
    const explanation = document.createElement("p");
    explanation.textContent = q.explanation;
    explanation.style.marginTop = "20px";
    answersEl.appendChild(explanation);
  
    // Ajouter le bouton "Suivant"
    const nextBtn = document.createElement("button");
    nextBtn.textContent = "Passer à la question suivante";
    nextBtn.style.marginTop = "10px";
    nextBtn.onclick = () => {
      currentQuestion++;
      if (currentQuestion < questions.length) {
        showQuestion();
      } else {
        displayScore();
      }
    };
    answersEl.appendChild(nextBtn);
  }
  
  function displayScore() {
    questionEl.classList.add("hidden");
    answersEl.classList.add("hidden");
    scoreEl.textContent = `Votre score : ${score} / ${questions.length}`;
    scoreEl.classList.remove("hidden");
  
    // Stocker le meilleur score dans le localStorage
    const previousBest = localStorage.getItem("bestScoreQuiz");
    if (!previousBest || score > parseInt(previousBest)) {
      localStorage.setItem("bestScoreQuiz", score);
    }
    localStorage.setItem("maxScoreQuiz", questions.length); // utile pour l'affichage
  }
  
  
  // Lancement
  showQuestion();
  