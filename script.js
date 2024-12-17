// Lista de palabras
const words = ["CyC", "Daniel y Alma", "CyC", "YyE", "AyV", "CyC", "Sergio y Katina", "CyC", "Sensual +", "Gto y M", "José y Layla (Mym)", "INTRO", "K_ELDE", "TONIO (brazos, cuello+Disoc, Salir)", "JLAB (salir/end)", "K_ELDE", "JHERSY (salir pasos cambio mano)", "JHERSY pasos", "JHERSY (Giro cambio mano)", "K_ELDE", "Iván y Sarai", "TONIO (cambio posición mano hombro)", "JHERSY (salir/end)", "CyC", "Tonio (Codos / Angel / Andar)", "70'", "Yowke", "Pasitos Elw Adelante/Atrás", "Pasitos Elw Izq/Dcha", "Cambio posición con mano Izq (Marc/Sra)", "Daniel y Alma", "Francia", "Alex y Lais (jóvenes -3+1)", "VyA", "DyY", "JyE", "CyC", "70'", "CyC", "M y Gta", "DyY", "DyY", "ENGAÑO", "P y L", "Yowke", "DyY", "ENGAÑO", "MOLINO juego", "TONIO (enrrollo + saco/peinado)", "SENSUAL Lados", "PATADA", "MATI y SOFI", "MOLINO insta", "E y G", "C y T", "CyC", "GOLPE Elw", "JyE", "INTRO", "E y G", "VALENT", "V y A", "FLECHA", "CyC", "CyC", "CyC", "GERO y MIGLE (cambio pos 360º)", "Cuello (en 6)", "C y T", "E y G", "BRAZOS frame", "JOVENES 70'+ Cuello", "5 cintura abajo", "David", "C y T sens", "C y T sens", "DISOCIACION de PECHO (Enrollada)", "E y G", "CyC", "GAB", "CyC", "C y T", "KENZ y JULY Lanzo brazo atrás", "JyE", "Básico + Salto", "CyC", "E y G", "Pablo y Nat (jóvenes)" , "Otto", "CyC", "ASCENSOR", "JLAB", "JAVI y BELÉN", "JORGE y SANDRA", "JyE", "COLOMBIAN", "DISOCIACION de PECHO (en SOMBRA)" , "CyC", "GIRO 70 Cambio Posición C yT", "GIRO ATRÁS ONDA CyC", "CyC", "CyC", "JLAB", "CyC", "YEIFREN", "CyC", "D y Y", "SENSUAL +", "D y Y", "70´Adelante", "J y E", "A y Yur", "Lado MAMBO", "GAB", "J y E Giro CUELLO", "DISOCIACION de PECHO (pos CERRADA)", "D e Inés", "INTRO", "C y T", "Brazo Lanzo DEBAJO", "JLAB", "DOTORE (Mym)", "ARGETIN", "CANGURO", "P y L Pasos", "ENGAÑO", "CyC", "J y E", "GUITARRA", "SINCOPADO", "Pasos CARLOS"];

// Variables
let wordsCopy = []; // Copia de las palabras
let currentWord = "";
let startTime = 0;
let totalTime = 0;
let wordCount = 0;
let timerInterval;

// Elementos del DOM
const wordElement = document.getElementById("word");
const playButton = document.getElementById("play");
const nextButton = document.getElementById("next");
const finishButton = document.getElementById("finish");
const resultElement = document.getElementById("result");
const counterElement = document.getElementById("counter");
const timerElement = document.getElementById("timer");

// Función para iniciar el modo desafío
function resetWords() {
  wordsCopy = [...words]; // Crear una copia de las palabras originales
}

// Función para obtener una palabra aleatoria sin repetir
function getRandomWord() {
  if (wordsCopy.length === 0) {
    wordElement.textContent = "¡Fin del juego! No hay más palabras.";
    nextButton.disabled = true; // Desactiva el botón Next
    finishButton.disabled = true;
    return null; // Detiene el juego
  }
  
  const randomIndex = Math.floor(Math.random() * wordsCopy.length);
  const word = wordsCopy.splice(randomIndex, 1)[0]; // Elimina y devuelve una palabra
  return word;
}

// Función para guardar y mostrar los 10 puntajes más altos con palabras jugadas
function saveHighScore(averageTime, wordCount) {
  // Obtener los puntajes guardados o crear un array vacío
  let highScores = JSON.parse(localStorage.getItem("highScores")) || [];

  // Agregar el nuevo puntaje como un objeto { promedio, palabras }
  highScores.push({ averageTime, wordCount });

  // Ordenar los puntajes de menor a mayor promedio
  highScores.sort((a, b) => a.averageTime - b.averageTime);

  // Mantener solo los 10 mejores puntajes
  highScores = highScores.slice(0, 10);

  // Guardar los puntajes actualizados en localStorage
  localStorage.setItem("highScores", JSON.stringify(highScores));

  // Mostrar los puntajes en pantalla
  displayHighScores(highScores);
}

// Función para mostrar los puntajes en pantalla
function displayHighScores(scores) {
  const resultElement = document.getElementById("result");

  let scoreList = "🏆 **Top 10 Puntajes Más Altos:**<br>";
  scores.forEach((score, index) => {
    scoreList += `${index + 1}. Promedio: ${score.averageTime.toFixed(2)} segundos | Palabras: ${score.wordCount} <br>`;
  });

  resultElement.innerHTML = scoreList;
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
  resetWords(); // Reinicia la copia de palabras
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
  if (currentWord) {
    wordElement.textContent = currentWord; // Muestra la nueva palabra
    startTime = Date.now();
    startTimer(); // Reinicia el temporizador
  }
});

// Evento para finalizar el juego
finishButton.addEventListener("click", () => {
  stopTimer(); // Detiene el temporizador
  if (wordCount > 0) {
    const averageTime = totalTime / wordCount;
    resultElement.textContent = `Promedio: ${averageTime.toFixed(2)} segundos por palabra.`;

    // Guardar el puntaje actual con promedio y palabras
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
