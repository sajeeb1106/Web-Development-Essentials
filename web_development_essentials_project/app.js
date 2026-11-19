/* Sundarban Trails - shared client-side interactions */
"use strict";

document.addEventListener("DOMContentLoaded", () => {
  // Responsive navigation
  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".main-nav");
  if (menuToggle && nav) {
    menuToggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("nav-open");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
    });
  }

  // Homepage hero slider
  const slides = [...document.querySelectorAll(".hero-slide")];
  if (slides.length) {
    let current = 0;
    const counter = document.getElementById("slideCount");
    const showSlide = (index) => {
      current = (index + slides.length) % slides.length;
      slides.forEach((slide, i) => slide.classList.toggle("active", i === current));
      if (counter) counter.textContent = `0${current + 1} / 0${slides.length}`;
    };
    document.getElementById("prevSlide")?.addEventListener("click", () => showSlide(current - 1));
    document.getElementById("nextSlide")?.addEventListener("click", () => showSlide(current + 1));
    let autoSlide = window.setInterval(() => showSlide(current + 1), 6500);
    [document.getElementById("prevSlide"), document.getElementById("nextSlide")].forEach(button => {
      button?.addEventListener("click", () => {
        window.clearInterval(autoSlide);
        autoSlide = window.setInterval(() => showSlide(current + 1), 6500);
      });
    });
  }

  // Back-to-top control
  const topButton = document.getElementById("backToTop");
  const updateTopButton = () => topButton?.classList.toggle("visible", window.scrollY > 350);
  window.addEventListener("scroll", updateTopButton, { passive: true });
  updateTopButton();
  topButton?.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

  // Destination filters: region + tour type + maximum price
  const destinationList = document.getElementById("destinationList");
  if (destinationList) {
    const region = document.getElementById("regionFilter");
    const type = document.getElementById("typeFilter");
    const price = document.getElementById("priceFilter");
    const priceValue = document.getElementById("priceValue");
    const cards = [...destinationList.querySelectorAll(".filter-card")];
    const resultCount = document.getElementById("resultCount");
    const noResults = document.getElementById("noResults");
    const applyFilters = () => {
      let visible = 0;
      const maxPrice = Number(price.value);
      priceValue.textContent = `৳${maxPrice.toLocaleString("en-BD")}`;
      cards.forEach(card => {
        const matches = (region.value === "all" || card.dataset.region === region.value)
          && (type.value === "all" || card.dataset.type === type.value)
          && Number(card.dataset.price) <= maxPrice;
        card.hidden = !matches;
        if (matches) visible++;
      });
      resultCount.textContent = `Showing ${visible} of ${cards.length} destinations`;
      noResults.hidden = visible !== 0;
    };
    [region, type, price].forEach(control => control.addEventListener("input", applyFilters));
    document.getElementById("resetFilters").addEventListener("click", () => {
      region.value = "all"; type.value = "all"; price.value = "20000"; applyFilters();
    });
    applyFilters();
  }

  // Booking cost estimator and client-side validation
  const bookingForm = document.getElementById("bookingForm");
  if (bookingForm) {
    const money = amount => `৳${Math.round(amount).toLocaleString("en-BD")}`;
    const travelers = document.getElementById("travelers");
    const packageSelect = document.getElementById("package");
    const addOnInputs = [...bookingForm.querySelectorAll('input[name="addons"]')];
    const updateEstimate = () => {
      const count = Math.max(1, Number(travelers.value) || 1);
      const unit = Number(packageSelect.value) || 0;
      const addOnPerPerson = addOnInputs.filter(input => input.checked).reduce((sum, input) => sum + Number(input.value), 0);
      const subtotal = (unit + addOnPerPerson) * count;
      const discount = count >= 5 ? subtotal * 0.10 : 0;
      document.getElementById("unitPrice").textContent = money(unit);
      document.getElementById("travelerCount").textContent = count;
      document.getElementById("addonCost").textContent = money(addOnPerPerson * count);
      document.getElementById("subtotal").textContent = money(subtotal);
      document.getElementById("discount").textContent = discount ? `−${money(discount)}` : money(0);
      document.getElementById("total").textContent = money(subtotal - discount);
    };
    [travelers, packageSelect, ...addOnInputs].forEach(input => input.addEventListener("input", updateEstimate));
    const params = new URLSearchParams(window.location.search);
    const packageName = params.get("package");
    const packageValues = { Explorer: "6500", Comfort: "10500", Signature: "16000" };
    if (packageValues[packageName]) packageSelect.value = packageValues[packageName];
    updateEstimate();

    const clearErrors = () => bookingForm.querySelectorAll(".error").forEach(el => el.textContent = "");
    bookingForm.addEventListener("reset", () => {
      window.setTimeout(() => { clearErrors(); updateEstimate(); document.getElementById("bookingMessage").textContent = ""; }, 0);
    });
    bookingForm.addEventListener("submit", event => {
      event.preventDefault();
      clearErrors();
      let valid = true;
      const setError = (id, message) => { document.getElementById(id).textContent = message; valid = false; };
      const name = document.getElementById("fullName");
      const email = document.getElementById("email");
      const phone = document.getElementById("phone");
      const date = document.getElementById("travelDate");
      const destination = document.getElementById("destination");
      const packageField = document.getElementById("package");
      const count = Number(travelers.value);
      if (name.value.trim().length < 2) setError("nameError", "Please enter your full name.");
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) setError("emailError", "Enter a valid email address.");
      if (!/^[+()\-\s\d]{7,20}$/.test(phone.value.trim())) setError("phoneError", "Enter a valid phone number.");
      const today = new Date(); today.setHours(0,0,0,0);
      if (!date.value || new Date(`${date.value}T00:00:00`) < today) setError("dateError", "Choose today or a future travel date.");
      if (!Number.isInteger(count) || count < 1 || count > 50) setError("travelersError", "Enter between 1 and 50 travellers.");
      if (!destination.value) setError("destinationError", "Please select a destination.");
      if (!packageField.value) setError("packageError", "Please select a package.");
      if (!bookingForm.querySelector('input[name="tourType"]:checked')) setError("tourTypeError", "Please choose a tour type.");
      const message = document.getElementById("bookingMessage");
      if (valid) {
        updateEstimate();
        message.textContent = `Thank you, ${name.value.trim()}! Your demo inquiry is complete. Estimated total: ${document.getElementById("total").textContent}. No real booking has been sent.`;
        message.className = "form-message success";
      } else {
        message.textContent = "Please correct the highlighted fields and submit again.";
        message.className = "form-message error-summary";
        bookingForm.querySelector(".error:not(:empty)")?.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    });
  }

  // Contact form validation
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", event => {
      event.preventDefault();
      ["contactNameError", "contactEmailError", "subjectError", "messageError"].forEach(id => document.getElementById(id).textContent = "");
      const name = document.getElementById("contactName").value.trim();
      const email = document.getElementById("contactEmail").value.trim();
      const subject = document.getElementById("subject").value.trim();
      const message = document.getElementById("message").value.trim();
      let valid = true;
      if (name.length < 2) { document.getElementById("contactNameError").textContent = "Please enter your name."; valid = false; }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { document.getElementById("contactEmailError").textContent = "Enter a valid email address."; valid = false; }
      if (!subject) { document.getElementById("subjectError").textContent = "Please add a subject."; valid = false; }
      if (message.length < 10) { document.getElementById("messageError").textContent = "Message must contain at least 10 characters."; valid = false; }
      const status = document.getElementById("contactMessage");
      status.textContent = valid ? "Thank you! Your demo message has been validated. It has not been sent to a server." : "Please correct the highlighted fields.";
      status.className = valid ? "form-message success" : "form-message error-summary";
    });
  }

  // Accessible FAQ accordion; one answer open at a time
  document.querySelectorAll(".faq-question").forEach(button => {
    button.addEventListener("click", () => {
      const currentlyOpen = button.getAttribute("aria-expanded") === "true";
      document.querySelectorAll(".faq-question").forEach(other => {
        other.setAttribute("aria-expanded", "false");
        other.querySelector("span").textContent = "+";
        other.nextElementSibling.hidden = true;
      });
      if (!currentlyOpen) {
        button.setAttribute("aria-expanded", "true");
        button.querySelector("span").textContent = "−";
        button.nextElementSibling.hidden = false;
      }
    });
  });
});