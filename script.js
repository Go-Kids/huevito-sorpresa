const egg = document.getElementById("egg");
const button = document.getElementById("openBtn");
const codeInput = document.getElementById("codeInput");

button.addEventListener("click", () => {
  const code = codeInput.value.trim();

  if (!code) {
    alert("Por favor ingresa un código");
    return;
  }

  // Animación de apertura
  egg.classList.add("opening");

  // Cambia al huevito abierto
  setTimeout(() => {
    egg.src = "assets/huevito_abierto_festejo.png";
    egg.classList.remove("opening");
  }, 700);

  // Opcional: desactivar input y botón
  button.disabled = true;
  codeInput.disabled = true;
});