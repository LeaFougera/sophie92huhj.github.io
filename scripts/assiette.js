const ingredients = document.querySelectorAll('.ingredient');
const plate = document.getElementById('patient-plate');
const feedback = document.getElementById('feedback');
const checkBtn = document.getElementById('check-btn');

// Base de données des aliments
const alimentData = {
  viande: { bon: false, suggestion: "Poisson maigre", category: 'protéine' },
  oeuf: { bon: true, category: 'protéine' },
  sel: { bon: false, suggestion: "Herbes aromatiques", category: 'assaisonnements' },
  courgette: { bon: true, category: 'légume' },
  riz: { bon: false, suggestion: "Riz blanc (moins de phosphore)", category: 'féculent' },
  pain: { bon: true, category: 'féculent' },
  poisson_blanc: { bon: true, category: 'protéine' },
  huile_olive: { bon: true, category: 'assaisonnements' },
  chocolat: { bon: false, suggestion: "Fruits frais comme la pomme", category: 'dessert' },
  pomme: { bon: true, category: 'dessert' },
  poire: { bon: true, category: 'dessert' },
  charcuterie: { bon: false, suggestion: "?", category: 'protéine' },
  pâtes: { bon: true, category: 'féculent' },
  fromages: { bon: false, category: 'protéine' },
  plat_industriel: { bon: false, category: 'protéine' },
  viande_blanche: { bon: true, category: 'protéine' },
  herbes_aromatiques: { bon: true, category: 'assaisonnements' },
  carottes_rape: { bon: true, category: 'entree' },
  chips: { bon: false, suggestion: "Carottes râpées à l’huile d’olive", category: 'entree' },
  yaourt_0: { bon: true, category: 'laitier' },
  fromage: { bon: false, suggestion: "Yaourt 0%", category: 'laitier' },
  fruit: { bon: true, category: 'dessert' },
  chocolat: { bon: false, suggestion: "Un fruit frais", category: 'dessert' },


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
  
  const category = alimentData[id]?.category;

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

  const step4Visible = document.getElementById('step-4')?.style.display === 'block';
  if (step4Visible && category === 'dessert') {
    document.getElementById('check-btn').style.display = 'block';
  }
});

checkBtn.addEventListener('click', () => {
  window.location.href = "resultat_assiette.html";

  // Vérifier si toutes les catégories ont été choisies
  ['entree', 'protéine', 'féculent', 'légume', 'assaisonnements', 'laitier', 'dessert'].forEach(category => {
    if (!categoriesChoisies[category]) {
      categoriesManquantes.push(category);
    }
  });

  // Si une catégorie manque, donner un message
  if (categoriesManquantes.length > 0) {
    feedback.innerHTML += `<p style="color: red;">Il manque des aliments dans les catégories suivantes : ${categoriesManquantes.join(', ')}</p>`;
    erreurs++;
  }

  // Vérification des choix d'aliments
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


let categoriesChoisies = {
  entree: false,
  protéine: false,
  féculent: false,
  légume: false,
  laitier: false,
  dessert: false
};

/*
plate.addEventListener('drop', (e) => {
  e.preventDefault();
  const id = e.dataTransfer.getData('text');
  const ingredient = document.getElementById(id);

  if (!ingredient) return;
  */

  /*// Vérifier si l'aliment appartient à une catégorie déjà choisie
  const category = alimentData[id].category;

  if (categoriesChoisies[category]) {
    alert("Vous avez déjà choisi un aliment de cette catégorie !");
    return;
  }

  // Ajoute l’ingrédient dans l’assiette
  const clone = ingredient.cloneNode(true);
  clone.setAttribute('draggable', false);
  clone.style.margin = '5px';
  plate.appendChild(clone);

  // Supprime de la liste originale
  ingredient.remove();

  // Marque la catégorie comme choisie
  categoriesChoisies[category] = true;

  // Ajoute à la liste des aliments choisis
  alimentsChoisis.push(id);

  plate.querySelector('p').style.display = 'none';
});*/

function nextStep(current) {
  const currentStep = document.getElementById(`step-${current}`);
  const next = document.getElementById(`step-${current + 1}`);
  if (currentStep && next) {
    currentStep.style.display = 'none';
    next.style.display = 'block';
  }
}
