// ======================================================
// LISTAS DE PALABRAS Y DATOS
// ======================================================

let baseWords = [];
let customWords = [];
let words = []; // Combinación de base + personalizadas

const familyPrefixes = [
  "JHERSY",
  "CyC",
  "EyG",
  "CyT",
  "JyE",
  "DyY",
  "CyG",
  "VyA",
  "Argeni",
  "Stefy"
];


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
// ELEMENTOS DE LA PÁGINA
// ======================================================

const wordElement =
  document.getElementById("word");

const playButton =
  document.getElementById("play");

const nextButton =
  document.getElementById("next");

const finishButton =
  document.getElementById("finish");

const resultElement =
  document.getElementById("result");

const counterElement =
  document.getElementById("counter");

const timerElement =
  document.getElementById("timer");


const easyButton =
  document.getElementById("easy");

const hardButton =
  document.getElementById("hard");

const familyButton =
  document.getElementById("family");

const timerModeButton =
  document.getElementById("timer-mode");


const familySelect =
  document.getElementById("family-selector");

const familySelectorContainer =
  document.getElementById(
    "family-selector-container"
  );


// NUEVOS ELEMENTOS DE PROGRESO

const progressContainer =
  document.getElementById(
    "progress-container"
  );

const progressText =
  document.getElementById(
    "progress-text"
  );

const progressFill =
  document.getElementById(
    "progress-fill"
  );


// ======================================================
// TIMER AUTOMÁTICO - MODO T
// ======================================================

function startAutoNext() {

  stopAutoNext();

  autoNextInterval =
    setInterval(() => {

      if (
        !nextButton.disabled &&
        playButton.style.display === "none"
      ) {

        nextButton.click();

      }

    }, 4000);

}


function stopAutoNext() {

  clearInterval(autoNextInterval);

}


// ======================================================
// INICIALIZACIÓN
// ======================================================

window.addEventListener(
  "load",
  async () => {

    gameMode = "easy";


    // ------------------------------------------
    // FIGURAS PERSONALIZADAS
    // ------------------------------------------

    const savedCustom =
      localStorage.getItem(
        "sbg_custom_words"
      );


    if (savedCustom) {

      try {

        customWords =
          JSON.parse(savedCustom);

      }

      catch (error) {

        customWords = [];

      }

    }


    // ------------------------------------------
    // CARGAR words.json
    // ------------------------------------------

    try {

      const response =
        await fetch("words.json");


      baseWords =
        await response.json();

    }

    catch (error) {

      console.error(
        "Error cargando words.json",
        error
      );

      baseWords = [];

    }


    // Combinar listas

    updateWordsList();


    // Gestor

    renderCustomWords();


    // ------------------------------------------
    // FAMILIAS
    // ------------------------------------------

    familySelect.innerHTML = "";


    familyPrefixes.forEach(
      prefix => {

        const option =
          document.createElement(
            "option"
          );

        option.value =
          prefix;

        option.textContent =
          prefix;

        familySelect.appendChild(
          option
        );

      }
    );


    // Estado inicial

    updateLevelButtons();

    resetBoard();

  }
);


// ======================================================
// COMBINAR FIGURAS BASE + PERSONALIZADAS
// ======================================================

function updateWordsList() {

  /*
    Set evita duplicados exactos entre
    words.json y las figuras personalizadas.
  */

  words = [
    ...new Set([
      ...baseWords,
      ...customWords
    ])
  ];

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
          No permitimos cambiar de modo
          mientras se está jugando.
        */

        if (
          playButton.style.display === "none"
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
// ACTUALIZAR BOTONES DE NIVEL
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

    easyButton.classList.add(
      "active"
    );

  }


  if (gameMode === "hard") {

    hardButton.classList.add(
      "active"
    );

  }


  if (gameMode === "family") {

    familyButton.classList.add(
      "active"
    );

  }


  if (gameMode === "timer") {

    timerModeButton.classList.add(
      "active"
    );

  }


  // Selector de familia

  familySelectorContainer.style.display =
    gameMode === "family"
      ? "block"
      : "none";


  // ------------------------------------------
  // BARRA DE PROGRESO
  // ------------------------------------------

  /*
    EASY:
    mostramos progreso real hasta terminar.

    FAMILY:
    mostramos progreso de la vuelta actual.

    TIMER:
    mostramos progreso porque recorre
    la lista completa.

    HARD:
    no hay final de lista, así que ocultamos
    la barra.
  */

  if (gameMode === "hard") {

    progressContainer.style.display =
      "none";

  }

  else {

    progressContainer.style.display =
      "block";

  }

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
// RESETEAR PROGRESO
// ======================================================

function resetProgressDisplay() {

  progressFill.style.width =
    "0%";


  if (gameMode === "easy") {

    progressText.textContent =
      `0 / ${words.length}`;

  }

  else if (gameMode === "family") {

    const familyWords =
      getFamilyWords();

    progressText.textContent =
      `0 / ${familyWords.length}`;

  }

  else if (gameMode === "timer") {

    progressText.textContent =
      `0 / ${words.length}`;

  }

  else {

    progressText.textContent =
      "0 / 0";

  }

}


// ======================================================
// OBTENER PALABRAS DE LA FAMILIA ACTUAL
// ======================================================

function getFamilyWords() {

  const prefix =
    familySelect.value;


  if (!prefix) {

    return [];

  }


  return words.filter(
    word =>
      word.startsWith(prefix)
  );

}


// ======================================================
// MEZCLAR ARRAY
// ======================================================

function shuffle(array) {

  for (
    let i = array.length - 1;
    i > 0;
    i--
  ) {

    const j =
      Math.floor(
        Math.random() * (i + 1)
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


  // EASY

  if (gameMode === "easy") {

    source = [
      ...words
    ];

  }


  // TIMER

  else if (gameMode === "timer") {

    source = [
      ...words
    ];

  }


  // FAMILY

  else if (gameMode === "family") {

    source =
      getFamilyWords();

  }


  wordsQueue =
    shuffle([
      ...source
    ]);

}


// ======================================================
// OBTENER SIGUIENTE FIGURA
// ======================================================

function getNextWord() {

  // ------------------------------------------
  // HARD
  // ------------------------------------------

  /*
    Aleatorio.

    Conservamos tu comportamiento actual:
    intenta no repetir inmediatamente
    la misma figura.
  */

  if (gameMode === "hard") {

    if (words.length === 0) {

      return null;

    }


    let newWord;

    let attempts = 0;


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


  // ------------------------------------------
  // EASY
  // ------------------------------------------

  /*
    Cuando se agota la cola:
    TERMINA.

    No vuelve a empezar.
  */

  if (
    gameMode === "easy" &&
    wordsQueue.length === 0
  ) {

    return null;

  }


  // ------------------------------------------
  // TIMER
  // ------------------------------------------

  /*
    Timer también termina cuando ha
    recorrido toda la lista.
  */

  if (
    gameMode === "timer" &&
    wordsQueue.length === 0
  ) {

    return null;

  }


  // ------------------------------------------
  // FAMILY
  // ------------------------------------------

  /*
    Family se mantiene como estaba.

    Cuando se acaba la familia,
    vuelve a mezclarla.
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
// FORMATO VISUAL DE LA FIGURA
// ======================================================

function formatWordDisplay(word) {

  /*
    Ejemplo:

    JHERSY (Giro Follow en 5)

    Separamos:

    JHERSY
    Giro Follow en 5
  */

  const match =
    word.match(
      /^(.*?)\s*(\([^)]+\))?$/
    );


  const main =
    match[1].trim();


  let explanation =
    match[2] || "";


  // Quitar paréntesis visualmente

  if (explanation) {

    explanation =
      explanation.substring(
        1,
        explanation.length - 1
      );

  }


  /*
    Si hay explicación:

    nombre/prefijo pequeño rojo
    explicación grande blanca
  */

  if (explanation) {

    return `
      <span class="main-text">
        ${main}
      </span>

      <span class="parenthesis">
        ${explanation}
      </span>
    `;

  }


  /*
    Si no existe explicación,
    mostramos la figura como texto principal.
  */

  return `
    <span class="parenthesis">
      ${main}
    </span>
  `;

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


        // VERDE

        if (
          timeInSeconds < 2
        ) {

          timerElement.classList.add(
            "timer-green"
          );

        }


        // AMARILLO

        else if (
          timeInSeconds < 4
        ) {

          timerElement.classList.add(
            "timer-yellow"
          );

        }


        // ROJO

        else if (
          timeInSeconds < 8
        ) {

          timerElement.classList.add(
            "timer-red"
          );

        }


        // ROJO PARPADEANDO

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
// ACTUALIZAR PROGRESO
// ======================================================

function updateProgressDisplay(
  current
) {

  if (
    gameMode === "hard"
  ) {

    return;

  }


  if (
    totalInQueue <= 0
  ) {

    return;

  }


  /*
    Evitamos superar visualmente
    el total.
  */

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
      localStorage.getItem(
        key
      )
    ) || [];


  scores.push({

    averageTime:
      averageTime,

    wordCount:
      numberOfWords

  });


  scores.sort(
    (a, b) =>
      a.averageTime -
      b.averageTime
  );


  localStorage.setItem(

    key,

    JSON.stringify(
      scores.slice(
        0,
        10
      )
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
        "No hay figuras cargadas todavía."
      );

      return;

    }


    // Limpiar estado anterior

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


    // ------------------------------------------
    // CREAR COLA
    // ------------------------------------------

    if (
      gameMode !== "hard"
    ) {

      refillQueue();

    }


    /*
      Guardamos el total de la partida
      para la barra de progreso.
    */

    if (
      gameMode === "hard"
    ) {

      totalInQueue = 0;

    }

    else {

      totalInQueue =
        wordsQueue.length;

    }


    // ------------------------------------------
    // PRIMERA FIGURA
    // ------------------------------------------

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


    /*
      Al aparecer la primera figura,
      mostramos 1 / total.

      Esto representa la figura que
      estás viendo en pantalla.
    */

    if (
      gameMode !== "hard"
    ) {

      updateProgressDisplay(1);

    }


    // ------------------------------------------
    // BOTONES
    // ------------------------------------------

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


    // ------------------------------------------
    // TIEMPO
    // ------------------------------------------

    startTime =
      Date.now();


    startTimer();


    // Timer automático

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


    // ------------------------------------------
    // GUARDAR TIEMPO DE FIGURA ACTUAL
    // ------------------------------------------

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


    // ------------------------------------------
    // PEDIR SIGUIENTE
    // ------------------------------------------

    currentWord =
      getNextWord();


    // ------------------------------------------
    // LISTA COMPLETADA
    // ------------------------------------------

    if (
      currentWord === null
    ) {

      completeList();

      return;

    }


    // ------------------------------------------
    // MOSTRAR SIGUIENTE
    // ------------------------------------------

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


    /*
      Reiniciamos el auto-next
      en modo Timer.
    */

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


  // Barra al 100 %

  if (
    gameMode !== "hard" &&
    totalInQueue > 0
  ) {

    progressText.textContent =
      `${totalInQueue} / ${totalInQueue}`;

    progressFill.style.width =
      "100%";

  }


  // ------------------------------------------
  // PROMEDIO
  // ------------------------------------------

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


  // ------------------------------------------
  // PANTALLA FINAL
  // ------------------------------------------

  wordElement.innerHTML = `

    <span class="main-text">
      🏆 COMPLETADO
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


  // ------------------------------------------
  // BOTONES
  // ------------------------------------------

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
// SWIPE IZQUIERDA / DERECHA
// ======================================================

let touchStartX = 0;


document.addEventListener(

  "touchstart",

  event => {

    touchStartX =
      event
        .changedTouches[0]
        .screenX;

  },

  {
    passive: true
  }

);


document.addEventListener(

  "touchend",

  event => {

    /*
      No hacemos nada si
      no hay partida.
    */

    if (
      playButton.style.display !==
      "none"
    ) {

      return;

    }


    const touchEndX =
      event
        .changedTouches[0]
        .screenX;


    const distance =
      touchEndX -
      touchStartX;


    /*
      Swipe en cualquiera
      de los dos sentidos.
    */

    if (
      Math.abs(distance) > 50 &&
      !nextButton.disabled
    ) {

      nextButton.click();


      // Pequeña vibración

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
// GESTOR DE FIGURAS
// ======================================================

const managerModal =
  document.getElementById(
    "manager-modal"
  );

const openManagerBtn =
  document.getElementById(
    "open-manager-btn"
  );

const closeManagerBtn =
  document.getElementById(
    "close-manager-btn"
  );

const addWordBtn =
  document.getElementById(
    "add-word-btn"
  );

const newWordInput =
  document.getElementById(
    "new-word-input"
  );

const customWordsList =
  document.getElementById(
    "custom-words-list"
  );


// ======================================================
// ABRIR GESTOR
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
// CERRAR GESTOR
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


// Cerrar tocando fuera

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

      renderCustomWords();

      resetProgressDisplay();

    }
  );

}


// Permitir añadir con ENTER

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
// BORRAR FIGURA PERSONALIZADA
// ======================================================

function deleteCustomWord(
  index
) {

  customWords.splice(
    index,
    1
  );


  saveCustomWords();

  updateWordsList();

  renderCustomWords();

  resetProgressDisplay();

}


// Necesario para onclick

window.deleteCustomWord =
  deleteCustomWord;


// ======================================================
// GUARDAR FIGURAS PERSONALIZADAS
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
// MOSTRAR FIGURAS PERSONALIZADAS
// ======================================================

function renderCustomWords() {

  if (
    !customWordsList
  ) {

    return;

  }


  customWordsList.innerHTML =
    "";


  // Ninguna figura

  if (
    customWords.length === 0
  ) {

    customWordsList.innerHTML = `

      <li style="
        color:#aaa;
        justify-content:center;
        background:transparent;
      ">

        No has añadido figuras personalizadas.

      </li>

    `;


    return;

  }


  // Mostrar figuras

  customWords.forEach(
    (word, index) => {

      const li =
        document.createElement(
          "li"
        );


      li.innerHTML = `

        <span>
          ${word}
        </span>

        <button
          class="delete-word-btn"
          onclick="deleteCustomWord(${index})"
        >
          ❌
        </button>

      `;


      customWordsList.appendChild(
        li
      );

    }
  );

}
