"use strict";

const palabras = [
  "LEALTAD", "BARRIO", "RESPETO", "SUEÑOS",
  "FAMILIA", "SUPERACIÓN", "REALIDAD", "DESTINO",
  "HUMILDAD", "LIBERTAD", "ESFUERZO", "VALENTÍA"
];

const frases = [
  "Vengo de abajo, por eso sé cuánto cuesta llegar arriba.",
  "La lealtad se demuestra cuando no hay nada que ganar.",
  "No necesito aparentar una vida que no me pertenece.",
  "Mis errores me enseñaron lo que el orgullo no pudo.",
  "Paso firme, mente despierta y los pies en la tierra.",
  "El barrio me dio historias; el futuro lo escribo yo.",
  "No compito con nadie: mi reto es superar mi versión de ayer.",
  "Los sueños pesan, pero rendirse pesa mucho más.",
  "La humildad no me hace menos; me recuerda de dónde vengo.",
  "Que hablen de mi camino, yo sigo construyendo el mío."
];

const nombres = [
  "Sombra Roja", "Rima Salvaje", "Doble Filo",
  "Nexo Callejero", "Ritmo Bravo", "Verso Nocturno",
  "Crudo Flow", "Lobo del Beat", "Rima Feroz",
  "Zona Cero", "Noche de Asfalto", "Voz de Acero",
  "Código Urbano", "Fuego Lírica", "Ritmo de Barrio"
];

const temas = [
  "Lealtad frente a la traición",
  "Salir adelante sin olvidar tus raíces",
  "El precio de perseguir un sueño",
  "Barrio, familia y respeto",
  "La diferencia entre fama y respeto",
  "Caer, levantarse y volver más fuerte",
  "La amistad cuando llegan los problemas",
  "Elegir tu propio camino"
];

let contenidoActual = "";

function elegir(lista) {
  return lista[Math.floor(Math.random() * lista.length)];
}

function mostrar(texto) {
  contenidoActual = texto;

  document.getElementById("resultText").textContent = texto;

  const boton = document.getElementById("shareBtn");
  boton.style.display = "inline-block";

  document.getElementById("resultado").scrollIntoView({
    behavior: "smooth",
    block: "center"
  });
}

function irA(id) {
  document.getElementById(id).scrollIntoView({
    behavior: "smooth"
  });
}

function nuevoReto() {
  const palabra = elegir(palabras);

  mostrar(
    "🎤 TU RETO DE FREESTYLE\n\n" +
    "Palabra obligatoria: " + palabra + "\n\n" +
    "Tu misión:\n" +
    "1. Crea cuatro líneas originales.\n" +
    "2. Incluye la palabra en tu rima.\n" +
    "3. Tienes 60 segundos para improvisar.\n" +
    "4. Termina con una barra que sorprenda.\n\n" +
    "¡Que hable tu creatividad!"
  );
}

function nuevaFrase() {
  mostrar("🔥 FRASE DEL MOMENTO\n\n" + elegir(frases));
}

function nuevoNombre() {
  mostrar(
    "🎭 TU NOMBRE ARTÍSTICO\n\n" +
    elegir(nombres) +
    "\n\nConsejo: comprueba que el nombre esté disponible " +
    "antes de usarlo como marca o artista."
  );
}

function nuevaBatalla() {
  mostrar(
    "⚔️ MODO BATALLA\n\n" +
    "Tema: " + elegir(temas) + "\n\n" +
    "RONDA 1: cada participante tiene 30 segundos.\n" +
    "RONDA 2: improvisen usando la palabra " +
    elegir(palabras) + ".\n" +
    "RONDA 3: una barra final para cerrar.\n\n" +
    "Puntúen creatividad, ritmo y originalidad. " +
    "Gana la mejor rima, no el insulto más fuerte."
  );
}

async function compartir() {
  if (!contenidoActual) return;

  const texto = "🔥 TRAP ZONE 🔥\n\n" + contenidoActual;

  if (navigator.share) {
    try {
      await navigator.share({
        title: "TRAP ZONE",
        text: texto
      });
    } catch (error) {
      if (error.name !== "AbortError") {
        copiarTexto(texto);
      }
    }
  } else {
    copiarTexto(texto);
  }
}

async function copiarTexto(texto) {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(texto);
    } else {
      const area = document.createElement("textarea");
      area.value = texto;
      area.style.position = "fixed";
      area.style.opacity = "0";
      document.body.appendChild(area);
      area.select();

      const copiado = document.execCommand("copy");
      area.remove();

      if (!copiado) throw new Error("No se pudo copiar");
    }

    alert("Texto copiado. Ya puedes compartirlo.");
  } catch {
    alert("No se pudo copiar automáticamente. Selecciona el texto y cópialo.");
  }
}

const barras = document.getElementById("misBarras");
const contador = document.getElementById("contador");

barras.addEventListener("input", () => {
  contador.textContent = barras.value.length + " / 1500";
});

async function compartirBarras() {
  const texto = barras.value.trim();

  if (!texto) {
    alert("Primero escribe tus barras.");
    barras.focus();
    return;
  }

  contenidoActual = texto;
  await compartir();
}

console.log("TRAP ZONE iniciado correctamente.");
