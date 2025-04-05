const board = document.getElementById('game-board');
const statusMessage = document.getElementById('status-message');

const symbols = ['🍎', '🍌', '🍇', '🍒', '🍉', '🥝', '🍍', '🥥'];
let cards = [...symbols, ...symbols]; // 8 paires = 16 cartes
let flippedCards = [];
let matchedPairs = 0;
let attempts = 0;

shuffle(cards);
createBoard();

function shuffle(array) {
    array.sort(() => 0.5 - Math.random());
}

function createBoard() {
    cards.forEach(symbol => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.symbol = symbol;

        const front = document.createElement('div');
        front.classList.add('front');
        front.textContent = '?';

        const back = document.createElement('div');
        back.classList.add('back');
        back.textContent = symbol;

        card.appendChild(front);
        card.appendChild(back);

        card.addEventListener('click', () => flipCard(card));
        board.appendChild(card);
    });
}

function flipCard(card) {
    if (card.classList.contains('flipped') || flippedCards.length === 2) return;

    card.classList.add('flipped');
    flippedCards.push(card);

    if (flippedCards.length === 2) {
        attempts++;

        const [first, second] = flippedCards;
        const isMatch = first.dataset.symbol === second.dataset.symbol;

        if (isMatch) {
            matchedPairs++;
            flippedCards = [];

            if (matchedPairs === symbols.length) {
                endGame();
            }
        } else {
            setTimeout(() => {
                first.classList.remove('flipped');
                second.classList.remove('flipped');
                flippedCards = [];
            }, 1000);
        }
    }
}

function endGame() {
    statusMessage.textContent = `🎉 Bravo ! Tu as terminé en ${attempts} essais.`;

    const previousBest = localStorage.getItem('bestScoreMemoire');
    if (!previousBest || attempts < parseInt(previousBest)) {
        localStorage.setItem('bestScoreMemoire', attempts);
    }

    localStorage.setItem('maxScoreMemoire', symbols.length); // utile si tu veux afficher le total aussi
}
