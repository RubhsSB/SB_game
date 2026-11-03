
"use strict";

// Bachata Trainer: modos E, H, F, T y Repaso.
const STORAGE = {
  custom: "sbg_custom_words",
  reviews: "sbg_review_words",
  timer: "sbg_timer_seconds"
};

let baseWords = [];
let customWords = [];
let words = [];
let detectedFamilies = [];
let reviewWords = [];
let timerSeconds = 4;
let gameMode = "easy";
let reviewMode = false;
let playing = false;
let wordsQueue = [];
let currentWord = "";
let lastWord = "";
let startTime = 0;
let totalTime = 0;
let wordCount = 0;
let totalInQueue = 0;
let timerInterval = null;
let autoNextTimeout = null;
let touchStartX = null;
let reviewSessionWords = [];

const $ = id => document.getElementById(id);

const ui = {
  word: $("word"),
  play: $("play"),
  next: $("next"),
  finish: $("finish"),
  result: $("result"),
  counter: $("counter"),
  timer: $("timer"),
  easy: $("easy"),
  hard: $("hard"),
  family: $("family"),
  timerMode: $("timer-mode"),
  familySelect: $("family-selector"),
  familyContainer: $("family-selector-container"),
  progressContainer: $("progress-container"),
  progressText: $("progress-text"),
  progressFill: $("progress-fill"),
  timerContainer: $("timer-selector-container"),
  timerOptions: [...document.querySelectorAll(".timer-option")],
  mark: $("review-mark-button"),
  reviewCount: $("review-count"),
  openReview: $("open-review-btn"),
  reviewModal: $("review-modal"),
  closeReview: $("close-review-btn"),
  reviewList: $("review-words-list"),
  startReview: $("start-review-btn"),
  reviewIndicator: $("review-mode-indicator"),
  managerModal: $("manager-modal"),
  openManager: $("open-manager-btn"),
  closeManager: $("close-manager-btn"),
  addWord: $("add-word-btn"),
  newWord: $("new-word-input"),
  customList: $("custom-words-list")
};

// ======================================================
// ALMACENAMIENTO
// ======================================================

function loadArray(key) {
  try {
    const value = JSON.parse(localStorage.getItem(key) || "[]");
    return Array.isArray(value)
      ? value.filter(x => typeof x === "string")
      : [];
  } catch (error) {
    console.warn("No se pudo leer", key, error);
    return [];
  }
}

function saveArray(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error("No se pudo guardar", key, error);
  }
}

function normalize(value) {
  return String(value).trim().toLocaleLowerCase("es");
}

// ======================================================
// FIGURAS Y FAMILIAS
// ======================================================

function updateWordsList() {
  words = [...new Set(
    [...baseWords, ...customWords]
      .filter(x => typeof x === "string")
      .map(x => x.trim())
      .filter(Boolean)
  )];
}

function explicitFamily(word) {
  const clean = word.trim();
  const parentheses = clean.match(/^(.+?)\s*\(.+\)\s*$/);
  const dash = clean.match(/^(.+?)\s+-\s+.+$/);
  const family = (parentheses || dash)?.[1]?.trim();

  return family && family.length <= 35 ? family : null;
}

function belongsToFamily(word, family) {
  const a = normalize(word);
  const b = normalize(family);

  if (!b || !a.startsWith(b)) return false;
  if (a.length === b.length) return true;

  return /[\s(:\-]/.test(a.charAt(b.length));
}

function detectFamilies() {
  const map = new Map();

  words.forEach(word => {
    const family = explicitFamily(word);

    if (family && !map.has(normalize(family))) {
      map.set(normalize(family), family);
    }
  });

  detectedFamilies = [...map.values()].sort((a, b) =>
    a.localeCompare(b, "es", { sensitivity: "base" })
  );
}

function findFamilyForWord(word) {
  return [...detectedFamilies]
    .sort((a, b) => b.length - a.length)
    .find(family => belongsToFamily(word, family)) || null;
}

function populateFamilySelector() {
  const previous = normalize(ui.familySelect.value);

  ui.familySelect.replaceChildren();

  detectedFamilies.forEach(family => {
    const option = document.createElement("option");

    option.value = family;

    option.textContent =
      `${family} (${words.filter(w =>
        belongsToFamily(w, family)
      ).length})`;

    ui.familySelect.appendChild(option);
  });

  const existing = detectedFamilies.find(
    f => normalize(f) === previous
  );

  if (existing) {
    ui.familySelect.value = existing;
  }
}

function getFamilyWords() {
  const family = ui.familySelect.value;

  return family
    ? words.filter(w => belongsToFamily(w, family))
    : [];
}

// ======================================================
// FORMATO VISUAL DE LAS FICHAS
// ======================================================

function escapeHTML(text) {
  const div = document.createElement("div");
  div.textContent = String(text);
  return div.innerHTML;
}

function formatWordDisplay(word) {
  const clean = String(word).trim();

  let main = "";
  let detail = "";

  const parentheses = clean.match(/^(.*?)\s*\((.*)\)\s*$/);
  const dash = clean.match(/^(.+?)\s+-\s+(.+)$/);

  if (parentheses) {
    main = parentheses[1].trim();
    detail = parentheses[2].trim();

  } else if (dash) {
    main = dash[1].trim();
    detail = dash[2].trim();

  } else {
    const family = findFamilyForWord(clean);

    if (family && clean.length > family.length) {
      main = clean.slice(0, family.length);
      detail = clean
        .slice(family.length)
        .trim()
        .replace(/^[:\-]\s*/, "");
    }
  }

  if (main && detail) {
    return (
      `<span class="main-text">${escapeHTML(main)}</span>` +
      `<span class="parenthesis">${escapeHTML(detail)}</span>`
    );
  }

  return `<span class="parenthesis">${escapeHTML(clean)}</span>`;
}

// ======================================================
// MEZCLAR FIGURAS
// ======================================================

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
}

// ======================================================
// CRONÓMETRO
// ======================================================

function stopTimer() {
  clearInterval(timerInterval);
  timerInterval = null;

  ui.timer.classList.remove(
    "timer-green",
    "timer-yellow",
    "timer-red",
    "timer-blink"
  );
}

function stopAutoNext() {
  clearTimeout(autoNextTimeout);
  autoNextTimeout = null;
}

function startTimer() {
  stopTimer();

  startTime = Date.now();
  updateTimer();

  timerInterval = setInterval(updateTimer, 100);
}

function updateTimer() {
  if (!playing) return;

  const elapsed = (Date.now() - startTime) / 1000;

  ui.timer.textContent = `⏱ ${elapsed.toFixed(1)} s`;

  ui.timer.classList.remove(
    "timer-green",
    "timer-yellow",
    "timer-red",
    "timer-blink"
  );

  if (elapsed < 2) {
    ui.timer.classList.add("timer-green");

  } else if (elapsed < 4) {
    ui.timer.classList.add("timer-yellow");

  } else if (elapsed < 8) {
    ui.timer.classList.add("timer-red");

  } else {
    ui.timer.classList.add("timer-red", "timer-blink");
  }
}

// ======================================================
// TIMER AUTOMÁTICO: 4, 6 U 8 SEGUNDOS
// ======================================================

function scheduleAutoNext() {
  stopAutoNext();

  if (playing && gameMode === "timer" && !reviewMode) {
    autoNextTimeout = setTimeout(() => {
      if (playing) {
        advanceWord();
      }
    }, timerSeconds * 1000);
  }
}

function updateTimerOptions() {
  ui.timerOptions.forEach(button => {
    const selected =
      Number(button.dataset.seconds) === timerSeconds;

    button.classList.toggle("active", selected);
    button.setAttribute("aria-pressed", String(selected));
  });
}

// ======================================================
// MODOS Y PROGRESO
// ======================================================

function updateLevelButtons() {
  [
    [ui.easy, "easy"],
    [ui.hard, "hard"],
    [ui.family, "family"],
    [ui.timerMode, "timer"]
  ].forEach(([button, mode]) => {
    button.classList.toggle(
      "active",
      !reviewMode && gameMode === mode
    );
  });

  ui.familyContainer.style.display =
    !reviewMode && gameMode === "family"
      ? "block"
      : "none";

  ui.timerContainer.style.display =
    !reviewMode && gameMode === "timer"
      ? "block"
      : "none";

  ui.progressContainer.style.display =
    !reviewMode && gameMode === "hard"
      ? "none"
      : "block";

  ui.reviewIndicator.style.display =
    reviewMode ? "block" : "none";

  ui.timerOptions.forEach(button => {
    button.disabled = playing;
  });

  ui.familySelect.disabled = playing;

  updateTimerOptions();
}

function resetProgressDisplay() {
  ui.progressFill.style.width = "0%";

  const total = reviewMode
    ? reviewWords.length
    : gameMode === "family"
      ? getFamilyWords().length
      : gameMode === "hard"
        ? 0
        : words.length;

  ui.progressText.textContent = `0 / ${total}`;
}

function updateProgressDisplay(current) {
  if (
    totalInQueue <= 0 ||
    (!reviewMode && gameMode === "hard")
  ) {
    return;
  }

  let position = current;

  if (!reviewMode && gameMode === "family") {
    position = ((current - 1) % totalInQueue) + 1;
  }

  position = Math.min(position, totalInQueue);

  ui.progressText.textContent =
    `${position} / ${totalInQueue}`;

  ui.progressFill.style.width =
    `${(position / totalInQueue) * 100}%`;
}

// ======================================================
// MIS REPASOS: CONTADOR Y MARCADOR
// ======================================================

function updateReviewCount() {
  const count = reviewWords.length;

  ui.reviewCount.textContent = String(count);
  ui.reviewCount.style.display = count ? "flex" : "none";

  ui.startReview.disabled = count === 0 || playing;
}

function updateMarkButton() {
  const visible = playing && Boolean(currentWord);

  ui.mark.style.display = visible ? "flex" : "none";

  if (!visible) return;

  const marked = reviewWords.includes(currentWord);

  ui.mark.classList.toggle("marked", marked);

  ui.mark.setAttribute("aria-pressed", String(marked));

  ui.mark.setAttribute(
    "aria-label",
    marked
      ? "Quitar figura de Mis repasos"
      : "Marcar figura para repasar"
  );

  ui.mark.title = marked
    ? "Quitar de Mis repasos"
    : "Guardar para repasar";
}

function saveReviews() {
  saveArray(STORAGE.reviews, reviewWords);

  updateReviewCount();
  updateMarkButton();
  renderReviewWords();
}

function toggleCurrentReview() {
  if (!playing || !currentWord) return;

  const index = reviewWords.indexOf(currentWord);

  if (index >= 0) {
    reviewWords.splice(index, 1);
  } else {
    reviewWords.push(currentWord);
  }

  saveReviews();

  // No modifica el cronómetro ni el cambio automático.
}

// ======================================================
// MIS REPASOS: LISTA DE FIGURAS
// ======================================================

function renderReviewWords() {
  ui.reviewList.replaceChildren();

  if (!reviewWords.length) {
    const li = document.createElement("li");

    li.className = "review-empty";

    li.textContent =
      "No tienes figuras pendientes. " +
      "Marca alguna durante el juego para verla aquí.";

    ui.reviewList.appendChild(li);
    return;
  }

  reviewWords.forEach(word => {
    const li = document.createElement("li");
    li.className = "review-word-item";

    const name = document.createElement("span");
    name.textContent = word;

    const remove = document.createElement("button");

    remove.type = "button";
    remove.className = "review-remove-btn";
    remove.textContent = "×";

    remove.setAttribute(
      "aria-label",
      `Quitar ${word} de Mis repasos`
    );

    remove.addEventListener("click", () => {
      reviewWords = reviewWords.filter(w => w !== word);
      saveReviews();
    });

    li.append(name, remove);
    ui.reviewList.appendChild(li);
  });
}

// ======================================================
// REINICIAR PANTALLA
// ======================================================

function resetBoard() {
  playing = false;

  stopTimer();
  stopAutoNext();

  wordsQueue = [];
  currentWord = "";
  lastWord = "";

  wordCount = 0;
  totalTime = 0;
  totalInQueue = 0;
  reviewSessionWords = [];

  ui.word.innerHTML =
    '<span class="main-text">' +
    'Presiona Play para comenzar' +
    '</span>';

  ui.counter.textContent = "0";
  ui.timer.textContent = "⏱ 0.0 s";
  ui.result.textContent = "";

  ui.play.textContent = "▶ PLAY";
  ui.play.style.display = "flex";

  ui.next.style.display = "none";
  ui.next.disabled = false;

  ui.finish.style.display = "none";
  ui.finish.disabled = false;

  updateLevelButtons();
  resetProgressDisplay();
  updateMarkButton();
  updateReviewCount();
}

// ======================================================
// COLA DE FIGURAS
// ======================================================

function refillQueue() {
  if (reviewMode) {
    wordsQueue = shuffle([...reviewSessionWords]);

  } else if (gameMode === "family") {
    wordsQueue = shuffle([...getFamilyWords()]);

  } else {
    wordsQueue = shuffle([...words]);
  }
}

function getNextWord() {
  // HARD: aleatorio sin repetición consecutiva.
  if (!reviewMode && gameMode === "hard") {
    if (!words.length) return null;

    if (words.length === 1) {
      return words[0];
    }

    const candidates = words.filter(w => w !== lastWord);

    const next =
      candidates[Math.floor(Math.random() * candidates.length)];

    lastWord = next;

    return next;
  }

  // FAMILIA: al terminar una vuelta, vuelve a mezclar.
  if (
    !wordsQueue.length &&
    !reviewMode &&
    gameMode === "family"
  ) {
    refillQueue();

    // Evita repetir entre vueltas.
    if (
      wordsQueue.length > 1 &&
      wordsQueue[0] === lastWord
    ) {
      const swapIndex =
        wordsQueue.findIndex(w => w !== lastWord);

      if (swapIndex > 0) {
        [
          wordsQueue[0],
          wordsQueue[swapIndex]
        ] = [
          wordsQueue[swapIndex],
          wordsQueue[0]
        ];
      }
    }
  }

  const next = wordsQueue.shift() || null;

  if (next) {
    lastWord = next;
  }

  return next;
}

// ======================================================
// MOSTRAR FIGURA
// ======================================================

function showCurrentWord() {
  ui.word.innerHTML = formatWordDisplay(currentWord);

  updateMarkButton();

  if (reviewMode) {
    // Al volver a aparecer en Repaso, deja de estar pendiente.
    if (reviewWords.includes(currentWord)) {
      reviewWords = reviewWords.filter(
        w => w !== currentWord
      );

      saveReviews();
    }
  }

  if (reviewMode || gameMode !== "hard") {
    updateProgressDisplay(wordCount + 1);
  }
}

// ======================================================
// EMPEZAR PARTIDA
// ======================================================

function startGame() {
  if (playing) return;

  if (reviewMode && !reviewSessionWords.length) {
    reviewSessionWords = [...reviewWords];
  }

  if (!reviewMode && !words.length) {
    alert(
      "No hay figuras cargadas. Comprueba words.json."
    );
    return;
  }

  if (reviewMode && !reviewSessionWords.length) {
    alert("No hay figuras pendientes de repaso.");
    return;
  }

  wordsQueue = [];
  currentWord = "";
  lastWord = "";

  wordCount = 0;
  totalTime = 0;

  ui.result.textContent = "";
  ui.counter.textContent = "0";
  ui.timer.textContent = "⏱ 0.0 s";

  if (!reviewMode && gameMode === "hard") {
    totalInQueue = 0;

  } else {
    refillQueue();
    totalInQueue = wordsQueue.length;
  }

  currentWord = getNextWord();

  if (!currentWord) {
    alert(
      "No hay figuras disponibles para este modo."
    );
    return;
  }

  playing = true;

  ui.play.style.display = "none";

  ui.next.style.display = "flex";
  ui.finish.style.display = "flex";

  ui.next.disabled = false;
  ui.finish.disabled = false;

  updateLevelButtons();
  updateReviewCount();
  showCurrentWord();

  startTimer();
  scheduleAutoNext();
}

// ======================================================
// SIGUIENTE FIGURA
// ======================================================

function advanceWord() {
  if (!playing) return;

  stopAutoNext();

  totalTime += (Date.now() - startTime) / 1000;

  wordCount++;
  ui.counter.textContent = String(wordCount);

  currentWord = getNextWord();

  if (!currentWord) {
    completeList();
    return;
  }

  showCurrentWord();
  startTimer();
  scheduleAutoNext();
}

// ======================================================
// GUARDAR PUNTUACIONES
// ======================================================

function saveHighScore() {
  if (reviewMode || wordCount <= 0) return;

  const key = `${gameMode}HighScores`;

  let scores = [];

  try {
    const stored = JSON.parse(
      localStorage.getItem(key) || "[]"
    );

    if (Array.isArray(stored)) {
      scores = stored;
    }

  } catch (error) {
    console.warn(
      "Error leyendo puntuaciones",
      error
    );
  }

  scores.push({
    averageTime: totalTime / wordCount,
    wordCount
  });

  scores = scores
    .filter(s => Number.isFinite(Number(s.averageTime)))
    .sort(
      (a, b) =>
        Number(a.averageTime) - Number(b.averageTime)
    )
    .slice(0, 10);

  try {
    localStorage.setItem(key, JSON.stringify(scores));

  } catch (error) {
    console.error(
      "No se pudieron guardar puntuaciones",
      error
    );
  }
}

// ======================================================
// TERMINAR PARTIDA
// ======================================================

function endGame(completed) {
  if (!playing) return;

  playing = false;

  stopTimer();
  stopAutoNext();

  saveHighScore();

  const average = wordCount
    ? (totalTime / wordCount).toFixed(2)
    : null;

  ui.result.textContent = average
    ? `Promedio: ${average} s por figura`
    : "";

  if (completed) {
    ui.word.innerHTML =
      `<span class="main-text">COMPLETADO</span>` +
      `<span class="parenthesis">${wordCount} figuras</span>`;

    ui.timer.textContent = "✓ COMPLETADO";

    if (
      totalInQueue &&
      (reviewMode || gameMode !== "hard")
    ) {
      ui.progressText.textContent =
        `${totalInQueue} / ${totalInQueue}`;

      ui.progressFill.style.width = "100%";
    }

  } else {
    ui.word.innerHTML =
      '<span class="main-text">' +
      'Presiona Play para comenzar' +
      '</span>';

    ui.timer.textContent = "⏱ 0.0 s";
  }

  ui.play.textContent = completed
    ? "↻ JUGAR OTRA VEZ"
    : "▶ PLAY";

  ui.play.style.display = "flex";
  ui.next.style.display = "none";
  ui.finish.style.display = "none";

  currentWord = "";

  updateMarkButton();
  updateLevelButtons();
  updateReviewCount();

  if (reviewMode) {
    // Una nueva partida de repaso solo incluye
    // las figuras que siguen pendientes.
    reviewSessionWords = [];

    if (completed) {
      reviewMode = false;
      updateLevelButtons();
    }
  }
}

function completeList() {
  endGame(true);
}

// ======================================================
// GESTOR DE FIGURAS PERSONALIZADAS
// ======================================================

function renderCustomWords() {
  ui.customList.replaceChildren();

  if (!customWords.length) {
    const li = document.createElement("li");

    li.textContent =
      "No has añadido figuras personalizadas.";

    li.style.color = "#aaa";

    ui.customList.appendChild(li);
    return;
  }

  customWords.forEach((word, index) => {
    const li = document.createElement("li");

    const span = document.createElement("span");
    span.textContent = word;

    const button = document.createElement("button");

    button.type = "button";
    button.className = "delete-word-btn";
    button.textContent = "❌";

    button.setAttribute(
      "aria-label",
      `Eliminar ${word}`
    );

    button.addEventListener("click", () => {
      customWords.splice(index, 1);

      saveArray(STORAGE.custom, customWords);

      updateWordsList();
      detectFamilies();
      populateFamilySelector();
      renderCustomWords();

      if (!playing) {
        resetProgressDisplay();
      }
    });

    li.append(span, button);
    ui.customList.appendChild(li);
  });
}

// ======================================================
// EVENTOS DE LOS MODOS E, H, F Y T
// ======================================================

[
  [ui.easy, "easy"],
  [ui.hard, "hard"],
  [ui.family, "family"],
  [ui.timerMode, "timer"]
].forEach(([button, mode]) => {
  button.addEventListener("click", () => {
    if (playing) return;

    reviewMode = false;
    gameMode = mode;

    resetBoard();
  });
});

ui.familySelect.addEventListener("change", () => {
  if (!playing && !reviewMode) {
    resetBoard();
  }
});

// ======================================================
// SELECCIÓN DEL TIMER
// ======================================================

ui.timerOptions.forEach(button => {
  button.addEventListener("click", () => {
    if (playing) return;

    const seconds = Number(button.dataset.seconds);

    if (![4, 6, 8].includes(seconds)) return;

    timerSeconds = seconds;

    try {
      localStorage.setItem(
        STORAGE.timer,
        String(seconds)
      );

    } catch (error) {
      console.warn(
        "No se pudo guardar el intervalo",
        error
      );
    }

    updateTimerOptions();
  });
});

// ======================================================
// EVENTOS DE JUEGO
// ======================================================

ui.play.addEventListener("click", startGame);

ui.next.addEventListener("click", advanceWord);

ui.finish.addEventListener("click", () => {
  endGame(false);
});

ui.mark.addEventListener(
  "click",
  toggleCurrentReview
);

// ======================================================
// EVENTOS DE MIS REPASOS
// ======================================================

ui.openReview.addEventListener("click", () => {
  renderReviewWords();
  updateReviewCount();

  ui.reviewModal.style.display = "flex";
});

ui.closeReview.addEventListener("click", () => {
  ui.reviewModal.style.display = "none";
});

ui.startReview.addEventListener("click", () => {
  if (playing || !reviewWords.length) return;

  ui.reviewModal.style.display = "none";

  reviewMode = true;
  reviewSessionWords = [...reviewWords];

  resetBoard();

  reviewSessionWords = [...reviewWords];

  startGame();
});

// ======================================================
// EVENTOS DEL GESTOR
// ======================================================

ui.openManager.addEventListener("click", () => {
  renderCustomWords();

  ui.managerModal.style.display = "flex";
});

ui.closeManager.addEventListener("click", () => {
  ui.managerModal.style.display = "none";
});

window.addEventListener("click", event => {
  if (event.target === ui.managerModal) {
    ui.managerModal.style.display = "none";
  }

  if (event.target === ui.reviewModal) {
    ui.reviewModal.style.display = "none";
  }
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape") {
    ui.managerModal.style.display = "none";
    ui.reviewModal.style.display = "none";
  }
});

// ======================================================
// AÑADIR FIGURA PERSONALIZADA
// ======================================================

ui.addWord.addEventListener("click", () => {
  const word = ui.newWord.value.trim();

  if (!word) return;

  if (!customWords.includes(word)) {
    customWords.push(word);
  }

  saveArray(STORAGE.custom, customWords);

  ui.newWord.value = "";

  updateWordsList();
  detectFamilies();
  populateFamilySelector();
  renderCustomWords();

  if (!playing) {
    resetProgressDisplay();
  }
});

ui.newWord.addEventListener("keydown", event => {
  if (event.key === "Enter") {
    ui.addWord.click();
  }
});

// ======================================================
// DESLIZAR PARA CAMBIAR DE FIGURA
// ======================================================

// No interfiere con botones ni modales.

ui.word.addEventListener(
  "touchstart",
  event => {
    touchStartX =
      event.changedTouches[0].screenX;
  },
  { passive: true }
);

ui.word.addEventListener(
  "touchend",
  event => {
    if (!playing || touchStartX === null) return;

    const delta =
      event.changedTouches[0].screenX - touchStartX;

    touchStartX = null;

    if (Math.abs(delta) > 50) {
      advanceWord();

      if (navigator.vibrate) {
        navigator.vibrate(10);
      }
    }
  },
  { passive: true }
);

// ======================================================
// INICIALIZACIÓN
// ======================================================

window.addEventListener("load", async () => {
  // Cargar figuras personalizadas.
  customWords = loadArray(STORAGE.custom);

  // Cargar figuras pendientes de repaso.
  reviewWords = [
    ...new Set(loadArray(STORAGE.reviews))
  ];

  // Recuperar intervalo de Timer.
  const savedSeconds = Number(
    localStorage.getItem(STORAGE.timer)
  );

  timerSeconds = [4, 6, 8].includes(savedSeconds)
    ? savedSeconds
    : 4;

  // Cargar figuras de words.json.
  try {
    const response = await fetch("words.json");

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();

    if (!Array.isArray(data)) {
      throw new Error(
        "words.json debe contener una lista"
      );
    }

    baseWords = data.filter(
      item => typeof item === "string"
    );

  } catch (error) {
    console.error(
      "Error cargando words.json:",
      error
    );

    baseWords = [];

    ui.result.textContent =
      "No se pudo cargar words.json. " +
      "Comprueba la conexión.";
  }

  // Preparar juego.
  updateWordsList();
  detectFamilies();
  populateFamilySelector();
  renderCustomWords();

  resetBoard();

  updateReviewCount();
  renderReviewWords();
});
