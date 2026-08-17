const nav = document.querySelector(".nav");
const toggle = document.querySelector(".nav-toggle");
const waitlist = document.querySelector("[data-waitlist]");
const note = document.querySelector("[data-form-note]");
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

waitlist?.addEventListener("submit", (event) => {
  event.preventDefault();
  const email = new FormData(waitlist).get("email");
  waitlist.reset();
  if (note) {
    note.textContent = `You’re on the list — we’ll write to ${email} when invites open.`;
    note.classList.add("is-ok");
  }
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
  demo.classList.add("is-paused");
  interruptLabel.textContent = "Listening…";
  chat.hidden = false;
  chat.replaceChildren();
  lesson.textContent = "Lesson paused. Ask anything about what you just heard.";

  await sleep(700);
  addBubble("user", "How is that different from the earlier Republic?");
  interruptLabel.textContent = "Answering…";

  await sleep(900);
  addBubble(
    "ai",
    "Earlier, the Senate advised and magistrates held office for a year. By the late Republic, generals kept armies loyal to them — so power followed people, not the constitution. Want another pass at that?"
  );

  await sleep(1600);
  interruptLabel.textContent = "Resuming";
  lesson.textContent =
    "Resuming with a fade-in… “That personal loyalty is why crossing the Rubicon was not just a river. It was a choice about who Rome belonged to.”";

  await sleep(1400);
  demo.classList.remove("is-paused");
  interruptLabel.textContent = "Hold to ask";
  interruptBtn.disabled = false;
  lesson.textContent = originalLesson;
});
