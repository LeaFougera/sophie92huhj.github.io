    const checkButton = document.getElementById("checkButton");
    checkButton.disabled = true;  // Désactive le bouton au début

    
    const termes = document.querySelectorAll(".column:first-child .item");
    const definitions = document.querySelectorAll(".column:last-child .item2");
    const resultDiv = document.getElementById("result");

    let selectedTerme = null;
    let selectedDefinition = null;
    let matchedPairs = [];
    let canGoToNextPart = false;

    const colors = ["#e3ecff", "#bfd7ff", "#a0c4ff", "#7094cc", "#406499"];
    let currentColorIndex = 0;

    termes.forEach(terme => {
    terme.addEventListener("click", () => {
        if (terme.classList.contains("matched")) return;
        resetSelection("terme");
        terme.classList.add("selected");
        selectedTerme = terme;
        tryMatch();
    });
    });

    definitions.forEach(def => {
    def.addEventListener("click", () => {
        if (def.classList.contains("matched")) return;
        resetSelection("definition");
        def.classList.add("selected");
        selectedDefinition = def;
        tryMatch();
    });
    });

    function resetSelection(type) {
        const items = document.querySelectorAll(type === "terme" ? ".item" : ".item2");
        items.forEach(item => {
            if (!item.classList.contains("matched")) {
                item.classList.remove("selected");
            }
        });
    }

    function tryMatch() {
    if (selectedTerme && selectedDefinition) {
        const idTerme = selectedTerme.dataset.id;
        const idDefinition = selectedDefinition.dataset.id;

        const color = colors[currentColorIndex % colors.length];
        currentColorIndex++;

        matchedPairs.push([idTerme, idDefinition]);

        selectedTerme.classList.add("matched");
        selectedDefinition.classList.add("matched");

        selectedTerme.classList.remove("selected");
        selectedDefinition.classList.remove("selected");

        selectedTerme.style.backgroundColor = color;
        selectedDefinition.style.backgroundColor = color;

        selectedTerme = null;
        selectedDefinition = null;


        updateCheckButtonState();

    }
    }



    function checkMatches() {
        if (matchedPairs.length === 0) {
            showModal("Essaye de remplir quelques associations avant de vérifier.");
            return;
        }
    
        const explications = {
            1: "Ce test mesure la créatinine, un déchet filtré par les reins. Un taux élevé peut indiquer une insuffisance rénale.",
            2: "Un suivi médical régulier permet de détecter une dégradation de la fonction rénale à temps.",
            3: "Les reins sont des organes vitaux qui filtrent le sang et produisent l’urine.",
            4: "Une tension artérielle élevée abîme les vaisseaux sanguins dans les reins.",
            5: "Les reins produisent une hormone (EPO) qui stimule la production de globules rouges.",
            6: "La bandelette urinaire permet une détection simple de protéines ou de sang dans l'urine.",
            7: "Le DFG (Débit de Filtration Glomérulaire) estime la capacité des reins à filtrer le sang.",
            8: "La créatinine est un marqueur de la fonction rénale ; son excès est un signe d’insuffisance.",
            9: "Un rein endommagé filtre mal le sang, causant une accumulation de déchets dans l'organisme.",
            10: "L’insuffisance rénale chronique évolue lentement, nécessitant une prise en charge précoce."
        };
    
        let score = 0;
        let erreursPart1 = [];
        let erreursPart2 = [];
        let currentPart = "part1";
        let nbErreursPart1 = 0;
        let nbErreursPart2 = 0;
    
        matchedPairs.forEach(([termeID, defID]) => {
            const termeEl = document.querySelector(`.item[data-id="${termeID}"]`);
            if (termeEl.classList.contains("part2")) currentPart = "part2";
    
            if (termeID === defID) {
                score++;
            } else {
                const termeText = termeEl.querySelector("img")?.alt || termeEl.textContent.trim();
                const defText = document.querySelector(`.item2.${currentPart}[data-id="${defID}"]`).textContent.trim();
                const bonneDef = document.querySelector(`.item2.${currentPart}[data-id="${termeID}"]`).textContent.trim();
                const explication = explications[termeID] || "Pas d'explication disponible.";
    
                const message = `
                    <div class="erreur-item">
                        <p><strong>Tu as fait une erreur ici :</strong> L'image "${termeText}" ne correspond pas à cette définition.</p>
                        <p><strong>Ce qu’il fallait associer :</strong> "${bonneDef}".</p>
                        <p><strong>Pourquoi ?</strong> ${explication}</p>
                    </div>
                `;
    
                if (termeEl.classList.contains("part1")) {
                    erreursPart1.push(message);
                    nbErreursPart1++;
                } else if (termeEl.classList.contains("part2")) {
                    erreursPart2.push(message);
                    nbErreursPart2++;
                }
            }
        });
    
        // Vérification pour la partie 1
        if (currentPart === "part1") {
            if (erreursPart1.length === 0) {
                showModal("Félicitations ! Toutes les associations sont correctes. Tu peux passer à la suite.");
            } else {
                showModal(erreursPart1.join("\n"));
            }
    
            // Autoriser l’accès au bouton "Partie suivante"
            canGoToNextPart = true;
        } else {
            // Vérification pour la partie 2
            if (erreursPart2.length === 0) {
                // Afficher uniquement le message de félicitations pour la partie 2, sans erreurs de la partie 1
                showModal("Félicitations ! Toutes les associations de la partie 2 sont correctes.");
            } else {
                showModal(erreursPart2.join("\n"));
            }
    
            // Si toutes les associations de la partie 2 sont correctes, on n'affiche pas les erreurs de la partie 1
            if (erreursPart2.length === 0) {
                if (erreursPart1.length === 0) {
                    showModal("Félicitations ! Toutes les associations sont correctes.");
                }
            }
    
            // Mettre à jour le score
            localStorage.setItem("scoreFinal", score);
    
            // Afficher toujours le bouton "Terminer"
            const finishButton = document.getElementById("finishButton");
            finishButton.style.display = "block";
    
            if (!finishButton.dataset.listenerAdded) {
                finishButton.addEventListener("click", function () {
                    window.location.href = "../jeux/resultat.html";  // Redirige vers la page "resultat.html"
                });
                finishButton.dataset.listenerAdded = "true";
            }
        }
    }
    
    
    

            function showModal(content) {
                const modal = document.getElementById("customModal");
                const modalText = document.getElementById("modalText");
                modalText.innerHTML = content;
                modal.style.display = "block";
            }
            
            document.querySelector(".close-button").addEventListener("click", () => {
                document.getElementById("customModal").style.display = "none";
            
                if (canGoToNextPart) {
                    document.getElementById("nextPart").style.display = "block";
                }
            });
            
            
            window.addEventListener("click", event => {
                const modal = document.getElementById("customModal");
                if (event.target === modal) {
                modal.style.display = "none";
                }
            });

                document.getElementById("nextPart").addEventListener("click", () => {
                    if (!canGoToNextPart) return;
                
                    // Cacher la partie 1
                    document.querySelectorAll(".part1").forEach(el => el.style.display = "none");

                    document.getElementById("checkButton").disabled = true;  // Désactiver le bouton au début de la partie 2

                
                    // Afficher la partie 2
                    document.querySelectorAll(".part2").forEach(el => {
                    el.style.display = "block";
                    el.classList.add("fade-in");
                    });
                
                    // Cacher le bouton
                    document.getElementById("nextPart").style.display = "none";

                    // On réinitialise
                    canGoToNextPart = false;
                });
                
// Après la vérification des réponses de la partie 2
if (currentPart === "part2") {
    if (erreurs.length > 0) {
        showModal(erreurs.join("\n"));
    }
    //resultDiv.textContent = `Score final : ${score} / 10`;

    // Afficher le bouton "Terminer"
    document.getElementById("finishButton").addEventListener("click", function() {
        window.location.href = "../jeux/resultat.html";  // Redirige vers la page "resultat.html"
    });
    
} else {
    // Assurez-vous que la partie 1 est terminée avant de pouvoir aller à la partie suivante
    if (canGoToNextPart) {
        document.getElementById("nextPart").style.display = "block";
    }
}

function updateCheckButtonState() {
    // Vérifie si toutes les associations ont été faites
    const totalItems = document.querySelectorAll(".item.part1").length;
    const matchedCount = matchedPairs.filter(([termeID, defID]) => {
        const termeEl = document.querySelector(`.item[data-id="${termeID}"]`);
        return termeEl && termeEl.classList.contains("part1");
    }).length;

    // Si toutes les associations sont faites, active le bouton
    checkButton.disabled = matchedCount < totalItems;

    // Vérifie pour la partie 2
    const totalItemsPart2 = document.querySelectorAll(".item.part2").length;
    const matchedCountPart2 = matchedPairs.filter(([termeID, defID]) => {
        const termeEl = document.querySelector(`.item[data-id="${termeID}"]`);
        return termeEl && termeEl.classList.contains("part2");
    }).length;

    // Si toutes les associations de la partie 2 sont faites, active le bouton de la partie 2
    if (document.querySelector(".part2").style.display === "block") {
        document.getElementById("checkButton").disabled = matchedCountPart2 < totalItemsPart2;
    }
}


