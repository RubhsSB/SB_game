// ======================================================
// DATOS
// ======================================================

let baseWords = [];
let customWords = [];
let words = [];

// Familias detectadas automáticamente
let detectedFamilies = [];


// ======================================================
// VARIABLES DE JUEGO
// ======================================================

let wordsQueue = [];

let currentWord = "";
let lastWord = "";

let startTime = 0;
let totalTime = 0;
let wordCount = 0;

let timerInterval;
let autoNextInterval;

let gameMode = "easy";

let totalInQueue = 0;


// ======================================================
// ELEMENTOS
// ======================================================

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
const timerModeButton = document.getElementById("timer-mode");

const familySelect = document.getElementById("family-selector");

const familySelectorContainer =
  document.getElementById("family-selector-container");

const progressContainer =
  document.getElementById("progress-container");

const progressText =
  document.getElementById("progress-text");

const progressFill =
  document.getElementById("progress-fill");


// ======================================================
// GESTOR
// ======================================================

const managerModal =
  document.getElementById("manager-modal");

const openManagerBtn =
  document.getElementById("open-manager-btn");

const closeManagerBtn =
  document.getElementById("close-manager-btn");

const addWordBtn =
  document.getElementById("add-word-btn");

const newWordInput =
  document.getElementById("new-word-input");

const customWordsList =
  document.getElementById("custom-words-list");


// ======================================================
// INICIALIZACIÓN
// ======================================================

window.addEventListener("load", async () => {

  gameMode = "easy";


  // -----------------------------
  // CARGAR PERSONALIZADAS
  // -----------------------------

  const savedCustom =
    localStorage.getItem("sbg_custom_words");

  if (savedCustom) {

    try {

      customWords =
        JSON.parse(savedCustom);

    } catch (error) {

      customWords = [];

    }

  }


  // -----------------------------
  // CARGAR WORDS.JSON
  // -----------------------------

  try {

    const response =
      await fetch("words.json");

    if (!response.ok) {
      throw new Error("No se pudo cargar words.json");
    }

    baseWords =
      await response.json();

  } catch (error) {

    console.error(
      "Error cargando words.json:",
      error
    );

    baseWords = [];

  }


  // Combinar palabras

  updateWordsList();


  // Detectar familias

  detectFamilies();


  // Crear selector

  populateFamilySelector();


  // Gestor

  renderCustomWords();


  // Pantalla inicial

  updateLevelButtons();

  resetBoard();

});


// ======================================================
// COMBINAR BASE + PERSONALIZADAS
// ======================================================

function updateWordsList() {

  /*
    Elimina duplicados EXACTOS.

    Por ejemplo, si:
    YAKO (Sensual + MAMBO)

    aparece dos veces, solo se utilizará una.
  */

  words = [
    ...new Set([
      ...baseWords,
      ...customWords
    ])
  ];

}


// ======================================================
// DETECTAR FAMILIAS AUTOMÁTICAMENTE
// ======================================================

function detectFamilies() {

  const familiesMap = new Map();


  words.forEach(word => {

    const family =
      extractFamily(word);

    if (!family) return;


    /*
      Usamos minúsculas internamente para que:

      JHERSY
      Jhersy
      jhersy

      sean la misma familia.
    */

    const normalized =
      family.toLowerCase();


    /*
      Conservamos la primera forma encontrada
      para mostrarla en el selector.
    */

    if (!familiesMap.has(normalized)) {

      familiesMap.set(
        normalized,
        family
      );

    }

  });


  detectedFamilies =
    Array.from(
      familiesMap.values()
    );


  // Orden alfabético

  detectedFamilies.sort(
    (a, b) =>
      a.localeCompare(
        b,
        "es",
        {
          sensitivity: "base"
        }
      )
  );

}


// ======================================================
// EXTRAER FAMILIA DE UNA FIGURA
// ======================================================

function extractFamily(word) {

  if (
    typeof word !== "string"
  ) {
    return null;
  }


  const clean =
    word.trim();


  if (!clean) {
    return null;
  }


  /*
    CASO 1
    ------

    Nombre seguido de paréntesis.

    Ejemplos:

    JHERSY (Diagonal)
    CyC (Chaca Chaca)
    GABO (J&J Exorcista)
    ARGENI (Preparar FOLLOW...)

    Resultado:

    JHERSY
    CyC
    GABO
    ARGENI
  */

  const parenthesisMatch =
    clean.match(
      /^(.+?)\s*\(/
    );


  if (parenthesisMatch) {

    const possibleFamily =
      parenthesisMatch[1].trim();


    /*
      Evitamos considerar como familia
      textos excesivamente largos.
    */

    if (
      possibleFamily.length <= 25
    ) {

      return possibleFamily;

    }

  }


  /*
    CASO 2
    ------

    Nombre seguido de " - "

    Ejemplos:

    JHERSY - Intro
    YAKO - Dominicana
    MARIO - Intro

    Resultado:

    JHERSY
    YAKO
    MARIO
  */

  const dashMatch =
    clean.match(
      /^(.+?)\s+-\s+/
    );


  if (dashMatch) {

    const possibleFamily =
      dashMatch[1].trim();


    if (
      possibleFamily.length <= 25
    ) {

      return possibleFamily;

    }

  }


  /*
    CASO 3
    ------

    Figuras conocidas por otras palabras
    de la misma familia.

    Por ejemplo, si existe:

    JHERSY (Diagonal)

    entonces:

    JHERSY Intro
    JHERSY pasos

    también deben pertenecer a JHERSY.

    Para eso comprobamos familias que ya
    podemos identificar claramente.
  */

  const knownFamilies =
    getClearlyDetectedFamilies();


  for (
    const family of knownFamilies
  ) {

    if (
      belongsToFamily(
        clean,
        family
      )
    ) {

      return family;

    }

  }


  /*
    Si no podemos saber con seguridad
    que el inicio es una familia,
    NO inventamos una.

    Así:

    Daniel y Alma
    MARCO ESPEJO
    SALIDA después media DIAGONAL
    TITANIC
    SUAVE

    continúan siendo figuras normales.
  */

  return null;

}


// ======================================================
// OBTENER FAMILIAS CLARAMENTE IDENTIFICABLES
// ======================================================

function getClearlyDetectedFamilies() {

  const map =
    new Map();


  words.forEach(word => {

    if (
      typeof word !== "string"
    ) {
      return;
    }


    const clean =
      word.trim();


    // -------------------------
    // POR PARÉNTESIS
    // -------------------------

    const parenthesisMatch =
      clean.match(
        /^(.+?)\s*\(/
      );


    if (parenthesisMatch) {

      const family =
        parenthesisMatch[1].trim();


      if (
        family.length <= 25
      ) {

        const normalized =
          family.toLowerCase();


        if (
          !map.has(normalized)
        ) {

          map.set(
            normalized,
            family
          );

        }

      }

    }


    // -------------------------
    // POR GUION
    // -------------------------

    const dashMatch =
      clean.match(
        /^(.+?)\s+-\s+/
      );


    if (dashMatch) {

      const family =
        dashMatch[1].trim();


      if (
        family.length <= 25
      ) {

        const normalized =
          family.toLowerCase();


        if (
          !map.has(normalized)
        ) {

          map.set(
            normalized,
            family
          );

        }

      }

    }

  });


  return Array.from(
    map.values()
  );

}


// ======================================================
// COMPROBAR SI UNA FIGURA PERTENECE A UNA FAMILIA
// ======================================================

function belongsToFamily(
  word,
  family
) {

  if (
    !word ||
    !family
  ) {
    return false;
  }


  const normalizedWord =
    word
      .trim()
      .toLowerCase();


  const normalizedFamily =
    family
      .trim()
      .toLowerCase();


  /*
    Tiene que comenzar exactamente
    por el nombre de la familia.
  */

  if (
    !normalizedWord.startsWith(
      normalizedFamily
    )
  ) {

    return false;

  }


  /*
    Si fueran exactamente iguales:
    también pertenece.
  */

  if (
    normalizedWord ===
    normalizedFamily
  ) {

    return true;

  }


  /*
    Miramos qué viene justo después
    del nombre.

    Aceptamos:

    espacio
    (
    -
    :
  */

  const nextCharacter =
    normalizedWord.charAt(
      normalizedFamily.length
    );


  return (
    nextCharacter === " " ||
    nextCharacter === "(" ||
    nextCharacter === "-" ||
    nextCharacter === ":"
  );

}


// ======================================================
// CREAR SELECTOR DE FAMILIAS
// ======================================================

function populateFamilySelector() {

  const previousSelection =
    familySelect.value;


  familySelect.innerHTML =
    "";


  detectedFamilies.forEach(
    family => {

      const option =
        document.createElement(
          "option"
        );


      option.value =
        family;


      /*
        Añadimos el número de figuras
        de esa familia.

        Ejemplo:

        JHERSY (42)
        CyC (12)
      */

      const count =
        words.filter(
          word =>
            belongsToFamily(
              word,
              family
            )
        ).length;


      option.textContent =
        `${family} (${count})`;


      familySelect.appendChild(
        option
      );

    }
  );


  /*
    Intentamos mantener la selección
    anterior si sigue existiendo.
  */

  if (
    previousSelection &&
    detectedFamilies.some(
      family =>
        family.toLowerCase() ===
        previousSelection.toLowerCase()
    )
  ) {

    familySelect.value =
      detectedFamilies.find(
        family =>
          family.toLowerCase() ===
          previousSelection.toLowerCase()
      );

  }

}


// ======================================================
// OBTENER FIGURAS DE LA FAMILIA SELECCIONADA
// ======================================================

function getFamilyWords() {

  const selectedFamily =
    familySelect.value;


  if (!selectedFamily) {

    return [];

  }


  return words.filter(
    word =>
      belongsToFamily(
        word,
        selectedFamily
      )
  );

}


// ======================================================
// CAMBIO DE MODO
// ======================================================

[
  easyButton,
  hardButton,
  familyButton,
  timerModeButton

].forEach(
  (button, index) => {

    button.addEventListener(
      "click",
      () => {

        /*
          No cambiamos de modo
          durante una partida.
        */

        if (
          playButton.style.display ===
          "none"
        ) {

          return;

        }


        gameMode = [
          "easy",
          "hard",
          "family",
          "timer"
        ][index];


        updateLevelButtons();

        resetBoard();

      }
    );

  }
);


// ======================================================
// CAMBIO DE FAMILIA
// ======================================================

familySelect.addEventListener(
  "change",
  () => {

    if (
      gameMode === "family" &&
      playButton.style.display !== "none"
    ) {

      resetBoard();

    }

  }
);


// ======================================================
// BOTONES DE NIVEL
// ======================================================

function updateLevelButtons() {

  [
    easyButton,
    hardButton,
    familyButton,
    timerModeButton

  ].forEach(
    button =>
      button.classList.remove(
        "active"
      )
  );


  if (gameMode === "easy") {
    easyButton.classList.add("active");
  }


  if (gameMode === "hard") {
    hardButton.classList.add("active");
  }


  if (gameMode === "family") {
    familyButton.classList.add("active");
  }


  if (gameMode === "timer") {
    timerModeButton.classList.add("active");
  }


  familySelectorContainer.style.display =
    gameMode === "family"
      ? "block"
      : "none";


  /*
    HARD es infinito/aleatorio,
    por eso no mostramos progreso.
  */

  progressContainer.style.display =
    gameMode === "hard"
      ? "none"
      : "block";

}


// ======================================================
// RESETEAR PANTALLA
// ======================================================

function resetBoard() {

  stopTimer();
  stopAutoNext();


  wordsQueue = [];

  currentWord = "";
  lastWord = "";

  wordCount = 0;
  totalTime = 0;
  totalInQueue = 0;


  wordElement.innerHTML = `
    <span class="main-text">
      Presiona Play para comenzar
    </span>
  `;


  counterElement.textContent =
    "0";


  timerElement.textContent =
    "⏱ 0.0 s";


  timerElement.classList.remove(
    "timer-green",
    "timer-yellow",
    "timer-red",
    "timer-blink"
  );


  resultElement.textContent =
    "";


  playButton.textContent =
    "▶ PLAY";


  playButton.style.display =
    "flex";


  nextButton.style.display =
    "none";

  nextButton.disabled =
    false;


  finishButton.style.display =
    "none";

  finishButton.disabled =
    false;


  updateLevelButtons();

  resetProgressDisplay();

}


// ======================================================
// PROGRESO INICIAL
// ======================================================

function resetProgressDisplay() {

  progressFill.style.width =
    "0%";


  if (gameMode === "easy") {

    progressText.textContent =
      `0 / ${words.length}`;

  }


  else if (
    gameMode === "family"
  ) {

    const familyWords =
      getFamilyWords();


    progressText.textContent =
      `0 / ${familyWords.length}`;

  }


  else if (
    gameMode === "timer"
  ) {

    progressText.textContent =
      `0 / ${words.length}`;

  }


  else {

    progressText.textContent =
      "0 / 0";

  }

}


// ======================================================
// MEZCLAR
// ======================================================

function shuffle(array) {

  for (
    let i = array.length - 1;
    i > 0;
    i--
  ) {

    const j =
      Math.floor(
        Math.random() *
        (i + 1)
      );


    [
      array[i],
      array[j]
    ] = [
      array[j],
      array[i]
    ];

  }


  return array;

}


// ======================================================
// RELLENAR COLA
// ======================================================

function refillQueue() {

  let source = [];


  if (
    gameMode === "easy" ||
    gameMode === "timer"
  ) {

    source =
      [...words];

  }


  else if (
    gameMode === "family"
  ) {

    source =
      getFamilyWords();

  }


  wordsQueue =
    shuffle(
      [...source]
    );

}


// ======================================================
// SIGUIENTE FIGURA
// ======================================================

function getNextWord() {

  // ------------------------------
  // HARD
  // ------------------------------

  if (
    gameMode === "hard"
  ) {

    if (
      words.length === 0
    ) {

      return null;

    }


    let newWord;

    let attempts = 0;


    /*
      Aleatorio pero evitando repetir
      inmediatamente la anterior.
    */

    do {

      newWord =
        words[
          Math.floor(
            Math.random() *
            words.length
          )
        ];


      attempts++;

    }

    while (
      newWord === lastWord &&
      words.length > 1 &&
      attempts < 10
    );


    lastWord =
      newWord;


    return newWord;

  }


  // ------------------------------
  // EASY
  // ------------------------------

  /*
    EASY termina al agotarse.

    No vuelve a rellenar.
  */

  if (
    gameMode === "easy" &&
    wordsQueue.length === 0
  ) {

    return null;

  }


  // ------------------------------
  // TIMER
  // ------------------------------

  if (
    gameMode === "timer" &&
    wordsQueue.length === 0
  ) {

    return null;

  }


  // ------------------------------
  // FAMILY
  // ------------------------------

  /*
    Familia mantiene el comportamiento
    de volver a mezclar al terminar.
  */

  if (
    gameMode === "family" &&
    wordsQueue.length === 0
  ) {

    refillQueue();


    if (
      wordsQueue.length === 0
    ) {

      return null;

    }

  }


  const word =
    wordsQueue.shift();


  lastWord =
    word;


  return word;

}


// ======================================================
// FORMATO VISUAL
// ======================================================

function formatWordDisplay(word) {

  /*
    CASO:

    JHERSY (Diagonal)

    Se muestra:

    JHERSY
    Diagonal
  */

  const parenthesisMatch =
    word.match(
      /^(.*?)\s*\((.*)\)\s*$/
    );


  if (parenthesisMatch) {

    const main =
      parenthesisMatch[1].trim();


    const explanation =
      parenthesisMatch[2].trim();


    return `
      <span class="main-text">
        ${escapeHTML(main)}
      </span>

      <span class="parenthesis">
        ${escapeHTML(explanation)}
      </span>
    `;

  }


  /*
    CASO:

    JHERSY - Intro

    Se muestra:

    JHERSY
    Intro
  */

  const dashMatch =
    word.match(
      /^(.+?)\s+-\s+(.+)$/
    );


  if (dashMatch) {

    const main =
      dashMatch[1].trim();


    const explanation =
      dashMatch[2].trim();


    return `
      <span class="main-text">
        ${escapeHTML(main)}
      </span>

      <span class="parenthesis">
        ${escapeHTML(explanation)}
      </span>
    `;

  }


  /*
    CASO:

    JHERSY Intro
    JHERSY pasos

    Si sabemos que JHERSY es una familia,
    también lo separamos.
  */

  const family =
    findFamilyForWord(word);


  if (family) {

    const rest =
      word
        .substring(
          family.length
        )
        .trim();


    if (rest) {

      return `
        <span class="main-text">
          ${escapeHTML(family)}
        </span>

        <span class="parenthesis">
          ${escapeHTML(rest)}
        </span>
      `;

    }

  }


  /*
    Una figura sin familia:

    TITANIC
    SUAVE
    ENGAÑO
    etc.

    Se muestra grande.
  */

  return `
    <span class="parenthesis">
      ${escapeHTML(word)}
    </span>
  `;

}


// ======================================================
// ENCONTRAR FAMILIA DE UNA FIGURA
// ======================================================

function findFamilyForWord(word) {

  /*
    Ordenamos de mayor a menor longitud.

    Esto evita problemas si algún día
    tenemos familias parecidas.
  */

  const sortedFamilies =
    [...detectedFamilies]
      .sort(
        (a, b) =>
          b.length -
          a.length
      );


  for (
    const family of sortedFamilies
  ) {

    if (
      belongsToFamily(
        word,
        family
      )
    ) {

      return family;

    }

  }


  return null;

}


// ======================================================
// ESCAPAR HTML
// ======================================================

function escapeHTML(text) {

  const div =
    document.createElement("div");


  div.textContent =
    text;


  return div.innerHTML;

}


// ======================================================
// CRONÓMETRO
// ======================================================

function startTimer() {

  clearInterval(
    timerInterval
  );


  timerInterval =
    setInterval(
      () => {

        const timeInSeconds =
          (
            Date.now() -
            startTime
          ) / 1000;


        timerElement.textContent =
          `⏱ ${timeInSeconds.toFixed(1)} s`;


        timerElement.classList.remove(
          "timer-green",
          "timer-yellow",
          "timer-red",
          "timer-blink"
        );


        if (
          timeInSeconds < 2
        ) {

          timerElement.classList.add(
            "timer-green"
          );

        }


        else if (
          timeInSeconds < 4
        ) {

          timerElement.classList.add(
            "timer-yellow"
          );

        }


        else if (
          timeInSeconds < 8
        ) {

          timerElement.classList.add(
            "timer-red"
          );

        }


        else {

          timerElement.classList.add(
            "timer-red",
            "timer-blink"
          );

        }

      },

      100
    );

}


// ======================================================
// PARAR CRONÓMETRO
// ======================================================

function stopTimer() {

  clearInterval(
    timerInterval
  );


  timerElement.classList.remove(
    "timer-green",
    "timer-yellow",
    "timer-red",
    "timer-blink"
  );

}


// ======================================================
// TIMER AUTOMÁTICO
// ======================================================

function startAutoNext() {

  stopAutoNext();


  autoNextInterval =
    setInterval(
      () => {

        if (
          !nextButton.disabled &&
          playButton.style.display === "none"
        ) {

          nextButton.click();

        }

      },

      4000
    );

}


function stopAutoNext() {

  clearInterval(
    autoNextInterval
  );

}


// ======================================================
// ACTUALIZAR PROGRESO
// ======================================================

function updateProgressDisplay(current) {

  if (
    gameMode === "hard" ||
    totalInQueue <= 0
  ) {

    return;

  }


  const visibleCurrent =
    Math.min(
      current,
      totalInQueue
    );


  progressText.textContent =
    `${visibleCurrent} / ${totalInQueue}`;


  const percentage =
    (
      visibleCurrent /
      totalInQueue
    ) * 100;


  progressFill.style.width =
    `${percentage}%`;

}


// ======================================================
// GUARDAR PUNTUACIÓN
// ======================================================

function saveHighScore(
  averageTime,
  numberOfWords
) {

  const key =
    gameMode +
    "HighScores";


  let scores =
    JSON.parse(
      localStorage.getItem(key)
    ) || [];


  scores.push({
    averageTime: averageTime,
    wordCount: numberOfWords
  });


  scores.sort(
    (a, b) =>
      a.averageTime -
      b.averageTime
  );


  localStorage.setItem(
    key,
    JSON.stringify(
      scores.slice(0, 10)
    )
  );

}


// ======================================================
// PLAY
// ======================================================

playButton.addEventListener(
  "click",
  () => {

    if (
      words.length === 0
    ) {

      alert(
        "No hay figuras cargadas."
      );

      return;

    }


    stopTimer();
    stopAutoNext();


    wordsQueue = [];

    lastWord = "";

    wordCount = 0;
    totalTime = 0;

    resultElement.textContent =
      "";

    counterElement.textContent =
      "0";

    timerElement.textContent =
      "⏱ 0.0 s";


    // Crear cola

    if (
      gameMode !== "hard"
    ) {

      refillQueue();

    }


    // Total

    if (
      gameMode === "hard"
    ) {

      totalInQueue = 0;

    }

    else {

      totalInQueue =
        wordsQueue.length;

    }


    // Primera palabra

    currentWord =
      getNextWord();


    if (!currentWord) {

      alert(
        "No hay figuras disponibles para este modo."
      );

      return;

    }


    wordElement.innerHTML =
      formatWordDisplay(
        currentWord
      );


    if (
      gameMode !== "hard"
    ) {

      updateProgressDisplay(1);

    }


    playButton.style.display =
      "none";


    nextButton.disabled =
      false;

    nextButton.style.display =
      "flex";


    finishButton.disabled =
      false;

    finishButton.style.display =
      "flex";


    startTime =
      Date.now();


    startTimer();


    if (
      gameMode === "timer"
    ) {

      startAutoNext();

    }

  }
);


// ======================================================
// SIGUIENTE
// ======================================================

nextButton.addEventListener(
  "click",
  () => {

    if (
      playButton.style.display !==
      "none"
    ) {

      return;

    }


    const endTime =
      Date.now();


    totalTime +=
      (
        endTime -
        startTime
      ) / 1000;


    wordCount++;


    counterElement.textContent =
      wordCount;


    currentWord =
      getNextWord();


    // Lista completada

    if (
      currentWord === null
    ) {

      completeList();

      return;

    }


    wordElement.innerHTML =
      formatWordDisplay(
        currentWord
      );


    if (
      gameMode !== "hard"
    ) {

      updateProgressDisplay(
        wordCount + 1
      );

    }


    startTime =
      Date.now();


    if (
      gameMode === "timer"
    ) {

      startAutoNext();

    }

  }
);


// ======================================================
// LISTA COMPLETADA
// ======================================================

function completeList() {

  stopTimer();
  stopAutoNext();


  nextButton.disabled =
    true;


  if (
    gameMode !== "hard" &&
    totalInQueue > 0
  ) {

    progressText.textContent =
      `${totalInQueue} / ${totalInQueue}`;


    progressFill.style.width =
      "100%";

  }


  let averageTime = 0;


  if (
    wordCount > 0
  ) {

    averageTime =
      totalTime /
      wordCount;


    saveHighScore(
      averageTime,
      wordCount
    );

  }


  wordElement.innerHTML = `

    <span class="main-text">
      COMPLETADO
    </span>

    <span class="parenthesis">
      ${wordCount} figuras
    </span>

  `;


  resultElement.textContent =
    wordCount > 0

      ? `Promedio: ${averageTime.toFixed(2)} s por figura`

      : "";


  timerElement.textContent =
    "✓ COMPLETADO";


  playButton.textContent =
    "↻ JUGAR OTRA VEZ";


  playButton.style.display =
    "flex";


  nextButton.style.display =
    "none";


  finishButton.style.display =
    "none";

}


// ======================================================
// FINALIZAR MANUALMENTE
// ======================================================

finishButton.addEventListener(
  "click",
  () => {

    stopTimer();
    stopAutoNext();


    if (
      wordCount > 0
    ) {

      const averageTime =
        totalTime /
        wordCount;


      resultElement.textContent =
        `Promedio: ${averageTime.toFixed(2)} s por figura`;


      saveHighScore(
        averageTime,
        wordCount
      );

    }


    playButton.textContent =
      "▶ PLAY";


    playButton.style.display =
      "flex";


    nextButton.style.display =
      "none";


    finishButton.style.display =
      "none";


    wordElement.innerHTML = `

      <span class="main-text">
        Presiona Play para comenzar
      </span>

    `;


    timerElement.textContent =
      "⏱ 0.0 s";

  }
);


// ======================================================
// SWIPE
// ======================================================

let touchStartX = 0;


document.addEventListener(
  "touchstart",

  event => {

    touchStartX =
      event.changedTouches[0].screenX;

  },

  {
    passive: true
  }
);


document.addEventListener(
  "touchend",

  event => {

    if (
      playButton.style.display !==
      "none"
    ) {

      return;

    }


    const touchEndX =
      event.changedTouches[0].screenX;


    const distance =
      touchEndX -
      touchStartX;


    if (
      Math.abs(distance) > 50 &&
      !nextButton.disabled
    ) {

      nextButton.click();


      if (
        window.navigator.vibrate
      ) {

        window.navigator.vibrate(
          10
        );

      }

    }

  },

  {
    passive: true
  }
);


// ======================================================
// GESTOR - ABRIR
// ======================================================

if (openManagerBtn) {

  openManagerBtn.addEventListener(
    "click",
    () => {

      managerModal.style.display =
        "flex";


      renderCustomWords();

    }
  );

}


// ======================================================
// GESTOR - CERRAR
// ======================================================

if (closeManagerBtn) {

  closeManagerBtn.addEventListener(
    "click",
    () => {

      managerModal.style.display =
        "none";

    }
  );

}


window.addEventListener(
  "click",
  event => {

    if (
      event.target ===
      managerModal
    ) {

      managerModal.style.display =
        "none";

    }

  }
);


// ======================================================
// AÑADIR FIGURA PERSONALIZADA
// ======================================================

if (addWordBtn) {

  addWordBtn.addEventListener(
    "click",
    () => {

      const newWord =
        newWordInput
          .value
          .trim();


      if (!newWord) {

        return;

      }


      customWords.push(
        newWord
      );


      saveCustomWords();


      newWordInput.value =
        "";


      updateWordsList();


      /*
        IMPORTANTE:

        Si la nueva figura introduce una
        familia nueva, aparecerá automáticamente.
      */

      detectFamilies();

      populateFamilySelector();

      renderCustomWords();

      resetProgressDisplay();

    }
  );

}


// ENTER PARA AÑADIR

if (newWordInput) {

  newWordInput.addEventListener(
    "keydown",
    event => {

      if (
        event.key === "Enter"
      ) {

        addWordBtn.click();

      }

    }
  );

}


// ======================================================
// BORRAR PERSONALIZADA
// ======================================================

function deleteCustomWord(index) {

  customWords.splice(
    index,
    1
  );


  saveCustomWords();

  updateWordsList();

  detectFamilies();

  populateFamilySelector();

  renderCustomWords();

  resetProgressDisplay();

}


window.deleteCustomWord =
  deleteCustomWord;


// ======================================================
// GUARDAR PERSONALIZADAS
// ======================================================

function saveCustomWords() {

  localStorage.setItem(
    "sbg_custom_words",

    JSON.stringify(
      customWords
    )
  );

}


// ======================================================
// MOSTRAR PERSONALIZADAS
// ======================================================

function renderCustomWords() {

  if (!customWordsList) {

    return;

  }


  customWordsList.innerHTML =
    "";


  if (
    customWords.length === 0
  ) {

    const li =
      document.createElement("li");


    li.style.color =
      "#aaa";

    li.style.justifyContent =
      "center";

    li.style.background =
      "transparent";


    li.textContent =
      "No has añadido figuras personalizadas.";


    customWordsList.appendChild(
      li
    );


    return;

  }


  customWords.forEach(
    (word, index) => {

      const li =
        document.createElement("li");


      const span =
        document.createElement("span");


      span.textContent =
        word;


      const deleteButton =
        document.createElement("button");


      deleteButton.className =
        "delete-word-btn";


      deleteButton.textContent =
        "❌";


      deleteButton.addEventListener(
        "click",
        () => {

          deleteCustomWord(
            index
          );

        }
      );


      li.appendChild(
        span
      );


      li.appendChild(
        deleteButton
      );


      customWordsList.appendChild(
        li
      );

    }
  );

}
