// Cookie-Banner
document.addEventListener("DOMContentLoaded", () => {
  const banner = document.getElementById("cookie-banner");
  if (banner && !localStorage.getItem("donau_cookie_consent")) {
    banner.classList.remove("hidden");
  }
});

function setCookieConsent(choice) {
  localStorage.setItem("donau_cookie_consent", choice);
  const banner = document.getElementById("cookie-banner");
  if (banner) banner.classList.add("hidden");
}

function reopenCookieSettings() {
  const banner = document.getElementById("cookie-banner");
  if (banner) banner.classList.remove("hidden");
}

// Interaktive Tabs umschalten (für kompakte Komponenten statt langer Listen)
function openTab(groupId, tabId, btnEl) {
  const group = document.getElementById(groupId);
  if (!group) return;

  group.querySelectorAll(".tab-btn").forEach(btn => {
    btn.setAttribute("aria-selected", "false");
  });
  group.querySelectorAll(".tab-panel").forEach(panel => {
    panel.classList.remove("active");
  });

  btnEl.setAttribute("aria-selected", "true");
  const target = document.getElementById(tabId);
  if (target) target.classList.add("active");
}

// V8-Bootsmotor Sound (Hörmarke)
function playV8Sound() {
  const AudioCtx = window.AudioContext || window.webkitAudioContext;
  if (!AudioCtx) return;

  const ctx = new AudioCtx();
  const osc1 = ctx.createOscillator();
  const osc2 = ctx.createOscillator();
  const gain = ctx.createGain();

  osc1.type = "sawtooth";
  osc2.type = "triangle";

  const now = ctx.currentTime;
  osc1.frequency.setValueAtTime(55, now);
  osc1.frequency.exponentialRampToValueAtTime(140, now + 0.8);
  osc1.frequency.exponentialRampToValueAtTime(65, now + 1.8);

  osc2.frequency.setValueAtTime(110, now);
  osc2.frequency.exponentialRampToValueAtTime(280, now + 0.8);
  osc2.frequency.exponentialRampToValueAtTime(130, now + 1.8);

  gain.gain.setValueAtTime(0.01, now);
  gain.gain.linearRampToValueAtTime(0.25, now + 0.3);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 2.0);

  osc1.connect(gain);
  osc2.connect(gain);
  gain.connect(ctx.destination);

  osc1.start(now);
  osc2.start(now);
  osc1.stop(now + 2.0);
  osc2.stop(now + 2.0);

  const status = document.getElementById("sound-status");
  if (status) status.textContent = "V8-Bootsmotor-Hörmarke wird abgespielt (2 Sek.)...";
}

// Gemockter Kauf
function handlePurchase(event) {
  event.preventDefault();
  const statusEl = document.getElementById("order-status");
  const name = document.getElementById("buyer-name").value;
  statusEl.innerHTML = `
    <div class="card" style="border-color: #16a34a; background: #f0fdf4;" role="status">
      <h3>Bestellung erfolgreich abgeschlossen (Demo)</h3>
      <p>Vielen Dank, <strong>${escapeHTML(name)}</strong>! Deine Lizenz für <strong>Aqua Drift: VIENNA</strong> ist aktiv.</p>
      <p>Produktschlüssel: <code>DG-ADV-2026-8842-VIENNA</code></p>
    </div>
  `;
}
//

// Gemocktes Kontaktformular
function handleContact(event) {
  event.preventDefault();
  const statusEl = document.getElementById("contact-status");
  statusEl.innerHTML = `
    <div class="card" style="border-color: #16a34a; background: #f0fdf4;" role="status">
      <p><strong>Nachricht gesendet (Demo):</strong> Wir haben deine Anfrage erhalten und melden uns in Kürze.</p>
    </div>
  `;
}

function escapeHTML(str) {
  return str.replace(/[&<>'"]/g, tag => ({
    '&': '&', '<': '<', '>': '>', "'": ''', '"': '"'
  }[tag]));
}