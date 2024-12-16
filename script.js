// Lista de palabras
const words = ["CyC", "DAniel y Alma", "CyC", "YyE", "AyV", "CyC", "Sergio y Katina", "CyC", "Sensual +", "Gto y M", "José y Layla (Mym)", "INTRO", "K_ELDE", "TONIO (brazos, cuello+Disoc, Salir)", "JLAB (salir/end)", "K_ELDE", "JHERSY (salid pasos cambio mano)", "JHERSY_pasos", "JHERSY (Giro cambio manao)", "K_ELDE", "Iván y Sarai", "TONIO (cambio posición mano hombro"];

// Variables
let currentWord = "";
let startTime = 0;
let totalTime = 0;
let wordCount = 0;
let timerInterval; // Variable para el temporizador

// Elementos del DOM
const wordElement = document.getElementById("word");
const playButton = document.getElementById("play");
const nextButton = document.getElementById("next");
const finishButton = document.getElementById("finish");
const resultElement = document.getElementById("result");
const counterElement = document.getElementById("counter");
const timerElement = document.getElementById("timer");

// Función para obtener una palabra aleatoria
function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}

// Función para actualizar el temporizador
function startTimer() {
  timerInterval = setInterval(() => {
    const currentTime = ((Date.now() - startTime) / 1000).toFixed(1);
    timerElement.textContent = `Tiempo: ${currentTime} segundos`;
  }, 100);
}

// Función para detener el temporizador
function stopTimer() {
  clearInterval(timerInterval);
}

// Evento para iniciar el juego
playButton.addEventListener("click", () => {
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

// Evento para cambiar a la siguiente palabra
nextButton.addEventListener("click", () => {
  const endTime = Date.now();
  totalTime += (endTime - startTime) / 1000; // Acumula el tiempo total
  wordCount++;
  counterElement.textContent = `Palabras jugadas: ${wordCount}`; // Actualiza el contador
  stopTimer(); // Detiene el temporizador actual
  currentWord = getRandomWord(); // Obtiene una nueva palabra
  wordElement.textContent = currentWord; // Muestra la nueva palabra
  startTime = Date.now();
  startTimer(); // Reinicia el temporizador
});

// Evento para finalizar el juego
finishButton.addEventListener("click", () => {
  stopTimer(); // Detiene el temporizador
  if (wordCount > 0) {
    const averageTime = totalTime / wordCount;
    resultElement.textContent = `Promedio: ${averageTime.toFixed(2)} segundos por palabra.`;
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
