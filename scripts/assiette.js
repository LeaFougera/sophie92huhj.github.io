// Sélectionner les éléments
const ingredients = document.querySelectorAll('.ingredient');
const plates = document.querySelectorAll('.plate');

// Ajouter des événements de glissement sur les ingrédients
ingredients.forEach(ingredient => {
  ingredient.addEventListener('dragstart', (e) => {
    e.dataTransfer.setData('text', e.target.id);
  });
});

// Ajouter un événement de survol pour chaque assiette afin de pouvoir déposer l'aliment
plates.forEach(plate => {
  plate.addEventListener('dragover', (e) => {
    e.preventDefault();
    plate.classList.add('dragover');
  });

  plate.addEventListener('dragleave', () => {
    plate.classList.remove('dragover');
  });

  plate.addEventListener('drop', (e) => {
    e.preventDefault();
    const ingredientId = e.dataTransfer.getData('text');
    const ingredient = document.getElementById(ingredientId);

    // Vérifier la catégorie de l'aliment et afficher un message si l'aliment est bien placé
    if (plate.id === "proteins" && (ingredientId === "viande" || ingredientId === "oeuf" || ingredientId === "poisson")) {
      dropIngredient(ingredient, plate);
    } else if (plate.id === "carbs" && (ingredientId === "riz" || ingredientId === "pain" || ingredientId === "pomme")) {
      dropIngredient(ingredient, plate);
    } else if (plate.id === "fats" && (ingredientId === "huile_olive" || ingredientId === "chocolat")) {
      dropIngredient(ingredient, plate);
    } else {
      alert("Cet aliment ne correspond pas à cette catégorie!");
    }
  });
});

function dropIngredient(ingredient, plate) {
  // Cloner l'élément et l'ajouter à l'assiette
  const clonedIngredient = ingredient.cloneNode(true);
  clonedIngredient.setAttribute('draggable', false);
  clonedIngredient.style.margin = '10px';
  clonedIngredient.style.backgroundColor = '#e0e0e0'; // Changer la couleur une fois déposé
  plate.appendChild(clonedIngredient);

  // Optionnel : Remplacer le texte de l'assiette pour donner un message
  plate.querySelector('p').style.display = 'none';
  plate.querySelector('h3').style.fontSize = '1rem'; // Changer la taille de titre après ajout
}
