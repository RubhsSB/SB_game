// Listas de palabras
const words = [
  "CyC (Host cambio posición)", "Daniel y Alma", "CyC (Host círculo Dcha)", "CyT Sensual", "JyE (diagonal Cintura)", "EyG (abro  y cierro)", "DyY (abro en 4)", "MARCO ESPEJO", "CYC (lanzo atrás en 3)", "JHERSY - Molino",
  "JHERSY - Preparar pos Cerrada", "Sergio y Katina (Bassmnt)", "EyG (Cats giro 2 manos)", "Alberto y María (Cats)", "YyE", "JHERSY (preparo sensual + mano Follow)",
  "JHERSY (preparo sensual + lanzo en 4 y salgo)", "DIAGONAL salida", "AyV", "CyC (Segovia)", "Sergio y Katina (Host)", "Sensual +", "Gto y M",
  "José y Layla (Mymo)", "INTRO Carlos", "INTRO Carlos","INTRO Carlos", "K_ELDE Intro", "K_ELDE mano en 5",  "TONIO (brazos, cuello+Disoc, Salir)", "JLAB (salir/end)", "Iván y Sarai", 
  "TONIO (cambio posición mano hombro)", "K_ELDE brazos Izq", "JHERSY (salir pasos cambio mano)", "JHERSY (Mano en 5 bajar)", "JHERSY (Giro F en 5 + Giro L en 7 más desplazamiento)", "JHERSY pasos", "JHERSY (Giro cambio mano)", "K_ELDE brazos Dcha", 
  "Iván y Sarai", "TONIO (cambio posición mano hombro)", "JHERSY (salir/end)", "CyC", "Tonio (Codos / Angel / Andar)", "70'", "Yowke", "Pasitos Elw Adelante/Atrás", "Pasitos Elw Izq/Dcha", "Cambio posición con mano Izq (Marc/Sra)", "Daniel y Alma", 
  "Francia", "Alex y Lais (jóvenes -3+1)", "VyA", "DyY", "JyE", "CyC", "70'", "CyC", "M y Gta", "DyY", "DyY", "ENGAÑO", "PyL", "Yowke", "DyY", "ENGAÑO", "MOLINO juego", "TONIO (enrrollo + saco/peinado)", "SENSUAL Lados", "PATADA", "MATI y SOFI", 
  "MOLINO insta", "EyG", "TyC", "CyC", "GOLPE Elw", "JyE", "INTRO", "EyG", "VALENT", "VyA", "FLECHA", "CyC", "CyC", "CyC", "GERO y MIGLE (cambio pos 360º)", "Cuello (en 6)", "CyT", "EyG", "BRAZOS frame", "JOVENES 70'+ Cuello", "5 cintura abajo", 
  "David", "CyT sens", "CyT sens", "DISOCIACION de PECHO (Enrollada)", "EyG", "CyC", "GAB", "CyC", "CyT", "KENZ y JULY Lanzo brazo atrás", "JyE", "Básico + Salto", "CyC", "EyG", "Pablo y Nat (jóvenes)", "Otto", "CyC", "ASCENSOR", "JLAB", 
  "JAVI y BELÉN", "JORGE y SANDRA", "JyE", "COLOMBIAN", "DISOCIACION de PECHO (en SOMBRA)" , "CyC", "GIRO 70 Cambio Posición CyT", "GIRO ATRÁS ONDA CyC", "CyC", "CyC", "JLAB", "CyC", "YEIFREN", "CyC", "DyY", "SENSUAL +", "DyY", "70´Adelante", 
  "JyE", "A y Yur", "Lado MAMBO", "GAB", "JyE Giro CUELLO", "DISOCIACION de PECHO (pos CERRADA)", "D e Inés", "INTRO", "CyT", "Brazo Lanzo DEBAJO", "JLAB", "DOTORE (Mym)", "ARGETIN", "CANGURO", "PyL Pasos", "ENGAÑO", "CyC", "JyE", "GUITARRA", 
  "SINCOPADO", "Pasos CARLOS"
];
const wordsCustom = [
  "CyC (Host cambio posición)", "Daniel y Alma", "CyC (Host círculo Dcha)", "CyT Sensual", "JyE (diagonal Cintura)", "EyG (abro  y cierro)", "DyY (abro en 4)", "MARCO ESPEJO", "CYC (lanzo atrás en 3)", "JHERSY - Molino",
  "JHERSY - Preparar pos Cerrada", "Sergio y Katina (Bassmnt)", "EyG (Cats giro 2 manos)", "Alberto y María (Cats)", "YyE", "JHERSY (preparo sensual + mano Follow)"
];

// Variables
let wordsCopy = [];
let currentWord = "";
let startTime = 0;
let totalTime = 0;
let wordCount = 0;
let timerInterval;
let gameMode = "easy"; // Nivel predeterminado

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
const customButton = document.getElementById("custom");

// Configurar el nivel del juego
easyButton.addEventListener("click", () => {
  gameMode = "easy";
  updateLevelButtons();
});
hardButton.addEventListener("click", () => {
  gameMode = "hard";
  updateLevelButtons();
});
customButton.addEventListener("click", () => {
  gameMode = "custom";
  updateLevelButtons();
});

// Función para inicializar los botones de nivel
function initializeLevelButtons() {
  easyButton.classList.add("active"); // Nivel predeterminado: Easy
  hardButton.classList.remove("active");
  customButton.classList.remove("active");
}

// Llamada inicial para configurar los botones
initializeLevelButtons();

// Función para actualizar el estilo de los botones
function updateLevelButtons() {
  easyButton.classList.remove("active");
  hardButton.classList.remove("active");
  customButton.classList.remove("active");

  if (gameMode === "easy") {
    easyButton.classList.add("active");
  } else if (gameMode === "hard") {
    hardButton.classList.add("active");
  } else if (gameMode === "custom") {
    customButton.classList.add("active");
  }
}

// Función para iniciar el modo desafío
function resetWords() {
  wordsCopy = gameMode === "easy" ? [...words] : [];
}

// Función para obtener una palabra aleatoria según el nivel
function getRandomWord() {
  if (gameMode === "easy") {
    // Nivel Easy: No se repiten palabras
    if (wordsCopy.length === 0) {
      wordElement.textContent = "¡Fin del juego! No hay más palabras.";
      nextButton.disabled = true;
      finishButton.disabled = true;
      return null;
    }
    const randomIndex = Math.floor(Math.random() * wordsCopy.length);
    return wordsCopy.splice(randomIndex, 1)[0];
  } else if (gameMode === "hard") {
    // Nivel Hard: Las palabras pueden repetirse
    return words[Math.floor(Math.random() * words.length)];
  } else if (gameMode === "custom") {
    // Nivel Custom: Solo palabras seleccionadas
    return wordsCustom[Math.floor(Math.random() * wordsCustom.length)];
  }
}

// Función para guardar los puntajes
function saveHighScore(averageTime, wordCount) {
  const key =
    gameMode === "easy"
      ? "easyHighScores"
      : gameMode === "hard"
      ? "hardHighScores"
      : "customHighScores";
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
