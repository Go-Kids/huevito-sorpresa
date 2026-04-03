const egg = document.getElementById("egg");
const button = document.getElementById("openBtn");
const codeInput = document.getElementById("codeInput");
const instruction = document.getElementById("instruction");

// Mapeo de códigos a sus respectivas imágenes de premio
const REWARDS = {
  "GK-S1": "assets/1clasegratis.png",
  "GK-S2": "assets/1taekwondo.png",
  "GK-S3": "assets/10descuento.png",
  "GK-S4": "assets/25matricula.png"
};

// Revisar si hay un código en la URL (ej: index.html?code=SORPRESA)
const urlParams = new URLSearchParams(window.location.search);
const codeFromUrl = urlParams.get('code')?.toUpperCase();

let activeReward = null;

if (codeFromUrl && REWARDS[codeFromUrl]) { // Caso 1: Código válido en la URL
  // Ocultamos la interfaz de texto y preparamos el huevo para clic
  codeInput.style.display = "none";
  button.style.display = "none";
  instruction.textContent = "¡Toca el huevito para descubrir tu sorpresa!";
  egg.style.cursor = "pointer";
  activeReward = REWARDS[codeFromUrl];
} else { // Caso 2: No hay código o es inválido (URL cruda cae aquí)
  codeInput.style.display = "none";
  button.style.display = "none";
  instruction.textContent = "Acceso no válido. Por favor, usa el enlace enviado por GoKids.";
  egg.style.cursor = "default"; // Aseguramos que el cursor no sea de puntero
}

const openEgg = (rewardImage) => {
  // Evitar que se repita la animación si ya está abriendo
  if (egg.classList.contains("opening") || egg.src.includes("abierto")) {
    return;
  }

  // Animación de apertura
  egg.classList.add("opening");

  // Ocultar la etiqueta de instrucción al abrir
  instruction.style.display = "none";

  // Cambia al huevito abierto
  setTimeout(() => {
    egg.src = rewardImage;
    egg.classList.remove("opening");
    egg.style.cursor = "default";
  }, 700);

  button.disabled = true;
  codeInput.disabled = true;
};

// Evento al hacer clic directamente en el huevo
egg.addEventListener("click", () => {
  if (activeReward) {
    openEgg(activeReward);
  }
});

// Evento para el botón (mantiene compatibilidad manual)
button.addEventListener("click", () => {
  const code = codeInput.value.trim().toUpperCase();

  if (REWARDS[code]) {
    openEgg(REWARDS[code]);
  } else {
    alert("Código incorrecto. Inténtalo de nuevo.");
    return;
  }
});