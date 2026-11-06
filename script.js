document.addEventListener("DOMContentLoaded", () => {
  const burger = document.getElementById("burger");
  const nav = document.getElementById("nav");
  const navLinks = document.querySelectorAll(".nav a");
  const sections = document.querySelectorAll("section");
  const revealElements = document.querySelectorAll(".reveal");

  const themeToggle = document.getElementById("themeToggle");
  const body = document.body;

  const backToTopBtn = document.getElementById("backToTop");

  const form = document.getElementById("contactForm");
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const messageInput = document.getElementById("message");
  const nameError = document.getElementById("nameError");
  const emailError = document.getElementById("emailError");
  const messageError = document.getElementById("messageError");
  const successMsg = document.getElementById("successMsg");

  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    body.classList.add("dark-theme");
    themeToggle.textContent = "☀️";
  }

  themeToggle.addEventListener("click", () => {
    body.classList.toggle("dark-theme");
    if (body.classList.contains("dark-theme")) {
      themeToggle.textContent = "☀️";
      localStorage.setItem("theme", "dark");
    } else {
      themeToggle.textContent = "🌙";
      localStorage.setItem("theme", "light");
    }
  });

  burger.addEventListener("click", () => {
    nav.classList.toggle("active");
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("active");
    });
  });

  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      backToTopBtn.classList.add("show");
    } else {
      backToTopBtn.classList.remove("show");
    }

    let current = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      if (window.scrollY >= sectionTop - 150) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href").includes(current) && current !== "") {
        link.classList.add("active");
      }
    });
  });

  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  revealElements.forEach((el) => observer.observe(el));

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let isValid = true;

    nameError.classList.remove("visible");
    emailError.classList.remove("visible");
    messageError.classList.remove("visible");
    successMsg.classList.remove("visible");

    nameInput.classList.remove("error");
    emailInput.classList.remove("error");
    messageInput.classList.remove("error");

    if (nameInput.value.trim() === "") {
      nameError.textContent = "Please enter your name.";
      nameError.classList.add("visible");
      nameInput.classList.add("error");
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailInput.value.trim() === "") {
      emailError.textContent = "Please enter your email.";
      emailError.classList.add("visible");
      emailInput.classList.add("error");
      isValid = false;
    } else if (!emailRegex.test(emailInput.value.trim())) {
      emailError.textContent = "Please enter a valid email address.";
      emailError.classList.add("visible");
      emailInput.classList.add("error");
      isValid = false;
    }

    if (messageInput.value.trim() === "") {
      messageError.textContent = "Please enter your message.";
      messageError.classList.add("visible");
      messageInput.classList.add("error");
      isValid = false;
    }

    if (isValid) {
      successMsg.classList.add("visible");
      form.reset();

      setTimeout(() => {
        successMsg.classList.remove("visible");
      }, 4000);
    }
  });
});
