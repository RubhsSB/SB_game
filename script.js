// =======================
// LISTAS DE PALABRAS
// =======================

const words = [
  "CyC (Host cambio posición)", "Daniel y Alma", "JyE (Diagonal Cintura)", "MARCO ESPEJO", "CyC (lanzo atrás en 3)", "JHERSY (Preparar pos Cerrada)", "ALBERTO y MARÍA (Cats - Giro espalda)", 
  "JHERSY (Preparo sensual + mano Follow)", "JHERSY (preparo sensual + lanzo en 4 y salgo)", "K_ELDE Intro", "K_ELDE (mano en 5)", "JLAB (salir/end)", "JHERSY (salir pasos cambio mano)", "JHERSY (Mano en 5 bajar)", "JHERSY (Giro F en 5 + Giro L en 7 más desplazamiento)", "JHERSY pasos", 
  "JHERSY (Giro cambio mano)", "JHERSY (salir/end)", "MyS (Cambio posición con mano Izq)", "FRANCIA", "Alex y Lais (jóvenes -3+1)", "DyY (SanSebastián - Separo en 4 y al hombro)", "CyC (Mambo Manos Hombro)", "70'", "DyY (Cats - Bajo cabeza)", "ENGAÑO", "GERO y MIGLE (cambio pos 360º)", 
  "CyT (3 giros con Cuello)", "5 cintura abajo", "CyT (sens Péndulo)", "DISOCIACION de PECHO (Enrollada)", "CyT (Cambio + 70´)", "JyE (Ando atrás)", "OTTO", "ASCENSOR", "JLAB (Muñeco brazos)", "JORGE y SANDRA", "JyE (Enrollo x 2)", "DISOCIACION de PECHO (en SOMBRA)", "JLAB (Doble giro + 70´)", 
  "DyY (Onda + Círculo)", "SENSUAL +", "70´Adelante", "AyYUR Palanca", "Lado MAMBO", "DISOCIACION de PECHO (pos CERRADA)", "GUITARRA", "SINCOPADO", "STEPHAN y NEVI (freno en 3 y horiz)", "JHERSY (Diagonal)", "CyT (Tumbar Follow)", "DyY (Cats - Giro en 5 + juego de Brazos)", 
  "IVAN Y SARAI (3 sensual + Cadera)", "EyG (1/2 Sensual + disoc Follow)", "Básico (Grande/Pequeño + Hombros + Caderas)", "D e Inés", "Brazo Lanzo DEBAJO", "Cuellar Bachatero (Giro + Camb Pos + Sombra + peino)", "Giros", "CyC (Giro en Diagonal + abrazo cuello)", "CyC (Host - Diagonal con pasos)", 
  "Instag Salida Giro espalda Led", "Giro Foll en 5 + Giro Led en 7", "DyY (Onda prep decha - Tiempo normal)", "DyY (Onda prep decha- Tiempo Follow)", "DyY (Onda prep decha - en Sombra Follow)", "EyG (Cambio posición + Giro + Peino + Giro + ONDA abajo)", "CyC (Segovia - ½ Diagonal + Preparo en 6)",
  "DyY (Segovia - Lanzo + peino + sombra)", "CyC (Segovia - Rompo y atrás)", "CyC (Segovia - Diagonal freno Follow en 3)", "DyY (Onda en Sombra Follow prep decha)", "Carlos (Cintura Péndulo)", "JHERSY (Enrollo Follow suelto mano Ext)", 
  "JHERSY (Giro Follow en 5 y semi giro Leader en 7)", "JHERSY (Onda delante-atrás)", "DyY (Cats - abro en 1 + Giro Follow + Giro Leader)", "JHERSY (Helice)", "SENSUAL Lados", "JHERSY (Onda ando cambio de mano)", "TONIO (Giro 5 + espalda freno + Giro…Cerrada)", "EyG (Follow Giro en 5+ Estiro brazo 8)",
  "JHERSY (Salir Onda - Follow abajo en 4)", "JHERSY (Diagonal Sombra - Prepa Follow en 5 + sale en 6)", "JHERSY (Diagonal me paro en 5-8)", "JHERSY (Frame Follow 5-8 mano dch escápula)", "JHERSY Intro", "JHERSY (Peino 2 manos)", 
  "JHERSY (Enrollo pasos lentos 1-6 + 7-8 atrás)", "JHERSY (Pasos libres)", "JHERSY (Lado con lado brazo Dcho Onda atrás)", "TITANIC", "CyC (Freno en 6 + L de brazos)", "JHERSY (Acordeon - de lado en 5)", "JHERSY (Abro Izq - 5 Lado deslizo pies)", "INTRO Carlos", "JHERSY (Sensual - mano cintura)", 
  "JyL (Host - Diagonal)", "JHERSY (Onda + 5 coger mano Follow y salir)", "DyY (Diagonal tensión + Abajo/Arriba)", "DyY (Agarre gancho onda)", "YyE (Bachata Flow)", "JyL (Host- Diagonal y ando)", "JyE (Peino + mano hombro)", "Stefy (Diagonal Freno)", "Stefy (Molino + sombra+ Cuello)", 
  "Stefy (Diagonal + me peino)", "Stefy (Catapulta + juego manos)", "Stefy (Catapulta + Enrollo)", "Stefy (Molino + giro Follow)", "JyE (Led Giro + Cambio mano + ZigZag)", "JHERSY (Balanceo)", "JHERSY (1 Rompo atrás + 5 adelante)", "Giro + Engaño", "JHERSY (Salida Diagonal)", 
  "JHERSY (Lanzo mano atrás + cadera + saco en 7)", "JHERSY (Mano/s pecho)", "JHERSY (Peinar con 2 manos)", "JHERSY (Posición cerrada vaivén)", "JHERSY (En 1 giro por detrás mano izq cuello)", "JHERSY (1 atrás/rompe estirado brazo para giro Lid en 5)", "VyA (Host - 4 Preparo y freno Follow en sombra)", 
  "ByL (Host - 4 figuras)", "IyR (Host - 4 abro para pasos)", "BÁSICO - Frame", "JyL (Benidorm)", "KyN (Benidorm - Diagonal)", "EyG (LED peino izq + brazo Follow atrás en 2, preparo para giro con mano en sobaco/espalda)", 
  "JyE (Peino Decha + agarro brazo + sombra)", "DyY (Bassement 70´ en 1)", "JyE (Peino Izq + apoyo Decha hombro)", "JyE (Sensual + Disociación en 1)", "JyE (Sensual + Onda Follow en 5)", "SyK (Cats - 5 traigo y sombra)", "CyG (Andar atás completo - 8)", 
  "CyG (Andar atrás 1-4 + abrazo + 5 IZQ + 6 CENTRO + 7 SEPARO + 8 JUNTO)", "CyG (Frame - junto en 1 separo 2 a 4 + junto en 5 separo 6 a 8)", "SUAVE", "DISFRUTA", "DyY (Cats - peino Fol en 1)", "ByL (Bachata Flow)", "NyE (Cha3)", "DyY (Pasitos)", "JHERSY (Giro Follow con mano derecha)", 
  "JHERSY (en 5 amago y giro Follow)", "JHERSY (giro suave en 5 + freno + en 7 traigo suave a sombra)", "JHERSY (Mambo tensión brazos abajo/ariba)", "DyY (Cruzo manos + Sombra en 5 + Giro en 7)", "GyJ (Cha3 - Freno 6)", "JyE (Cats - Pegado círculo cadera)", 
  "JyE (Cambio posición en 5 + mano cuello en 8 + saco Follow)", "JyE (Versión 1 - Enrrollo en 5)", "JyE (Versión 2 - Giro por detrás + cambio posisión en 5)", "JyE (Versión 1 + 2 - Enrrollo en 5 + sombra + péndulos)", "JHERSY (Cambio posición en 5 + mano cuello en 8 con mano decha en cintura)", 
  "JHERSY (suave)", "JHERSY (postura)", "JHERSY (liderar)", "SyK (Bailarina)", "SyA (Cats - Diagonal + Giro Follow y abajo)", "DyY (Giro mano Izq en 5)", "DyY (en 4 de lado dejo caer la mano mi espalda y en 5 me giro)", "JyE (peino + doble giro)", "JyE (Diagonal + preparo + vuelta alrededor)", 
  "JHERSY (Estirados pasar mano por encima 1º en 1)", "JHERSY (Cogiéndo del codo Péndulo on brazo + giro cabeza + cambre)", "JHERSY (Andar atrás de lado empieza como Diagonal)", "JHERSY (Giro cambio mano con vuelta Follow y Led - J6J)", "JHERSY (en sombra hacer Rueda)", 
  "JHERSY (En posición cerrada dos Ondas laterales rápidas)", "JHERSY (Mambo - tensión brazos 1o Izq + 5º Decha)", "ByL (MAD - Lanzo Decha)", "MyS (MAD - Cambio pos en 1)", "Illusion", "Bailar en el sitio - Mov pequeños", "EyG (Break 1 Jowke - Preparo en 4, en 5 estiro atrás Drcho)", 
  "EyG (1 lanzo Dcho atrás- Jowke)", "EyG (Guitarra círculos - Jowke)", "EyG (Piano - Jowke)", "JyE (Diagonal + Giro en 6 Led + juego de pies + sombra Follow)", "AyA (CATs - Enrollo en 5)", "JyL (CATS - Freno Follow en 6 y yo sigo)", "Franceses (CATS - Freno Follow en 6 y ambos IZQ para péndulo)",
  "MatySof (CATS - Freno en 6 con mano Drecha hombr Follow)", "JyE (Diagonal + en 5 preparo para ponernos de espaldas)", "JyE (Sensual + rompo para sensual en 4)", "Chica Exorcista", "MOlino Follow", "Freno MOlino en 4", "Chica Exorcista", "MOlino Follow", "Freno MOlino en 4",  
  "JyE (Diagonal y preparo en 7-8 preparo arriba para Sensual con brazo pegados)", "Beyto (En sombra brazo por encima en 1)", "CyC (Freno en 6 + Giro fram brazos)", "JyE (Diagonal + preparo en 8 para sombra)", "JyE (Snsual + 5 izq, 6 abajo + 7 dcha + 8 atrá - arriba)", "YAKO - Dominicana", "YAKO - Dominicana"
];

const wordsCustom = [
   "JLAB (salir/end)", "JHERSY (salir pasos cambio mano)", "JHERSY (Mano en 5 bajar)", "JHERSY (Giro F en 5 + Giro L en 7 más desplazamiento)", "JHERSY pasos", "JHERSY (Giro cambio mano)", "JHERSY (salir/end)", "MyS (Cambio posición con mano Izq)", "DyY (SanSebastián - Separo en 4 y al hombro)", 
  "CyC (Mambo Manos Hombro)", "70'", "ENGAÑO", "Giro + Engaño", "GERO y MIGLE (cambio pos 360º)", "CyT (3 giros con Cuello)", "5 cintura abajo", "CyT (sens Péndulo)", "DISOCIACION de PECHO (Enrollada)", "CyT (Cambio + 70´)", "JyE (Ando atrás)", "OTTO", "ASCENSOR", "JLAB (Muñeco brazos)", 
  "JORGE y SANDRA", "JyE (Enrollo x 2)", "DISOCIACION de PECHO (en SOMBRA)", "JLAB (Doble giro + 70´)", "DyY (Onda + Círculo)", "SENSUAL +", "70´Adelante", "AyYUR Palanca", "Lado MAMBO", "DISOCIACION de PECHO (pos CERRADA)", "GUITARRA", "SINCOPADO", "STEPHAN y NEVI (freno en 3 y horiz)", 
  "JHERSY (Diagonal)", "CyT (Tumbar Follow)", "DyY (Cats - Giro en 5 + juego de Brazos)", "IVAN Y SARAI (3 sensual + Cadera)", "EyG (1/2 Sensual + disoc Follow)", "Básico (Grande/Pequeño + Hombros + Caderas)", "D e Inés", "Brazo Lanzo DEBAJO", "Cuellar Bachatero (Giro + Camb Pos + Sombra + peino)", 
  "Giros", "CyC (Giro en Diagonal + abrazo cuello)", "Instag Salida Giro espalda Led", "Giro Foll en 5 + Giro Led en 7", "JHERSY (Preparar pos Cerrada)", "DyY (Onda prep decha - Tiempo normal)", "DyY (Onda prep decha- Tiempo Follow)", "DyY (Onda prep decha - en Sombra Follow)", 
  "EyG (Cambio posición + Giro + Peino + Giro + ONDA abajo)", "CyC (Segovia - ½ Diagonal + Preparo en 6)", "DyY (Onda en Sombra Follow prep decha)", "Carlos (Cintura Péndulo)", "JHERSY (Enrollo Follow suelto mano Ext)", "JHERSY (Giro Follow en 5 y semi giro Leader en 7)", "JHERSY (Onda delante-atrás)", 
  "DyY (Cats - abro en 1 + Giro Follow + Giro Leader)", "JHERSY (Helice)", "SENSUAL Lados", "JHERSY (Onda ando cambio de mano)", "TONIO (Giro 5 + espalda freno + Giro…Cerrada)", "EyG (Follow Giro en 5+ Estiro brazo 8)", "JHERSY (Salir Onda - Follow abajo en 4)", 
  "JHERSY (Diagonal Sombra - Prepa Follow en 5 + sale en 6)", "JHERSY (Diagonal me paro en 5-8)", "JHERSY (Frame Follow 5-8 mano dch escápula)", "JHERSY Intro", "JHERSY (Peino 2 manos)", "JHERSY (Enrollo pasos lentos 1-6 + 7-8 atrás)", "JHERSY (Pasos libres)", 
  "JHERSY (Lado con lado brazo Dcho Onda atrás)", "TITANIC", "JHERSY (Acordeon - de lado en 5)", "JHERSY (Abro Izq - 5 Lado deslizo pies)", "INTRO Carlos", "JHERSY (Sensual - mano cintura)", "JyL (Host - Diagonal)", "JHERSY (Onda + 5 coger mano Follow y salir)", "DyY (Diagonal tensión + Abajo/Arriba)", 
  "DyY (Agarre gancho onda)", "YyE (Bachata Flow)", "JyL (Host- Diagonal y ando)", "JyE (Peino + mano hombro)", "Stefy (Diagonal Freno)", "Stefy (Molino + sombra+ Cuello)", "Stefy (Diagonal + me peino)", "Stefy (Catapulta + juego manos)", "Stefy (Catapulta + Enrollo)", "Stefy (Molino + giro Follow)", 
  "JyE (Led Giro + Cambio mano + ZigZag)", "JHERSY (Balanceo)", "JHERSY (1 Rompo atrás + 5 adelante)", "Giro + Engaño", "JHERSY (Salida Diagonal)", "JHERSY (Lanzo mano atrás + cadera + saco en 7)", "JHERSY (Mano/s pecho)", "JHERSY (Peinar con 2 manos)", "JHERSY (Posición cerrada vaivén)", 
  "JHERSY (En 1 giro por detrás mano izq cuello)", "JHERSY (1 atrás/rompe estirado brazo para giro Lid en 5)", "VyA (Host - 4 Preparo y freno Follow en sombra)", "BÁSICO - Frame", "KyN (Benidorm - Diagonal)", "EyG (LED peino izq + brazo Follow atrás en 2, preparo para giro con mano en sobaco/espalda)",
  "JyE (Peino Decha + agarro brazo + sombra)", "DyY (Bassement 70´ en 1)", "JyE (Peino Izq + apoyo Decha hombro)", "JyE (Sensual + Disociación en 1)", "JyE (Sensual + Onda Follow en 5)", "SyK (Cats - 5 traigo y sombra)", "CyG (Andar atás completo - 8)", 
  "CyG (Andar atrás 1-4 + abrazo + 5 IZQ + 6 CENTRO + 7 SEPARO + 8 JUNTO)", "CyG (Frame - junto en 1 separo 2 a 4 + junto en 5 separo 6 a 8)", "SUAVE", "DISFRUTA", "DyY (Cats - peino Fol en 1)", "ByL (Bachata Flow)", "NyE (Cha3)", "DyY (Pasitos)", "JHERSY (Giro Follow con mano derecha)", 
  "JHERSY (en 5 amago y giro Follow)", "JHERSY (giro suave en 5 + freno + en 7 traigo suave a sombra)", "JHERSY (Mambo tensión brazos abajo/ariba)", "DyY (Cruzo manos + Sombra en 5 + Giro en 7)", "GyJ (Cha3 - Freno 6)", "JyE (Cats - Pegado círculo cadera)", 
  "JyE (Cambio posición en 5 + mano cuello en 8 + saco Follow)", "JyE (Versión 1 - Enrrollo en 5)", "JyE (Versión 2 - Giro por detrás + cambio posisión en 5)", "JyE (Versión 1 + 2 - Enrrollo en 5 + sombra + péndulos)", "JHERSY (Cambio posición en 5 + mano cuello en 8 con mano decha en cintura)", 
  "JHERSY (suave)", "JHERSY (postura)", "JHERSY (liderar)", "SyK (Bailarina)", "SyA (Cats - Diagonal + Giro Follow y abajo)", "DyY (Giro mano Izq en 5)", "DyY (en 4 de lado dejo caer la mano mi espalda y en 5 me giro)", "JyE (peino + doble giro)", "JyE (Diagonal + preparo + vuelta alrededor)",
  "JHERSY (Estirados pasar mano por encima 1º en 1)", "JHERSY (Cogiéndo del codo Péndulo on brazo + giro cabeza + cambre)", "JHERSY (Andar atrás de lado empieza como Diagonal)", "JHERSY (Giro cambio mano con vuelta Follow y Led - J&J)", "JHERSY (en sombra hacer Rueda)", 
  "JHERSY (En posición cerrada dos Ondas laterales rápidas)", "JHERSY (Mambo - tensión brazos 1o Izq + 5º Decha)", "ByL (MAD - Lanzo Decha)", "MyS (MAD - Cambio pos in 1)", "Illusion", "Bailar en el sitio - Mov pequeños", "EyG (Break 1 Jowke - Preparo en 4, en 5 estiro atrás Drcho)", 
  "EyG (1 lanzo Dcho atrás- Jowke)", "EyG (Guitarra círculos - Jowke)", "EyG (Piano - Jowke)", "JyE (Diagonal + Giro en 6 Led + juego de pies + sombra Follow)", "AyA (CATs - Enrollo en 5)", "JyL (CATS - Freno Follow en 6 y yo sigo)", "Franceses (CATS - Freno Follow en 6 y ambos IZQ para péndulo)",
  "MatySof (CATS - Freno en 6 con mano Drecha hombr Follow)", "JyE (Diagonal + en 5 preparo para ponernos de espaldas)", "JyE (Sensual + rompo para sensual en 4)", "Chica Exorcista", "MOlino Follow", "Freno MOlino en 4", "Chica Exorcista", "MOlino Follow", "Freno MOlino en 4", 
  "JyE (Diagonal y preparo en 7-8 preparo arriba para Sensual con brazo pegados)", "Beyto (En sombra brazo por encima en 1)", "CyC (Freno en 6 + Giro fram brazos)", "JyE (Diagonal + preparo en 8 para sombra)", "JyE (Snsual + 5 izq, 6 abajo + 7 dcha + 8 atrá - arriba)", "YAKO - Dominicana", "YAKO - Dominicana"
];

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
const customButton = document.getElementById("custom");
const familyButton = document.getElementById("family");
const familySelect = document.getElementById("family-selector");

// =======================
// INICIALIZACIÓN
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

  playButton.style.display = "inline-block";
  nextButton.style.display = "none";
  finishButton.style.display = "none";
});

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
  if (gameMode === "easy") {
    wordsQueue = shuffle([...words]);
  } else if (gameMode === "custom") {
    wordsQueue = shuffle([...wordsCustom]);
  } else if (gameMode === "family") {
    const prefix = familySelect.value;
    wordsQueue = shuffle(words.filter(w => w.startsWith(prefix)));
  }
}

function getNextWord() {
  if (gameMode === "hard") {
    return words[Math.floor(Math.random() * words.length)];
  }
  if (wordsQueue.length === 0) {
    refillQueue();
  }
  return wordsQueue.shift();
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
  wordsQueue = [];
  refillQueue();
  
  currentWord = getNextWord();
  wordElement.innerHTML = formatWordDisplay(currentWord);
  
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
  // Solo permite pasar si el juego ha comenzado (Play oculto)
  if (playButton.style.display !== "none") return;

  const endTime = Date.now();
  totalTime += (endTime - startTime) / 1000;
  wordCount++;
  counterElement.textContent = `Palabras: ${wordCount}`;
  
  currentWord = getNextWord();
  wordElement.innerHTML = formatWordDisplay(currentWord);
  
  startTime = Date.now();
});

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
}, {passive: true});

document.addEventListener("touchend", e => {
  // Bloqueo: No permite swipe si no se ha dado a PLAY
  if (playButton.style.display !== "none") return;

  let touchEndX = e.changedTouches[0].screenX;
  let distance = touchEndX - touchStartX;

  if (Math.abs(distance) > 50 && !nextButton.disabled) {
    nextButton.click();
    if (window.navigator.vibrate) window.navigator.vibrate(10);
  }
}, {passive: true})









