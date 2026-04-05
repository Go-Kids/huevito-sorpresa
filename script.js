const egg = document.getElementById("egg");
const instruction = document.getElementById("instruction");

// Mapeo de códigos a sus respectivas imágenes de premio
const REWARDS = {
  "GK-S1": "assets/1clasegratis.png",
  "GK-S2": "assets/1taekwondo.png",
  "GK-S3": "assets/10descuento.png",
  "GK-S4": "assets/25matricula.png"
};

// Pre-cargar imágenes de recompensa para evitar retrasos al mostrarlas
Object.values(REWARDS).forEach(imagePath => {
  const img = new Image();
  img.src = imagePath;
});

// Revisar si hay un código en la URL (ej: index.html?code=SORPRESA)
const urlParams = new URLSearchParams(window.location.search);
const codeFromUrl = urlParams.get('code')?.toUpperCase();

let activeReward = null;

if (codeFromUrl && REWARDS[codeFromUrl]) { // Caso 1: Código válido en la URL
  instruction.textContent = "¡Toca el huevito para descubrir tu sorpresa!";
  egg.style.cursor = "pointer";
  activeReward = REWARDS[codeFromUrl];
} else { // Caso 2: No hay código o es inválido (URL cruda cae aquí)
  instruction.innerHTML = "¡Hola! Para ver tu sorpresa, por favor usa el enlace que te envió GoKids.<br>¡Te esperamos!";
  egg.style.cursor = "default"; // Aseguramos que el cursor no sea de puntero
}

const openEgg = (rewardImage) => {
  // Evitar que se repita la animación si ya está abriendo
  if (egg.classList.contains("opening") || egg.classList.contains("opened")) {
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
    egg.classList.add("opened");
    egg.style.cursor = "default";
  }, 600); // Ajustado para que coincida con la duración de la animación 'shake' (0.6s)
};

// Evento al hacer clic directamente en el huevo
egg.addEventListener("click", () => {
  if (activeReward) {
    openEgg(activeReward);
  }
});