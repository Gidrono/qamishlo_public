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
  demo.classList.add("is-paused", "is-listening");
  interruptLabel.textContent = "Listening…";
  chat.hidden = false;
  chat.replaceChildren();
  lesson.textContent = "Lesson paused. Ask anything about what you just heard.";

  await sleep(700);
  demo.classList.remove("is-listening");
  addBubble("user", "Is craving the same thing as wanting something good?");
  interruptLabel.textContent = "Answering…";

  await sleep(900);
  addBubble(
    "ai",
    "Wanting a good meal isn’t the problem — clinging is. Craving is the tightening around the want: the belief that you won’t be okay until it arrives. The teaching asks you to notice that grip."
  );

  await sleep(1600);
  interruptLabel.textContent = "Resuming";
  lesson.textContent =
    "Resuming with a fade-in… “When craving loosens, the truth of the path isn’t abstract. It’s ordinary: less chasing, more clear seeing.”";

  await sleep(1400);
  demo.classList.remove("is-paused", "is-listening");
  interruptLabel.textContent = "Hold to ask";
  interruptBtn.disabled = false;
  lesson.textContent = originalLesson;
});
