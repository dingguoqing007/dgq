const body = document.body;
const themeToggle = document.querySelector("#themeToggle");
const printButton = document.querySelector("#printButton");
const contactMeButton = document.querySelector("#contactMeButton");
const qrModal = document.querySelector("#qrModal");
const qrCloseButton = document.querySelector("#qrCloseButton");
const toast = document.querySelector("#toast");
let toastTimer;
let lastFocusedElement;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove("show"), 2200);
}

function setTheme(theme) {
  body.classList.toggle("dark", theme === "dark");
  window.localStorage.setItem("resume-theme", theme);
  themeToggle.setAttribute(
    "aria-label",
    theme === "dark" ? "切换浅色模式" : "切换深色模式"
  );
  themeToggle.setAttribute(
    "title",
    theme === "dark" ? "切换浅色模式" : "切换深色模式"
  );
}

const savedTheme = window.localStorage.getItem("resume-theme");
const preferredTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
  ? "dark"
  : "light";
setTheme(savedTheme || preferredTheme);

themeToggle.addEventListener("click", () => {
  setTheme(body.classList.contains("dark") ? "light" : "dark");
});

printButton.addEventListener("click", () => window.print());

function openQrModal() {
  lastFocusedElement = document.activeElement;
  qrModal.hidden = false;
  body.classList.add("modal-open");
  qrCloseButton.focus();
}

function closeQrModal() {
  qrModal.hidden = true;
  body.classList.remove("modal-open");
  lastFocusedElement?.focus();
}

contactMeButton.addEventListener("click", openQrModal);
qrCloseButton.addEventListener("click", closeQrModal);
qrModal.querySelector("[data-close-modal]").addEventListener("click", closeQrModal);

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !qrModal.hidden) {
    closeQrModal();
  }
});

document.querySelectorAll(".copy-trigger").forEach((button) => {
  button.addEventListener("click", async () => {
    const value = button.dataset.copy;
    try {
      await navigator.clipboard.writeText(value);
      showToast(`已复制：${value}`);
    } catch {
      showToast(`联系方式：${value}`);
    }
  });
});
