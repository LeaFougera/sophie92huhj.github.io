const ingredients = document.querySelectorAll('.ingredient');
const plate = document.getElementById('patient-plate');
const feedback = document.getElementById('feedback');
const checkBtn = document.getElementById('check-btn');

// Base de données des aliments
const alimentData = {
  viande: { bon: false, category: 'protéine', score_proteine: 1, score_sel: 0 },
  oeuf: { bon: true, category: 'protéine', score_proteine: 1, score_sel: 0 },
  sel: { bon: false, category: 'assaisonnements', score_proteine: 0, score_sel: 1 },
  courgette: { bon: true, category: 'légume', score_proteine: 0, score_sel: 0 },
  riz: { bon: false, category: 'féculent', score_proteine: 0, score_sel: 0 },
  pain: { bon: true, category: 'féculent', score_proteine: 0, score_sel: 0 },
  poisson_blanc: { bon: true, category: 'protéine', score_proteine: 1, score_sel: 0 },
  huile_olive: { bon: true, category: 'assaisonnements', score_proteine: 0, score_sel: 0 },
  chocolat: { bon: false, category: 'dessert', score_proteine: 0, score_sel: 0 },
  pomme: { bon: true, category: 'dessert', score_proteine: 0, score_sel: 0 },
  poire: { bon: true, category: 'dessert', score_proteine: 0, score_sel: 0 },
  charcuterie: { bon: false, category: 'protéine', score_proteine: 1, score_sel: 1 },
  pâtes: { bon: true, category: 'féculent', score_proteine: 0, score_sel: 0 },
  fromages: { bon: false, category: 'protéine', score_proteine: 1, score_sel: 1 },
  plat_industriel: { bon: false, category: 'protéine', score_proteine: 1, score_sel: 1 },
  viande_blanche: { bon: true, category: 'protéine', score_proteine: 1, score_sel: 0 },
  herbes_aromatiques: { bon: true, category: 'assaisonnements', score_proteine: 0, score_sel: 0 },
  carottes_rape: { bon: true, category: 'entree', score_proteine: 0, score_sel: 0 },
  chips: { bon: false, category: 'entree', score_proteine: 0, score_sel: 1 },
  yaourt_0: { bon: true, category: 'dessert', score_proteine: 0, score_sel: 0 },
  fromage: { bon: false, category: 'dessert', score_proteine: 0, score_sel: 1 },
  fruit: { bon: true, category: 'dessert', score_proteine: 0, score_sel: 0 },
  chocolat: { bon: false, category: 'dessert', score_proteine: 0, score_sel: 0 },
  
  
  poivre: { bon: false, category: 'assaisonnements', score_proteine: 0, score_sel: 0 },
  mayo: { bon: false, category: 'assaisonnements', score_proteine: 0, score_sel: 0 },
  moutarde: { bon: false, category: 'assaisonnements', score_proteine: 0, score_sel: 1 },
  ketchup: { bon: false, category: 'assaisonnements', score_proteine: 0, score_sel: 0 },
  haricots: { bon: true, category: 'légume', score_proteine: 0, score_sel: 0 },

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

  const step3Visible = document.getElementById('step-3')?.style.display === 'block';
  if (step3Visible && category === 'dessert') {
    document.getElementById('check-btn').style.display = 'block';
  }
});

checkBtn.addEventListener('click', () => {
  window.location.href = "resultat_assiette.html";

  // Vérifier si toutes les catégories ont été choisies
  ['entree', 'protéine', 'féculent', 'légume', 'assaisonnements', 'dessert'].forEach(category => {
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


function nextStep(current) {
  const currentStep = document.getElementById(`step-${current}`);
  const next = document.getElementById(`step-${current + 1}`);
  if (currentStep && next) {
    currentStep.style.display = 'none';
    next.style.display = 'block';
  }
}

function validateAndNextStep(current) {
  if (alimentsChoisis.length === 0) {
    alert("Veuillez ajouter au moins un aliment dans l'assiette avant de continuer !");
    return; // On ne fait rien si l'assiette est vide
  }
  nextStep(current); // Sinon on passe normalement à l'étape suivante
}
