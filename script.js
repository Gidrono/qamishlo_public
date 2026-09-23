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

const homePhone = document.querySelector("[data-home-phone]");
const homeKicker = document.querySelector("[data-home-kicker]");
const homeChips = document.querySelectorAll("[data-home-filter]");
const homeCourses = document.querySelectorAll("[data-home-courses] [data-audience]");

const homeLabels = {
  all: { kicker: "For you", aria: "Qamishlo home screen with mixed courses" },
  kids: { kicker: "For kids", aria: "Qamishlo home screen with kids courses" },
  adults: { kicker: "For adults", aria: "Qamishlo home screen with adult courses" },
};

const setHomeFilter = (filter) => {
  const label = homeLabels[filter] ?? homeLabels.kids;
  if (homeKicker) homeKicker.textContent = label.kicker;
  homePhone?.setAttribute("aria-label", label.aria);

  homeChips.forEach((chip) => {
    const selected = chip.dataset.homeFilter === filter;
    chip.classList.toggle("selected", selected);
    chip.setAttribute("aria-selected", String(selected));
  });

  if (filter === "all") {
    let kids = 0;
    let adults = 0;
    homeCourses.forEach((card) => {
      const audience = card.dataset.audience;
      let visible = false;
      if (audience === "kids" && kids < 3) {
        visible = true;
        kids += 1;
      } else if (audience === "adults" && adults < 2) {
        visible = true;
        adults += 1;
      }
      card.hidden = !visible;
    });
    return;
  }

  homeCourses.forEach((card) => {
    card.hidden = card.dataset.audience !== filter;
  });
};

homeChips.forEach((chip) => {
  chip.addEventListener("click", () => setHomeFilter(chip.dataset.homeFilter));
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
  addBubble("user", "Why is space black if the Sun is so bright?");
  interruptLabel.textContent = "Answering…";

  await sleep(900);
  addBubble(
    "ai",
    "Great question. Space looks black because there’s almost nothing out there for sunlight to bounce off - no air, no dust cloud around Earth. The Sun lights up planets and moons when its rays hit them. Empty space doesn’t glow back."
  );

  await sleep(1600);
  interruptLabel.textContent = "Resuming";
  lesson.textContent =
    "Resuming with a fade-in… “So the Goldilocks zone isn’t about looking special from far away - it’s about the right distance for liquid water, and a sky that can hold the light.”";

  await sleep(1400);
  demo.classList.remove("is-paused", "is-listening");
  interruptLabel.textContent = "Hold to ask";
  interruptBtn.disabled = false;
  lesson.textContent = originalLesson;
});
