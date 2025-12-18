// Listas de palabras
const words = [
"CyC (Host cambio posición)", "Daniel y Alma", "JyE (Diagonal Cintura)", "MARCO ESPEJO", "CyC (lanzo atrás en 3)","JHERSY (Preparar pos Cerrada)", "SERGIO y KATINA (Bassmnt - Círculo y tiro atrás)","EyG (Cats - Giro 2 manos)", 
 "ALBERTO y MARÍA (Cats - Giro espalda)", "JHERSY (Preparo sensual + mano Follow)", "JHERSY (preparo sensual + lanzo en 4 y salgo)", "K_ELDE Intro", "K_ELDE (mano en 5)", "JLAB (salir/end)", "JHERSY (salir pasos cambio mano)", 
 "JHERSY (Mano en 5 bajar)", "JHERSY (Giro F en 5 + Giro L en 7 más desplazamiento)", "JHERSY pasos", "JHERSY (Giro cambio mano)", "JHERSY (salir/end)", "MyS (Cambio posición con mano Izq)", "FRANCIA", 
 "Alex y Lais (jóvenes -3+1)", "DyY (SanSebastián - Separo en 4 y al hombro)", "CyC (Mambo Manos Hombro)", "70'", "DyY (Cats - Bajo cabeza)", "ENGAÑO", "ENGAÑO", "GERO y MIGLE (cambio pos 360º)", "CyT (3 giros con Cuello)", 
 "5 cintura abajo", "CyT (sens Péndulo)", "DISOCIACION de PECHO (Enrollada)", "CyT (Cambio + 70´)", "JyE (Ando atrás)", "OTTO", "ASCENSOR", "JLAB (Muñeco brazos)", "JORGE y SANDRA", "JyE (Enrollo x 2)", "DISOCIACION de PECHO (en SOMBRA)", 
 "JLAB (Doble giro  +  70´)", "DyY (Onda + Círculo)", "SENSUAL +", "70´Adelante", "AyYUR Palanca", "Lado MAMBO", "DISOCIACION de PECHO (pos CERRADA)", "CANGURO", "GUITARRA", "SINCOPADO", "STEPHAN y NEVI (freno en 3 y horiz)", 
 "JHERSY (Diagonal)", "CyT (Tumbar Follow)", "DyY (Cats - Giro en 5 + juego de Brazos)", "IVAN Y SARAI (3 sensual + Cadera)", "EyG (1/2 Sensual + disoc Follow)", "Básico (Grande/Pequeño + Hombros + Caderas)", "D e Inés", "Brazo Lanzo DEBAJO", 
 "Cuellar Bachatero (Giro + Camb Pos + Sombra + peino)", "Giros", "Giros", "CyC (Giro en Diagonal + abrazo cuello)", "SERGIO y KATINA (Casa de Campo - Molino)", "EyG (Cambio posición + Giro + Lanzo)",  
 "CyC (Host - Diagonal con pasos)", "Instag Salida Giro espalda Led", "Giro Foll en 5 + Giro Led en 7", "JHERSY (Preparar pos Cerrada)", "DyY (Onda prep decha - Tiempo normal)", "DyY (Onda prep decha- Tiempo Follow)", 
 "DyY (Onda prep decha - en Sombra Follow)", "EyG (Cambio posición + Giro + Peino + Giro + ONDA abajo)", "CyC (Segovia - ½ Diagonal + Preparo en 6)", "DyY (Segovia - Lanzo + peino + sombra)", 
 "CyC (Segovia - Rompo y atrás)", "DyY (Segovia - Enrollo en 5 + Onla lenta)", "CyC (Segovia - Diagonal freno Follow en 3)", "DyY (Onda en Sombra Follow prep decha)", "Carlos (Cintura Péndulo)", "JHERSY (Enrollo Follow suelto mano Ext)", 
 "JHERSY (Giro Follow en 5 y semi giro Leader en 7)", "JHERSY (Onda delante-atrás)", "DyY (Cats - abro en 1 + Giro Follow + Giro Leader)", "EyG (Palanca en 1 + sombra)", "JHERSY (Helice)", "SENSUAL Lados", "SENSUAL Lados", "YyE (Cats - 70´)", 
 "JHERSY (Onda ando cambio de mano)", "TONIO (Giro 5 + espalda freno + Giro…Cerrada)", "EyG (Follow Giro en 5+ Estiro brazo 8)", "EyG (Ventilador Fecha+ Freno Flow + Giro + Sombra)", "JHERSY (Salir Onda - Follow abajo en 4)", 
 "JHERSY (Diagonal Sombra - Prepa Follow en 5 + sale en 6)", "JHERSY (Diagonal me paro en 5-8)", "JHERSY (Frame Follow 5-8 mano dch escápula)", "JHERSY Intro", "JHERSY (Peino 2 manos)", "JHERSY (Enrollo pasos lentos 1-6 + 7-8 atrás)", 
 "JHERSY (Pasos libres)", "JHERSY (Lado con lado brazo Dcho Onda atrás)", "TITANIC", "CyC (Freno en 6 + L de brazos)", "JHERSY (Acordeon - de lado en 5)", 
 "JHERSY (Abro Izq - 5 Lado deslizo pies)", "INTRO Carlos", "INTRO Carlos", "INTRO Carlos", "JHERSY (Sensual - mano cintura)", "JyL (Host - Diagonal)", "JHERSY (Onda + 5 coger mano Follow y salir)", "DyY (Diagonal tensión + Abajo/Arriba)", 
 "DyY (Agarre gancho onda)", "YyE (Bachata Flow)", "CyC (Bachata Flow)", "JyL (Host- Diagonal y ando)", "JyE (Peino + mano hombro)", "Stefy (Diagonal Freno)", "Stefy (Molino + sombra+ Cuello)", "Stefy (Diagonal + me peino)", 
 "Stefy (Catapulta + juego manos)", "Stefy (Catapulta + Enrollo)", "Stefy (Molino + giro Follow)", "JyE (Led Giro + Cambio mano + ZigZag)", "JHERSY (Balanceo)", "JHERSY (1 Rompo atrás + 5 adelante)", "Giro + Engaño", "JHERSY (Salida Diagonal)", 
 "JHERSY (Lanzo mano atrás + cadera + saco en 7)", "JHERSY (Mano/s pecho)", "JHERSY (Peinar con 2 manos)", "JHERSY (Posición cerrada vaivén)", "JHERSY (En 1 giro por detrás mano izq cuello)", "JHERSY (1 atrás/rompe estirado brazo para giro Lid en 5)", 
 "VyA (Host - 4 Preparo y freno Follow en sombra)", "EyG (4 preparo + 5 Giro dos manos + 7 abajo)", "ByL (Host - 4 figuras)", "IyR (Host - 4 abro para pasos)", "BÁSICO - Frame", "SERGIO y KATINA (Benidorm)", "JyL (Benidorm)", "KyN (Benidorm - Diagonal)", 
 "EyG (LEd peino izq + brazo Follow atrás en 2, preparo para giro con mano en sobaco/espalda)", "JyE (Peino Decha + agarro brazo + sombra)", "DyY (Bassement 70´ en 1)" , "JyE (Bassement - Diagonal)" , "JyE (Peino Izq + apoyo Decha hombro)", 
 "JyE (Sensual + Disociación en 1)", "JyE (Sensual + Onda Follow en 5)", "SyK (Cats - 5 traigo y sombra)", "CyC (en 7 preparo agararrando codo + en 1 salgo para sombra en 4)", "CyG (Andar atás completo - 8)", 
 "CyG (Andar atrás 1-4 + abrazo + 5 IZQ + 6 CENTRO + 7 SEPARO + 8 JUNTO)", "CyG (Frame - junto en 1 separo 2 a 4 + junto en 1 separo 6 a 8)", "SUAVE", "SUAVE", "SUAVE", "SUAVE", "SUAVE", "DISFRUTA", "DISFRUTA", "DISFRUTA", "DISFRUTA", "DISFRUTA", "DyY (Cats - peino Fol en 1)", "ByL (Bachata Flow)", "DyY (Cha3)", "NyE (Cha3)", 
 "DyY (Pasitos)", "JHERSY (Giro Follow con mano derecha)", "JHERSY (en 5 amago y giro Follow)", "JHERSY (giro suave en 5 + freno + en 7 traigo suave a sombra)", "JHERSY (Mambo tensión brazos abajo/aariba)", "DyY (Cruzo manos + Sombra en 5 + Giro en 7)",
 "GyJ (Cha3 - Freno 6)", "JyE (Cats - Pegado crírculo cadera)", "JyE (Cambio posición en 5 + mano cuello en 8 + saco Follow)", "JyE (Versión 1 - Enrrollo en 5)", "JyE (Versión 2 - Giro por detrás + cambio posisión en 5)", 
 "JyE (Versión 1 + 2 - Enrrollo en 5 + sombra + péndulos)", "JHERSY (Cambio posición en 5 + mano cuello en 8 con mano decha en cintura)", "JHERSY (suave)", "JHERSY (suave)", "JHERSY (postura)", "JHERSY (postura)", "JHERSY (liderar)", "JHERSY (liderar)", 
 "SyK (Bailarina)", "SyA (Cats - Diagonal + Giro Follow y abajo)", "DyY (Giro mano Izq en 5)", "DyY (en 4 de lado dejo caer la mano mi espalda y en 5 me giro)", "JyE (peino + doble giro)", "JyE (Diagonal + preparo + vuelta alrededor)"
];

const wordsCustom = [
"CyC (Host cambio posición)", "Daniel y Alma", "JyE (Diagonal Cintura)", "MARCO ESPEJO", "CyC (lanzo atrás en 3)","JHERSY (Preparar pos Cerrada)", "EyG (Cats - Giro 2 manos)", "ALBERTO y MARÍA (Cats - Giro espalda)", 
 "JHERSY (Preparo sensual + mano Follow)", "JHERSY (preparo sensual + lanzo en 4 y salgo)", "K_ELDE Intro", "K_ELDE (mano en 5)", "JLAB (salir/end)", "JHERSY (salir pasos cambio mano)", "JHERSY (Mano en 5 bajar)", 
 "JHERSY (Giro F en 5 + Giro L en 7 más desplazamiento)", "JHERSY pasos", "JHERSY (Giro cambio mano)", "JHERSY (salir/end)", "MyS (Cambio posición con mano Izq)", "DyY (SanSebastián - Separo en 4 y al hombro)", "CyC (Mambo Manos Hombro)", "70'", 
 "ENGAÑO", "Giro + Engaño", "GERO y MIGLE (cambio pos 360º)", "CyT (3 giros con Cuello)", "5 cintura abajo", "CyT (sens Péndulo)", "DISOCIACION de PECHO (Enrollada)", "CyT (Cambio + 70´)", "JyE (Ando atrás)", "OTTO", "ASCENSOR", 
 "JLAB (Muñeco brazos)", "JORGE y SANDRA", "JyE (Enrollo x 2)", "DISOCIACION de PECHO (en SOMBRA)", "JLAB (Doble giro  +  70´)", "DyY (Onda + Círculo)", "SENSUAL +", "70´Adelante", "AyYUR Palanca", "Lado MAMBO", "DISOCIACION de PECHO (pos CERRADA)", 
 "GUITARRA", "SINCOPADO", "STEPHAN y NEVI (freno en 3 y horiz)", "JHERSY (Diagonal)", "CyT (Tumbar Follow)", "DyY (Cats - Giro en 5 + juego de Brazos)", "IVAN Y SARAI (3 sensual + Cadera)", "EyG (1/2 Sensual + disoc Follow)", "Básico (Grande/Pequeño + Hombros + Caderas)", "D e Inés", "Brazo Lanzo DEBAJO", 
 "Cuellar Bachatero (Giro + Camb Pos + Sombra + peino)", "Giros", "Giros", "CyC (Giro en Diagonal + abrazo cuello)", "SERGIO y KATINA (Casa de Campo - Molino)", "EyG (Cambio posición + Giro + Lanzo)",  
 "CyC (Host - Diagonal con pasos)", "Instag Salida Giro espalda Led", "Giro Foll en 5 + Giro Led en 7", "JHERSY (Preparar pos Cerrada)", "DyY (Onda prep decha - Tiempo normal)", "DyY (Onda prep decha- Tiempo Follow)", 
 "DyY (Onda prep decha - en Sombra Follow)", "EyG (Cambio posición + Giro + Peino + Giro + ONDA abajo)", "CyC (Segovia - ½ Diagonal + Preparo en 6)", "CyC (Segovia - Diagonal freno Follow en 3)", 
 "DyY (Onda en Sombra Follow prep decha)", "Carlos (Cintura Péndulo)", "JHERSY (Enrollo Follow suelto mano Ext)", "JHERSY (Giro Follow en 5 y semi giro Leader en 7)", "JHERSY (Onda delante-atrás)", "DyY (Cats - abro en 1 + Giro Follow + Giro Leader)", 
 "EyG (Palanca en 1 + sombra)", "JHERSY (Helice)", "SENSUAL Lados", "SENSUAL Lados", "YyE (Cats - 70´)", "JHERSY (Onda ando cambio de mano)", "TONIO (Giro 5 + espalda freno + Giro…Cerrada)", "EyG (Follow Giro en 5+ Estiro brazo 8)", "JHERSY (Salir Onda - Follow abajo en 4)", 
 "JHERSY (Diagonal Sombra - Prepa Follow en 5 + sale en 6)", "JHERSY (Diagonal me paro en 5-8)", "JHERSY (Frame Follow 5-8 mano dch escápula)", "JHERSY Intro", "JHERSY (Peino 2 manos)", "JHERSY (Enrollo pasos lentos 1-6 + 7-8 atrás)", 
 "JHERSY (Pasos libres)", "JHERSY (Lado con lado brazo Dcho Onda atrás)", "TITANIC", "JHERSY (Acordeon - de lado en 5)", "JHERSY (Abro Izq - 5 Lado deslizo pies)", "INTRO Carlos", "INTRO Carlos", "INTRO Carlos", "JHERSY (Sensual - mano cintura)", "JyL (Host - Diagonal)", "JHERSY (Onda + 5 coger mano Follow y salir)", "DyY (Diagonal tensión + Abajo/Arriba)", 
 "DyY (Agarre gancho onda)", "YyE (Bachata Flow)", "CyC (Bachata Flow)", "JyL (Host- Diagonal y ando)", "JyE (Peino + mano hombro)", "Stefy (Diagonal Freno)", "Stefy (Molino + sombra+ Cuello)", "Stefy (Diagonal + me peino)", 
 "Stefy (Catapulta + juego manos)", "Stefy (Catapulta + Enrollo)", "Stefy (Molino + giro Follow)", "JyE (Led Giro + Cambio mano + ZigZag)", "JHERSY (Balanceo)", "JHERSY (1 Rompo atrás + 5 adelante)", "Giro + Engaño", "JHERSY (Salida Diagonal)", 
 "JHERSY (Lanzo mano atrás + cadera + saco en 7)", "JHERSY (Mano/s pecho)", "JHERSY (Peinar con 2 manos)", "JHERSY (Posición cerrada vaivén)", "JHERSY (En 1 giro por detrás mano izq cuello)", "JHERSY (1 atrás/rompe estirado brazo para giro Lid en 5)", 
 "VyA (Host - 4 Preparo y freno Follow en sombra)", "EyG (4 preparo + 5 Giro dos manos + 7 abajo)", "ByL (Host - 4 figuras)", "BÁSICO - Frame", "SERGIO y KATINA (Benidorm)", "JyL (Benidorm)", 
 "KyN (Benidorm - Diagonal)", "EyG (LEd peino izq + brazo Follow atrás en 2, preparo para giro con mano en sobaco/espalda)", "JyE (Peino Decha + agarro brazo + sombra)", "DyY (Bassement 70´ en 1)" , "JyE (Bassement - Diagonal)" , 
 "JyE (Peino Izq + apoyo Decha hombro)", "JyE (Sensual + Disociación en 1)", "JyE (Sensual + Onda Follow en 5)", "SyK (Cats - 5 traigo y sombra)", "CyC (en 7 preparo agararrando codo + en 1 salgo para sombra en 4)", 
 "CyG (Andar atás completo - 8)", "CyG (Andar atrás 1-4 + abrazo + 5 IZQ + 6 CENTRO + 7 SEPARO + 8 JUNTO)", "CyG (Frame - junto en 1 separo 2 a 4 + junto en 1 separo 6 a 8)", "SUAVE", "SUAVE", "SUAVE", "SUAVE", "SUAVE", "DISFRUTA", "DISFRUTA", "DISFRUTA", 
 "DISFRUTA", "DISFRUTA", "DyY (Cats - peino Fol en 1)", "ByL (Bachata Flow)", "DyY (Cha3)", "NyE (Cha3)", "DyY (Pasitos)", "JHERSY (Giro Follow con mano derecha)", "JHERSY (en 5 amago y giro Follow)", 
 "JHERSY (giro suave en 5 + freno + en 7 traigo suave a sombra)", "JHERSY (Mambo tensión brazos abajo/aariba)", "DyY (Cruzo manos + Sombra en 5 + Giro en 7)", "GyJ (Cha3 - Freno 6)", "JyE (Cats - Pegado crírculo cadera)", 
 "JyE (Cambio posición en 5 + mano cuello en 8 + saco Follow)", "JyE (Versión 1 - Enrrollo en 5)", "JyE (Versión 2 - Giro por detrás + cambio posisión en 5)", "JyE (Versión 1 + 2 - Enrrollo en 5 + sombra + péndulos)", 
 "JHERSY (Cambio posición en 5 + mano cuello en 8 con mano decha en cintura)", "JHERSY (suave)", "JHERSY (suave)", "JHERSY (postura)", "JHERSY (postura)", "JHERSY (liderar)", "JHERSY (liderar)", "SyK (Bailarina)", 
 "SyA (Cats - Diagonal + Giro Follow y abajo)", "DyY (Giro mano Izq en 5)", "DyY (en 4 de lado dejo caer la mano mi espalda y en 5 me giro)", "JyE (peino + doble giro)", "JyE (Diagonal + preparo + vuelta alrededor)"
];

const familyPrefixes = ["JHERSY", "CyC", "K_ELDE", "EyG", "CyT", "JyE", "DyY", "YyE", "VyA", "Stefy"];

// =======================
// Variables y elementos
// =======================
let wordsCopy = [];
let recentWords = [];
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
const customButton = document.getElementById("custom");
const familyButton = document.getElementById("family");
const familySelect = document.getElementById("family-selector");

// =======================
// Inicialización
// =======================
window.addEventListener("load", () => {
  gameMode = "easy";
  updateLevelButtons();
  document.getElementById("family-selector-container").style.display = "none";

  familyPrefixes.forEach(prefix => {
    const option = document.createElement("option");
    option.value = option.textContent = prefix;
    familySelect.appendChild(option);
  });

  // Mostrar solo el botón Play al inicio
  playButton.style.display = "inline-block";
  nextButton.style.display = "none";
  finishButton.style.display = "none";
});

// =======================
// Selección de nivel
// =======================
[easyButton, hardButton, customButton, familyButton].forEach((btn, i) => {
  btn.addEventListener("click", () => {
    gameMode = ["easy", "hard", "custom", "family"][i];
    updateLevelButtons();
    document.getElementById("family-selector-container").style.display = gameMode === "family" ? "block" : "none";
  });
});

function updateLevelButtons() {
  [easyButton, hardButton, customButton, familyButton].forEach(btn => btn.classList.remove("active"));
  if (gameMode === "easy") easyButton.classList.add("active");
  if (gameMode === "hard") hardButton.classList.add("active");
  if (gameMode === "custom") customButton.classList.add("active");
  if (gameMode === "family") familyButton.classList.add("active");
}

// =======================
// Funciones principales
// =======================
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function resetWords() {
  if (gameMode === "easy") wordsCopy = [...words];
  else if (gameMode === "custom") wordsCopy = [...wordsCustom];
  else if (gameMode === "family") {
    const prefix = familySelect.value;
    wordsCopy = words.filter(w => w.startsWith(prefix));
  } else if (gameMode === "hard") wordsCopy = [];

  shuffleArray(wordsCopy);
  recentWords = [];
}

function getRandomWord() {
  let validWords;
  if (gameMode === "hard") return words[Math.floor(Math.random() * words.length)];

  if (gameMode === "family") {
    const selectedPrefix = familySelect.value;
    validWords = words.filter(w => w.startsWith(selectedPrefix) && !recentWords.includes(w));
    if (validWords.length === 0) {
      validWords = words.filter(w => w.startsWith(selectedPrefix));
      recentWords = [];
    }
  } else if (gameMode === "custom") {
    validWords = wordsCustom.filter(w => !recentWords.includes(w));
    if (validWords.length === 0) {
      validWords = [...wordsCustom];
      recentWords = [];
    }
  } else {
    validWords = wordsCopy.filter(w => !recentWords.includes(w));
    if (validWords.length === 0) {
      shuffleArray(wordsCopy);
      validWords = [...wordsCopy];
      recentWords = [];
    }
  }

  const word = validWords[Math.floor(Math.random() * validWords.length)];

  if (gameMode !== "hard") {
    recentWords.push(word);
    if (recentWords.length > 10) recentWords.shift();
  }

  return word;
}

function formatWordDisplay(word) {
  const match = word.match(/^(.*?)\s*(\([^)]+\))?$/);
  const main = match[1];
  const par = match[2] || "";
  return `<span class="main-text">${main.trim()}</span>${par ? `<br><span class="parenthesis">${par}</span>` : ""}`;
}

function saveHighScore(averageTime, wordCount) {
  const key = gameMode === "easy" ? "easyHighScores"
            : gameMode === "hard" ? "hardHighScores"
            : gameMode === "custom" ? "customHighScores"
            : "familyHighScores";
  let scores = JSON.parse(localStorage.getItem(key)) || [];
  scores.push({ averageTime, wordCount });
  scores.sort((a, b) => a.averageTime - b.averageTime);
  localStorage.setItem(key, JSON.stringify(scores.slice(0, 10)));
}

function startTimer() {
  timerInterval = setInterval(() => {
    const currentTime = ((Date.now() - startTime) / 1000).toFixed(1);
    timerElement.textContent = `Tiempo: ${currentTime} segundos`;
  }, 100);
}

function stopTimer() {
  clearInterval(timerInterval);
}

// =======================
// Botón PLAY
// =======================
playButton.addEventListener("click", () => {
  resetWords();
  currentWord = getRandomWord();
  wordElement.innerHTML = formatWordDisplay(currentWord);
  startTime = Date.now();
  wordCount = 0;
  totalTime = 0;
  counterElement.textContent = `Palabras jugadas: ${wordCount}`;
  timerElement.textContent = `Tiempo: 0 segundos`;

  // Mostrar solo los botones de juego
  playButton.disabled = true;
  playButton.style.display = "none";
  nextButton.disabled = false;
  nextButton.style.display = "inline-block";
  finishButton.disabled = false;
  finishButton.style.display = "inline-block";

  startTimer();
});

// =======================
// Botón SIGUIENTE
// =======================
nextButton.addEventListener("click", () => {
  const endTime = Date.now();
  totalTime += (endTime - startTime) / 1000;
  wordCount++;
  counterElement.textContent = `Palabras jugadas: ${wordCount}`;
  stopTimer();
  currentWord = getRandomWord();
  wordElement.innerHTML = formatWordDisplay(currentWord);
  startTime = Date.now();
  startTimer();
});

// =======================
// Botón FINALIZAR
// =======================
finishButton.addEventListener("click", () => {
  stopTimer();
  if (wordCount > 0) {
    const averageTime = totalTime / wordCount;
    resultElement.textContent = `Promedio: ${averageTime.toFixed(2)} segundos por palabra.`;
    saveHighScore(averageTime, wordCount);
  } else {
    resultElement.textContent = "No has jugado todavía.";
  }

  // Volver a estado inicial
  playButton.disabled = false;
  playButton.style.display = "inline-block";
  nextButton.disabled = true;
  nextButton.style.display = "none";
  finishButton.disabled = true;
  finishButton.style.display = "none";

  wordElement.textContent = "Presiona 'Play' para comenzar de nuevo.";
  counterElement.textContent = `Palabras jugadas: 0`;
  timerElement.textContent = `Tiempo: 0 segundos`;
});

// =======================
// Swipe en móviles
// =======================
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener("touchstart", e => {
  touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener("touchend", e => {
  touchEndX = e.changedTouches[0].screenX;
  if (touchEndX < touchStartX - 50 && !nextButton.disabled) {
    nextButton.click();
  }
});











