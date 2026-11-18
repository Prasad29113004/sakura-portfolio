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

function legacyCopyText(text) {
  const textArea = document.createElement("textarea");
  textArea.value = text;
  textArea.setAttribute("readonly", "");
  textArea.style.position = "fixed";
  textArea.style.left = "-9999px";
  textArea.style.opacity = "0";
  document.body.appendChild(textArea);
  textArea.select();
  textArea.setSelectionRange(0, textArea.value.length);

  let copied = false;
  try {
    copied = document.execCommand("copy");
  } catch {
    copied = false;
  }

  document.body.removeChild(textArea);
  return copied;
}

async function copyText(text) {
  if (navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      // Permission may be unavailable on some hosted or private contexts.
    }
  }

  return legacyCopyText(text);
}

function initializeEmailCopy() {
  const copyEmailButton = document.querySelector("#copy-email-button");
  if (!copyEmailButton) {
    return;
  }

  const card = copyEmailButton.closest(".email-contact");
  const status = card?.querySelector(".copy-email-status");
  let resetTimer;

  copyEmailButton.addEventListener("click", async () => {
    const email = copyEmailButton.dataset.email || "";
    window.clearTimeout(resetTimer);

    try {
      const copied = await copyText(email);

      if (!copied) {
        throw new Error("Clipboard copy unavailable");
      }

      copyEmailButton.classList.add("is-copied");
      copyEmailButton.title = "Copied!";
      copyEmailButton.setAttribute("aria-label", "Email address copied");
      status.textContent = "Email copied!";
      status.classList.remove("is-error");
    } catch {
      copyEmailButton.classList.remove("is-copied");
      copyEmailButton.title = "Copy email address";
      copyEmailButton.setAttribute("aria-label", "Copy email address prasadnimje200@gmail.com");
      status.textContent = "Copy unavailable. Please select the email address manually.";
      status.classList.add("is-error");
    }

    resetTimer = window.setTimeout(() => {
      copyEmailButton.classList.remove("is-copied");
      copyEmailButton.title = "Copy email address";
      copyEmailButton.setAttribute("aria-label", "Copy email address prasadnimje200@gmail.com");
      status.textContent = "";
      status.classList.remove("is-error");
    }, 2000);
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeEmailCopy);
} else {
  initializeEmailCopy();
}

window.addEventListener("scroll", updateScrollEffects, { passive: true });
window.addEventListener("resize", updateScrollEffects);

createPetals();
updateScrollEffects();
