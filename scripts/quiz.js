const questions = [
  {
    question: "Quelle est l'une des causes les plus fréquentes de la maladie rénale chronique ?",
    options: ["La grippe", "Le diabète", "L’asthme", "La dépression"],
    answer: "Le diabète",
    explanation: "Le diabète abîme les petits vaisseaux dans les reins, ce qui perturbe leur capacité à filtrer correctement le sang. C’est une des principales causes de la maladie rénale chronique.",
    image: "../photos/quiz/QuizCauseMaladie.png"
  },
  
  {
    question: "L’hypertension artérielle peut-elle causer des problèmes rénaux ?",
    options: ["Non, elle ne touche que le cœur", "Oui, mais uniquement chez les enfants", "Oui, elle peut abîmer les vaisseaux des reins", "Non, ce sont deux maladies totalement différentes"],
    answer: "Oui, elle peut abîmer les vaisseaux des reins",
    explanation: "Une pression artérielle trop élevée endommage les vaisseaux sanguins, y compris ceux des reins, ce qui nuit à leur fonctionnement.",
    image: "../photos/quiz/QuizTensiometre.png"
  },

  {
    question: "Quel facteur augmente le risque de maladie rénale chronique ?",
    options: ["Être très sportif", "Manger beaucoup de fruits", "Être en surpoids", "Avoir une bonne tension"],
    answer: "Être en surpoids",
    explanation: "Le surpoids favorise le diabète et l’hypertension, deux causes majeures de la maladie rénale chronique.",
    image: "../photos/quiz/QuizRisque.png"
  },

  {
    question: "Un antécédent familial de maladie rénale est-il un facteur de risque ?",
    options: ["Non", "Oui", "Seulement chez les enfants", "Juste pour les hommes"],
    answer: "Oui",
    explanation: "Avoir un membre de sa famille atteint d’une maladie rénale chronique augmente les probabilités de développer soi-même une atteinte rénale.",
    image: "../photos/quiz/QuizFamille.png"
  },

  {
    question: "Les infections urinaires à répétition peuvent-elles endommager les reins ?",
    options: ["Non, elles sont toujours bénignes", "Oui, seulement si elles sont mal soignées", "Seulement si elles surviennent chez un homme", "Non, elles ne touchent que la vessie"],
    answer: "Oui, seulement si elles sont mal soignées",
    explanation: "Ces infections peuvent remonter jusqu’aux reins et provoquer des lésions, surtout en cas de récidives ou de traitement inadapté.",
    image: "../photos/quiz/QuizInfectionUrinaire.png"
  },

  {
    question: "Quel symptôme est souvent associé à une maladie rénale chronique avancée ?",
    options: ["Des douleurs au bras", "Une forte fièvre", "Une toux sèche", "Une grande fatigue"],
    answer: "Une grande fatigue",
    explanation: "Cette fatigue est due à l’accumulation de déchets dans l’organisme et à une diminution de la production de globules rouges.",
    image: "../photos/quiz/QuizHorloge.png"
  },

  {
    question: "Une perte d’appétit peut-elle être un symptôme de maladie rénale chronique ?",
    options: ["Oui", "Non, au contraire on mange plus", "Seulement chez les enfants", "Seulement en cas de fièvre"],
    answer: "Oui",
    explanation: "L’accumulation de déchets dans le sang peut altérer l’appétit ou entraîner des nausées.",
    image: "../photos/quiz/QuizAppetit.png"
  },

  {
    question: "Est-ce qu’on peut avoir une maladie rénale chronique sans symptômes ?",
    options: ["Non, les symptômes sont toujours visibles", "Oui", "Rarement", "Seulement chez les personnes âgées"],
    answer: "Oui",
    explanation: "La maladie rénale chronique évolue souvent sans symptômes, surtout aux premiers stades.",
    image: "../photos/quiz/QuizPasSymptomes.png"
  },

  {
    question: "Quel est le meilleur moyen de détecter une maladie rénale chronique à un stade précoce ?",
    options: ["Prendre sa température", "Faire un scanner cérébral", "Un bilan sanguin", "Regarder la couleur de ses yeux"],
    answer: "Un bilan sanguin",
    explanation: "Seul un bilan sanguin permet de mesurer certains indicateurs comme la créatinine, et donc de savoir si les reins fonctionnent correctement.",
    image: "../photos/quiz/QuizConsultation.png"
  },

  {
    question: "Quelle boisson peut fatiguer les reins si elle est consommée en excès ?",
    options: ["L’eau gazeuse riche en sodium", "L’eau plate", "Le thé vert", "Le jus de pomme"],
    answer: "L’eau gazeuse riche en sodium",
    explanation: "Certaines eaux gazeuses contiennent beaucoup de sel (sodium), ce qui peut augmenter la pression artérielle et solliciter excessivement les reins. Il vaut mieux privilégier une eau pauvre en sodium.",
    image: "../photos/quiz/QuizBoisson.png"
  }
];

let currentQuestion = 0;
let score = 0;

const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const scoreEl = document.getElementById("score");

// Fonction pour afficher la question
function showQuestion() {
  const q = questions[currentQuestion];

  // Créer une section pour la question et l'image
  const questionContent = document.createElement("div");
  questionContent.classList.add("question-content");

  // Ajouter l'image pour la question
  const questionImage = document.createElement("img");
  questionImage.src = q.image;  
  questionImage.alt = "Image question";
  questionImage.classList.add("question-image");

  // Créer le texte de la question
  const questionText = document.createElement("div");
  questionText.classList.add("question-text");
  questionText.innerHTML = `<p>${q.question}</p>`;

  // Ajouter l'image et le texte à la question
  questionContent.appendChild(questionImage);
  questionContent.appendChild(questionText);

  // Afficher la question et les réponses
  questionEl.innerHTML = "";
  questionEl.appendChild(questionContent);

  // Ajouter les boutons de réponse
  answersEl.innerHTML = ""; 
  q.options.forEach(option => {
    const btn = document.createElement("button");
    btn.textContent = option;
    btn.onclick = () => checkAnswer(btn, option === q.answer);
    answersEl.appendChild(btn);
  });
}

// Fonction pour vérifier la réponse
function checkAnswer(button, isCorrect) {
  const q = questions[currentQuestion];

  // Affichage de la réponse correcte ou incorrecte
  if (isCorrect) {
    button.classList.add("correct");
    score++;
  } else {
    button.classList.add("wrong");
  }

  // Désactiver tous les boutons après la réponse
  Array.from(answersEl.children).forEach(btn => {
    btn.disabled = true; 
    btn.classList.add("no-hover"); 
    if (btn.textContent === q.answer) {
      btn.classList.add("correct");
    }
  });

  // Afficher l'explication sous la question
  const explanation = document.createElement("p");
  explanation.textContent = q.explanation;
  explanation.style.marginTop = "20px";
  
  explanation.style.backgroundColor = "#f9f9f9"; 
  explanation.style.padding = "20px"; 
  explanation.style.borderRadius = "10px"; 
  explanation.style.boxShadow = "0 6px 15px rgba(0, 0, 0, 0.1)"; 
  explanation.style.color = "#4a536b"; 
  explanation.style.fontSize = "1.1rem"; 
  explanation.style.fontWeight = "bold"; 
  explanation.style.borderLeft = "5px solid #4CAF50"; 
  explanation.style.marginTop = "50px"; 

  // Animation d'apparition
  explanation.style.animation = "fadeIn 0.5s ease";

  // Ajouter l'explication sous les réponses
  answersEl.appendChild(explanation);

  // Animation d'apparition 
  const styleSheet = document.styleSheets[0];
  styleSheet.insertRule(`
    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `, styleSheet.cssRules.length);


  const nextBtn = document.createElement("button");
  nextBtn.textContent = "Voir le score";
  nextBtn.style.marginTop = "50px";
  nextBtn.onclick = () => {
    displayScore(); 
  };

  // Afficher le bouton "Voir le score" seulement après la dernière question
  if (currentQuestion === questions.length - 1) {
    answersEl.appendChild(nextBtn);
  } else {
    // Si ce n'est pas la dernière question, afficher "Passer à la question suivante"
    const nextQuestionBtn = document.createElement("button");
    nextQuestionBtn.textContent = "Passer à la question suivante";
    nextQuestionBtn.style.marginTop = "50px";
    nextQuestionBtn.onclick = () => {
      currentQuestion++;
      showQuestion();
    };
    answersEl.appendChild(nextQuestionBtn);
  }
}

// Fonction pour afficher le score
function displayScore() {

  const ancienBest = parseInt(localStorage.getItem("bestScoreQuiz")) || 0;
  if (score > ancienBest) {
    localStorage.setItem("bestScoreQuiz", score);
  }  

  // Cacher le quiz (question et réponses)
  document.getElementById("quiz-container").classList.add("hidden");

  // S'assurer que l'élément pour le score est visible
  const scoreEl = document.getElementById("score"); 
  scoreEl.classList.remove("hidden"); 

  // Afficher uniquement le score
  scoreEl.textContent = `Votre score : ${score} / ${questions.length}`;

  // Créer le bouton "Revenir au parcours de progression"
  const backToProgressBtn = document.createElement("button");
  backToProgressBtn.textContent = "Voir la fiche réflexe";
  backToProgressBtn.style.marginTop = "20px";

  // Ajouter l'événement de redirection
  backToProgressBtn.onclick = () => {
    window.location.href = "../jeux/quizcorrection.html";
  };

  // Ajouter le bouton au DOM
  scoreEl.appendChild(backToProgressBtn);
}

// Fonction pour vérifier la réponse
function checkAnswer(button, isCorrect) {
  const q = questions[currentQuestion];

  // Affichage de la réponse correcte ou incorrecte
  if (isCorrect) {
    button.classList.add("correct");
    score++;
  } else {
    button.classList.add("wrong");
  }

  // Désactiver tous les boutons après la réponse
  Array.from(answersEl.children).forEach(btn => {
    btn.disabled = true; // Désactive le bouton
    btn.classList.add("no-hover"); 
    if (btn.textContent === q.answer) {
      btn.classList.add("correct");
    }
  });

  // Afficher l'explication sous la question
  const explanation = document.createElement("p");
  explanation.textContent = q.explanation;
  explanation.style.marginTop = "20px";
  
  // Appliquer des styles améliorés à l'explication
  explanation.style.backgroundColor = "#f9f9f9"; 
  explanation.style.padding = "20px"; 
  explanation.style.borderRadius = "10px"; 
  explanation.style.boxShadow = "0 6px 15px rgba(0, 0, 0, 0.1)"; 
  explanation.style.color = "#4a536b"; 
  explanation.style.fontSize = "1.1rem"; 
  explanation.style.fontWeight = "bold"; 
  explanation.style.borderLeft = "5px solid #4CAF50"; 
  explanation.style.marginTop = "50px"; 

  // Animation d'apparition
  explanation.style.animation = "fadeIn 0.5s ease";

  // Ajouter l'explication sous les réponses
  answersEl.appendChild(explanation);

  // Animation d'apparition 
  const styleSheet = document.styleSheets[0];
  styleSheet.insertRule(`
    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `, styleSheet.cssRules.length);

  const nextBtn = document.createElement("button");
  nextBtn.textContent = "Voir le score";
  nextBtn.style.marginTop = "50px";
  nextBtn.onclick = () => {
    displayScore(); 
  };

  if (currentQuestion === questions.length - 1) {
    answersEl.appendChild(nextBtn);
  } else {
    // Si ce n'est pas la dernière question, afficher "Passer à la question suivante"
    const nextQuestionBtn = document.createElement("button");
    nextQuestionBtn.textContent = "Passer à la question suivante";
    nextQuestionBtn.style.marginTop = "50px";
    nextQuestionBtn.onclick = () => {
      currentQuestion++;
      showQuestion();
    };
    answersEl.appendChild(nextQuestionBtn);
  }
}

// Mélange les questions de manière aléatoire
function shuffleQuestions() {
  for (let i = questions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [questions[i], questions[j]] = [questions[j], questions[i]]; 
  }
}

document.getElementById("start-quiz-btn").onclick = () => {
  // Cacher l'introduction
  document.getElementById("game-introduction").classList.add("hidden");
  // Afficher le quiz
  document.getElementById("quiz-container").classList.remove("hidden");
  
  shuffleQuestions();  
  showQuestion(); 
};

