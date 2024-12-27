// Lista de palabras
const words = ["CyC", "Daniel y Alma", "CyC", "YyE", "DIAGONA salida", "DIAGONA salida", "AyV", "CyC", "Sergio y Katina", "CyC", "Sensual +", "Gto y M", "José y Layla (Mym)", "INTRO", "K_ELDE", "TONIO (brazos, cuello+Disoc, Salir)", "JLAB (salir/end)", "K_ELDE", "JHERSY (salir pasos cambio mano)", "JHERSY pasos", "JHERSY (Giro cambio mano)", "K_ELDE", "Iván y Sarai", "TONIO (cambio posición mano hombro)", "JHERSY (salir/end)", "CyC", "Tonio (Codos / Angel / Andar)", "70'", "Yowke", "Pasitos Elw Adelante/Atrás", "Pasitos Elw Izq/Dcha", "Cambio posición con mano Izq (Marc/Sra)", "Daniel y Alma", "Francia", "Alex y Lais (jóvenes -3+1)", "VyA", "DyY", "JyE", "CyC", "70'", "CyC", "M y Gta", "DyY", "DyY", "ENGAÑO", "P y L", "Yowke", "DyY", "ENGAÑO", "MOLINO juego", "TONIO (enrrollo + saco/peinado)", "SENSUAL Lados", "PATADA", "MATI y SOFI", "MOLINO insta", "E y G", "C y T", "CyC", "GOLPE Elw", "JyE", "INTRO", "E y G", "VALENT", "V y A", "FLECHA", "CyC", "CyC", "CyC", "GERO y MIGLE (cambio pos 360º)", "Cuello (en 6)", "C y T", "E y G", "BRAZOS frame", "JOVENES 70'+ Cuello", "5 cintura abajo", "David", "C y T sens", "C y T sens", "DISOCIACION de PECHO (Enrollada)", "E y G", "CyC", "GAB", "CyC", "C y T", "KENZ y JULY Lanzo brazo atrás", "JyE", "Básico + Salto", "CyC", "E y G", "Pablo y Nat (jóvenes)" , "Otto", "CyC", "ASCENSOR", "JLAB", "JAVI y BELÉN", "JORGE y SANDRA", "JyE", "COLOMBIAN", "DISOCIACION de PECHO (en SOMBRA)" , "CyC", "GIRO 70 Cambio Posición C yT", "GIRO ATRÁS ONDA CyC", "CyC", "CyC", "JLAB", "CyC", "YEIFREN", "CyC", "D y Y", "SENSUAL +", "D y Y", "70´Adelante", "J y E", "A y Yur", "Lado MAMBO", "GAB", "J y E Giro CUELLO", "DISOCIACION de PECHO (pos CERRADA)", "D e Inés", "INTRO", "C y T", "Brazo Lanzo DEBAJO", "JLAB", "DOTORE (Mym)", "ARGETIN", "CANGURO", "P y L Pasos", "ENGAÑO", "CyC", "J y E", "GUITARRA", "SINCOPADO", "Pasos CARLOS"];

// Variables
let wordsCopy = [];
let currentWord = "";
let startTime = 0;
let totalTime = 0;
let wordCount = 0;
let timerInterval;
let gameMode = "easy"; // Nivel por defecto (E)

// Elementos del DOM
const wordElement = document.getElementById("word");
const playButton = document.getElementById("play");
const nextButton = document.getElementById("next");
const finishButton = document.getElementById("finish");
const resultElement = document.getElementById("result");
const counterElement = document.getElementById("counter");
const timerElement = document.getElementById("timer");
const easyButton = document.getElementById("easy");
const hardButton = document.getElementById("hard");

// Configurar el nivel del juego
easyButton.addEventListener("click", () => {
  gameMode = "easy";
  updateLevelButtons();
});

hardButton.addEventListener("click", () => {
  gameMode = "hard";
  updateLevelButtons();
});

// Función para establecer el botón inicial
function initializeLevelButtons() {
  easyButton.classList.add("active"); // Botón E activo al inicio
  hardButton.classList.remove("active"); // Botón H no seleccionado
}

// Llamada a la función para inicializar los botones
initializeLevelButtons();

// Función para actualizar el estilo de los botones
function updateLevelButtons() {
  if (gameMode === "easy") {
    easyButton.classList.add("active");
    hardButton.classList.remove("active");
  } else if (gameMode === "hard") {
    hardButton.classList.add("active");
    easyButton.classList.remove("active");
  }
}

// Función para iniciar el modo desafío
function resetWords() {
  wordsCopy = [...words]; // Crear una copia de las palabras originales
}

// Función para obtener una palabra aleatoria según el nivel
function getRandomWord() {
  if (gameMode === "easy") {
    // Nivel E: No se repiten palabras
    if (wordsCopy.length === 0) {
      wordElement.textContent = "¡Fin del juego! No hay más palabras.";
      nextButton.disabled = true;
      finishButton.disabled = true;
      return null;
    }
    const randomIndex = Math.floor(Math.random() * wordsCopy.length);
    return wordsCopy.splice(randomIndex, 1)[0];
  } else if (gameMode === "hard") {
    // Nivel H: Las palabras pueden repetirse
    return words[Math.floor(Math.random() * words.length)];
  }
}

// Función para guardar los puntajes
function saveHighScore(averageTime, wordCount) {
  const key = gameMode === "easy" ? "easyHighScores" : "hardHighScores";
  let highScores = JSON.parse(localStorage.getItem(key)) || [];
  highScores.push({ averageTime, wordCount });
  highScores.sort((a, b) => a.averageTime - b.averageTime);
  highScores = highScores.slice(0, 10);
  localStorage.setItem(key, JSON.stringify(highScores));
}

// Temporizador
function startTimer() {
  timerInterval = setInterval(() => {
    const currentTime = ((Date.now() - startTime) / 1000).toFixed(1);
    timerElement.textContent = `Tiempo: ${currentTime} segundos`;
  }, 100);
}

function stopTimer() {
  clearInterval(timerInterval);
}

// Eventos del juego
playButton.addEventListener("click", () => {
  resetWords();
  currentWord = getRandomWord();
  wordElement.textContent = currentWord;
  startTime = Date.now();
  wordCount = 0;
  totalTime = 0;
  counterElement.textContent = `Palabras jugadas: ${wordCount}`;
  timerElement.textContent = `Tiempo: 0 segundos`;
  playButton.disabled = true;
  nextButton.disabled = false;
  finishButton.disabled = false;
  startTimer();
});

nextButton.addEventListener("click", () => {
  const endTime = Date.now();
  totalTime += (endTime - startTime) / 1000;
  wordCount++;
  counterElement.textContent = `Palabras jugadas: ${wordCount}`;
  stopTimer();
  currentWord = getRandomWord();
  if (currentWord) {
    wordElement.textContent = currentWord;
    startTime = Date.now();
    startTimer();
  }
});

finishButton.addEventListener("click", () => {
  stopTimer();
  if (wordCount > 0) {
    const averageTime = totalTime / wordCount;
    resultElement.textContent = `Promedio: ${averageTime.toFixed(2)} segundos por palabra.`;
    saveHighScore(averageTime, wordCount);
  } else {
    resultElement.textContent = "No has jugado todavía.";
  }
  playButton.disabled = false;
  nextButton.disabled = true;
  finishButton.disabled = true;
  wordElement.textContent = "Presiona 'Play' para comenzar de nuevo.";
  counterElement.textContent = `Palabras jugadas: 0`;
  timerElement.textContent = `Tiempo: 0 segundos`;
});
