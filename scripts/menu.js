const restaurants = [
  {
    type: "Italien",
    menu: {
      entree: [
        { text: "Bruschetta tomate-basilic", correct: true, explanation: "Faible en potassium et en sel, bon choix en entrée." },
        { text: "Charcuterie italienne", correct: false, explanation: "Très salée et riche en protéines, à limiter." },
        { text: "Salade au parmesan", correct: false, explanation: "Le parmesan est riche en sel et en phosphore." }
      ],
      plat: [
        { text: "Lasagnes végétariennes", correct: true, explanation: "Plus pauvres en protéines animales et modérées en potassium." },
        { text: "Pizza 4 fromages", correct: false, explanation: "Trop salée, trop de produits laitiers riches en phosphore." },
        { text: "Osso buco", correct: false, explanation: "Viande rouge, riche en protéines et potassium." }
      ],
      dessert: [
        { text: "Panna cotta maison", correct: true, explanation: "Peu riche en potassium si préparée sans lait concentré." },
        { text: "Tiramisu", correct: false, explanation: "Crème et café, trop riche en phosphore et potassium." },
        { text: "Fromage", correct: false, explanation: "Riche en sel et en phosphore, à limiter." }
      ]
    }
  },
  {
    type: "Chinois",
    menu: {
      entree: [
        { text: "Soupe miso", correct: false, explanation: "Très salée, souvent à base de bouillon concentré." },
        { text: "Salade de concombre au sésame", correct: true, explanation: "Légère, hydratante et pauvre en potassium." },
        { text: "Nems au porc", correct: false, explanation: "Frits et salés, à limiter." }
      ],
      plat: [
        { text: "Légumes sautés au wok", correct: true, explanation: "Légumes modérés en potassium et peu salés." },
        { text: "Poulet caramélisé", correct: false, explanation: "Sauces riches en sucre et sodium." },
        { text: "Canard laqué", correct: false, explanation: "Viande grasse et sauce sucrée-salée, à éviter." }
      ],
      dessert: [
        { text: "Perles de coco", correct: true, explanation: "Modérément sucrées, sans danger si portion raisonnable." },
        { text: "Litchis au sirop", correct: false, explanation: "Trop sucré et potassium élevé." },
        { text: "Beignets à la banane", correct: false, explanation: "Friture + banane = potassium élevé." }
      ]
    }
  },
  {
    type: "Indien",
    menu: {
      entree: [
        { text: "Samosas aux légumes", correct: true, explanation: "Peu salés et bien cuits au four, choix adapté." },
        { text: "Pakoras frits", correct: false, explanation: "Friture excessive, à éviter." },
        { text: "Soupe lentilles (dal)", correct: false, explanation: "Trop riche en potassium si portion élevée." }
      ],
      plat: [
        { text: "Curry de légumes doux", correct: true, explanation: "Sans crème ni sel ajouté, très adapté." },
        { text: "Poulet tikka masala", correct: false, explanation: "Riche en crème et sel." },
        { text: "Agneau vindaloo", correct: false, explanation: "Épicé, salé, viande rouge : à limiter." }
      ],
      dessert: [
        { text: "Lassi nature", correct: true, explanation: "Yaourt dilué, peu salé, bon choix en petite quantité." },
        { text: "Gulab jamun", correct: false, explanation: "Trop sucré, sirop concentré." },
        { text: "Halwa aux noix", correct: false, explanation: "Riche en potassium et matières grasses." }
      ]
    }
  },
  {
    type: "Français",
    menu: {
      entree: [
        { text: "Crudités vinaigrette", correct: true, explanation: "Peu salées, riches en fibres, très bon choix." },
        { text: "Rillettes de porc", correct: false, explanation: "Ultra salées et grasses, à limiter." },
        { text: "Oeuf mayonnaise", correct: false, explanation: "Riche en cholestérol et gras." }
      ],
      plat: [
        { text: "Filet de poisson vapeur", correct: true, explanation: "Faible en sel et phosphore." },
        { text: "Boeuf bourguignon", correct: false, explanation: "Viande rouge + sauce = trop salé et gras." },
        { text: "Gratin dauphinois", correct: false, explanation: "Beaucoup de crème et de sel." }
      ],
      dessert: [
        { text: "Compote sans sucre ajouté", correct: true, explanation: "Fruits doux, sans sucre, adapté." },
        { text: "Crème brûlée", correct: false, explanation: "Sucre + produits laitiers riches en phosphore." },
        { text: "Fromage blanc sucré", correct: false, explanation: "Trop de lait, sucre ajouté." }
      ]
    }
  },
  {
    type: "Mexicain",
    menu: {
      entree: [
        { text: "Salade de haricots noirs", correct: true, explanation: "Bonne source de fibres et modérée en potassium." },
        { text: "Nachos au fromage", correct: false, explanation: "Trop salés et gras." },
        { text: "Tacos frits", correct: false, explanation: "Frits, souvent trop salés." }
      ],
      plat: [
        { text: "Fajitas de légumes", correct: true, explanation: "Cuisson légère, riche en fibres, bien équilibré." },
        { text: "Chili con carne", correct: false, explanation: "Viande rouge + haricots + épices = lourd pour les reins." },
        { text: "Burrito au fromage", correct: false, explanation: "Trop de produits laitiers et de sel." }
      ],
      dessert: [
        { text: "Fruits frais", correct: true, explanation: "Fruits naturels non transformés, toujours adaptés." },
        { text: "Churros au chocolat", correct: false, explanation: "Friture + sucre, à éviter." },
        { text: "Glace caramel", correct: false, explanation: "Produits laitiers et sucre, non adaptés." }
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


function startGame() {
  score = 0;
  currentRestaurantIndex = 0;
  step = 0;
  userChoices = [];
  resultScreen.classList.add("hidden");
  scoreScreen.classList.add("hidden");
  document.getElementById('game').style.display = 'block';
  showQuestion();
}

function showQuestion() {
  const restaurant = restaurants[currentRestaurantIndex];
  const menuType = step === 0 ? 'entree' : step === 1 ? 'plat' : 'dessert';
  const question = step === 0 ? "Choisis une entrée :" : step === 1 ? "Choisis un plat :" : "Choisis un dessert :";

  restaurantType.textContent = `Restaurant ${restaurant.type}`;
  questionText.textContent = question;
  choicesDiv.innerHTML = "";

  restaurant.menu[menuType].forEach((option, index) => {
    const btn = document.createElement('button');
    btn.textContent = option.text;
    btn.onclick = () => selectChoice(menuType, option);
    choicesDiv.appendChild(btn);
  });
}

function selectChoice(type, option) {
  userChoices.push({ type, ...option });

  if (step < 2) {
    step++;
    showQuestion();
  } else {
    showResults();
  }
}

function showResults() {
  let correctCount = userChoices.filter(choice => choice.correct).length;
  let scoreIncrement = 0;

  // Attribuer 1 point si au moins 2 choix sont bons
  if (correctCount >= 2) {
    scoreIncrement = 1;
  }

  score += scoreIncrement;

  document.getElementById('game').style.display = 'none';
  resultScreen.classList.remove('hidden');
  resultDetails.innerHTML = `
    <ul style="text-align:left;">
      ${userChoices.map(choice => `
        <li>
          <strong>${choice.type.toUpperCase()} :</strong> ${choice.text} 
          <span style="color:${choice.correct ? 'green' : 'red'};">
            (${choice.correct ? 'Adapté' : 'Peu adapté'})
          </span><br/>
          <em>${choice.explanation}</em>
        </li>
      `).join('')}
    </ul>
    <p><strong>${correctCount}/3</strong> bonnes réponses pour ce restaurant.</p>
  `;
}

nextBtn.onclick = () => {
  currentRestaurantIndex++;
  step = 0;
  userChoices = [];

  if (currentRestaurantIndex < restaurants.length) {
    resultScreen.classList.add("hidden");
    document.getElementById('game').style.display = 'block';
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