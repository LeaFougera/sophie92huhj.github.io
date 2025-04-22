document.addEventListener('DOMContentLoaded', () => {
  const selections = JSON.parse(localStorage.getItem('selections')) || [];
  let correctCount = 0;

  const details = {
    "Rein": "Les reins filtrent le sang, éliminent les toxines et régulent l'équilibre hydrique du corps. Chaque jour, ils produisent environ 1,5 litre d’urine.",
    "Vessie": "La vessie est un réservoir musculaire extensible qui peut stocker jusqu’à 500 ml d’urine avant d’être évacuée via l’urètre.",
    "Uretères": "Les uretères sont deux tubes fins qui transportent l'urine des reins à la vessie grâce à des contractions régulières.",
    "Urètre": "L’urètre est le canal par lequel l’urine quitte le corps. Il est court chez la femme et plus long chez l’homme, où il traverse le pénis."
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