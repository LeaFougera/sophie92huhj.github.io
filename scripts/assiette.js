const ingredients = document.querySelectorAll('.ingredient');
const plate = document.getElementById('patient-plate');
const feedback = document.getElementById('feedback');
const checkBtn = document.getElementById('check-btn');

// Base de données des aliments
const alimentData = {
  viande: { bon: false, suggestion: "Poisson maigre" },
  oeuf: { bon: true },
  sel: { bon: false, suggestion: "Herbes aromatiques" },
  courgette: { bon: true },
  riz: { bon: false, suggestion: "Riz blanc (moins de phosphore)" },
  pain: { bon: true },
  poisson_blanc: { bon: true },
  huile_olive: { bon: true },
  chocolat: { bon: false, suggestion: "Fruits frais comme la pomme" },
  pomme: { bon: true },
  poire : { bon: true },
  charcuterie : { bon: false, suggestion:"?" },
  pâtes : { bon: true },
  fromages : { bon: false },
  plat_industriel : { bon: false },
  viande_blanche : { bon: true },
  herbes_aromatiques  : { bon: true },

};

let alimentsChoisis = [];

// Drag start
ingredients.forEach(ingredient => {
  ingredient.addEventListener('dragstart', (e) => {
    e.dataTransfer.setData('text', ingredient.id); // on force à utiliser le parent .ingredient
  });
});

// Drag and drop
plate.addEventListener('dragover', (e) => {
  e.preventDefault();
  plate.classList.add('dragover');
});

plate.addEventListener('dragleave', () => {
  plate.classList.remove('dragover');
});

plate.addEventListener('drop', (e) => {
  e.preventDefault();
  const id = e.dataTransfer.getData('text');
  const ingredient = document.getElementById(id);

  if (!ingredient) return;

  // Ajoute l’ingrédient dans l’assiette
  const clone = ingredient.cloneNode(true);
  clone.setAttribute('draggable', false);
  clone.style.margin = '5px';
  plate.appendChild(clone);

  // Supprime de la liste originale
  ingredient.remove();

  // Ajoute à la liste des aliments choisis
  alimentsChoisis.push(id);

  plate.querySelector('p').style.display = 'none';
});

// Vérification des choix
checkBtn.addEventListener('click', () => {
  feedback.innerHTML = "<h3>Résultat :</h3>";
  let erreurs = 0;

  alimentsChoisis.forEach(id => {
    if (!alimentData[id].bon) {
      erreurs++;
      feedback.innerHTML += `<p>❌ ${document.getElementById(id)?.textContent || id} n’est pas recommandé. Essayez plutôt : <strong>${alimentData[id].suggestion}</strong>.</p>`;
    } else {
      feedback.innerHTML += `<p>✅ ${document.getElementById(id)?.textContent || id} est un bon choix !</p>`;
    }
  });

  if (erreurs === 0) {
    feedback.innerHTML += "<p style='color: green; font-weight: bold;'>Bravo ! Tous les aliments sont adaptés !</p>";
  } else {
    feedback.innerHTML += `<p style='color: red; font-weight: bold;'>Vous avez ${erreurs} erreur(s). Essayez de faire mieux !</p>`;
  }
});
