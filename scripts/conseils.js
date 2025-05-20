// Conseils pour la partie 1 et 2
const conseils1 = [
  { good: "Bois de l’eau tout au long de la journée", bad: "Bois quand tu as soif, c’est le meilleur indicateur de besoin" },
  { good: "Réduis ta consommation de sel, même sans problème de tension", bad: "Inutile de réduire le sel si ta tension est stable" },
  { good: "Évite les écrans avant de dormir, lis plutôt un livre", bad: "Regarde les dernières actualités sur ton smartphone pour te détendre avant de dormir" },
  { good: "Fais 30 minutes d’exercice par jour", bad: "Fais 30 minutes d’exercice par semaine" },
  { good: "Préfère les cuissons douces comme la vapeur", bad: "Tu peux frire tes aliments si tu égouttes bien l’huile après" }
];

const conseils2 = [
  { good: "Fais une pause d’écran toutes les heures pour reposer tes yeux", bad: "Fais une pause seulement quand tu ressens une gêne visuelle" },
  { good: "Bois de l’eau en petites quantités réparties dans la journée", bad: "Bois une grande quantité d’un coup pour ne plus y penser" },
  { good: "Intègre des fruits et légumes à chaque repas, sous différentes formes", bad: "Un verre de jus de fruit peut remplacer une portion de fruits" },
  { good: "Consulte ton médecin régulièrement, même en l’absence de symptômes", bad: "Une visite médicale est utile uniquement en cas de douleur ou gêne" },
  { good: "Dors au moins 7 heures par nuit", bad: "Dors au moins 4h par nuit" }
];

// Explications pour les conseils
const explications = {
  "Bois de l’eau tout au long de la journée": {
    texte: "Boire régulièrement, même par petites quantités, permet à ton corps de rester bien hydraté. Cela aide les reins à filtrer les déchets efficacement et prévient les surcharges. C’est une habitude douce mais puissante pour ta santé.",
    image: "../photos/conseil/Eau.png"
  },
  "Bois quand tu as soif, c’est le meilleur indicateur de besoin": {
    texte: "La sensation de soif ne suffit pas toujours, car elle peut arriver tard, voire être absente chez certaines personnes. Boire régulièrement, sans attendre, permet de mieux prendre soin de toi au quotidien.",
    image: "../photos/conseil/Eau.png"
  },
  "Réduis ta consommation de sel, même sans problème de tension": {
    texte: "Réduire le sel est bénéfique pour tout le monde, car il limite la rétention d’eau et allège le travail des reins. C’est un geste simple qui aide à préserver ton équilibre intérieur.",
    image: "../photos/conseil/Sel.png"
  },
  "Inutile de réduire le sel si ta tension est stable": {
    texte: "Même avec une tension normale, un excès de sel n’est pas une bonne habitude à prendre. Adopter une alimentation modérée en sel, c’est prendre soin de soi de manière préventive et douce.",
    image: "../photos/conseil/Sel.png"
  },
  "Évite les écrans avant de dormir, lis plutôt un livre": {
    texte: "Lire un livre le soir favorise le calme intérieur. Cela aide ton cerveau à se détendre naturellement, sans lumière bleue ni agitation. Une belle routine pour bien s’endormir.",
    image: "../photos/conseil/Livre.png"
  },
  "Regarde les dernières actualités sur ton smartphone pour te détendre avant de dormir": {
    texte: "C’est tentant, mais les écrans stimulent l’esprit et retardent souvent l’endormissement. Mieux vaut opter pour une activité apaisante, loin des écrans.",
    image: "../photos/conseil/Livre.png"
  },
  "Fais 30 minutes d’exercice par jour": {
    texte: "Bouger un peu chaque jour soutient la circulation sanguine, diminue la pression artérielle et aide ton corps à mieux fonctionner. C’est une excellente manière de soutenir tes reins et ta vitalité.",
    image: "../photos/conseil/Sport.png"
  },
  "Fais 30 minutes d’exercice par semaine": {
    texte: "Faire du sport, même peu, c’est déjà un pas. Mais pour en tirer tous les bienfaits, l’idéal est d’en faire régulièrement. Ton corps aime la constance, même avec des activités simples.",
    image: "../photos/conseil/Sport.png"
  },
  "Préfère les cuissons douces comme la vapeur": {
    texte: "La cuisson à la vapeur préserve les nutriments des aliments et évite les excès de graisses ou de sel. C’est une méthode saine, douce et savoureuse pour prendre soin de ton alimentation.",
    image: "../photos/conseil/Vapeur.png"
  },
  "Tu peux frire tes aliments si tu égouttes bien l’huile après": {
    texte: "Même en retirant l’huile visible, la friture modifie les aliments et peut les rendre plus lourds pour ton organisme. Il vaut mieux privilégier des cuissons plus simples et naturelles pour alléger le travail des reins.",
    image: "../photos/conseil/Vapeur.png"
  },
  "Fais une pause d’écran toutes les heures pour reposer tes yeux": {
    texte: "Nos yeux ont besoin de repos lorsqu’ils sont sollicités longtemps. Faire une pause chaque heure, même courte, permet de réduire la fatigue visuelle et de préserver ton confort tout au long de la journée.",
    image: "../photos/conseil/Ecran.png"
  },
  "Fais une pause seulement quand tu ressens une gêne visuelle": {
    texte: "Il vaut mieux ne pas attendre de ressentir une gêne pour réagir. En anticipant et en prenant régulièrement de petites pauses, tu prends soin de tes yeux avant que la fatigue ne s’installe.",
    image: "../photos/conseil/Ecran.png"
  },
  "Bois de l’eau en petites quantités réparties dans la journée": {
    texte: "S’hydrater régulièrement, tout au long de la journée, soutient ton corps en douceur. C’est la meilleure manière d’éviter les à-coups pour tes reins.",
    image: "../photos/conseil/Eau.png"
  },
  "Bois une grande quantité d’un coup pour ne plus y penser": {
    texte: "Même si c’est pratique, boire beaucoup d’un coup n’est pas l’idéal. Ton corps préfère un apport d’eau plus progressif, qui respecte mieux son rythme.",
    image: "../photos/conseil/Eau.png"
  },
  "Intègre des fruits et légumes à chaque repas, sous différentes formes": {
    texte: "Ils apportent fibres, vitamines, et antioxydants essentiels. Varier les formes – crus, cuits, en soupe, en salade – permet de ne jamais s’en lasser tout en donnant un vrai coup de pouce à ta santé.",
    image: "../photos/conseil/Fruits.png"
  },
  "Un verre de jus de fruit peut remplacer une portion de fruits": {
    texte: "Le jus de fruit n’a pas les mêmes bienfaits qu’un fruit entier. Il est souvent plus sucré et ne contient pas de fibres. Pour profiter pleinement des bénéfices, mieux vaut croquer dans un fruit !",
    image: "../photos/conseil/Fruits.png"
  },
  "Consulte ton médecin régulièrement, même en l’absence de symptômes": {
    texte: "Prendre soin de ta santé, ce n’est pas seulement réagir quand quelque chose ne va pas. Des visites de contrôle régulières permettent d’attraper certaines choses à temps, même si tu te sens bien.",
    image: "../photos/conseil/Medecin.png"
  },
  "Une visite médicale est utile uniquement en cas de douleur ou gêne": {
    texte: "Il est naturel de consulter en cas de souci, mais la prévention est encore plus puissante. Aller chez le médecin sans symptôme, c’est une façon de rester acteur de ta santé et de prévenir les complications.",
    image: "../photos/conseil/Medecin.png"
  },
  "Dors au moins 7 heures par nuit": {
    texte: "Le sommeil est un vrai pilier de santé. Il aide ton corps à récupérer, ton cerveau à se réguler, et tes reins à mieux fonctionner aussi.",
    image: "../photos/conseil/Dormir.png"
  },
  "Dors au moins 4h par nuit": {
    texte: "On fait parfois avec ce qu’on peut, mais 4h, c’est trop peu. Ton corps a besoin de temps pour bien se reposer et rester en bonne santé, jour après jour.",
    image: "../photos/conseil/Dormir.png"
  }
};



const startZone = document.getElementById("start-zone");
const countdown = document.getElementById("countdown");
const timer = document.getElementById("timer");
const memorisationZone = document.getElementById("memorisation-zone");
const goodList = document.getElementById("good-list");
const badList = document.getElementById("bad-list");
const sortingZone = document.getElementById("sorting-zone");
const resultEl = document.getElementById("result");
const showErrorsBtn = document.getElementById("show-errors-btn");
const showErrorsContainer = document.getElementById("show-errors-btn-container");
const errorModal = document.getElementById("error-modal");
const errorText = document.getElementById("error-text");
const nextErrorBtn = document.getElementById("next-error-btn");

const nextPartBtn = document.getElementById("next-part-btn");
const backHomeBtn = document.getElementById("back-home-btn");

// Variables pour gérer l'état du jeu
let shuffledItems = [];
let currentIndex = 0;
let currentErrorIndex = 0;
let score = 0;
let scorePartie1 = 0;
let scorePartie2 = 0;
let errors = [];
let phraseZone; 
let partie = 1; 

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

// Lancement du jeu
document.getElementById("start-btn").addEventListener("click", () => {
  startZone.classList.add("hidden");
  countdown.classList.remove("hidden");
  memorisationZone.classList.remove("hidden");

    const goodListMemorisation = document.getElementById("good-list");
  const badListMemorisation = document.getElementById("bad-list");

  goodList.innerHTML = "";
  badList.innerHTML = "";

  // Sélection des 5 premiers conseils pour la première partie
  const selectedPairs = conseils1;

  selectedPairs.forEach(pair => {
    const liGood = document.createElement("li");
    liGood.textContent = pair.good;
    goodListMemorisation.appendChild(liGood);

    const liBad = document.createElement("li");
    liBad.textContent = pair.bad;
    badListMemorisation.appendChild(liBad);
  });



  let timeLeft = 10;
  timer.textContent = timeLeft;
  const interval = setInterval(() => {
    timeLeft--;
    timer.textContent = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(interval);
      memorisationZone.classList.remove("memorisation-active"); 
      startClassificationPhase(selectedPairs);
    }
  }, 1000);
});

// Phase de classification
function startClassificationPhase(selectedPairs) {
  countdown.classList.add("hidden");
  memorisationZone.classList.add("hidden");
  sortingZone.classList.remove("hidden");

  sortingZone.innerHTML = `
    <h2 id="classification-title">Dans quelle colonne va ce conseil ?</h2>
    <div id="phrase-zone" class="choices"></div>
    <div id="answer-buttons">
      <button id="choose-good">Bon conseil</button>
      <button id="choose-bad">Faux bon conseil</button>
    </div>
    
  <div class="memorisation-columns">
    <div class="column bon-conseils-container">
      <h3>Bon conseil ✅</h3>
        <ul id="col-good"></ul>
      </div>
    <div class="column faux-bons-conseils-container">
      <h3>Faux bon conseil ❌</h3>
        <ul id="col-bad"></ul>
      </div>
    </div>
  `;

  phraseZone = document.getElementById("phrase-zone");

  shuffledItems = shuffle([
    ...selectedPairs.map(c => ({ text: c.good, type: "good" })),
    ...selectedPairs.map(c => ({ text: c.bad, type: "bad" }))
  ]);

  currentIndex = 0;
  score = 0;
  errors = [];

  showNextPhrase();

  document.getElementById("choose-good").addEventListener("click", () => handleAnswer("good"));
  document.getElementById("choose-bad").addEventListener("click", () => handleAnswer("bad"));
}

function showNextPhrase() {
  if (!phraseZone) return;
  if (currentIndex >= shuffledItems.length) return showScore();

  phraseZone.innerHTML = `<div class="choice">${shuffledItems[currentIndex].text}</div>`;
}


function handleAnswer(userChoice) {
  const item = shuffledItems[currentIndex];
  const correct = item.type === userChoice;

  const li = document.createElement("li");
  li.textContent = item.text;

  if (correct) {
    score++;
  } else {
    errors.push({
      text: item.text,
      correctType: item.type,
      userChoice: userChoice,
      explanation: explications[item.text] || "Explication non disponible"
    });
    console.log("Erreur enregistrée:", {
      text: item.text, 
      explanation: explications[item.text]
    });
  }

  const col = userChoice === "good" ? document.getElementById("col-good") : document.getElementById("col-bad");
  col.appendChild(li);

  currentIndex++; 

  // On vérifie maintenant si on a traité tous les éléments
  if (currentIndex >= shuffledItems.length) {
    applyColors();
    showScore();
    console.log("Toutes les erreurs:", errors);
  } else {
    showNextPhrase();
  }
}



function applyColors() {
  const goodItems = document.querySelectorAll("#col-good li");
  const badItems = document.querySelectorAll("#col-bad li");

  // Créer une map pour vérifier rapidement les bonnes réponses
  const correctMap = new Map();
  shuffledItems.forEach(item => {
    correctMap.set(item.text, item.type);
  });

  // Vérifier les éléments dans la colonne "Bon conseil"
  goodItems.forEach(item => {
    const correctType = correctMap.get(item.textContent);
    if (correctType === 'good') {
      item.classList.add("correct-correction");
    } else {
      item.classList.add("incorrect-correction");
    }
  });

  // Vérifier les éléments dans la colonne "Faux bon conseil"
  badItems.forEach(item => {
    const correctType = correctMap.get(item.textContent);
    if (correctType === 'bad') {
      item.classList.add("correct-correction");
    } else {
      item.classList.add("incorrect-correction");
    }
  });
}

function showScore() {
  document.getElementById("answer-buttons").classList.add("hidden");
  document.getElementById("classification-title").classList.add("hidden");

  phraseZone.classList.add("hidden");

  if (partie === 1) {
    scorePartie1 = score;
    resultEl.innerHTML = `
      🎯 <strong>Score de la 1ère partie :</strong> ${scorePartie1} / ${shuffledItems.length}
    `;
    resultEl.classList.remove("hidden");
  } else {
    scorePartie2 = score;
    const total = scorePartie1 + scorePartie2;
    resultEl.innerHTML = `
      🎯 <strong>Score de la 2ème partie :</strong> ${scorePartie2} / ${shuffledItems.length}<br><br><br>
      🏁 <strong>Score total :</strong> ${total} / 20
    `;
    resultEl.classList.remove("hidden");
    const ancienScore = parseInt(localStorage.getItem("scoreConseils")) || 0;
     if (total > ancienScore) {
       localStorage.setItem("scoreConseils", total);
     }

  }
  
  

  document.getElementById("back-home-btn-container").classList.add("hidden");

  if (errors.length > 0) {
    showErrorsContainer.classList.remove("hidden");
    currentErrorIndex = 0;
    
    showErrorsBtn.onclick = function() {
      handleShowErrors();
      showErrorsContainer.classList.add("hidden");
    };
  } else {
    if (score === shuffledItems.length) {
      document.getElementById("next-part-btn-container").classList.remove("hidden");
    }
  }

  if (errors.length === 0 && partie === 2) {
    document.getElementById("back-home-btn-container").classList.remove("hidden");
    document.getElementById("back-home-btn").onclick = function() {
      window.location.href = "/pages/jeux2.html"; 
    };
  }
}
nextErrorBtn.onclick = () => {
  showNextError();
};



function handleShowErrors() {
  currentErrorIndex = 0;
  
  if (errors.length > 0) {
    const error = errors[currentErrorIndex];
    errorText.innerHTML = `
      <p><strong>Conseil mal placé :</strong> "${error.text}"</p>
      <p><strong>Votre choix :</strong> ${error.userChoice === 'good' ? 'Bon conseil' : 'Faux bon conseil'}</p>
      <p><strong>Réponse correcte :</strong> ${error.correctType === 'good' ? 'Bon conseil' : 'Faux bon conseil'}</p>
      <p><strong>Explication :</strong></p>
      <p>${typeof error.explanation === "string" ? error.explanation : error.explanation.texte}</p>

      ${typeof error.explanation !== "string" && error.explanation.image
        ? `<img src="${error.explanation.image}" alt="Illustration" class="explication-img">`

        : ""}

    `;
    errorModal.classList.remove("hidden");
    currentErrorIndex++;
    
    // Mettre à jour le texte du bouton
    nextErrorBtn.textContent = currentErrorIndex === errors.length ? "Terminer" : "Suivant";
  }
}

function showNextError() {
  if (currentErrorIndex < errors.length) {
    const error = errors[currentErrorIndex];
    errorText.innerHTML = `
      <p><strong>Conseil mal placé :</strong> "${error.text}"</p>
      <p><strong>Votre choix :</strong> ${error.userChoice === 'good' ? 'Bon conseil' : 'Faux bon conseil'}</p>
      <p><strong>Réponse correcte :</strong> ${error.correctType === 'good' ? 'Bon conseil' : 'Faux bon conseil'}</p>
      <p><strong>Explication :</strong></p>
      <p>${typeof error.explanation === "string" ? error.explanation : error.explanation.texte}</p>

      ${typeof error.explanation !== "string" && error.explanation.image
        ? `<img src="${error.explanation.image}" alt="Illustration" class="explication-img">`

        : ""}

    `;
    
    currentErrorIndex++;
    nextErrorBtn.textContent = currentErrorIndex === errors.length ? "Terminer" : "Suivant";
  } else {
    errorModal.classList.add("hidden");
    if (partie === 1) {
      document.getElementById("next-part-btn-container").classList.remove("hidden");
    } else {
      // Afficher le bouton Retour seulement après avoir vu toutes les erreurs
      document.getElementById("back-home-btn-container").classList.remove("hidden");
      document.getElementById("back-home-btn").onclick = function() {
        window.location.href = "../jeux/conseilscorrection.html"; 
      };
    }
  }
}

showErrorsBtn.onclick = () => {
  currentErrorIndex = 0;
  showNextError();
};

// Ajout de l'événement pour passer à la deuxième partie après la première partie
document.getElementById("next-part-btn").addEventListener("click", () => {
  partie = 2;
  // Masquer le bouton et les résultats de la première partie
  document.getElementById("next-part-btn-container").classList.add("hidden");
  resultEl.classList.add("hidden");
  showErrorsContainer.classList.add("hidden");

  // Masquer la phase de classification pendant les 10 secondes de mémorisation
  phraseZone.classList.add("hidden");
  document.getElementById("answer-buttons").classList.add("hidden");

  // Masquer le deuxième tableau de classification
  const sortingZone = document.getElementById("sorting-zone");
  sortingZone.classList.add("hidden");

  // Phase de mémorisation (afficher les conseils pendant 10 secondes)
  const memorisationZone = document.getElementById("memorisation-zone");
  memorisationZone.classList.remove("hidden");

  const goodListMemorisation = document.getElementById("good-list");
  const badListMemorisation = document.getElementById("bad-list");

  goodListMemorisation.innerHTML = "";
  badListMemorisation.innerHTML = "";

  // Sélectionner les conseils de la deuxième partie
  const selectedPairs = conseils2;

  selectedPairs.forEach(pair => {
    const liGood = document.createElement("li");
    liGood.textContent = pair.good;
    goodListMemorisation.appendChild(liGood);

    const liBad = document.createElement("li");
    liBad.textContent = pair.bad;
    badListMemorisation.appendChild(liBad);
  });

  // Initialisation du timer pour 10 secondes
  countdown.classList.remove("hidden"); 
  let timeLeft = 10;  
  const timerEl = document.getElementById("timer");
  timerEl.textContent = timeLeft;

  const interval = setInterval(() => {
    timeLeft--;
    timerEl.textContent = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(interval);
      // Lancer la phase de classification après 10 secondes
      startClassificationPhase(selectedPairs);
      memorisationZone.classList.add("hidden"); // Masquer la zone de mémorisation après 10 secondes
      sortingZone.classList.remove("hidden"); // Afficher le tableau de classification
    }
  }, 1000);
});

