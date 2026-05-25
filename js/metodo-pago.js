function mostrarMetodoPago() {
  const publicidadOverlay = document.getElementById("publicidadOverlay");
  const metodoPagoScreen = document.getElementById("metodoPagoScreen");
  const loginOverlay = document.getElementById("loginOverlay");

  if (publicidadOverlay) publicidadOverlay.style.display = "none";
  if (loginOverlay) loginOverlay.style.display = "none";
  if (metodoPagoScreen) {
    document.body.classList.add("metodo-pago-open");
    metodoPagoScreen.style.display = "block";
    metodoPagoScreen.classList.remove("metodo-pago--exit");
    metodoPagoScreen.classList.add("metodo-pago--enter");
    setTimeout(() => metodoPagoScreen.classList.remove("metodo-pago--enter"), 720);
  }
}

function seleccionarMetodoPago(metodo, card) {
  const metodoPagoScreen = document.getElementById("metodoPagoScreen");
  const loginOverlay = document.getElementById("loginOverlay");

  if (loginOverlay) loginOverlay.style.display = "none";
  const selectedCard = card || window.event?.currentTarget;
  if (selectedCard) selectedCard.classList.add("is-selected");

  const prepareNextScreen = () => {
    if (metodo === "Leasing") {
      S.payMethod = "leasing";
      S.isSigma = true;
      if (typeof prepareLeasingDemoPrecalificacion === "function") {
        prepareLeasingDemoPrecalificacion();
      }
      OP.pago = true;

      document.getElementById("navLeas").style.display = "";
      document.getElementById("btnCancel").style.display = "";

      startTimer();
      setProgress(0);
      setTitle("Leasing - Identificacion + LDPD + OTP");
      goScreen("lp1");
      return;
    }

    if (metodo !== "Leasing") {
      S.payMethod = "otro";
      S.isSigma = false;
      setTitle("POS - Catalogo de productos");
      if (typeof openPosCatalog === "function") openPosCatalog();
      else goScreen("catalog");
      if (typeof updateDirectCreditCta === "function") updateDirectCreditCta();
    }
  };

  const finishTransition = () => {
    if (metodoPagoScreen) {
      metodoPagoScreen.style.display = "none";
      metodoPagoScreen.classList.remove("metodo-pago--exit");
    }
    document.body.classList.remove("metodo-pago-open");
    if (selectedCard) selectedCard.classList.remove("is-selected");
  };

  prepareNextScreen();

  if (metodoPagoScreen) {
    metodoPagoScreen.classList.add("metodo-pago--exit");
    setTimeout(finishTransition, 520);
  } else {
    finishTransition();
  }
}
