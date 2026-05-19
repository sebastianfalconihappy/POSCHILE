function mostrarMetodoPago() {
  const publicidadOverlay = document.getElementById("publicidadOverlay");
  const metodoPagoScreen = document.getElementById("metodoPagoScreen");
  const loginOverlay = document.getElementById("loginOverlay");

  if (publicidadOverlay) publicidadOverlay.style.display = "none";
  if (loginOverlay) loginOverlay.style.display = "none";
  if (metodoPagoScreen) metodoPagoScreen.style.display = "block";
}

function seleccionarMetodoPago(metodo) {
  const metodoPagoScreen = document.getElementById("metodoPagoScreen");
  const loginOverlay = document.getElementById("loginOverlay");

  if (metodoPagoScreen) metodoPagoScreen.style.display = "none";
  if (loginOverlay) loginOverlay.style.display = "none";

  if (metodo === "Leasing") {
    S.payMethod = "leasing";
    S.isSigma = true;
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
    goScreen("catalog");
    if (typeof updateDirectCreditCta === "function") updateDirectCreditCta();
  }
}
