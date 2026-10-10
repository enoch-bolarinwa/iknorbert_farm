// ===== Mobile nav toggle =====
document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".menu-toggle");
  const menu = document.querySelector("nav ul");
  if (toggle && menu) {
    toggle.addEventListener("click", () => {
      menu.classList.toggle("open");
    });
  }

  // Highlight the current page's nav link
  const current = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll("nav a").forEach((link) => {
    if (link.getAttribute("href") === current) {
      link.classList.add("active");
    }
  });

  initProductFilter();
  initContactForm();
  initYear();
});

// ===== Products page: category filter =====
function initProductFilter() {
  const buttons = document.querySelectorAll(".filter-btn");
  const cards = document.querySelectorAll("[data-category]");
  if (!buttons.length) return;

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      buttons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const category = btn.dataset.filter;
      cards.forEach((card) => {
        const match = category === "all" || card.dataset.category === category;
        card.classList.toggle("hidden", !match);
      });
    });
  });
}

// ===== Contact page: simple client-side validation =====
function initContactForm() {
  const form = document.getElementById("contact-form");
  if (!form) return;

  const successBox = document.getElementById("form-success");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let valid = true;

    const fields = [
      { id: "name", test: (v) => v.trim().length > 1, msg: "Please enter your name." },
      {
        id: "email",
        test: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
        msg: "Please enter a valid email address.",
      },
      {
        id: "phone",
        test: (v) => v.trim() === "" || /^[\d\s()+-]{7,}$/.test(v),
        msg: "Please enter a valid phone number, or leave blank.",
      },
      { id: "message", test: (v) => v.trim().length > 9, msg: "Message should be at least 10 characters." },
    ];

    fields.forEach(({ id, test, msg }) => {
      const input = document.getElementById(id);
      if (!input) return;
      const wrapper = input.closest(".form-group");
      const errorEl = wrapper.querySelector(".field-error");
      if (!test(input.value)) {
        wrapper.classList.add("error");
        if (errorEl) errorEl.textContent = msg;
        valid = false;
      } else {
        wrapper.classList.remove("error");
      }
    });

    if (valid) {
      form.reset();
      successBox.style.display = "block";
      successBox.scrollIntoView({ behavior: "smooth", block: "center" });
      setTimeout(() => (successBox.style.display = "none"), 6000);
    } else {
      successBox.style.display = "none";
    }
  });
}

// ===== Footer year =====
function initYear() {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}
