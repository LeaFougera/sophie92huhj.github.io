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

// Fonction pour afficher la question
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
    btn.classList.add("no-hover"); // Applique la classe no-hover pour désactiver l'effet de survol
    if (btn.textContent === q.answer) {
      btn.classList.add("correct");
    }
  });

  // Afficher l'explication sous la question
  const explanation = document.createElement("p");
  explanation.textContent = q.explanation;
  explanation.style.marginTop = "20px";
  
  // Appliquer des styles améliorés à l'explication
  explanation.style.backgroundColor = "#f9f9f9"; // Fond clair pour contraster
  explanation.style.padding = "20px"; // Espacement pour un meilleur confort de lecture
  explanation.style.borderRadius = "10px"; // Coins arrondis
  explanation.style.boxShadow = "0 6px 15px rgba(0, 0, 0, 0.1)"; // Ombre douce pour la profondeur
  explanation.style.color = "#4a536b"; // Couleur du texte
  explanation.style.fontSize = "1.1rem"; // Augmenter la taille du texte
  explanation.style.fontWeight = "bold"; // Gras pour mieux capturer l'attention
  explanation.style.borderLeft = "5px solid #4CAF50"; // Bordure verte à gauche pour mettre en valeur
  explanation.style.marginTop = "50px"; // Espacement avant l'explication

  // Animation d'apparition
  explanation.style.animation = "fadeIn 0.5s ease";

  // Ajouter l'explication sous les réponses
  answersEl.appendChild(explanation);

  // Animation d'apparition (cléframes)
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

  // Ajouter le bouton "Suivant"
  const nextBtn = document.createElement("button");
  nextBtn.textContent = "Passer à la question suivante ";
  nextBtn.style.marginTop = "50px";
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

  // Créer le bouton "Revenir au parcours de progression"
  const backToProgressBtn = document.createElement("button");
  backToProgressBtn.textContent = "Revenir au parcours de progression";
  backToProgressBtn.style.marginTop = "20px";

  // Ajouter l'événement de redirection
  backToProgressBtn.onclick = () => {
    window.location.href = "../pages/jeux.html"; // Modifie ce lien selon ton projet
  };

  // Ajouter le bouton au DOM
  scoreEl.appendChild(backToProgressBtn);
}


// Mélange les questions de manière aléatoire
function shuffleQuestions() {
  for (let i = questions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [questions[i], questions[j]] = [questions[j], questions[i]]; // échange les questions
  }
}

// Affichage du quiz après avoir cliqué sur "Commencer le quiz"
document.getElementById("start-quiz-btn").onclick = () => {
  // Cacher l'introduction
  document.getElementById("game-introduction").classList.add("hidden");
  // Afficher le quiz
  document.getElementById("quiz-container").classList.remove("hidden");
  
  shuffleQuestions();  // Mélange les questions avant de commencer
  showQuestion(); // Afficher la première question
};