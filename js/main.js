(function () {
  const header = document.querySelector(".site-header");
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".site-nav");
  const yearNodes = document.querySelectorAll("[data-year]");

  yearNodes.forEach(function (node) {
    node.textContent = String(new Date().getFullYear());
  });

  function setHeaderState() {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 8);
  }

  setHeaderState();
  window.addEventListener("scroll", setHeaderState, { passive: true });

  if (toggle && nav) {
    if (!nav.querySelector(".nav-mobile-cta")) {
      const cta = document.createElement("a");
      cta.className = "btn btn-primary nav-mobile-cta";
      cta.href = "products.html";
      cta.textContent = "Explore Our Platforms";
      nav.appendChild(cta);
    }

    toggle.addEventListener("click", function () {
      const open = !nav.classList.contains("is-open");
      nav.classList.toggle("is-open", open);
      toggle.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      document.body.classList.toggle("nav-open", open);
    });

    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("is-open");
        toggle.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        document.body.classList.remove("nav-open");
      });
    });
  }

  const form = document.querySelector(".contact-form");
  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      const fields = ["name", "email", "role", "message"];
      let valid = true;

      fields.forEach(function (name) {
        const input = form.querySelector('[name="' + name + '"]');
        const error = form.querySelector('[data-error-for="' + name + '"]');
        if (!input) return;
        const value = String(input.value || "").trim();
        let message = "";
        if (!value) message = "This field is required.";
        if (name === "email" && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          message = "Enter a valid email address.";
        }
        input.classList.toggle("is-invalid", Boolean(message));
        if (error) error.textContent = message;
        if (message) valid = false;
      });

      if (!valid) return;

      const name = form.querySelector('[name="name"]').value.trim();
      const email = form.querySelector('[name="email"]').value.trim();
      const organization = (form.querySelector('[name="organization"]').value || "").trim();
      const role = form.querySelector('[name="role"]').value.trim();
      const message = form.querySelector('[name="message"]').value.trim();
      const subject = encodeURIComponent("Funstars inquiry from " + name);
      const body = encodeURIComponent(
        "Name: " + name + "\nEmail: " + email + "\nOrganization: " + organization + "\nRole: " + role + "\n\n" + message
      );
      window.location.href = "mailto:contact@funstarslearning.com?subject=" + subject + "&body=" + body;

      form.hidden = true;
      const success = document.querySelector(".form-success");
      if (success) {
        success.hidden = false;
        success.focus();
      }
    });
  }
})();
