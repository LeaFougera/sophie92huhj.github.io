function formatAlimentName(id) {
  return id
    .replace(/_/g, ' ')
    .replace(/\b\w/g, char => char.toUpperCase());
}


const ingredients = document.querySelectorAll('.ingredient');
ingredients.forEach(ingredient => {
  const id = ingredient.id;
  
});

const plate = document.getElementById('patient-plate');
const feedback = document.getElementById('feedback');
const checkBtn = document.getElementById('check-btn');

// Base de données des aliments
const alimentData = {
  viande_rouge: { bon: false, category: 'protéine', score_proteine: 1, score_sel: 0 },
  oeuf: { bon: true, category: 'protéine', score_proteine: 1, score_sel: 0 },
  sel: { bon: false, category: 'assaisonnements', score_proteine: 0, score_sel: 1 },
  courgette: { bon: true, category: 'légume', score_proteine: 0, score_sel: 0 },
  riz: { bon: false, category: 'féculent', score_proteine: 0, score_sel: 0 },
  pain: { bon: true, category: 'féculent', score_proteine: 0, score_sel: 0 },
  poisson_blanc: { bon: true, category: 'protéine', score_proteine: 1, score_sel: 0 },
  huile_olive: { bon: true, category: 'assaisonnements', score_proteine: 0, score_sel: 0 },
  pomme: { bon: true, category: 'dessert', score_proteine: 0, score_sel: 0 },
  poire: { bon: true, category: 'dessert', score_proteine: 0, score_sel: 0 },
  charcuterie: { bon: false, category: 'protéine', score_proteine: 1, score_sel: 1 },
  pâtes: { bon: true, category: 'féculent', score_proteine: 0, score_sel: 0 },
  plat_industriel: { bon: false, category: 'protéine', score_proteine: 1, score_sel: 1 },
  viande_blanche: { bon: true, category: 'protéine', score_proteine: 1, score_sel: 0 },
  herbes_aromatiques: { bon: true, category: 'assaisonnements', score_proteine: 0, score_sel: 0 },
  carottes_rap: { bon: true, category: 'entree', score_proteine: 0, score_sel: 0 },
  chips: { bon: false, category: 'entree', score_proteine: 0, score_sel: 1 },
  yaourt: { bon: true, category: 'dessert', score_proteine: 0, score_sel: 0 },
  fromage: { bon: false, category: 'dessert', score_proteine: 0, score_sel: 1 },
  poivre: { bon: false, category: 'assaisonnements', score_proteine: 0, score_sel: 0 },
  mayonnaise: { bon: false, category: 'assaisonnements', score_proteine: 0, score_sel: 0 },
  moutarde: { bon: false, category: 'assaisonnements', score_proteine: 0, score_sel: 1 },
  ketchup: { bon: false, category: 'assaisonnements', score_proteine: 0, score_sel: 0 },
  haricots: { bon: true, category: 'légume', score_proteine: 0, score_sel: 0 },
  melon: { bon: true, category: 'légume', score_proteine: 0, score_sel: 0 },
  salade: { bon: true, category: 'légume', score_proteine: 0, score_sel: 0 },
  tofu_nature: { bon: true, category: 'protéine', score_proteine: 1, score_sel: 0 },
  pdt: { bon: false, category: 'féculent', score_proteine: 0, score_sel: 0 },
  pain: { bon: false, category: 'féculent', score_proteine: 0, score_sel: 1 },
  tomate: { bon: true, category: 'légume', score_proteine: 0, score_sel: 0 },
  conserve_petit_pois: { bon: true, category: 'légume', score_proteine: 0, score_sel: 1 },
  creme_vanille : { bon: true, category: 'dessert', score_proteine: 0, score_sel: 0 },


};

let alimentsChoisis = [];

let categoriesChoisies = {
  entree: false,
  protéine: false,
  féculent: false,
  légume: false,
  assaisonnements: false,
  dessert: false
};

let erreurs = 0;

// Drag start
ingredients.forEach(ingredient => {
  ingredient.addEventListener('dragstart', (e) => {
    e.dataTransfer.setData('text', ingredient.id);
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

  // Ajouter clone à l’assiette
  const clone = ingredient.cloneNode(true);
  clone.setAttribute('draggable', false);

  clone.style.margin = '5px';
  plate.appendChild(clone);

  // Supprimer de la source
  ingredient.remove();

  // Ajouter aux aliments choisis
  alimentsChoisis.push(id);

  // Marquer la catégorie comme choisie
  if (category) {
    categoriesChoisies[category] = true;
  }

  // Masquer le texte d’aide dans l’assiette
  plate.querySelector('p').style.display = 'none';

  // Afficher bouton validation si en étape 3 et dessert ajouté
  const step3Visible = document.getElementById('step-3')?.classList.contains('active');
  if (step3Visible) {
    checkBtn.style.display = 'block';
  }  
});

// Bouton de vérification
checkBtn.addEventListener('click', () => {
  let totalProteine = 0;
  let totalSel = 0;

  alimentsChoisis.forEach(id => {
    const aliment = alimentData[id];
    if (aliment) {
      totalProteine += aliment.score_proteine || 0;
      totalSel += aliment.score_sel || 0;
    }
  });

  localStorage.setItem('score_proteine', totalProteine);
  localStorage.setItem('score_sel', totalSel);

  localStorage.setItem('jeu2Complete', 'true');

  // Affiche la fenêtre popup
  document.getElementById("popup").style.display = "flex";

  // Affichage des scores dans la popup
  const proteine = parseInt(localStorage.getItem('score_proteine'), 10) || 0;
  const sel = parseInt(localStorage.getItem('score_sel'), 10) || 0;

  document.getElementById('score-proteine').textContent = `Score protéines : ${proteine}`;
  document.getElementById('score-sel').textContent = `Score sel : ${sel}`;

  let message = '';
  if (proteine == 1 && sel == 1) {
    message = 'Bon choix alimentaire !';
  } else if  (proteine <1 && sel <1) {
    message = 'Excellent choix alimentaire !';
  } else if (proteine <= 1 && sel > 1) {
    message = '⚠️ Protéines OK, mais trop de sel dans l’assiette.';
  } else if (proteine > 1 && sel <= 1) {
    message = '⚠️ Sel OK, mais trop de protéines dans l’assiette.';
  } else if (proteine > 1 && sel > 1) {
    message = '⚠️ Attention, trop de protéines et trop de sel dans l’assiette.';
  } else {
    message = 'Assiette correcte, mais peut être améliorée.';
  }

  document.getElementById('message-feedback').textContent = message;

  // Cacher le bouton valider 
  checkBtn.classList.add('hidden');

  // Nettoyer après affichage
  localStorage.removeItem('score_proteine');
  localStorage.removeItem('score_sel');

});


// Navigation entre étapes
function nextStep(current) {
  const currentStep = document.getElementById(`step-${current}`);
  const next = document.getElementById(`step-${current + 1}`);
  if (currentStep && next) {
    currentStep.style.display = 'none';
    next.style.display = 'block';
    next.classList.add('active');
  }
}

function validateAndNextStep(current) {
  if (alimentsChoisis.length === 0) {
    alert("Veuillez ajouter au moins un aliment dans l'assiette avant de continuer !");
    return;
  }
  nextStep(current);
}



document.getElementById("start-assiette-btn").addEventListener("click", function() {
  // Cacher l'introduction
  document.getElementById("intro-wrapper").style.display = "none";
  
  // Afficher la première étape
  document.getElementById("step-1").style.display = "block";

  // Afficher l'assiette (plate-container)
  document.querySelector(".plate-container").style.display = "block";

  document.body.style.display = "block";
  document.body.style.alignItems = "";
  document.body.style.justifyContent = "";


});


const tooltip = document.getElementById('tooltip');

document.querySelectorAll('.ingredient').forEach(ingredient => {
  const id = ingredient.id;
  const name = formatAlimentName(id);

  ingredient.addEventListener('mouseover', (e) => {
    tooltip.innerText = name;
    tooltip.style.display = 'block';
  });

  ingredient.addEventListener('mousemove', (e) => {
    tooltip.style.left = e.pageX + 15 + 'px';
    tooltip.style.top = e.pageY + 15 + 'px';
  });

  ingredient.addEventListener('mouseleave', () => {
    tooltip.style.display = 'none';
  });
});
