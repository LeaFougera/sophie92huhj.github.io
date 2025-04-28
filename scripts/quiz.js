const questions = [
  {
    question: "Quelle est l'une des causes les plus fréquentes de la maladie rénale chronique ?",
    options: ["La grippe", "Le diabète", "L’asthme", "La dépression"],
    answer: "Le diabète",
    explanation: "Le diabète abîme les petits vaisseaux dans les reins, ce qui perturbe leur capacité à filtrer correctement le sang. C’est une des principales causes de la maladie rénale chronique."
  },
  {
    question: "L’hypertension artérielle peut-elle causer des problèmes rénaux ?",
    options: ["Non, elle ne touche que le cœur", "Oui, mais uniquement chez les enfants", "Oui, elle peut abîmer les vaisseaux des reins", "Non, ce sont deux maladies totalement différentes"],
    answer: "Oui, elle peut abîmer les vaisseaux des reins",
    explanation: "Une pression artérielle trop élevée endommage les vaisseaux sanguins, y compris ceux des reins, ce qui nuit à leur fonctionnement."
  },
  {
    question: "Quel facteur augmente le risque de maladie rénale chronique ?",
    options: ["Être très sportif", "Manger beaucoup de fruits", "Être en surpoids", "Avoir une bonne tension"],
    answer: "Être en surpoids",
    explanation: "Le surpoids favorise le diabète et l’hypertension, deux causes majeures de la maladie rénale chronique."
  },
  {
    question: "Un antécédent familial de maladie rénale est-il un facteur de risque ?",
    options: ["Non", "Oui", "Seulement chez les enfants", "Juste pour les hommes"],
    answer: "Oui",
    explanation: "Avoir un membre de sa famille atteint d’une maladie rénale chronique augmente les probabilités de développer soi-même une atteinte rénale."
  },
  {
    question: "Les infections urinaires à répétition peuvent-elles endommager les reins ?",
    options: ["Non, elles sont toujours bénignes", "Oui, seulement si elles sont mal soignées", "Seulement si elles surviennent chez un homme", "Non, elles ne touchent que la vessie"],
    answer: "Oui, seulement si elles sont mal soignées",
    explanation: "Ces infections peuvent remonter jusqu’aux reins et provoquer des lésions, surtout en cas de récidives ou de traitement inadapté."
  },
  {
    question: "Quel symptôme est souvent associé à une maladie rénale chronique avancée ?",
    options: ["Des douleurs au bras", "Une forte fièvre", "Une toux sèche", "Une grande fatigue"],
    answer: "Une grande fatigue",
    explanation: "Cette fatigue est due à l’accumulation de déchets dans l’organisme et à une diminution de la production de globules rouges."
  },
  {
    question: "Une perte d’appétit peut-elle être un symptôme de maladie rénale chronique ?",
    options: ["Oui", "Non, au contraire on mange plus", "Seulement chez les enfants", "Seulement en cas de fièvre"],
    answer: "Oui",
    explanation: "L’accumulation de déchets dans le sang peut altérer l’appétit ou entraîner des nausées."
  },
  {
    question: "Est-ce qu’on peut avoir une maladie rénale chronique sans symptômes ?",
    options: ["Non, les symptômes sont toujours visibles", "Oui", "Rarement", "Seulement chez les personnes âgées"],
    answer: "Oui",
    explanation: "La maladie rénale chronique évolue souvent sans symptômes, surtout aux premiers stades."
  },
  {
    question: "Quel est le meilleur moyen de détecter une maladie rénale chronique à un stade précoce ?",
    options: ["Prendre sa température", "Faire un scanner cérébral", "Un bilan sanguin", "Regarder la couleur de ses yeux"],
    answer: "Un bilan sanguin",
    explanation: "Seul un bilan sanguin permet de mesurer certains indicateurs comme la créatinine, et donc de savoir si les reins fonctionnent correctement."
  },
  {
    question: "Quelle boisson peut fatiguer les reins si elle est consommée en excès ?",
    options: ["L’eau gazeuse riche en sodium", "L’eau plate", "Le thé vert", "Le jus de pomme"],
    answer: "L’eau gazeuse riche en sodium",
    explanation: "Certaines eaux gazeuses contiennent beaucoup de sel (sodium), ce qui peut augmenter la pression artérielle et solliciter excessivement les reins. Il vaut mieux privilégier une eau pauvre en sodium."
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
  
// Fonction pour mélanger les questions de manière aléatoire
function shuffleQuestions() {
  for (let i = questions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [questions[i], questions[j]] = [questions[j], questions[i]]; // échange les questions
  }
}

// Lancement
shuffleQuestions();  // Mélange les questions avant de commencer
showQuestion();

  