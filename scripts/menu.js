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
    type: "Indien",
    menu: {
      entree: [
        { text: "Samosas aux légumes", correct: true, explanation: "Adapté, attention à la sauce qui peut être riche en sel." },
        { text: "Pakoras frits", correct: true, explanation: "Adapté, attention à la sauce qui peut être riche en sel." },
        { text: "Soupe lentilles (dal)", correct: true, explanation: "Adapté." }
      ],
      plat: [
        { text: "Curry de légumes doux", correct: true, explanation: "Adapté." },
        { text: "Poulet tikka masala", correct: false, explanation: "Riche en protéines." },
        { text: "Agneau vindaloo", correct: false, explanation: "Riche en protéines." }
      ],
      dessert: [
        { text: "Lassi nature", correct: true, explanation: "Yaourt dilué, peu salé, bon choix en petite quantité." },
        { text: "Gulab jamun", correct: true, explanation: "Adapté." },
        { text: "Halwa aux noix", correct: true, explanation: "Adapté." }
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

  // 🧼 Assure que tout est bien réinitialisé
  resultScreen.classList.add("hidden");
  resultScreen.style.display = ""; // reset display
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
  options.forEach((option, index) => {
    const btn = document.createElement("button");
    btn.textContent = option.text;
    btn.onclick = () => {
      userChoices[type] = { type, ...option };
      highlightSelected(container, btn);
      updateValidateButton();
    };
    container.appendChild(btn);
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
  console.log("Résultats affichés");

  const allChoices = [userChoices.entree, userChoices.plat, userChoices.dessert];
  let correctCount = allChoices.filter(choice => choice.correct).length;
  let scoreIncrement = correctCount >= 2 ? 1 : 0;
  score += scoreIncrement;

  document.body.classList.add('noscroll');
  const mainContent = document.getElementById('main-content');
  if (mainContent) {
    mainContent.classList.add('dimmed');
  }
  document.getElementById('game').style.display = 'none';

  resultScreen.classList.remove('hidden');
  resultScreen.style.display = 'flex';
  scoreScreen.style.display = 'none';

  resultDetails.innerHTML = `
    <h2 class="result-title">Évaluation de ton menu</h2>
    <div class="result-choices">
      ${allChoices.map(choice => `
        <div class="result-block">
          <p class="result-item">
            <strong>${choice.type.toUpperCase()} :</strong> ${choice.text}
            <span class="${choice.correct ? 'correct' : 'incorrect'}">
              (${choice.correct ? 'Adapté' : 'Peu adapté'})
            </span>
          </p>
          <p class="result-explanation"><em>${choice.explanation}</em></p>
        </div>
      `).join('')}
    </div>
    <p class="result-score"><strong>${correctCount}/3</strong> bonnes réponses pour ce restaurant.</p>
  `;
}

nextBtn.onclick = () => {
  currentRestaurantIndex++;
  step = 0;
  userChoices = [];
  resultDetails.innerHTML = "";
  resultScreen.style.display = 'none';
  document.body.classList.remove('noscroll');

  const mainContent = document.getElementById('main-content');
  if (mainContent) {
    mainContent.classList.remove('dimmed');
  }

  document.getElementById('game').style.display = 'block'; // ✅ << CETTE LIGNE MANQUAIT ICI

  if (currentRestaurantIndex < restaurants.length) {
    resultScreen.classList.add("hidden");
    showQuestion();
  } else {
    showFinalScore();
  }
};

function showFinalScore() {
  resultScreen.classList.add("hidden");
  scoreScreen.classList.remove("hidden");
  finalScore.textContent = score;
  totalScore.textContent = restaurants.length;
}

function restartGame() {
  startGame();
}

  startGame();
