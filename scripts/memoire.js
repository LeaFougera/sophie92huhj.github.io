const board = document.getElementById('game-board');
const statusMessage = document.getElementById('status-message');

const symbols = ['🍎', '🍌', '🍇', '🍒', '🍉', '🥝', '🍍', '🥥'];
let cards = [...symbols, ...symbols]; // 8 paires = 16 cartes
let flippedCards = [];
let matchedPairs = 0;

shuffle(cards);
createBoard();

function shuffle(array) {
    array.sort(() => 0.5 - Math.random());
}

function createBoard() {
    cards.forEach((symbol, index) => {
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
        const [first, second] = flippedCards;
        const match = first.dataset.symbol === second.dataset.symbol;

        if (match) {
            matchedPairs++;
            flippedCards = [];

            if (matchedPairs === symbols.length) {
                statusMessage.textContent = "🎉 Bravo ! Vous avez trouvé toutes les paires !";
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
