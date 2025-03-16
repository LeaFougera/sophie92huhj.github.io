import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } 
from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";

// Configuration Firebase (remplace avec tes valeurs Firebase)
const firebaseConfig = {
    apiKey: "AIzaSyBe9WYQR78hwjKfQ0B8O3Dw8arh3y-JJgo",
    authDomain: "projettechnique-54a09.firebaseapp.com",
    projectId: "projettechnique-54a09",
    storageBucket: "projettechnique-54a09.firebasestorage.app",
    messagingSenderId: "889067446339",
    appId: "1:889067446339:web:2d50410506c185d797f4f6",
  };

// Initialisation de Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Gestion de l'inscription
document.addEventListener("DOMContentLoaded", function () {
    const registerForm = document.querySelector("#registerForm");
    if (registerForm) {
        registerForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const email = registerForm.querySelector("input[type='email']").value;
            const password = registerForm.querySelectorAll("input[type='password']")[0].value;
            const confirmPassword = registerForm.querySelectorAll("input[type='password']")[1].value;

            if (password !== confirmPassword) {
                alert("Les mots de passe ne correspondent pas !");
                return;
            }

            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    alert("Compte créé avec succès !");
                    window.location.href = "index.html"; // Redirige vers la connexion
                })
                .catch((error) => {
                    alert(error.message);
                });
        });
    }
});

// Gestion de la connexion
document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.querySelector("#loginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const email = loginForm.querySelector("input[type='email']").value;
            const password = loginForm.querySelector("input[type='password']").value;

            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    alert("Connexion réussie !");
                    window.location.href = "dashboard.html"; // Redirige vers une page après connexion
                })
                .catch((error) => {
                    alert(error.message);
                });
        });
    }
});

// Gestion de la déconnexion
document.addEventListener("DOMContentLoaded", function () {
    const logoutButton = document.getElementById("logout");
    if (logoutButton) {
        logoutButton.addEventListener("click", () => {
            signOut(auth).then(() => {
                alert("Déconnexion réussie !");
                window.location.href = "index.html"; // Retour à la connexion
            }).catch((error) => {
                alert(error.message);
            });
        });
    }
});
