const questions = [
    {
      question: "Quel est le rôle principal des reins dans le corps humain ?",
      options: ["Produire des globules rouges", "Filtrer le sang et éliminer les toxines", "Produire des hormones qui régulent la croissance", "Maintenir l’équilibre acido-basique du corps"],
      answer: "Filtrer le sang et éliminer les toxines",
      explanation: "Les reins filtrent le sang pour éliminer les déchets et les toxines, formant ainsi l'urine qui est ensuite évacuée par l'urètre. Ils régulent aussi la composition du sang et la pression artérielle, mais leur fonction principale est la filtration du sang."
    },
    {
      question: "Qu'est-ce que la créatinine et pourquoi est-elle importante pour la santé rénale ?",
      options: ["Un minéral essentiel au bon fonctionnement des reins", "Un indicateur clé du bon fonctionnement des reins", "Une toxine éliminée par les reins", "Une hormone produite par les reins pour réguler l’ossature"],
      answer: "Un indicateur clé du bon fonctionnement des reins",
      explanation: "La créatinine est une substance produite par les muscles et éliminée par les reins. Un taux élevé de créatinine dans le sang peut être le signe que les reins ne fonctionnent pas correctement, ce qui en fait un indicateur clé pour surveiller leur santé."
    },
    {
      question: "Quelle est la conséquence d'un débit de filtration glomérulaire (DFG) inférieur à 60 ml/min pendant plus de 3 mois ?",
      options: ["Une meilleure filtration du sang", "Un risque de déshydratation", "Une insuffisance rénale chronique", "Un dysfonctionnement hormonal"],
      answer: "Une insuffisance rénale chronique",
      explanation: "Un DFG inférieur à 60 ml/min pendant plus de trois mois indique une insuffisance rénale chronique (MRC). Cela signifie que les reins ne filtrent plus correctement le sang et que des toxines s'accumulent dans le corps."
    },
    {
      question: "Pourquoi les symptômes de l’insuffisance rénale chronique sont-ils souvent difficiles à détecter ?",
      options: ["Parce qu’ils apparaissent seulement lors d’un stress intense", "Parce que la maladie évolue progressivement sans symptômes visibles", "Parce que les reins compensent rapidement la perte de fonction", "Parce que la dégradation est très rapide et aiguë"],
      answer: "Parce que la maladie évolue progressivement sans symptômes visibles",
      explanation: "L'insuffisance rénale chronique se développe lentement et souvent sans symptômes évidents. Cela rend sa détection difficile, d'où l'importance de surveiller régulièrement la fonction rénale via des tests sanguins."
    },
    {
      question: "Quelle est la principale fonction des uretères ?",
      options: ["Transporter l’urine vers la vessie", "Produire des hormones", "Filtrer les déchets du sang", "Évacuer l'urine hors du corps"],
      answer: "Transporter l’urine vers la vessie",
      explanation: "Les uretères sont des tubes qui transportent l'urine produite par les reins vers la vessie, où elle est stockée avant d'être éliminée par l'urètre."
    },
    {
      question: "Environ combien de temps les reins mettent-ils pour filtrer l'intégralité du sang circulant dans le corps ?",
      options: ["12 heures", "24 heures", "1 heure", "30 minutes"],
      answer: "30 minutes",
      explanation: "Les reins filtrent environ l'intégralité du sang du corps toutes les 30 minutes. Cela permet d'éliminer les déchets et les toxines en continu, maintenant ainsi l'équilibre de l'organisme."
    },
    {
      question: "Quel test permet de mesurer l’efficacité des reins à filtrer le sang ?",
      options: ["Test de la créatinine", "Test de glycémie", "Test de la pression artérielle", "Test urinaire de glucose"],
      answer: "Test de la créatinine",
      explanation: "Le taux de créatinine dans le sang permet d'évaluer la fonction rénale. Ce test est crucial pour calculer le débit de filtration glomérulaire (DFG), qui est un indicateur clé de la capacité des reins à filtrer le sang."
    },
    {
      question: "Qu'est-ce que l'EPO (érythropoïétine), produite par les reins ?",
      options: ["Une enzyme qui aide à digérer les protéines", "Une hormone qui régule la production de globules rouges", "Une toxine éliminée par l'urine", "Une substance qui régule la pression artérielle"],
      answer: "Une hormone qui régule la production de globules rouges",
      explanation: "L'EPO est une hormone produite par les reins qui stimule la fabrication des globules rouges dans la moelle osseuse, ce qui est crucial pour le transport de l'oxygène dans tout le corps."
    }
  ];
  
  let currentQuestion = 0;
  let score = 0;
  
  const questionEl = document.getElementById("question");
  const answersEl = document.getElementById("answers");
  const scoreEl = document.getElementById("score");
  
  function showQuestion() {
    const q = questions[currentQuestion];
    questionEl.textContent = q.question;
    answersEl.innerHTML = "";
  
    q.options.forEach(option => {
      const btn = document.createElement("button");
      btn.textContent = option;
      btn.onclick = () => checkAnswer(btn, option === q.answer);
      answersEl.appendChild(btn);
    });
  }
  
  function checkAnswer(button, isCorrect) {
    const q = questions[currentQuestion];
  
    if (isCorrect) {
      button.classList.add("correct");
      score++;
    } else {
      button.classList.add("wrong");
    }
  
    // Désactiver tous les boutons
    Array.from(answersEl.children).forEach(btn => {
      btn.disabled = true;
      if (btn.textContent === q.answer) {
        btn.classList.add("correct");
      }
    });
  
    // Afficher l'explication
    const explanation = document.createElement("p");
    explanation.textContent = q.explanation;
    explanation.style.marginTop = "20px";
    answersEl.appendChild(explanation);
  
    // Ajouter le bouton "Suivant"
    const nextBtn = document.createElement("button");
    nextBtn.textContent = "Passer à la question suivante";
    nextBtn.style.marginTop = "10px";
    nextBtn.onclick = () => {
      currentQuestion++;
      if (currentQuestion < questions.length) {
        showQuestion();
      } else {
        displayScore();
      }
    };
    answersEl.appendChild(nextBtn);
  }
  
  function displayScore() {
    questionEl.classList.add("hidden");
    answersEl.classList.add("hidden");
    scoreEl.textContent = `Votre score : ${score} / ${questions.length}`;
    scoreEl.classList.remove("hidden");
  
    // Stocker le meilleur score dans le localStorage
    const previousBest = localStorage.getItem("bestScoreQuiz");
    if (!previousBest || score > parseInt(previousBest)) {
      localStorage.setItem("bestScoreQuiz", score);
    }
    localStorage.setItem("maxScoreQuiz", questions.length); // utile pour l'affichage
  }
  
  // Lancement
  showQuestion();
  