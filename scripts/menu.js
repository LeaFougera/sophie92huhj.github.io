const restaurants = [
    {
        type: "Italien",
        question: "Quelle entrée choisirais-tu ?",
        options: [
            { text: "Bruschetta tomate-basilic", correct: true },
            { text: "Charcuterie italienne", correct: false },
            { text: "Salade de parmesan", correct: false },
        ]
    },
    {
        type: "Chinois",
        question: "Quel plat principal choisirais-tu ?",
        options: [
            { text: "Poulet sauce aigre-douce", correct: false },
            { text: "Légumes sautés au wok", correct: true },
            { text: "Porc laqué", correct: false },
        ]
    },
    {
        type: "Indien",
        question: "Quel dessert choisirais-tu ?",
        options: [
            { text: "Lassi à la mangue", correct: true },
            { text: "Gulab Jamun (boulettes sucrées)", correct: false },
            { text: "Halwa au beurre", correct: false },
        ]
    },
    {
        type: "Mexicain",
        question: "Quelle entrée serait la meilleure ?",
        options: [
            { text: "Nachos au fromage", correct: false },
            { text: "Salade de haricots noirs", correct: true },
            { text: "Quesadilla", correct: false },
        ]
    },
    {
        type: "Français",
        question: "Quel plat principal choisirais-tu ?",
        options: [
            { text: "Filet de poisson vapeur avec légumes", correct: true },
            { text: "Boeuf bourguignon", correct: false },
            { text: "Cassoulet", correct: false },
        ]
    }
];

let currentQuestionIndex = 0;
let score = 0;

const restaurantType = document.getElementById('restaurant-type');
const questionText = document.getElementById('question');
const choicesDiv = document.getElementById('choices');
const nextBtn = document.getElementById('next-btn');
const scoreScreen = document.getElementById('score-screen');
const finalScore = document.getElementById('final-score');

function startGame() {
    showQuestion();
}

function showQuestion() {
    let current = restaurants[currentQuestionIndex];
    restaurantType.textContent = `Restaurant ${current.type}`;
    questionText.textContent = current.question;
    choicesDiv.innerHTML = '';
    nextBtn.style.display = 'none';

    current.options.forEach(option => {
        const btn = document.createElement('button');
        btn.textContent = option.text;
        btn.onclick = () => selectAnswer(option.correct);
        choicesDiv.appendChild(btn);
    });
}

function selectAnswer(isCorrect) {
    if (isCorrect) {
        score++;
        alert("Bravo ! Bonne réponse.");
    } else {
        alert("Dommage ! Mauvaise réponse.");
    }
    nextBtn.style.display = 'block';
}

nextBtn.addEventListener('click', () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < restaurants.length) {
        showQuestion();
    } else {
        endGame();
    }
});

function endGame() {
    document.getElementById('game').style.display = 'none';
    scoreScreen.style.display = 'block';
    finalScore.textContent = score;
}

function restartGame() {
    currentQuestionIndex = 0;
    score = 0;
    scoreScreen.style.display = 'none';
    document.getElementById('game').style.display = 'block';
    showQuestion();
}

startGame();