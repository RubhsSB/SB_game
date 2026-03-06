// =======================
// LISTAS DE PALABRAS Y DATOS
// =======================

let baseWords = [];
let customWords = [];
let words = []; // Combinación de base y custom

const familyPrefixes = ["JHERSY", "CyC", "K_ELDE", "EyG", "CyT", "JyE", "DyY", "YyE", "VyA", "Stefy"];

// =======================
// VARIABLES DE JUEGO
// =======================
let wordsQueue = [];
let currentWord = "";
let startTime = 0;
let totalTime = 0;
let wordCount = 0;
let timerInterval;
let gameMode = "easy";

const wordElement = document.getElementById("word");
const playButton = document.getElementById("play");
const nextButton = document.getElementById("next");
const finishButton = document.getElementById("finish");
const resultElement = document.getElementById("result");
const counterElement = document.getElementById("counter");
const timerElement = document.getElementById("timer");
const easyButton = document.getElementById("easy");
const hardButton = document.getElementById("hard");
const familyButton = document.getElementById("family");
const familySelect = document.getElementById("family-selector");

// =======================
// INICIALIZACIÓN
// =======================
window.addEventListener("load", async () => {
  gameMode = "easy";
  updateLevelButtons();
  document.getElementById("family-selector-container").style.display = "none";

  // Cargar custom words desde LocalStorage
  const savedCustom = localStorage.getItem('sbg_custom_words');
  if (savedCustom) {
    try { customWords = JSON.parse(savedCustom); } catch (e) { customWords = []; }
  }

  // Cargar palabras base desde JSON
  try {
    const response = await fetch('words.json');
    baseWords = await response.json();
  } catch (e) {
    console.error("Error cargando words.json", e);
    // Fallback vacio en caso de error
    baseWords = [];
  }

  updateWordsList();
  renderCustomWords();

  familyPrefixes.forEach(prefix => {
    const option = document.createElement("option");
    option.value = option.textContent = prefix;
    familySelect.appendChild(option);
  });

  playButton.style.display = "inline-block";
  nextButton.style.display = "none";
  finishButton.style.display = "none";
});

function updateWordsList() {
  words = [...new Set([...baseWords, ...customWords])];
}

[easyButton, hardButton, familyButton].forEach((btn, i) => {
  btn.addEventListener("click", () => {
    gameMode = ["easy", "hard", "family"][i];
    updateLevelButtons();
    document.getElementById("family-selector-container").style.display = gameMode === "family" ? "block" : "none";
    resetBoard();
  });
});

familySelect.addEventListener("change", () => {
  if (gameMode === "family") resetBoard();
});

function updateLevelButtons() {
  [easyButton, hardButton, familyButton].forEach(btn => btn.classList.remove("active"));
  if (gameMode === "easy") easyButton.classList.add("active");
  if (gameMode === "hard") hardButton.classList.add("active");
  if (gameMode === "family") familyButton.classList.add("active");
}

function resetBoard() {
  stopTimer();
  wordElement.innerHTML = `<span class="main-text">Presiona Play para comenzar</span>`;
  counterElement.textContent = `Palabras: 0`;
  timerElement.textContent = `Tiempo: 0.0s`;
  resultElement.textContent = ``;

  playButton.style.display = "inline-block";
  nextButton.style.display = "none";
  finishButton.style.display = "none";
  nextButton.disabled = false;
  finishButton.disabled = false;
}

// =======================
// LÓGICA DE BOLSA (AGOTAR LISTA)
// =======================
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function refillQueue() {
  if (gameMode === "easy" || gameMode === "family") {
    let source = [];
    if (gameMode === "easy") {
      source = [...words];
    } else {
      const prefix = familySelect.value;
      source = words.filter(w => w.startsWith(prefix));
    }
    wordsQueue = shuffle(source);
  }
}

let lastWord = "";

function getNextWord() {
  if (gameMode === "hard") {
    if (words.length === 0) return null;
    let newWord;
    let attempts = 0;
    do {
      newWord = words[Math.floor(Math.random() * words.length)];
      attempts++;
    } while (newWord === lastWord && words.length > 1 && attempts < 10);
    lastWord = newWord;
    return newWord;
  }

  if (wordsQueue.length === 0) {
    if (gameMode === "family") {
      refillQueue();
      if (wordsQueue.length === 0) return null;
    } else {
      return null; // Fin de lista para EASY
    }
  }

  const word = wordsQueue.shift();
  lastWord = word;
  return word;
}

function formatWordDisplay(word) {
  const match = word.match(/^(.*?)\s*(\([^)]+\))?$/);
  const main = match[1];
  const par = match[2] || "";
  return `<span class="main-text">${main.trim()}</span>${par ? `<br><span class="parenthesis">${par}</span>` : ""}`;
}

// =======================
// CRONÓMETRO CON SEMÁFORO
// =======================
function startTimer() {
  timerInterval = setInterval(() => {
    const timeInSeconds = (Date.now() - startTime) / 1000;
    const currentTime = timeInSeconds.toFixed(1);
    timerElement.textContent = `Tiempo: ${currentTime}s`;

    timerElement.classList.remove("timer-green", "timer-yellow", "timer-red", "timer-blink");

    if (timeInSeconds < 2) {
      timerElement.classList.add("timer-green");
    } else if (timeInSeconds >= 2 && timeInSeconds < 4) {
      timerElement.classList.add("timer-yellow");
    } else if (timeInSeconds >= 4 && timeInSeconds < 8) {
      timerElement.classList.add("timer-red");
    } else if (timeInSeconds >= 8) {
      timerElement.classList.add("timer-red", "timer-blink");
    }
  }, 100);
}

function stopTimer() {
  clearInterval(timerInterval);
  timerElement.classList.remove("timer-green", "timer-yellow", "timer-red", "timer-blink");
}

// =======================
// ACCIONES DE BOTONES
// =======================
function saveHighScore(averageTime, wordCount) {
  const key = gameMode + "HighScores";
  let scores = JSON.parse(localStorage.getItem(key)) || [];
  scores.push({ averageTime, wordCount });
  scores.sort((a, b) => a.averageTime - b.averageTime);
  localStorage.setItem(key, JSON.stringify(scores.slice(0, 10)));
}

playButton.addEventListener("click", () => {
  if (words.length === 0) {
    alert("No hay figuras cargadas todavía.");
    return;
  }

  wordsQueue = [];
  refillQueue();
  lastWord = "";

  // Guardar total antes de empezar para el contador
  totalInQueue = wordsQueue.length || words.length;

  currentWord = getNextWord();
  if (!currentWord) return;

  wordElement.innerHTML = formatWordDisplay(currentWord);
  if (gameMode !== "hard") {
    updateProgressDisplay(1);
  } else {
    resultElement.textContent = "";
  }

  startTime = Date.now();
  wordCount = 0;
  totalTime = 0;
  counterElement.textContent = `Palabras: ${wordCount}`;

  playButton.style.display = "none";
  nextButton.disabled = false;
  nextButton.style.display = "inline-block";
  finishButton.disabled = false;
  finishButton.style.display = "inline-block";

  startTimer();
});

nextButton.addEventListener("click", () => {
  if (playButton.style.display !== "none" && nextButton.disabled) return;

  const endTime = Date.now();
  totalTime += (endTime - startTime) / 1000;
  wordCount++;
  counterElement.textContent = `Palabras: ${wordCount}`;

  currentWord = getNextWord();

  if (currentWord === null) {
    stopTimer();
    nextButton.disabled = true;
    wordElement.innerHTML = `<span class="main-text" style="color:var(--accent);">🏆 ¡LISTA COMPLETADA!</span><br><span class="parenthesis">Has practicado todo el repertorio</span>`;

    if (wordCount > 0) {
      const averageTime = totalTime / wordCount;
      saveHighScore(averageTime, wordCount);
      resultElement.textContent = `Promedio: ${averageTime.toFixed(2)}s. ¡Excelente repaso!`;
    }
    return;
  }

  wordElement.innerHTML = formatWordDisplay(currentWord);
  if (gameMode !== "hard") {
    updateProgressDisplay(wordCount + 1);
  }
  startTime = Date.now();
});

let totalInQueue = 0;
function updateProgressDisplay(current) {
  if (gameMode === "hard") {
    resultElement.textContent = "";
  } else {
    resultElement.textContent = `Figura ${current} de ${totalInQueue}`;
  }
}

finishButton.addEventListener("click", () => {
  stopTimer();
  if (wordCount > 0) {
    const averageTime = totalTime / wordCount;
    resultElement.textContent = `Promedio: ${averageTime.toFixed(2)}s por palabra.`;
    saveHighScore(averageTime, wordCount);
  }

  playButton.style.display = "inline-block";
  nextButton.style.display = "none";
  finishButton.style.display = "none";
  wordElement.textContent = "Presiona Play para comenzar";
});

// =======================
// GESTO SWIPE (AMBOS LADOS)
// =======================
let touchStartX = 0;

document.addEventListener("touchstart", e => {
  touchStartX = e.changedTouches[0].screenX;
}, { passive: true });

document.addEventListener("touchend", e => {
  // Bloqueo: No permite swipe si no se ha dado a PLAY
  if (playButton.style.display !== "none") return;

  let touchEndX = e.changedTouches[0].screenX;
  let distance = touchEndX - touchStartX;

  if (Math.abs(distance) > 50 && !nextButton.disabled) {
    nextButton.click();
    if (window.navigator.vibrate) window.navigator.vibrate(10);
  }
}, { passive: true })

// =======================
// GESTOR DE FIGURAS
// =======================
const managerModal = document.getElementById("manager-modal");
const openManagerBtn = document.getElementById("open-manager-btn");
const closeManagerBtn = document.getElementById("close-manager-btn");
const addWordBtn = document.getElementById("add-word-btn");
const newWordInput = document.getElementById("new-word-input");
const customWordsList = document.getElementById("custom-words-list");

if (openManagerBtn) {
  openManagerBtn.addEventListener("click", () => {
    managerModal.style.display = "flex";
    renderCustomWords();
  });
}

if (closeManagerBtn) {
  closeManagerBtn.addEventListener("click", () => {
    managerModal.style.display = "none";
  });
}

window.addEventListener("click", (e) => {
  if (e.target === managerModal) {
    managerModal.style.display = "none";
  }
});

if (addWordBtn) {
  addWordBtn.addEventListener("click", () => {
    const newWord = newWordInput.value.trim();
    if (newWord) {
      customWords.push(newWord);
      saveCustomWords();
      newWordInput.value = "";
      updateWordsList();
      renderCustomWords();
    }
  });
}

function deleteCustomWord(index) {
  customWords.splice(index, 1);
  saveCustomWords();
  updateWordsList();
  renderCustomWords();
}

// Global para el onclick
window.deleteCustomWord = deleteCustomWord;

function saveCustomWords() {
  localStorage.setItem('sbg_custom_words', JSON.stringify(customWords));
}

function renderCustomWords() {
  if (!customWordsList) return;
  customWordsList.innerHTML = "";
  if (customWords.length === 0) {
    customWordsList.innerHTML = "<li style='color:#aaa; justify-content:center; background:transparent;'>No has añadido figuras personalizadas.</li>";
    return;
  }
  customWords.forEach((word, index) => {
    const li = document.createElement("li");
    li.innerHTML = `<span>${word}</span> <button class="delete-word-btn" onclick="deleteCustomWord(${index})">❌</button>`;
    customWordsList.appendChild(li);
  });
}
