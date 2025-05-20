const path = window.location.pathname;
let navPath = "";

if (path.includes("/pages/") || path.includes("/jeux/")) {
    navPath = "../composants/barre-navigation.html";  
} else {
    navPath = "composants/barre-navigation.html";  
}

fetch(navPath)
    .then(response => response.text())
    .then(data => {
        document.getElementById("navbar-placeholder").innerHTML = data;

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
