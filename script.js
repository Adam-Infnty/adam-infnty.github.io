document.addEventListener("DOMContentLoaded", () => {
  // Cursor glow
  const cursorGlow = document.createElement("div");
  cursorGlow.className = "cursor-glow";
  document.body.appendChild(cursorGlow);
  document.addEventListener("mousemove", e => {
    cursorGlow.style.transform = `translate(${e.clientX - 350}px, ${e.clientY - 350}px)`;
  });

  // Fixed sidebar
  const sidebar = document.querySelector(".sidebar");
  if (sidebar) sidebar.classList.add("fixed-sidebar");

  // Hamburger menu toggle
  const toggleBtn = document.getElementById("menu-toggle");
  const mobileMenu = document.getElementById("mobile-menu");
  if (toggleBtn && mobileMenu) {
    toggleBtn.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");
    });
  }

  // Smooth scroll for nav links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
        if (!mobileMenu.classList.contains("hidden")) {
          mobileMenu.classList.add("hidden");
        }
      }
    });
  });

  // Contact form mailto
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const message = document.getElementById("message").value.trim();
      const mailtoLink = `mailto:as.baguma@gmail.com?subject=Contact from ${encodeURIComponent(name)}&body=${encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\n\n${message}`
      )}`;
      window.location.href = mailtoLink;
    });
  }

  // Fetch and inject content from index.txt
  fetch("content/index.txt")
    .then((res) => res.text())
    .then((text) => {
      const entries = parseContentFile(text);
      injectContent(entries);
      applyHoverEffects(); // <- apply hover after injecting content
    })
    .catch((err) => console.error("Failed to load content:", err));

  // Initial hover effect for static elements
  applyHoverEffects();
});

// Hover effect handler
function applyHoverEffects() {
  const hoverTargets = document.querySelectorAll("button, .contact-section, .social-icons img, .experience-item, .project-item");
  hoverTargets.forEach(el => {
    el.addEventListener("mouseenter", () => el.classList.add("hover-effect"));
    el.addEventListener("mouseleave", () => el.classList.remove("hover-effect"));
  });
}

// Text file parser
function parseContentFile(text) {
  const lines = text.split("\n");
  const entries = [];
  let current = null;

  lines.forEach((line) => {
    line = line.trim();
    if (line.startsWith("[") && line.endsWith("]")) {
      if (current) entries.push(current);
      current = { section: line.slice(1, -1), tags: [] };
    } else if (line.includes(":")) {
      const [key, ...rest] = line.split(":");
      const value = rest.join(":").trim();
      if (key === "tags") {
        current[key] = value.split(",").map((s) => s.trim());
      } else {
        current[key] = value;
      }
    }
  });

  if (current) entries.push(current);
  return entries;
}

// Inject content into the DOM
function injectContent(entries) {
  const aboutContainer = document.querySelector("#about");
  const experienceContainer = document.querySelector("#experience");
  const projectsContainer = document.querySelector("#projects");

  entries.forEach((entry) => {
    switch (entry.section) {
      case "about":
        if (aboutContainer) {
          aboutContainer.innerHTML += `<p>${entry.content}</p>`;
        }
        break;

      case "experience":
        if (experienceContainer) {
          const item = document.createElement("div");
          item.className = "experience-item";
          item.innerHTML = `
            <p class="duration">${entry.duration}</p>
            <div>
              <h3>${entry.title}</h3>
              <p>${entry.content}</p>
              <div class="tech-tags">${entry.tags.map((t) => `<span>${t}</span>`).join("")}</div>
            </div>
          `;
          experienceContainer.appendChild(item);
        }
        break;

      case "project":
        if (projectsContainer) {
          const item = document.createElement("div");
          item.className = "project-item";
          item.innerHTML = `
            <div class="project-image-block">
              <img src="${entry.image}" alt="${entry.title}" />
              <div class="tech-tags">${entry.tags.map((t) => `<span>${t}</span>`).join("")}</div>
            </div>
            <div class="project-content">
              <h3>${entry.title}</h3>
              <p>${entry.content}</p>
            </div>
          `;
          projectsContainer.appendChild(item);
        }
        break;
    }
  });
}
