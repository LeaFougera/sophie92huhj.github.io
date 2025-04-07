const conseils = [
    "Bois suffisamment d’eau chaque jour",
    "Fais une pause écran toutes les heures",
    "Mange équilibré et varié",
    "Fais 30 minutes d’exercice par jour",
    "Dors au moins 7 heures par nuit"
  ];
  
  let countdownInterval;
  let startTime;
  
  const displayList = document.getElementById("display-list");
  const dragList = document.getElementById("drag-list");
  const startBtn = document.getElementById("start-btn");
  const countdown = document.getElementById("countdown");
  const timer = document.getElementById("timer");
  const resultEl = document.getElementById("result");
  const dragZone = document.getElementById("drag-zone");
  const validateBtn = document.getElementById("validate-btn");
  
  function shuffle(array) {
    return array.slice().sort(() => Math.random() - 0.5);
  }
  
  function showOrderedList() {
    displayList.innerHTML = "";
    conseils.forEach(text => {
      const li = document.createElement("li");
      li.textContent = text;
      displayList.appendChild(li);
    });
  }
  
  function showShuffledDragList() {
    dragList.innerHTML = "";
    const shuffled = shuffle(conseils);
  
    shuffled.forEach(text => {
      const li = document.createElement("li");
      li.textContent = text;
      li.draggable = true;
      li.addEventListener("dragstart", dragStart);
      li.addEventListener("dragover", dragOver);
      li.addEventListener("drop", drop);
      dragList.appendChild(li);
    });
  }
  
  let draggedEl;
  
  function dragStart(e) {
    draggedEl = e.target;
  }
  
  function dragOver(e) {
    e.preventDefault();
  }
  
  function drop(e) {
    e.preventDefault();
    const list = [...dragList.children];
    const draggedIndex = list.indexOf(draggedEl);
    const targetIndex = list.indexOf(e.target);
  
    if (draggedIndex < targetIndex) {
      dragList.insertBefore(draggedEl, e.target.nextSibling);
    } else {
      dragList.insertBefore(draggedEl, e.target);
    }
  }
  
  function startGame() {
    startBtn.classList.add("hidden");
    resultEl.classList.add("hidden");
    displayList.classList.remove("hidden");
    countdown.classList.remove("hidden");
  
    showOrderedList();
  
    let timeLeft = 10;
    timer.textContent = timeLeft;
    countdownInterval = setInterval(() => {
      timeLeft--;
      timer.textContent = timeLeft;
  
      if (timeLeft <= 0) {
        clearInterval(countdownInterval);
        launchDragPhase();
      }
    }, 1000);
  }
  
  function launchDragPhase() {
    displayList.classList.add("hidden");
    countdown.classList.add("hidden");
    dragZone.classList.remove("hidden");
    showShuffledDragList();
    startTime = Date.now();
  }
  
  function validateOrder() {
    const userOrder = [...dragList.children].map(li => li.textContent);
    let score = 0;
  
    userOrder.forEach((item, i) => {
      if (item === conseils[i]) score++;
    });
  
    resultEl.textContent = `🎯 Score : ${score} / ${conseils.length} bons placements`;
    resultEl.classList.remove("hidden");
  
    const previous = parseInt(localStorage.getItem("bestScoreConseils")) || 0;
    if (score > previous) {
      localStorage.setItem("bestScoreConseils", score);
    }
  }
  
  startBtn.addEventListener("click", startGame);
  validateBtn.addEventListener("click", validateOrder);
  