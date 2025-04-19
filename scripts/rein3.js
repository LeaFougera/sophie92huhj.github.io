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
            let erreurs = [];
            let currentPart = "part1";
            let currentPartIDs = [];
            let nbErreurs = 0;
        
            matchedPairs.forEach(([termeID, defID]) => {
            const termeEl = document.querySelector(`.item[data-id="${termeID}"]`);
            if (termeEl.classList.contains("part2")) currentPart = "part2";
        
            if (termeID === defID) {
                score++;
            } else if (termeEl.classList.contains(currentPart)) {
                const termeText = termeEl.querySelector("img")?.alt || termeEl.textContent.trim();
                const defText = document.querySelector(`.item2.${currentPart}[data-id="${defID}"]`).textContent.trim();
                const bonneDef = document.querySelector(`.item2.${currentPart}[data-id="${termeID}"]`).textContent.trim();
                const explication = explications[termeID] || "Pas d'explication disponible.";

                const message = `
                    <div class="erreur-item">
                        <p><strong>Tu as fait une erreur ici :</strong> "${termeText}" ne correspond pas à cette définition.</p>
                        <p><strong>Ce qu’il fallait associer :</strong> "${bonneDef}".</p>
                        <p><strong>Pourquoi ?</strong> ${explication}</p>
                    </div>
                `;
                erreurs.push(message);

                nbErreurs++;

                //erreurs.push(`❌ "${termeText}" est mal associé à "${defText}".\n✅ Bonne réponse : "${bonneDef}".\nℹ️ ${explication}`);
            }
            });
        
                if (currentPart === "part1") {
                    if (erreurs.length === 0) {
                    showModal("Félicitations ! Toutes les associations sont correctes. Tu peux passer à la suite.");
                    } else {
                        const compteurErreur = `<div class="erreur-item"><p><strong>Tu as fait ${nbErreurs} erreur${nbErreurs > 1 ? 's' : ''}.</strong></p></div>`;
                        showModal(compteurErreur + erreurs.join("\n"));
                        
                    }
                
                    // Autoriser l’accès au bouton "Partie suivante"
                    canGoToNextPart = true;
                
                } else {
                
            if (erreurs.length > 0) {
                showModal(erreurs.join("\n"));
            }
            //resultDiv.textContent = `Score final : ${score} / 10`;
            localStorage.setItem("scoreFinal", score);

            // Afficher le bouton "Terminer" après la partie 2
            const finishButton = document.getElementById("finishButton");
            finishButton.style.display = "block";
            
            if (!finishButton.dataset.listenerAdded) {
                finishButton.addEventListener("click", function () {
                    window.location.href = "../jeux/resultat.html";
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
    resultDiv.textContent = `Score final : ${score} / 10`;

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


