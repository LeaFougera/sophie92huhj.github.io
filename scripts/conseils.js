// Constantes de conseils pour la partie 1 et 2
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
  "Bois de l’eau tout au long de la journée": "Boire régulièrement, même par petites quantités, permet à ton corps de rester bien hydraté. Cela aide les reins à filtrer les déchets efficacement et prévient les surcharges. C’est une habitude douce mais puissante pour ta santé.",
  "Bois quand tu as soif, c’est le meilleur indicateur de besoin": "La sensation de soif ne suffit pas toujours, car elle peut arriver tard, voire être absente chez certaines personnes. Boire régulièrement, sans attendre, permet de mieux prendre soin de toi au quotidien.",
  "Réduis ta consommation de sel, même sans problème de tension": "Réduire le sel est bénéfique pour tout le monde, car il limite la rétention d’eau et allège le travail des reins. C’est un geste simple qui aide à préserver ton équilibre intérieur.",
  "Inutile de réduire le sel si ta tension est stable": "Même avec une tension normale, un excès de sel n’est pas une bonne habitude à prendre. Adopter une alimentation modérée en sel, c’est prendre soin de soi de manière préventive et douce.",
  "Évite les écrans avant de dormir, lis plutôt un livre": "Lire un livre le soir favorise le calme intérieur. Cela aide ton cerveau à se détendre naturellement, sans lumière bleue ni agitation. Une belle routine pour bien s’endormir.",
  "Regarde les dernières actualités sur ton smartphone pour te détendre avant de dormir": "C’est tentant, mais les écrans stimulent l’esprit et retardent souvent l’endormissement. Mieux vaut opter pour une activité apaisante, loin des écrans.",
  "Fais 30 minutes d’exercice par jour": "Bouger un peu chaque jour soutient la circulation sanguine, diminue la pression artérielle et aide ton corps à mieux fonctionner. C’est une excellente manière de soutenir tes reins et ta vitalité.",
  "Fais 30 minutes d’exercice par semaine": "Faire du sport, même peu, c’est déjà un pas. Mais pour en tirer tous les bienfaits, l’idéal est d’en faire régulièrement. Ton corps aime la constance, même avec des activités simples.",
  "Préfère les cuissons douces comme la vapeur": "La cuisson à la vapeur préserve les nutriments des aliments et évite les excès de graisses ou de sel. C’est une méthode saine, douce et savoureuse pour prendre soin de ton alimentation.",
  "Tu peux frire tes aliments si tu égouttes bien l’huile après": "Même en retirant l’huile visible, la friture modifie les aliments et peut les rendre plus lourds pour ton organisme. Il vaut mieux privilégier des cuissons plus simples et naturelles pour alléger le travail des reins.",
  "Fais une pause d’écran toutes les heures pour reposer tes yeux": "Nos yeux ont besoin de repos lorsqu’ils sont sollicités longtemps. Faire une pause chaque heure, même courte, permet de réduire la fatigue visuelle et de préserver ton confort tout au long de la journée.",
  "Fais une pause seulement quand tu ressens une gêne visuelle": "Il vaut mieux ne pas attendre de ressentir une gêne pour réagir. En anticipant et en prenant régulièrement de petites pauses, tu prends soin de tes yeux avant que la fatigue ne s’installe.",
  "Bois de l’eau en petites quantités réparties dans la journée": "S’hydrater régulièrement, tout au long de la journée, soutient ton corps en douceur. C’est la meilleure manière d’éviter les à-coups pour tes reins.",
  "Bois une grande quantité d’un coup pour ne plus y penser": "Même si c’est pratique, boire beaucoup d’un coup n’est pas l’idéal. Ton corps préfère un apport d’eau plus progressif, qui respecte mieux son rythme.",
  "Intègre des fruits et légumes à chaque repas, sous différentes formes": "Ils apportent fibres, vitamines, et antioxydants essentiels. Varier les formes – crus, cuits, en soupe, en salade – permet de ne jamais s’en lasser tout en donnant un vrai coup de pouce à ta santé.",
  "Un verre de jus de fruit peut remplacer une portion de fruits": "Le jus de fruit n’a pas les mêmes bienfaits qu’un fruit entier. Il est souvent plus sucré et ne contient pas de fibres. Pour profiter pleinement des bénéfices, mieux vaut croquer dans un fruit !",
  "Consulte ton médecin régulièrement, même en l’absence de symptômes": "Prendre soin de ta santé, ce n’est pas seulement réagir quand quelque chose ne va pas. Des visites de contrôle régulières permettent d’attraper certaines choses à temps, même si tu te sens bien.",
  "Une visite médicale est utile uniquement en cas de douleur ou gêne": "Il est naturel de consulter en cas de souci, mais la prévention est encore plus puissante. Aller chez le médecin sans symptôme, c’est une façon de rester acteur de ta santé et de prévenir les complications.",
  "Dors au moins 7 heures par nuit": "Le sommeil est un vrai pilier de santé. Il aide ton corps à récupérer, ton cerveau à se réguler, et tes reins à mieux fonctionner aussi.",
  "Dors au moins 4h par nuit": "On fait parfois avec ce qu’on peut, mais 4h, c’est trop peu. Ton corps a besoin de temps pour bien se reposer et rester en bonne santé, jour après jour."
};

// DOM
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
let score = 0;
let errors = [];
let phraseZone; // déclaration globale
let partie = 1; // Partie actuelle

// Utilitaires
function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

// Lancement du jeu
document.getElementById("start-btn").addEventListener("click", () => {
  startZone.classList.add("hidden");
  countdown.classList.remove("hidden");
  memorisationZone.classList.remove("hidden");

  goodList.innerHTML = "";
  badList.innerHTML = "";

  // Sélection des 5 premiers conseils pour la première partie
  const selectedPairs = conseils1;

  selectedPairs.forEach(pair => {
    const liGood = document.createElement("li");
    liGood.textContent = pair.good;
    goodList.appendChild(liGood);

    const liBad = document.createElement("li");
    liBad.textContent = pair.bad;
    badList.appendChild(liBad);
  });

  let timeLeft = 1;
  timer.textContent = timeLeft;
  const interval = setInterval(() => {
    timeLeft--;
    timer.textContent = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(interval);
      startClassificationPhase(selectedPairs);
    }
  }, 1000);
});

// Phase de classification
// Phase de classification
function startClassificationPhase(selectedPairs) {
  countdown.classList.add("hidden");
  memorisationZone.classList.add("hidden");
  sortingZone.classList.remove("hidden");

  sortingZone.innerHTML = `
    <h2>🔍 Dans quelle colonne va ce conseil ?</h2>
    <!-- Affichage du conseil à placer en dessous de la question -->
    <div id="phrase-zone" class="choices"></div>
    <div id="answer-buttons">
      <button id="choose-good">✅ Bon conseil</button>
      <button id="choose-bad">❌ Faux bon conseil</button>
    </div>
    
    <!-- Colonnes de classement -->
    <div class="columns">
      <div class="column" id="good-column">
        <h3>Bon conseil</h3>
        <ul id="col-good"></ul>
      </div>
      <div class="column" id="bad-column">
        <h3>Faux bon conseil</h3>
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
    errors.push(item.text);
  }

  const col = userChoice === "good" ? document.getElementById("col-good") : document.getElementById("col-bad");
  col.appendChild(li);

  currentIndex++;
  showNextPhrase();
}

function showScore() {
  document.getElementById("answer-buttons").classList.add("hidden");
  phraseZone.classList.add("hidden");

  resultEl.textContent = `🎯 Score : ${score} / ${shuffledItems.length} bons placements`;
  resultEl.classList.remove("hidden");

  // Masquer le bouton "Retour au parcours de progression" après la première partie
  document.getElementById("back-home-btn-container").classList.add("hidden");

  // Si des erreurs existent, on affiche le bouton pour voir les erreurs
  if (errors.length > 0) {
    showErrorsContainer.classList.remove("hidden");
    currentErrorIndex = 0;
    showErrorsBtn.addEventListener("click", showNextError);
  } else {
    // Si pas d'erreurs, on affiche le bouton "C’est parti pour la 2ᵉ partie !" directement (si score parfait)
    if (score === shuffledItems.length) {
      document.getElementById("next-part-btn-container").classList.remove("hidden");
    }
  }

  // Affichage du bouton "Retour au parcours" après avoir vu toutes les erreurs ou si score est parfait
  nextErrorBtn.addEventListener("click", () => {
    if (currentErrorIndex >= errors.length) {
      // Masquer les erreurs et afficher le bouton "Retour au parcours"
      showErrorsContainer.classList.add("hidden");
      // Le bouton "C’est parti pour la 2ᵉ partie !" s'affiche après avoir vu toutes les erreurs ou si score est parfait
      if (partie === 1) {
        document.getElementById("next-part-btn-container").classList.remove("hidden");
      }
      // Ajouter l'événement pour rediriger vers la page de retour si nécessaire
      if (partie === 2 || score === shuffledItems.length) {
        document.getElementById("back-home-btn-container").classList.remove("hidden");
        document.getElementById("back-home-btn").addEventListener("click", () => {
          window.location.href = "../pages/jeux.html"; // Rediriger vers la page de jeux
        });
      }
    } else {
      setTimeout(showNextError, 200); // Continue d'afficher les erreurs
    }
  });

  // Affichage automatique du bouton "Retour au parcours" pour la partie 2 (si pas d'erreurs)
  if (errors.length === 0 && partie === 2) {
    document.getElementById("back-home-btn-container").classList.remove("hidden");
    document.getElementById("back-home-btn").addEventListener("click", () => {
      window.location.href = "../pages/jeux.html"; // Rediriger vers la page de jeux
    });
  }
}


// Affichage du bouton "Retour au parcours" après avoir vu toutes les erreurs ou s'il n'y a pas d'erreurs
nextErrorBtn.addEventListener("click", () => {
  if (currentErrorIndex >= errors.length) {
    // Masquer les erreurs et afficher le bouton "Retour au parcours"
    showErrorsContainer.classList.add("hidden");
    if (partie === 2 || score === shuffledItems.length) {
      document.getElementById("back-home-btn-container").classList.remove("hidden");
    }
  } else {
    setTimeout(showNextError, 200);
  }
});

// Fonction pour afficher les erreurs
function showNextError() {
  if (currentErrorIndex < errors.length) {
    errorText.textContent = explications[errors[currentErrorIndex]];
    errorModal.classList.remove("hidden");
    currentErrorIndex++;

    if (currentErrorIndex === errors.length) {
      nextErrorBtn.textContent = "Fermer";
    }
  }
}

// Ajouter un événement pour fermer le pop-up d'erreur
nextErrorBtn.addEventListener("click", () => {
  if (currentErrorIndex >= errors.length) {
    // Masquer le pop-up d'erreur
    errorModal.classList.add("hidden");

    // Afficher le bouton "Retour au parcours de progression" à la fin de la partie 2
    if (partie === 2) {
      document.getElementById("back-home-btn-container").classList.remove("hidden");
    }
  } else {
    setTimeout(showNextError, 200);
  }
});


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
  let timeLeft = 1;  // La durée des 10 secondes
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

