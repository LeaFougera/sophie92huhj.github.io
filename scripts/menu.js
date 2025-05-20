const restaurants = [
  {
    type: "Italien",
    menu: {
      entree: [
        { text: "Bruschetta tomate-basilic", correct: true, explanation: "Adapté." },
        { text: "Charcuterie italienne", correct: false, explanation: "Riche en sel et protéines, max 150g de charcuterie / semaine." },
        { text: "Salade au parmesan", correct: true, explanation: "Adapté, attention à la quantité de parmesan qui est un fromage très salé." }
      ],
      plat: [
        { text: "Lasagnes végétariennes", correct: true, explanation: "Adapté." },
        { text: "Pizza 4 fromages", correct: false, explanation: "Riche en sel." },
        { text: "Osso buco", correct: false, explanation: "Riche en protéines." }
      ],
      dessert: [
        { text: "Panna cotta maison", correct: true, explanation: "Adapté." },
        { text: "Tiramisu", correct: true, explanation: "Adapté." },
        { text: "Fromage", correct: false, explanation: "Riche en sel." }
      ]
    }
  },
  {
    type: "Chinois",
    menu: {
      entree: [
        { text: "Soupe miso", correct: false, explanation: "Riche en sel." },
        { text: "Salade de concombre au sésame", correct: true, explanation: "Adapté." },
        { text: "Nems au porc", correct: true, explanation: "Adapté, attention à la sauce qui peut être riche en sel." }
      ],
      plat: [
        { text: "Légumes sautés au wok", correct: true, explanation: "Adapté, attention peut être très salé selon l’assaisonnement." },
        { text: "Poulet caramélisé", correct: false, explanation: "Riche en protéines." },
        { text: "Canard laqué", correct: false, explanation: "Riche en protéines." }
      ],
      dessert: [
        { text: "Perles de coco", correct: true, explanation: "Adapté." },
        { text: "Litchis au sirop", correct: true, explanation: "Adapté." },
        { text: "Beignets à la banane", correct: true, explanation: "Adapté." }
      ]
    }
  },

  {
    type: "Français",
    menu: {
      entree: [
        { text: "Crudités vinaigrette", correct: true, explanation: "Adapté." },
        { text: "Rillettes de porc", correct: false, explanation: "Riche en sel et protéines, max 150g de charcuterie / semaine." },
        { text: "Oeuf mayonnaise", correct: false, explanation: "Riche en protéines." }
      ],
      plat: [
        { text: "Filet de poisson vapeur", correct: false, explanation: "Riche en protéines." },
        { text: "Boeuf bourguignon", correct: false, explanation: "Riche en protéines." },
        { text: "Gratin dauphinois", correct: true, explanation: "Adapté." }
      ],
      dessert: [
        { text: "Compote sans sucre ajouté", correct: true, explanation: "Adapté." },
        { text: "Crème brûlée", correct: true, explanation: "Adapté." },
        { text: "Fromage blanc sucré", correct: true, explanation: "Adapté." }
      ]
    }
  },
  {
    type: "Mexicain",
    menu: {
      entree: [
        { text: "Salade de haricots noirs", correct: true, explanation: "Adapté." },
        { text: "Nachos au fromage", correct: false, explanation: "Riche en sel." },
        { text: "Tacos frits", correct: false, explanation: "Riche en sel (et en protéines s’il y a de la viande dedans)." }
      ],
      plat: [
        { text: "Fajitas de légumes", correct: true, explanation: "Adapté." },
        { text: "Chili con carne", correct: false, explanation: "Riche en protéines." },
        { text: "Burrito au fromage", correct: false, explanation: "Riche en sel." }
      ],
      dessert: [
        { text: "Fruits frais", correct: true, explanation: "Adapté." },
        { text: "Churros au chocolat", correct: true, explanation: "Adapté." },
        { text: "Glace caramel", correct: true, explanation: "Adapté." }
      ]
    }
  },
  {
    type: "Fast-food",
    menu: {
      entree: [
        { text: "Frites", correct: false, explanation: "Souvent très salées au fast-food / bon choix si non salée." },
        { text: "Nuggets de poulet", correct: false, explanation: "Riche en protéines." },
        { text: "Salade verte", correct: true, explanation: "Adapté." }
      ],
      plat: [
        { text: "Cheeseburger", correct: false, explanation: "Riche en sel et protéines." },
        { text: "Double steak burger", correct: false, explanation: "Riche en protéines." },
        { text: "Wrap Veggie fromage", correct: false, explanation: "Riche en sel." }
      ],
      dessert: [
        { text: "Glace vanille pécan", correct: true, explanation: "Adapté." },
        { text: "Brownie", correct: true, explanation: "Adapté." },
        { text: "Donuts", correct: true, explanation: "Adapté." }
      ]
    }
  }
];


let currentRestaurantIndex = 0;
let step = 0;
let score = 0;
let userChoices = [];

const restaurantType = document.getElementById('restaurant-type');
const questionText = document.getElementById('question');
const choicesDiv = document.getElementById('choices');
const resultScreen = document.getElementById('result-screen');
const resultDetails = document.getElementById('result-details');
const nextBtn = document.getElementById('next-btn');
const scoreScreen = document.getElementById('score-screen');
const finalScore = document.getElementById('final-score');
const totalScore = document.getElementById('total-score');

function shuffleArray(array) {
  return array
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}

function startGame() {
  score = 0;
  currentRestaurantIndex = 0;
  step = 0;
  userChoices = [];

  resultScreen.classList.add("hidden");
  resultScreen.style.display = ""; 
  scoreScreen.classList.add("hidden");
  scoreScreen.style.display = "";

  document.getElementById('game').style.display = 'block';
  showQuestion();
}

function showQuestion() {
  const restaurant = restaurants[currentRestaurantIndex];
  restaurantType.textContent = `Restaurant ${currentRestaurantIndex + 1}/${restaurants.length} – ${restaurant.type}`;

  renderChoices('entree', restaurant.menu.entree);
  renderChoices('plat', restaurant.menu.plat);
  renderChoices('dessert', restaurant.menu.dessert);

  userChoices = { entree: null, plat: null, dessert: null };
  updateValidateButton();
}

function renderChoices(type, options) {
  const container = document.getElementById(`choices-${type}`);
  container.innerHTML = "";

  const shuffledOptions = shuffleArray([...options]);

  shuffledOptions.forEach(option => {
    const btn = document.createElement("button");
    btn.className = "choice-button";
    btn.textContent = option.text;

    if (userChoices[type] && userChoices[type].text === option.text) {
      btn.classList.add("selected");
    }

    btn.onclick = () => {
      userChoices[type] = { type, ...option };

      [...container.children].forEach(child => child.classList.remove("selected"));
      btn.classList.add("selected");

      updateValidateButton();
    };

    container.appendChild(btn);
  });
}

function renderSection(type, containerId) {
  const sectionDiv = document.getElementById(containerId);
  sectionDiv.innerHTML = "";

  restaurants[currentRestaurantIndex].menu[type].forEach(item => {
    const btn = document.createElement("button");
    btn.className = "choice-button";
    btn.textContent = item.text;

    if (userChoices[type] && userChoices[type].text === item.text) {
      btn.classList.add("selected");
    }

    btn.onclick = () => {
      userChoices[type] = { type, ...item };
      renderSection(type, containerId); 
    };

    sectionDiv.appendChild(btn);
  });
}

function highlightSelected(container, selectedButton) {
  [...container.children].forEach(btn => btn.classList.remove("selected"));
  selectedButton.classList.add("selected");
}

function updateValidateButton() {
  const allSelected = userChoices.entree && userChoices.plat && userChoices.dessert;
  document.getElementById("validate-btn").disabled = !allSelected;
}

document.getElementById("validate-btn").onclick = () => {
  showResults();
};

function selectChoice(type, option) {
  console.log("Choix fait :", option.text);
  userChoices.push({ type, ...option });

  if (step < 2) {
    step++;
    showQuestion();
  } else {
    showResults();
  }
}

function showResults() {
  const allChoices = [userChoices.entree, userChoices.plat, userChoices.dessert];

  let badCount = allChoices.filter(choice =>
    choice.text.includes("sel") || choice.text.includes("protéines") || !choice.correct
  ).length;

  let scoreIncrement = badCount === 0 ? 2 : badCount === 1 ? 1 : 0;
  score += scoreIncrement;

    // Stocke le score dans localStorage
  localStorage.setItem("scoreMiniJeu6", score);
  
  // Stocke aussi le meilleur score si c'est un nouveau record
  const bestScore = parseInt(localStorage.getItem("bestScoreMiniJeu6")) || 0;
  if (score > bestScore) {
    localStorage.setItem("bestScoreMiniJeu6", score);
  }

  // Conseil personnalisé
  const platChoisi = userChoices.plat?.text;
  const tag = {
    "Pizza 4 fromages": "sel",
    "Osso buco": "prot",
    "Poulet caramélisé": "prot",
    "Canard laqué": "prot",
    "Filet de poisson vapeur": "prot",
    "Boeuf bourguignon": "prot",
    "Chili con carne": "prot",
    "Burrito au fromage": "sel",
    "Cheeseburger": "sel_prot",
    "Double steak burger": "prot",
    "Wrap Veggie fromage": "sel"
  }[platChoisi];

  let adviceMessage = "";
  if (tag === "prot") {
    adviceMessage = "⚠️ Ce plat est riche en protéines. Pense à un repas végétarien ensuite.";
  } else if (tag === "sel") {
    adviceMessage = "⚠️ Ce plat est riche en sel. Évite les produits salés pour le prochain repas.";
  } else if (tag === "sel_prot") {
    adviceMessage = "⚠️ Ce plat est très riche en sel et en protéines. Prévois un repas très léger ensuite.";
  }

  resultDetails.innerHTML = `
    <h2 class="result-title">Évaluation de ton menu</h2>
    <div class="result-choices">
      ${allChoices.map(choice => `
        <div class="result-block">
          <p class="result-item"><strong>${choice.type.toUpperCase()} :</strong> ${choice.text}</p>
          <p class="result-explanation"><em>${choice.explanation}</em></p>
        </div>
      `).join('')}
    </div>
    <p class="result-score"><strong>${scoreIncrement}/2</strong> pour ce menu.</p>
    ${adviceMessage ? `<p class="result-advice">${adviceMessage}</p>` : ""}
  `;

  document.body.classList.add("noscroll");
  document.getElementById("game").style.display = "none";
  document.getElementById("main-content").classList.add("dimmed");

  resultScreen.classList.remove("hidden");
  resultScreen.style.display = "flex";

  nextBtn.textContent = currentRestaurantIndex === restaurants.length - 1
    ? "Voir les résultats"
    : "Restaurant suivant";
}

nextBtn.onclick = () => {
  resultScreen.style.display = "none";
  document.body.classList.remove("noscroll");
  document.getElementById("main-content").classList.remove("dimmed");

  if (currentRestaurantIndex === restaurants.length - 1) {
    // Affiche le popup final
    document.getElementById("final-total").textContent = score;
    document.getElementById("final-popup").style.display = "flex";
  } else {
    currentRestaurantIndex++;
    userChoices = [];
    showQuestion();
    document.getElementById("game").style.display = "block";
  }
};

function showFinalScore() {
  // Masque les écrans de score et de jeu
  resultScreen.classList.add("hidden");
  scoreScreen.classList.add("hidden");

  // Récupérer le score du mini-jeu 6 et le convertir en entier
  let scoreMiniJeu6 = parseInt(localStorage.getItem("scoreMiniJeu6")) || 0;

  // Récupérer l'ancien meilleur score du mini-jeu 6
  const ancienBestScoreMiniJeu6 = parseInt(localStorage.getItem("bestScoreMiniJeu6")) || 0;

  // Vérifier si le score actuel est meilleur que l'ancien meilleur score
  if (scoreMiniJeu6 > ancienBestScoreMiniJeu6) {
    localStorage.setItem("bestScoreMiniJeu6", scoreMiniJeu6);  // Mettre à jour le meilleur score dans le localStorage
  }

  localStorage.setItem("scoreMiniJeu6", scoreMiniJeu6);


  // Afficher ce score dans le popup final
  const popup = document.getElementById("final-popup");
  document.getElementById("final-total").textContent = scoreMiniJeu6;

  const finalMessage = document.getElementById("final-message");

  // Logique d'affichage du message en fonction du score
  if (scoreMiniJeu6 >= 9) {
    finalMessage.textContent = "🌟 Excellent !";
  } else if (scoreMiniJeu6 >= 7) {
    finalMessage.textContent = "👏 Bien joué !";
  } else if (scoreMiniJeu6 >= 5) {
    finalMessage.textContent = "👍 Pas mal !";
  } else {
    finalMessage.textContent = "💡 Continue à t'améliorer !";
  }

  // Affiche le popup avec les résultats
  popup.classList.remove("hidden");
  popup.style.display = "flex";
}




function restartGame() {
  startGame();
}

  startGame();
