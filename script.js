// Listas de palabras
const words = [
  "CyC (Host cambio posición)", "Daniel y Alma", "CyC (Host círculo Dcha)", "CyT Sensual", "JyE (diagonal Cintura)", "EyG (abro y cierro)", "DyY (abro en 4)", "MARCO ESPEJO", "CyC (lanzo atrás en 3)", "JHERSY - Molino",
 "JHERSY - Preparar pos Cerrada", "SERGIO y KATINA (Círculo y tiro atrás - Bassmnt)", "EyG (Cats giro 2 manos)", "ALBERTO y MARÍA (Giro espalda-Cats)", "JHERSY (preparo sensual + mano Follow)",
 "JHERSY (preparo sensual + lanzo en 4 y salgo)", "DIAGONAL salida", "AyV", "CyC (Segovia)", "Sergio y Katina (Host)", "Sensual +", "GtoyM", "José y Layla (Mymo)", "INTRO Carlos", "INTRO Carlos", "INTRO Carlos", 
 "K_ELDE Intro", "K_ELDE mano en 5",  "TONIO (brazos, cuello+Disoc, Salir)", "JLAB (salir/end)", "K_ELDE brazos Izq", "JHERSY (salir pasos cambio mano)", "JHERSY (Mano en 5 bajar)", 
 "JHERSY (Giro F en 5 + Giro L en 7 más desplazamiento)", "JHERSY pasos", "JHERSY (Giro cambio mano)", "K_ELDE brazos Dcha", "IVAN Y SARAI (Cuadrado Host)", "JHERSY (salir/end)", "CyC (Giro 2 manos)", "Tonio (Codos / Angel / Andar)",
 "70'", "Yowke", "Pasitos Elw Adelante/Atrás", "Pasitos Elw Izq/Dcha", "Cambio posición con mano Izq (Marc/Sra)", "FRANCIA", "Alex y Lais (jóvenes -3+1)", "VyA (Cambio mano + Freno en 6)", "DyY (SanSebastián - Separo en 4 y al hombro)", 
 "JyE (preparo salida en 8)", "CyC (Mambo Manos Hombro)", "70'", "CyC (70´ + mano hombro para sombra)", "M y Gta", "DyY (Bajo cabeza - Cats)", "DyY (Giro mano escápula - Bassment)", "ENGAÑO", "PyL", "Yowke", 
 "DyY (Freno + contra + brazo Izq al hombro)", "ENGAÑO", "MOLINO juego", "TONIO (enrrollo + saco/peinado)", "SENSUAL Lados", "PATADA", "MATI y SOFI (Lanzo brazo atrás)", "MOLINO insta", "EyG (Giro LED cintura)", "CvT", 
 "CyC Freno en 2 y alargo 3-4", "GOLPE Elw", "JyE Diagonal + Giro", "INTRO", "EyG (Lanzo y Diagonal)", "VALENT", "VyA (Freno hombro en 2)", "FLECHA", "CyC (Giro en Diagonal + abrazo cuello)", "CyC (Olas Izq + Molino Follow)", 
 "CyC (Giro en diagonal)", "CyC (Diagonal + paseo)", "GERO y MIGLE (cambio pos 360º)", "Cuello (en 6)", "CyT (3 giros con Cuello)", "EyG (SanSebastián - Rompo y abajo)", "BRAZOS frame", "JOVENES 70'+ Cuello", "5 cintura abajo", 
 "VyA", "David", "CyT sens Péndulo", "CyT sens Onda", "DISOCIACION de PECHO (Enrollada)", "EyG", "CyC en 4 de espaldas", "GAB", "CyC (andar atrás)", "CyT (Cambio + 70´)", "KENZ y JULY Lanzo brazo atrás", "JyE Ando atrás", "Básico + Salto", 
 "CyC (Giro en diagonal + peino + abajo)", "EyG (5 gira Foll + 7 gira Led)", "PABLO y NAT (jóvenes)", "OTTO", "CyC (½ Diagonal + Lanzo en sombra Led)", "ASCENSOR", "JLAB Muñeco brazos", "JAVI y BELÉN (Host)", "JORGE y SANDRA", 
 "JyE Enrollo x 2", "COLOMBIAN", "DISOCIACION de PECHO (en SOMBRA)", "CyC", "CyT (GIRO 70 Cambio Posición)", "CyC (1/2 Diagonal + giro atrás + paseo)", "CyC", "CyC", "JLAB Doble giro + 70´", "CyC", "YEIFREN", "CyC (Brazos Izq y Dcho hombros)", 
 "DyY (Onda + Círculo)", "SENSUAL +", "DyY (Giro + Freno en 6)", "70´Adelante", "JyE", "AyYUR Palanca", "Lado MAMBO", "GAB", "JyE Giro CUELLO", "DISOCIACION de PECHO (pos CERRADA)", "D e Inés", "INTRO", 
 "CyT (mano cuello LED en 8)", "Brazo Lanzo DEBAJO", "JLAB (Sensual/Giros)", "DOTORE (Mym)", "ARGETIN", "CANGURO", "PyL Pasos", "ENGAÑO", "CyC", "JyE", "GUITARRA", "SINCOPADO", "Pasos CARLOS", "STEPHAN y NEVI (freno en 3 y horiz)", 
 "SERGIO y KATINA (molino en 1 Casa Campo)", "EyG Giro Espalda con Espalda", "DyY (Follow Gira en 8 + Lanzo izq)", "CyT (Balanceo)", "CyT (Péndulo)", "CyT (sensual meter pierna)", "CyT (Tumbar Follow)", "DyY (Cats - Giro en 5 + juego de Brazos)", 
 "IVAN Y SARAI (3 sensual + Cadera)", "JHERSEY Diagonal", "JHERSEY Diagonal", "CyC (Giro en Diagonal + abrazo cuello)", "EyG (5 gira Foll + 7 gira Led)", "EyG (1/2 Sensual + disoc Follow)", "Básico (Grande + Pequeño)", 
 "Básico (Grande/Pequeño + Hombros + Caderas)", "Cuellar Bachatero (Giro + Camb Pos + Sombra + peino)", "CyC (Host - Peino Follow + Me peino)", "CyC (Mymo)", "Giros", "Giros", "DyY (Arriba para Diagonal + Contra en 5)", "CyC (Host 70´+ sombra Follow)",
 "EyG (Cambio posición + Giro + Lanzo)",  "DyY (Led giro atrás en 1 + Onda + Sombra)", "CyC (Host - Diagonal con pasos)", "Salida Instagram Giro espalda Led", "Giro Foll en 5 + Giro Led en 7", 
 "JHERSEY - Giro Follw en 5 + Giro brazo al cuello + Giro Follow en 5 + Preparar Sensual",  "DyY (Onda prep decha - Tiempo normal)", "DyY (Onda prep decha- Tiempo Follow)", "DyY (Onda prep decha - en Sombra Follow)", 
 "EyG (Cambio posición + Giro + Peino + Giro + ONDA abajo)",  "VyA (2 Preparo y abro + 4 Giro Follow - Segovia)", "CyC (½ Diagonal + Preparo en 6 + saco Follow + Lid sombra Segovia)", "DyY (Lanzo + peino + sombra - Segovia)", 
 "CyC (Rompo y atrás + desplazo Follow - Segovia)", "DyY (5 Enrollo + Onla lenta + Salgo en 4 + contra Follow en 5 y 6 y mano escápula - Segovia)", "CyC (Diagonal freno Follow en 3 + piso punta atrás - Segovia)", 
 "DyY (Onda en Sombra Follow prep decha)", "Carlos - Cintura Péndulo", "JHERSEY - Enrollo Follow suelto mano Ext", "JHERSEY - Giro Follow en 5 y semi giro Leader en 7", "JHERSEY - Onda delante-atrás", 
 "DyY - Cats - abro en 1 + Giro Follow + Giro Leader", "DyY abro en 4 - medio cuadrado" , "EyG - Palanca en 1 + sombra", "JHERSEY - Helice", "SENSUAL Lados", "SENSUAL Lados", "DyY (Onda en Sombra Izq me siento)", 
 "YyE (70´ Cats)", "JHERSEY - Onda ando cambio de mano", "EyG (Palabca en 1 + Peino + Juego brazos)", "TONIO (Giro 5 + espalda freno + Giro…Cerrada)", "EyG (Follow Giro en 5 + Estiro brazo 8 + Giro cuello + Contra giro en 5)", 
 "EyG (Ventilador Fecha+ Freno Flow + Giro + Sombra)", "JHERSEY - Salir Onda - Follow abajo en 4", "JHERSEY - Diagonal Sombra - Prepa Follow en 5 + sale en 6", "JHERSEY - Diagonal me paro en 5-8", "JHERSEY - Frame Follow 5-8 mano dch escápula", 
  "JHERSEY - Intro", "JHERSEY - Peino 2 manos", "JHERSEY - Enrollo pasos lentos 1-6 + 7-8 atrás", "JHERSEY - Pasos libres", "JHERSEY - Onda brazo Dcho atrás"
];

const wordsCustom = [
"CyC" (Host cambio posición)", "Daniel y Alma", "JyE (diagonal Cintura)", "EyG (abro y cierro)", "DyY (abro en 4)", "MARCO ESPEJO", "CyC (lanzo atrás en 3)","JHERSY - Preparar pos Cerrada", 
 "SERGIO y KATINA (Círculo y tiro atrás - Bassmnt)", "EyG (Cats giro 2 manos)", "ALBERTO y MARÍA (Giro espalda-Cats)", "JHERSY (preparo sensual + mano Follow)", "JHERSY (preparo sensual + lanzo en 4 y salgo)", 
 "GtoyM", "K_ELDE Intro", "K_ELDE mano en 5", "JLAB (salir/end)", "IVAN y SARAI (Cuadrado Host)", "JHERSY (salir pasos cambio mano)", "JHERSY (Mano en 5 bajar)", "JHERSY (Giro F en 5 + Giro L en 7 más desplazamiento)", 
 "JHERSY pasos", "JHERSY (Giro cambio mano)", "JHERSY (salir/end)", "Cambio posición con mano Izq (Marc/Sra)", "FRANCIA", "Alex y Lais (jóvenes -3+1)", "DyY (SanSebastián - Separo en 4 y al hombro)", "JyE (preparo salida en 8)", 
 "CyC (Mambo Manos Hombro)", "70'", "DyY (Bajo cabeza - Cats)", "DyY (Giro mano escápula - Bassment)", "ENGAÑO", "DyY (Freno + contra + brazo Izq al hombro)", "ENGAÑO", "GERO y MIGLE (cambio pos 360º)", "Cuello (en 6)", "CyT (3 giros con Cuello)", 
 "5 cintura abajo", "CyT sens Péndulo", "DISOCIACION de PECHO (Enrollada)", "CyT (Cambio + 70´)", "JyE Ando atrás", "PABLO y NAT (jóvenes)", "OTTO", "ASCENSOR", "JLAB Muñeco brazos", "JORGE y SANDRA", "JyE Enrollo x 2", "COLOMBIAN", 
 "DISOCIACION de PECHO (en SOMBRA)", "JLAB Doble giro + 70´", "DyY (Onda + Círculo)", "SENSUAL +", "70´Adelante", "JyE", "AyYUR Palanca", "Lado MAMBO", "GAB", "JyE Giro CUELLO", "DISOCIACION de PECHO (pos CERRADA)", "CANGURO", "GUITARRA", 
 "SINCOPADO", "Pasos CARLOS", "STEPHAN y NEVI (freno en 3 y horiz)", "CyC (Diagonal + paseo)", "JHERSEY - Diagonal", "CyT (Tumbar Follow)", "DyY (Cats - Giro en 5 + juego de Brazos)", "IVAN Y SARAI (3 sensual + Cadera)", "EyG (1/2 Sensual + disoc Follow)", 
 "Básico (Grande/Pequeño + Hombros + Caderas)", "D e Inés", "Brazo Lanzo DEBAJO", "Cuellar Bachatero (Giro + Camb Pos + Sombra + peino)", "CyC (Host - Peino Follow + Me peino)", "Giros", "Giros", "CyC (Giro en Diagonal + abrazo cuello)", 
 "SERGIO y KATINA (molino en 1 Casa Campo)", "DyY (Arriba para Diagonal + Contra en 5)", "EyG (Cambio posición + Giro + Lanzo)",  "DyY (Led giro atrás en 1 + Onda + Sombra)", "CyC (Host - Diagonal con pasos)", "Salida Instagram Giro espalda Led", 
 "Giro Foll en 5 + Giro Led en 7", "JHERSEY - Giro Follw en 5 + Giro brazo al cuello + Giro Follow en 5 + Preparar Sensual", "DyY (Onda prep decha - Tiempo normal)", "DyY (Onda prep decha- Tiempo Follow)", "DyY (Onda prep decha - en Sombra Follow)",
 "EyG (Cambio posición + Giro + Peino + Giro + ONDA abajo)", "VyA (2 Preparo y abro + 4 Giro Follow - Segovia)", "CyC (½ Diagonal + Preparo en 6 + saco Follow + Lid sombra Segovia)", "DyY (Lanzo + peino + sombra - Segovia)", 
 "CyC (Rompo y atrás + desplazo Follow - Segovia)", "DyY (5 Enrollo + Onla lenta + Salgo en 4 + contra Follow en 5 y 6 y mano escápula - Segovia)", "CyC (Diagonal freno Follow en 3 + piso punta atrás - Segovia)", 
 "DyY (Onda en Sombra Follow prep decha)", "Carlos - Cintura Péndulo", "JHERSEY - Enrollo Follow suelto mano Ext", "JHERSEY - Giro Follow en 5 y semi giro Leader en 7", "JHERSEY - Onda delante-atrás", 
 "DyY - Cats - abro en 1 + Giro Follow + Giro Leader", "DyY abro en 4 - medio cuadrado" , "EyG - Palanca en 1 + sombra", "JHERSEY - Helice", "SENSUAL Lados", "SENSUAL Lados", "DyY (Onda en Sombra Izq me siento)", "YyE (70´ Cats)",
 "JHERSEY - Onda ando cambio de mano", "CyT (GIRO 70 Cambio Posición)", "EyG (Palabca en 1 + Peino + Juego brazos)", "TONIO (Giro 5 + espalda freno + Giro…Cerrada)", "EyG (Follow Giro en 5+ Estiro brazo 8 + Giro cuello + Contra giro en 5)", 
 "EyG (Ventilador Fecha+ Freno Flow + Giro + Sombra)", "JHERSEY - Salir Onda - Follow abajo en 4", "JHERSEY - Diagonal Sombra - Prepa Follow en 5 + sale en 6", "JHERSEY - Diagonal me paro en 5-8", "JHERSEY - Frame Follow 5-8 mano dch escápula", 
  "JHERSEY - Intro", "JHERSEY - Peino 2 manos", "JHERSEY - Enrollo pasos lentos 1-6 + 7-8 atrás", "JHERSEY - Pasos libres", "JHERSEY - Onda brazo Dcho atrás"
]

const familyPrefixes = ["JHERSEY", "CyC", "EyG", "CyT", "JyE", "DyY"];

// Variables
let wordsCopy = [];
let recentWords = [];
let currentWord = "";
let startTime = 0;
let totalTime = 0;
let wordCount = 0;
let timerInterval;
let gameMode = "easy"; // Por defecto

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
const familyButton = document.getElementById("family");
const familySelector = document.getElementById("family-selector");

// Configurar los botones
function updateLevelButtons() {
  easyButton.classList.remove("active");
  hardButton.classList.remove("active");
  customButton.classList.remove("active");
  familyButton.classList.remove("active");

  if (gameMode === "easy") easyButton.classList.add("active");
  if (gameMode === "hard") hardButton.classList.add("active");
  if (gameMode === "custom") customButton.classList.add("active");
  if (gameMode === "family") familyButton.classList.add("active");

  document.getElementById("family-selector-container").style.display = gameMode === "family" ? "block" : "none";
}

function initializeLevelButtons() {
  gameMode = "easy";
  updateLevelButtons();
}

initializeLevelButtons();

// Cargar las opciones del selector de familia
function populateFamilySelector() {
  familyPrefixes.forEach(prefix => {
    const option = document.createElement("option");
    option.value = prefix;
    option.textContent = prefix;
    familySelector.appendChild(option);
  });
}

populateFamilySelector();

// Asignar eventos a los botones de modo

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

familyButton.addEventListener("click", () => {
  gameMode = "family";
  updateLevelButtons();
});

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function resetWords() {
  if (gameMode === "easy") {
    wordsCopy = [...words];
  } else if (gameMode === "custom") {
    wordsCopy = [...wordsCustom];
  } else if (gameMode === "family") {
    const selectedPrefix = familySelector.value;
    wordsCopy = words.filter(word => word.startsWith(selectedPrefix));
  } else if (gameMode === "hard") {
    wordsCopy = [];
  }

  shuffleArray(wordsCopy);
  recentWords = [];
}

function getRandomWord() {
  if (gameMode === "hard") {
    return words[Math.floor(Math.random() * words.length)];
  }

  if (wordsCopy.length === 0) {
    resetWords();
  }

  let validWords = wordsCopy.filter(word => !recentWords.includes(word));

  if (validWords.length === 0) {
    shuffleArray(wordsCopy);
    validWords = [...wordsCopy];
    recentWords = [];
  }

  const index = Math.floor(Math.random() * validWords.length);
  const word = validWords[index];
  wordsCopy = wordsCopy.filter(w => w !== word);
  recentWords.push(word);
  if (recentWords.length > 20) recentWords.shift();
  return word;
}

function saveHighScore(averageTime, wordCount) {
  const key = gameMode === "easy" ? "easyHighScores"
    : gameMode === "hard" ? "hardHighScores"
    : gameMode === "custom" ? "customHighScores"
    : "familyHighScores";
  let scores = JSON.parse(localStorage.getItem(key)) || [];
  scores.push({ averageTime, wordCount });
  scores.sort((a, b) => a.averageTime - b.averageTime);
  scores = scores.slice(0, 10);
  localStorage.setItem(key, JSON.stringify(scores));
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
  wordElement.textContent = currentWord;
  startTime = Date.now();
  startTimer();
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
