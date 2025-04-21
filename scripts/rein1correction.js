document.addEventListener('DOMContentLoaded', () => {
  const selections = JSON.parse(localStorage.getItem('selections')) || [];
  let correctCount = 0;

  const details = {
    "Rein": "Les reins filtrent le sang et éliminent les toxines.",
    "Vessie": "La vessie stocke l'urine avant son élimination.",
    "Uretères": "Les uretères transportent l'urine des reins à la vessie.",
    "Urètre": "L'urètre est le canal qui permet à l'urine de sortir du corps."
  };

  const correctionDetails = document.getElementById('correction-details');

  selections.forEach(sel => {
    const block = document.createElement("div");
    block.innerHTML = `
      <p><strong>Phrase :</strong> "${sel.phraseText}"</p>
      <p>${sel.correct ? "✅ Bonne réponse !" : "❌ Mauvaise réponse."}</p>
      <p>${sel.correct ? details[sel.selectedOrgane] : `Tu as choisi ${sel.selectedOrgane}. Le bon organe est ${sel.correctOrgane} : ${details[sel.correctOrgane]}`}</p>
      <hr>
    `;
    correctionDetails.appendChild(block);
    if (sel.correct) correctCount++;
  });

  document.getElementById("score-message").textContent = `Score final : ${correctCount} sur ${selections.length}`;

  document.getElementById("back-btn").addEventListener("click", () => {
    window.location.href = 'rein1.html';
  });
});