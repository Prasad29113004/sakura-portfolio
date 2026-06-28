document.documentElement.classList.add("js-enabled");

const header = document.querySelector(".site-header");
const meter = document.querySelector(".scroll-meter");
const petalField = document.querySelector(".petal-field");
const progressItems = document.querySelectorAll(".progress-item");
const revealItems = document.querySelectorAll(".reveal");
const projectCards = document.querySelectorAll(".project-card");
const skillTags = document.querySelectorAll(".skill-cloud span");

function updateScrollEffects() {
  const scrollTop = window.scrollY;
  const height = document.documentElement.scrollHeight - window.innerHeight;
  const amount = height > 0 ? scrollTop / height : 0;

  if (meter) {
    meter.style.transform = `scaleX(${amount})`;
  }

  if (header) {
    header.dataset.elevated = scrollTop > 24 ? "true" : "false";
  }
}

function createPetals() {
  if (!petalField || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return;
  }

  const count = window.innerWidth < 700 ? 18 : 32;

  for (let index = 0; index < count; index += 1) {
    const petal = document.createElement("span");
    petal.className = "petal";
    petal.style.setProperty("--x", `${Math.random() * 100}%`);
    petal.style.setProperty("--size", `${8 + Math.random() * 12}px`);
    petal.style.setProperty("--duration", `${12 + Math.random() * 13}s`);
    petal.style.setProperty("--delay", `${Math.random() * -22}s`);
    petal.style.setProperty("--drift", `${-90 + Math.random() * 180}px`);
    petal.style.setProperty("--rotate", `${Math.random() * 360}deg`);
    petal.style.setProperty("--opacity", `${0.24 + Math.random() * 0.44}`);
    petalField.appendChild(petal);
  }
}

function fillProgress() {
  progressItems.forEach((item) => {
    item.style.setProperty("--progress", `${item.dataset.progress || 0}%`);
  });
}

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      entry.target.classList.add("is-visible");

      if (entry.target.classList.contains("progress-list")) {
        fillProgress();
      }

      revealObserver.unobserve(entry.target);
    });
  }, { rootMargin: "0px 0px -8% 0px", threshold: 0.04 });

  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
  fillProgress();
}

projectCards.forEach((card) => {
  card.addEventListener("pointermove", (event) => {
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const rotateY = ((x / rect.width) - 0.5) * 8;
    const rotateX = ((0.5 - y / rect.height)) * 8;

    card.style.setProperty("--rx", `${rotateX}deg`);
    card.style.setProperty("--ry", `${rotateY}deg`);
  });

  card.addEventListener("pointerleave", () => {
    card.style.setProperty("--rx", "0deg");
    card.style.setProperty("--ry", "0deg");
  });
});

skillTags.forEach((tag, index) => {
  tag.style.setProperty("--i", index);
});

window.addEventListener("scroll", updateScrollEffects, { passive: true });
window.addEventListener("resize", updateScrollEffects);

createPetals();
updateScrollEffects();
