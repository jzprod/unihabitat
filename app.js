/* ============================================================
   UNIHABITAT — Carte de visite digitale
   vCard download · Web Share API · copy-link fallback · toasts
   ============================================================ */
(function () {
  "use strict";

  var BRAND = {
    name: "UNIHABITAT",
    role: "Agence immobilière multiservices",
    phone: "+212665186397",
    phoneLocal: "06 65 18 63 97",
    email: "unihabitat.24@gmail.com",
    website: "https://unihabitat.ma/",
    city: "Casablanca, Maroc"
  };

  /* -------- Toast -------- */
  var toastEl = document.getElementById("toast");
  var toastTimer = null;
  function toast(message) {
    if (!toastEl) return;
    toastEl.textContent = message;
    toastEl.classList.add("is-visible");
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(function () {
      toastEl.classList.remove("is-visible");
    }, 2600);
  }

  /* -------- vCard (Enregistrer le contact) -------- */
  function buildVCard() {
    // vCard 3.0 — broadly compatible with iOS & Android contacts
    var lines = [
      "BEGIN:VCARD",
      "VERSION:3.0",
      "N:" + BRAND.name + ";;;;",
      "FN:" + BRAND.name,
      "ORG:" + BRAND.name,
      "X-ABShowAs:COMPANY",
      "TITLE:" + BRAND.role,
      "TEL;TYPE=WORK,VOICE:" + BRAND.phone,
      "TEL;TYPE=CELL:" + BRAND.phone,
      // WhatsApp hint (Apple-style item labelling)
      "item1.TEL:" + BRAND.phone,
      "item1.X-ABLabel:WhatsApp",
      "EMAIL;TYPE=WORK,INTERNET:" + BRAND.email,
      "URL:" + BRAND.website,
      "ADR;TYPE=WORK:;;;Casablanca;;;Maroc",
      "NOTE:" + BRAND.role + " — Votre partenaire immobilier de confiance.",
      "END:VCARD"
    ];
    return lines.join("\r\n");
  }

  function saveContact() {
    try {
      var blob = new Blob([buildVCard()], { type: "text/vcard;charset=utf-8" });
      var url = URL.createObjectURL(blob);
      var a = document.createElement("a");
      a.href = url;
      a.download = "UNIHABITAT.vcf";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      // Revoke after the download has had time to start
      window.setTimeout(function () { URL.revokeObjectURL(url); }, 4000);
      toast("Contact enregistré ✓");
    } catch (err) {
      toast("Téléchargement impossible sur cet appareil");
    }
  }

  /* -------- Share / copy link -------- */
  function copyToClipboard(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(text);
    }
    // Legacy fallback
    return new Promise(function (resolve, reject) {
      try {
        var ta = document.createElement("textarea");
        ta.value = text;
        ta.setAttribute("readonly", "");
        ta.style.position = "fixed";
        ta.style.top = "-1000px";
        document.body.appendChild(ta);
        ta.select();
        var ok = document.execCommand("copy");
        document.body.removeChild(ta);
        ok ? resolve() : reject();
      } catch (e) { reject(e); }
    });
  }

  function shareCard() {
    var shareUrl = window.location.href;
    var shareData = {
      title: "UNIHABITAT",
      text: "UNIHABITAT — Agence immobilière multiservices à Casablanca.",
      url: shareUrl
    };

    if (navigator.share) {
      navigator.share(shareData).catch(function (err) {
        // User cancelled the native sheet — stay silent.
        if (err && err.name === "AbortError") return;
        // Any other failure → fall back to copy.
        copyAndNotify(shareUrl);
      });
    } else {
      copyAndNotify(shareUrl);
    }
  }

  function copyAndNotify(url) {
    copyToClipboard(url).then(
      function () { toast("Lien copié ✓"); },
      function () { toast("Copie impossible — copiez l’URL manuellement"); }
    );
  }

  /* -------- Wire up -------- */
  document.addEventListener("DOMContentLoaded", function () {
    var saveBtn = document.getElementById("saveContact");
    var shareBtn = document.getElementById("shareBtn");
    if (saveBtn) saveBtn.addEventListener("click", saveContact);
    if (shareBtn) shareBtn.addEventListener("click", shareCard);
  });
})();
