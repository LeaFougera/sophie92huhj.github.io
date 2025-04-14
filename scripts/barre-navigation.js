// Détecte le niveau du dossier pour ajuster le chemin vers la barre de navigation
const path = window.location.pathname;
let navPath = "";

if (path.includes("/pages/")) {
    navPath = "../composants/barre-navigation.html";
} else {
    navPath = "composants/barre-navigation.html";
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
    });
