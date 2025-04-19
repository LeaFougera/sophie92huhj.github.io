// Détecte le niveau du dossier pour ajuster le chemin vers la barre de navigation
const path = window.location.pathname;
let navPath = "";

// Vérifie si l'URL contient "/pages/" ou "/jeux/"
if (path.includes("/pages/") || path.includes("/jeux/")) {
    navPath = "../composants/barre-navigation.html";  // Remonte d'un dossier pour accéder à "composants"
} else {
    navPath = "composants/barre-navigation.html";  // Utilise ce chemin si on est déjà au bon niveau
}

fetch(navPath)
    .then(response => response.text())
    .then(data => {
        document.getElementById("navbar-placeholder").innerHTML = data;

        // Marquer l'onglet actif automatiquement
        const currentPath = window.location.pathname;
        const links = document.querySelectorAll(".navbar a");

        links.forEach(link => {
            if (link.getAttribute("href") === currentPath) {
                link.classList.add("active");
            }
        });
    })
    .catch(error => {
        console.error('Erreur de chargement de la barre de navigation:', error);
    });
