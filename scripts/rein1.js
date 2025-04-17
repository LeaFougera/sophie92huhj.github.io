// Les cartes et leurs définitions
const cards = [
    { img: "../photos/rein.png", text: "Un organe qui filtre le sang et élimine les toxines." },
    { img: "../photos/vessie.png", text: "Un organe qui stocke l'urine avant l'élimination." },
    { img: "../photos/uretères.png", text: "Les tubes qui transportent l'urine des reins à la vessie." },
    { img: "../photos/uretre.png", text: "Le canal qui permet à l'urine de sortir du corps." },
    { img: "../photos/rein.png", text: "Un organe qui filtre le sang et élimine les toxines." },
    { img: "../photos/vessie.png", text: "Un organe qui stocke l'urine avant l'élimination." },
    { img: "../photos/uretères.png", text: "Les tubes qui transportent l'urine des reins à la vessie." },
    { img: "../photos/uretre.png", text: "Le canal qui permet à l'urine de sortir du corps." }
  ];
  
  // Mélanger les cartes
  function shuffle(cards) {
    for (let i = cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cards[i], cards[j]] = [cards[j], cards[i]]; // Swap
    }
    return cards;
  }
  
  // Créer le tableau de jeu
  function createBoard() {
    const gameBoard = document.getElementById("game-board");
    shuffle(cards);
  
    cards.forEach((card, index) => {
      const cardElement = document.createElement("div");
      cardElement.classList.add("card");
      cardElement.setAttribute("data-id", index);
      cardElement.setAttribute("data-matched", "false");
  
      // Créer une image pour la carte
      const cardImage = document.createElement("img");
      cardImage.src = card.img;
      cardImage.alt = card.text;
      cardImage.style.display = "none"; // Cache l'image au début
  
      // Créer un élément de texte pour la carte
      const cardText = document.createElement("div");
      cardText.textContent = card.text;
      cardText.style.display = "none"; // Cache le texte au début
  
      cardElement.appendChild(cardImage);
      cardElement.appendChild(cardText);
  
      cardElement.addEventListener("click", () => flipCard(cardElement, card, index));
  
      gameBoard.appendChild(cardElement);
    });
  }
  
  // Logique du jeu - retourner une carte
  let flippedCards = [];
  let matchedCards = 0;
  
  function flipCard(cardElement, card, index) {
    if (flippedCards.length < 2 && cardElement.getAttribute("data-matched") === "false") {
      const cardImage = cardElement.querySelector("img");
      const cardText = cardElement.querySelector("div");
  
      cardImage.style.display = "block"; // Afficher l'image de la carte
      cardText.style.display = "block"; // Afficher le texte de la carte
      flippedCards.push({ cardElement, card, index });
  
      if (flippedCards.length === 2) {
        checkMatch();
      }
    }
  }
  
  function checkMatch() {
    const [firstCard, secondCard] = flippedCards;
  
    if (firstCard.card.text === secondCard.card.text) {
      firstCard.cardElement.setAttribute("data-matched", "true");
      secondCard.cardElement.setAttribute("data-matched", "true");
      matchedCards += 2;
      flippedCards = [];
  
      if (matchedCards === cards.length) {
        setTimeout(() => {
          document.getElementById("message").textContent = "Félicitations, vous avez gagné !";
          document.getElementById("restart-btn").classList.remove("hidden");
        }, 500);
      }
    } else {
      setTimeout(() => {
        firstCard.cardElement.querySelector("img").style.display = "none";
        secondCard.cardElement.querySelector("img").style.display = "none";
        firstCard.cardElement.querySelector("div").style.display = "none";
        secondCard.cardElement.querySelector("div").style.display = "none";
        flippedCards = [];
      }, 1000);
    }
  }
  
  // Redémarrer le jeu
  document.getElementById("restart-btn").addEventListener("click", () => {
    matchedCards = 0;
    document.getElementById("message").textContent = "";
    document.getElementById("restart-btn").classList.add("hidden");
    document.getElementById("game-board").innerHTML = "";
    createBoard();
  });
  
  // Initialiser le jeu
  createBoard();