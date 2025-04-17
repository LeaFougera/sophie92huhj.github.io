    const termes = document.querySelectorAll(".column:first-child .item");
    const definitions = document.querySelectorAll(".column:last-child .item");
    const resultDiv = document.getElementById("result");

    let selectedTerme = null;
    let selectedDefinition = null;
    let matchedPairs = [];

    const colors = ["#ffadad", "#ffd6a5", "#fdffb6", "#caffbf", "#9bf6ff", "#a0c4ff", "#bdb2ff", "#ffc6ff"];
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

    function checkMatches() {
    let score = 0;

    matchedPairs.forEach(([termeID, defID]) => {
        if (termeID === defID) {
        score++;
        }
    });

    resultDiv.textContent = `Score : ${score} / ${termes.length}`;
    }
