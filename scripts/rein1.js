const organs = [
    { img: "../photos/rein.png", name: "Rein" },
    { img: "../photos/vessie.png", name: "Vessie" },
    { img: "../photos/uretères.png", name: "Uretères" },
    { img: "../photos/uretre.png", name: "Urètre" }
  ];
  
  const phrases = [
    { text: "Un organe qui filtre le sang et élimine les toxines.", organ: "Rein" },
    { text: "Les reins sont responsables de la production de l'urine.", organ: "Rein" },
    { text: "Un organe qui stocke l'urine avant l'élimination.", organ: "Vessie" },
    { text: "La vessie est une poche musculaire qui contient l'urine.", organ: "Vessie" },
    { text: "Les tubes qui transportent l'urine des reins à la vessie.", organ: "Uretères" },
    { text: "Les uretères sont des conduits qui permettent le passage de l'urine.", organ: "Uretères" },
    { text: "Le canal qui permet à l'urine de sortir du corps.", organ: "Urètre" },
    { text: "L'urètre est un tube qui relie la vessie à l'extérieur.", organ: "Urètre" }
  ];
  
  // Mélanger les phrases
  function shuffle(phrases) {
    for (let i = phrases.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [phrases[i], phrases[j]] = [phrases[j], phrases[i]]; // Swap
    }
    return phrases;
  }
  
  // Créer les cartes de phrases (en haut)
  function createCards() {
    const cardsContainer = document.getElementById("cards-container");
    shuffle(phrases);
  
    phrases.forEach((phrase, index) => {
      const cardElement = document.createElement("div");
      cardElement.classList.add("card");
      cardElement.setAttribute("data-organe", phrase.organ);
      cardElement.setAttribute("data-matched", "false");
  
      const cardText = document.createElement("div");
      cardText.textContent = phrase.text;
      cardElement.appendChild(cardText);
  
      cardElement.addEventListener("click", () => flipCard(cardElement, phrase));
  
      cardsContainer.appendChild(cardElement);
    });
  }
  
  // Créer les images des organes (en bas)
  function createOrgans() {
    const organsContainer = document.getElementById("organs-container");
  
    organs.forEach((organ) => {
      const organElement = document.createElement("img");
      organElement.src = organ.img;
      organElement.alt = organ.name;
      organElement.setAttribute("data-name", organ.name);
  
      organElement.addEventListener("click", () => checkMatch(organElement));
  
      organsContainer.appendChild(organElement);
    });
  }
  
  let flippedCard = null; // Carte retournée en attente de correspondance
  let matchedCards = 0;
  
  // Retourner une carte
  function flipCard(cardElement, phrase) {
    if (!flippedCard) {
      flippedCard = { cardElement, phrase };
      cardElement.style.backgroundColor = "#fff"; // Retourner la carte (révéler le texte)
    }
  }
  
  // Vérifier si l'organe sélectionné correspond à la phrase retournée
  function checkMatch(organElement) {
    if (flippedCard) {
      const selectedOrgan = organElement.getAttribute("data-name");
      const flippedCardOrgane = flippedCard.phrase.organ;
  
      if (selectedOrgan === flippedCardOrgane) {
        flippedCard.cardElement.style.backgroundColor = "#c8e6c9"; // Réussite : carte correctement associée
        flippedCard.cardElement.setAttribute("data-matched", "true");
        matchedCards++;
  
        if (matchedCards === phrases.length / 2) {
          document.getElementById("message").textContent = "Félicitations, vous avez gagné !";
          document.getElementById("restart-btn").classList.remove("hidden");
        }
      } else {
        flippedCard.cardElement.style.backgroundColor = "#f44336"; // Echec : mauvaise association
      }
  
      flippedCard = null; // Réinitialiser la carte retournée
    }
  }
  
  // Redémarrer le jeu
  document.getElementById("restart-btn").addEventListener("click", () => {
    matchedCards = 0;
    document.getElementById("message").textContent = "";
    document.getElementById("restart-btn").classList.add("hidden");
    document.getElementById("cards-container").innerHTML = "";
    document.getElementById("organs-container").innerHTML = "";
    createCards();
    createOrgans();
  });
  
  // Initialiser le jeu
  createCards();
  createOrgans();