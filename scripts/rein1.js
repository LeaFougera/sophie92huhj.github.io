const organs = [
    { img: "../photos/rein.png", name: "Rein", count: 0 },
    { img: "../photos/vessie.png", name: "Vessie", count: 0 },
    { img: "../photos/uretères.png", name: "Uretères", count: 0 },
    { img: "../photos/uretre.png", name: "Urètre", count: 0 }
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
  
  let selections = []; // Enregistrer les sélections de l'utilisateur
  let matchedCards = 0;
  let totalCards = phrases.length;
  
  function shuffle(phrases) {
    for (let i = phrases.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [phrases[i], phrases[j]] = [phrases[j], phrases[i]]; // Swap
    }
    return phrases;
  }
  
  function createCards() {
    const cardsContainer = document.getElementById("cards-container");
    shuffle(phrases);
  
    phrases.forEach((phrase, index) => {
      const cardElement = document.createElement("div");
      cardElement.classList.add("card");
      cardElement.setAttribute("data-organe", phrase.organ);
      cardElement.setAttribute("data-index", index);
  
      const cardText = document.createElement("div");
      cardText.textContent = phrase.text;
      cardElement.appendChild(cardText);
  
      cardElement.addEventListener("click", () => flipCard(cardElement));
  
      cardsContainer.appendChild(cardElement);
    });
  }
  
  function createOrgans() {
    const organsContainer = document.getElementById("organs-container");
  
    organs.forEach((organ) => {
      const organElement = document.createElement("img");
      organElement.src = organ.img;
      organElement.alt = organ.name;
      organElement.setAttribute("data-name", organ.name);
  
      // Créer un compteur pour chaque organe
      const countDisplay = document.createElement("span");
      countDisplay.classList.add("count-display");
      countDisplay.textContent = organ.count;
  
      const organContainer = document.createElement("div");
      organContainer.classList.add("organ-container");
      organContainer.appendChild(organElement);
      organContainer.appendChild(countDisplay);
  
      organElement.addEventListener("click", () => selectOrgane(organElement, countDisplay));
  
      organsContainer.appendChild(organContainer);
    });
  }
  
  let flippedCard = null;
  
  function flipCard(cardElement) {
    if (!flippedCard) {
      flippedCard = cardElement;
      cardElement.style.backgroundColor = "#fff"; // Retourner la carte
    }
  }
  
  function selectOrgane(organElement, countDisplay) {
    if (flippedCard) {
      const selectedOrgane = organElement.getAttribute("data-name");
      const flippedCardOrgane = flippedCard.getAttribute("data-organe");
  
      // Mettre à jour le compteur pour cet organe
      const organ = organs.find(o => o.name === selectedOrgane);
      organ.count++;
      countDisplay.textContent = organ.count;
  
      selections.push({
        cardElement: flippedCard,
        organElement: organElement,
        selectedOrgane: selectedOrgane,
        correct: selectedOrgane === flippedCardOrgane
      });
  
      organElement.classList.add("selected"); // Marquer l'organe sélectionné
  
      flippedCard.style.backgroundColor = "#f4f4f9"; // Réinitialiser la couleur de fond de la carte
      flippedCard = null;
    }
  }
  
  document.getElementById("validate-btn").addEventListener("click", () => {
    let correctCount = 0;
    let incorrectAnswers = [];
  
    // Effacer le contenu du message précédent
    document.getElementById("result-message").innerHTML = "";
  
    selections.forEach((selection) => {
      if (selection.correct) {
        correctCount++;
        selection.cardElement.style.backgroundColor = "#c8e6c9"; // Correct : vert
      } else {
        selection.cardElement.style.backgroundColor = "#f44336"; // Incorrect : rouge
        // Explication pour chaque réponse incorrecte
        const explanation = `La phrase "${selection.cardElement.querySelector('div').textContent}" ne correspond pas à ${selection.selectedOrgane}. Ce n'est pas le bon organe.`;
        incorrectAnswers.push(explanation);
      }
    });
  
    // Afficher les bonnes et mauvaises réponses directement sur la page
    const resultMessage = `
      <h3>Réponses incorrectes:</h3>
      ${incorrectAnswers.length > 0 ? `<p>${incorrectAnswers.join("<br>")}</p>` : '<p>Aucune erreur !</p>'}
    `;
  
    document.getElementById("result-message").innerHTML = resultMessage;
    document.getElementById("score-message").textContent = `Score final : ${correctCount} sur ${totalCards / 2}`;
  
    // Afficher les résultats directement sur la page
    document.getElementById("result-container").classList.remove("hidden");
  });
  
  // Redémarrer le jeu
  document.getElementById("restart-btn").addEventListener("click", () => {
    resetGame(); // Réinitialiser le jeu
    createCards();
    createOrgans();
  });
  
  // Réinitialiser le jeu après avoir fermé le pop-up ou redémarré
  function resetGame() {
    selections = [];
    matchedCards = 0;
    document.getElementById("message").textContent = "";
    document.getElementById("restart-btn").classList.add("hidden");
    document.getElementById("cards-container").innerHTML = "";
    document.getElementById("organs-container").innerHTML = "";
    document.getElementById("result-container").classList.add("hidden");
  }
  
  // Initialiser le jeu
  createCards();
  createOrgans();