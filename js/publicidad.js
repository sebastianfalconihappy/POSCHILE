const publicidades = [
  {
    tipo: "imagen",
    src: "assets/ads/cumpleanero1.jpg",
    titulo: "Promociones Happy",
  },
  {
    tipo: "imagen",
    src: "assets/ads/cumpleanero2.png",
    titulo: "Beneficios especiales",
  },
  {
    tipo: "imagen",
    src: "assets/ads/precalificado.jpg",
    titulo: "Clientes precalificados",
  },
  {
    tipo: "imagen",
    src: "assets/ads/reiterativo2a5.png",
    titulo: "Clientes reiterativos",
  },
  {
    tipo: "imagen",
    src: "assets/ads/reiterativo6a+.png",
    titulo: "Más beneficios",
  },
  {
    tipo: "video",
    src: "assets/ads/happyvideo.mp4",
    titulo: "Happy App",
  },
];

let pubIndex = 0;
let pubTiempo = 5;
let pubInterval = null;
let pubTimeout = null;

function limpiarTimersPublicidad() {
  clearInterval(pubInterval);
  clearTimeout(pubTimeout);
}

function renderPublicidad() {
  const actual = publicidades[pubIndex];

  const titulo = document.getElementById("pubTitulo");
  const mediaBox = document.getElementById("pubMediaBox");
  const progress = document.getElementById("pubProgress");
  const tiempo = document.getElementById("pubTiempo");

  if (!titulo || !mediaBox || !progress || !tiempo) return;

  limpiarTimersPublicidad();

  titulo.textContent = actual.titulo;

  if (actual.tipo === "imagen") {
    mediaBox.innerHTML = `
      <img
        class="publicidad-media"
        src="${actual.src}"
        alt="${actual.titulo}"
      />
    `;

    pubTiempo = 5;
    tiempo.textContent = `Siguiente publicidad en ${pubTiempo}s`;

    pubInterval = setInterval(() => {
      pubTiempo--;

      if (pubTiempo <= 0) {
        pubTiempo = 0;
      }

      tiempo.textContent = `Siguiente publicidad en ${pubTiempo}s`;
    }, 1000);

    pubTimeout = setTimeout(() => {
      siguientePublicidad();
    }, 5000);
  }

  if (actual.tipo === "video") {
    mediaBox.innerHTML = `
      <video
        class="publicidad-media"
        src="${actual.src}"
        autoplay
        muted
        playsinline
        controls
      ></video>
    `;

    const video = mediaBox.querySelector("video");

    if (video) {
      video.addEventListener("ended", siguientePublicidad);
    }

    tiempo.textContent = "Reproduciendo video promocional";
  }

  progress.innerHTML = publicidades
    .map((_, index) => {
      return `<span class="${index === pubIndex ? "activo" : ""}"></span>`;
    })
    .join("");
}

function siguientePublicidad() {
  pubIndex = pubIndex === publicidades.length - 1 ? 0 : pubIndex + 1;
  renderPublicidad();
}

function entrarAlLogin() {
  limpiarTimersPublicidad();

  if (typeof mostrarMetodoPago === "function") {
    const overlay = document.getElementById("publicidadOverlay");
    const metodoPagoScreen = document.getElementById("metodoPagoScreen");
    const loginOverlay = document.getElementById("loginOverlay");
    if (overlay) {
      if (loginOverlay) loginOverlay.style.display = "none";
      if (metodoPagoScreen) {
        document.body.classList.add("metodo-pago-open");
        metodoPagoScreen.style.display = "block";
        metodoPagoScreen.classList.remove("metodo-pago--exit");
        metodoPagoScreen.classList.add("metodo-pago--enter");
        setTimeout(() => metodoPagoScreen.classList.remove("metodo-pago--enter"), 720);
      }
      overlay.classList.add("publicidad-page--exit");
      setTimeout(() => {
        overlay.style.display = "none";
        overlay.classList.remove("publicidad-page--exit");
      }, 520);
    } else {
      mostrarMetodoPago();
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const loginOverlay = document.getElementById("loginOverlay");

  if (loginOverlay) {
    loginOverlay.style.display = "none";
  }

  renderPublicidad();
});
