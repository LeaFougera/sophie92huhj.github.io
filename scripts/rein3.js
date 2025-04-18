    const termes = document.querySelectorAll(".column:first-child .item");
    const definitions = document.querySelectorAll(".column:last-child .item");
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
    const items = document.querySelectorAll(".item");
    items.forEach(item => {
        if (!item.classList.contains("matched")) {
        if (type === "terme" && item.parentElement.previousElementSibling?.textContent === "Termes") {
            item.classList.remove("selected");
        } else if (type === "definition" && item.parentElement.previousElementSibling?.textContent === "Définitions") {
            item.classList.remove("selected");
        }
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

    document.getElementById("nextPart").addEventListener("click", () => {
    checkMatches(); // vérifie partie 1
    });

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
        
            matchedPairs.forEach(([termeID, defID]) => {
            const termeEl = document.querySelector(`.item[data-id="${termeID}"]`);
            if (termeEl.classList.contains("part2")) currentPart = "part2";
        
            if (termeID === defID) {
                score++;
            } else if (termeEl.classList.contains(currentPart)) {
                const termeText = termeEl.alt || termeEl.textContent.trim();
                const defText = document.querySelector(`.item[data-id="${defID}"]`).textContent.trim();
                const bonneDef = document.querySelector(`.item[data-id="${termeID}"]`).textContent.trim();
                const explication = explications[termeID] || "Pas d'explication disponible.";

                erreurs.push(`❌ "${termeText}" est mal associé à "${defText}".\n✅ Bonne réponse : "${bonneDef}".\nℹ️ ${explication}`);
            }
            });
        
                if (currentPart === "part1") {
                    if (erreurs.length === 0) {
                    showModal("Bravo, on passe à la suite !");
                    } else {
                    showModal(erreurs.join("\n"));
                    }
                
                    // Autoriser l’accès au bouton "Partie suivante"
                    canGoToNextPart = true;
                
                } else {
                
            if (erreurs.length > 0) {
                showModal(erreurs.join("\n"));
            }
            resultDiv.textContent = `Score final : ${score} / 10`;
            }
        }

            function showModal(content) {
                const modal = document.getElementById("customModal");
                const modalText = document.getElementById("modalText");
                modalText.textContent = content;
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
                
