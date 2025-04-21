document.addEventListener('DOMContentLoaded', () => {
  const selections = JSON.parse(localStorage.getItem('selections')) || [];
  let correctCount = 0;

  const correctionDetails = document.getElementById('correction-details');

  function getExplanation(correct, selectedOrgane, correctOrgane) {
    if (correct) {
      return `La phrase correspond correctement à l'organe ${selectedOrgane}. Les fonctions de cet organe sont bien décrites.`;
    } else {
      const explanation = {
        "Rein": "Les reins filtrent le sang et éliminent les toxines. C'est leur fonction principale.",
        "Vessie": "La vessie stocke l'urine avant son élimination. C'est un organe musculaire.",
        "Uretères": "Les uretères transportent l'urine des reins à la vessie.",
        "Urètre": "L'urètre est le canal qui permet à l'urine de sortir du corps."
      };
      return `La phrase ne correspond pas à ${selectedOrgane}. La bonne réponse est : ${explanation[correctOrgane]}`;
    }
  }

  selections.forEach(selection => {
    const explanation = getExplanation(selection.correct, selection.selectedOrgane, selection.correctOrgane);

    const block = document.createElement("div");
    block.classList.add("correction-block");

    const phrase = document.createElement("p");
    phrase.innerHTML = `<strong>Phrase :</strong> "${selection.phraseText}"`;

    const result = document.createElement("p");
    result.innerHTML = selection.correct
      ? `<span style="color:green;">Bonne réponse</span>`
      : `<span style="color:red;">Mauvaise réponse</span>`;

    const explanationEl = document.createElement("p");
    explanationEl.textContent = explanation;

    block.appendChild(phrase);
    block.appendChild(result);
    block.appendChild(explanationEl);

    correctionDetails.appendChild(block);

    if (selection.correct) {
      correctCount++;
    }
  });

  document.getElementById('score-message').textContent = `Score final : ${correctCount} sur ${selections.length}`;

  document.getElementById('back-btn').addEventListener('click', () => {
    window.location.href = 'rein1.html';
  });
});