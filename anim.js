document.addEventListener('DOMContentLoaded', () => {
  const typed = document.getElementById('typed-text');
  const cursor = document.querySelector('.cursor');

  const messages = [
    "Initialisation des modules... OK",
    "Chargement des capteurs verts... OK",
    "Optimisation énergétique en cours... OK",
    "EcoBot prêt. Bonjour !"
  ];

  const typeSpeed = 40;    // ms per character (base)
  const deleteSpeed = 20;  // ms per character when deleting
  const pauseAfter = 1200; // ms to wait after finishing a message

  let msgIndex = 0;
  let isRunning = true;

  function sleep(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }

  async function typeMessage(msg) {
    for (let i = 0; i <= msg.length; i++) {
      typed.textContent = msg.slice(0, i);
      await sleep(typeSpeed + Math.random() * 30);
    }
  }

  async function deleteMessage() {
    while (typed.textContent.length > 0) {
      typed.textContent = typed.textContent.slice(0, -1);
      await sleep(deleteSpeed + Math.random() * 20);
    }
  }

  async function loop() {
    while (isRunning) {
      const msg = messages[msgIndex];
      await typeMessage(msg);
      await sleep(pauseAfter);
      await deleteMessage();
      await sleep(250);
      msgIndex = (msgIndex + 1) % messages.length;
    }
  }

  // Start the loop after a short delay so the static text initializes first
  (async () => { await sleep(700); loop(); })();

  // Subtle animated glow using the Web Animations API (no CSS changes required)
  const glow = document.querySelector('.glow');
  if (glow && glow.animate) {
    glow.animate(
      [
        { filter: 'blur(12px)', opacity: 0.65 },
        { filter: 'blur(2px)', opacity: 0.15 },
        { filter: 'blur(8px)', opacity: 0.4 }
      ],
      { duration: 4200, iterations: Infinity }
    );
  }

  // Occasionally vary the cursor width for a more "old terminal" feel
  if (cursor) {
    setInterval(() => {
      cursor.style.width = Math.random() > 0.82 ? '4px' : '10px';
    }, 700);
  }

  // Expose a simple API to control the animation if needed later
  window.__EcoBotAnim = {
    pause: () => { isRunning = false; },
    resume: () => { if (!isRunning) { isRunning = true; loop(); } },
    setMessages: (arr) => { if (Array.isArray(arr)) { messages.length = 0; messages.push(...arr); msgIndex = 0; } }
  };
});
