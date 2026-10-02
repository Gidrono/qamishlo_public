const nav = document.querySelector(".nav");
const toggle = document.querySelector(".nav-toggle");
const demo = document.querySelector("[data-demo]");
const interruptBtn = document.querySelector("[data-interrupt]");
const interruptLabel = document.querySelector("[data-interrupt-label]");
const chat = document.querySelector("[data-chat]");
const lesson = document.querySelector("[data-lesson]");

const originalLesson = lesson?.textContent ?? "";

window.addEventListener(
  "scroll",
  () => {
    nav?.classList.toggle("is-scrolled", window.scrollY > 12);
  },
  { passive: true }
);

toggle?.addEventListener("click", () => {
  const open = nav.classList.toggle("is-open");
  toggle.setAttribute("aria-expanded", String(open));
  toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
});

document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => nav.classList.remove("is-open"));
});

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const addBubble = (role, text) => {
  const bubble = document.createElement("p");
  bubble.className = `bubble ${role}`;
  bubble.textContent = text;
  chat.appendChild(bubble);
};

interruptBtn?.addEventListener("click", async () => {
  if (interruptBtn.disabled) return;

  interruptBtn.disabled = true;
  demo.classList.add("is-paused", "is-listening");
  interruptLabel.textContent = "Listening…";
  chat.hidden = false;
  chat.replaceChildren();
  lesson.textContent = "Lesson paused. Ask anything about what you just heard.";

  await sleep(700);
  demo.classList.remove("is-listening");
  addBubble("user", "Is there a volcano under our house?");
  interruptLabel.textContent = "Answering…";

  await sleep(900);
  addBubble(
    "ai",
    "Almost certainly not. Active volcanoes sit on weak spots in Earth’s crust — usually near plate edges or hot spots. Most homes sit on quiet, solid rock. If you lived near one, you’d already know from the landscape and local warnings."
  );

  await sleep(1600);
  interruptLabel.textContent = "Resuming";
  lesson.textContent =
    "Resuming with a fade-in… “So a volcano isn’t a random mountain with fire inside — it’s a place where melt from deep below found a path up. Next: what that melt is made of.”";

  await sleep(1400);
  demo.classList.remove("is-paused", "is-listening");
  interruptLabel.textContent = "Hold to ask";
  interruptBtn.disabled = false;
  lesson.textContent = originalLesson;
});

/* Hero: cycle example topics → chapter lists */
const typeWord = document.querySelector("[data-type-word]");
const typeChapters = document.querySelector("[data-type-chapters]");
const typeCard = document.querySelector("[data-type-demo]");

const topics = [
  {
    word: "volcanoes",
    band: "ages 5–9",
    chapters: [
      "What’s really going on under our feet",
      "Magma, pressure, and the pop",
      "Why some volcanoes sleep for centuries",
      "Living near a mountain that breathes",
    ],
  },
  {
    word: "black holes",
    band: "ages 10–14",
    chapters: [
      "What happens when gravity wins",
      "Event horizons, without the sci-fi fog",
      "How we ‘see’ something invisible",
      "Why light can’t climb back out",
    ],
  },
  {
    word: "Ancient Egypt",
    band: "ages 5–9",
    chapters: [
      "A river, a desert, and a very long time ago",
      "Pharaohs, work crews, and daily life",
      "Why the pyramids still stand",
      "Writing that outlasted empires",
    ],
  },
  {
    word: "negotiation",
    band: "ages 15+",
    chapters: [
      "What you’re actually bargaining for",
      "Interests vs positions",
      "Silence, anchors, and walking away",
      "Keeping the relationship intact",
    ],
  },
];

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
let topicIndex = 0;

const renderTopic = (topic, animate) => {
  if (!typeWord || !typeChapters) return;
  typeWord.textContent = topic.word;
  typeChapters.innerHTML = topic.chapters
    .map((title, i) => `<li><span>Ch ${i + 1}</span> ${title}</li>`)
    .join("");
  typeChapters.innerHTML += `<li class="type-more">+ more chapters · ${topic.band}</li>`;

  if (!animate || reduceMotion) {
    typeChapters.querySelectorAll("li").forEach((li) => {
      li.style.opacity = "1";
      li.style.transform = "none";
      li.style.animation = "none";
    });
  }
};

renderTopic(topics[0], false);

if (!reduceMotion && typeCard) {
  window.setInterval(() => {
    topicIndex = (topicIndex + 1) % topics.length;
    typeCard.classList.add("is-swapping");
    window.setTimeout(() => {
      renderTopic(topics[topicIndex], true);
      typeCard.classList.remove("is-swapping");
    }, 280);
  }, 4800);
}
