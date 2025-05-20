    const checkButton = document.getElementById("checkButton");
    checkButton.disabled = true;  
    shuffleDefinitions("part1");

    
    const termes = document.querySelectorAll(".column:first-child .item");
    const definitions = document.querySelectorAll(".column:last-child .item2");
    const resultDiv = document.getElementById("result");

    let selectedTerme = null;
    let selectedDefinition = null;
    let matchedPairs = [];
    let canGoToNextPart = false;
    let erreursAffichage = [];
    let erreurIndex = 0;


    const colors = ["#ffffcc", "#ffccff", "#ffcc99", "#99ccff", "#ccccff"];
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
            1: "Un test sanguin mesure le taux de créatinine pour vérifier la fonction rénale. Il est important de faire un bilan régulier.",
            2: "Un suivi médical régulier aide à garder tes reins en bonne santé en repérant à temps d’éventuels déséquilibres, ce qui permet d’agir tôt et d’éviter que la situation ne se complique..",
            3: "Les reins éliminent les déchets du sang. Boire suffisamment d'eau aide à leur bon fonctionnement.",
            4: "Contrôler ta pression artérielle aide à protéger tes reins. Une alimentation saine et l'exercice sont essentiels.",
            5: "Boire de l'eau régulièrement aide les reins à éliminer les toxines efficacement.",
            6: "La bandelette urinaire permet de détecter des signes de dysfonction rénale tôt.",
            7: "Le DFG (Débit de Filtration Glomérulaire) estime la capacité des reins à filtrer le sang.",
            8: "S'exposer au soleil, dans les heures recommandées, aide à produire de la vitamine D, bénéfique pour les reins et la santé osseuse.",
            9: "Un rein endommagé perd de son efficacité. Prendre soin de ses reins aide à éviter ces problèmes.",
            10: "La maladie rénale est progressive. Un suivi régulier permet de s'adapter pour freiner son évolution (mieux vaut prévenir que guérir !)"
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
    
                // Trouver l'image qui correspond au terme
                const imgElement = document.querySelector(`img[alt="${termeText}"]`);
                const imgClone = imgElement ? imgElement.cloneNode(true) : null;

                // Générer le message d'erreur pédagogique
                let message = `
                    <div class="erreur-item">
                `;  

                if (imgClone) {
                    message += `
                        <div class="erreur-image">
                            ${imgClone.outerHTML}
                        </div>
                    `;
                }

                

                message += `
                        <p><strong>Pas de panique !</strong> Tu t'es juste trompé avec l'image "${termeText}".</p>
                        <p><strong>Voici pourquoi :</strong> ${explication}</p>
                        <p><strong>La bonne association était :</strong> "${bonneDef}".</p>
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
                showModal("Félicitations ! Toutes les associations sont correctes. Tu peux passer à la suite.", false);
            } else {
                erreursAffichage = erreursPart1;
                erreurIndex = 0;
                showModal(erreursAffichage[erreurIndex], true);
            }
            canGoToNextPart = true;
        } else {
            if (erreursPart2.length === 0) {
                showModal("Félicitations ! Toutes les associations de la partie 2 sont correctes.", false);
            } else {
                erreursAffichage = erreursPart2;
                erreurIndex = 0;
                showModal(erreursAffichage[erreurIndex], true);
            }
            localStorage.setItem("scoreFinal", score);
            const scoreEl = document.getElementById("scoreFinalDisplay");
            if (scoreEl) {
              scoreEl.textContent = `Score Final : ${score} / 10`;
              scoreEl.style.display = "block";
            }

            const meilleurScore = parseInt(localStorage.getItem("bestScoreJeu1")) || 0;
            if (score > meilleurScore) {
              localStorage.setItem("bestScoreJeu1", score);
            }

            const finishButton = document.getElementById("finishButton");
            finishButton.style.display = "block";
        
            if (!finishButton.dataset.listenerAdded) {
                finishButton.addEventListener("click", function () {
                    window.location.href = "../jeux/rein3correction.html";
                });
                finishButton.dataset.listenerAdded = "true";
            }
        }
        
    }
    
    

    function showModal(content, isErreur = false) {
        const modal = document.getElementById("customModal");
        const modalText = document.getElementById("modalText");
        modalText.innerHTML = content;
        modal.style.display = "block";
    
        const nextErrorButton = document.getElementById("nextErrorButton");
        const prevErrorButton = document.getElementById("prevErrorButton");
    
        if (isErreur && erreursAffichage.length > 1) {
            nextErrorButton.style.display = "inline-block";
            if (erreurIndex === 0) {
                prevErrorButton.style.display = "none"; 
            } else {
                prevErrorButton.style.display = "inline-block";
            }
        } else {
            nextErrorButton.style.display = "none";
            prevErrorButton.style.display = "none";
        }
    }

    
    document.getElementById("nextErrorButton").addEventListener("click", () => {
        erreurIndex++;
        if (erreurIndex < erreursAffichage.length) {
            showModal(erreursAffichage[erreurIndex], true);

            if (erreurIndex === erreursAffichage.length - 1) {
                nextErrorButton.style.display = "none"; 
            }
            
        } else {
            document.getElementById("customModal").style.display = "none";
            if (canGoToNextPart) {
                document.getElementById("nextPart").style.display = "block";
            }
        }
    });

    document.getElementById("prevErrorButton").addEventListener("click", () => {
        erreurIndex--;
        if (erreurIndex >= 0) {
            showModal(erreursAffichage[erreurIndex], true);
        }
    });
            
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
                    if (canGoToNextPart) {
                        document.getElementById("nextPart").style.display = "block";
                    }
                }
            });
            

                document.getElementById("nextPart").addEventListener("click", () => {
                    if (!canGoToNextPart) return;

                    shuffleDefinitions("part2");
                
                    // Cacher la partie 1
                    document.querySelectorAll(".part1").forEach(el => el.style.display = "none");

                    document.getElementById("checkButton").disabled = true;  

                
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
                
if (currentPart === "part2") {
    if (erreurs.length > 0) {
        showModal(erreurs.join("\n"));
    }

    // Afficher le bouton "Terminer"
    document.getElementById("finishButton").addEventListener("click", function() {
        window.location.href = "../jeux/rein3correction.html"; 
    });
    
} else {
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

function shuffleDefinitions(partClass) {
    const container = document.querySelector(".column:last-child");
    const definitions = Array.from(container.querySelectorAll(`.item2.${partClass}`));

    // Mélanger les définitions
    for (let i = definitions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [definitions[i], definitions[j]] = [definitions[j], definitions[i]];
    }

    definitions.forEach(def => container.appendChild(def));
}


