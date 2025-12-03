let allProjects = [];
let isExpanded = false;
let slideshowInterval = null;

document.addEventListener("DOMContentLoaded", () => {
  const cursorGlow = document.createElement("div");
  cursorGlow.className = "cursor-glow";
  document.body.appendChild(cursorGlow);
  document.addEventListener("mousemove", e => {
    cursorGlow.style.transform = `translate(${e.clientX - 350}px, ${e.clientY - 350}px)`;
  });

  const sidebar = document.querySelector(".sidebar");
  if (sidebar) sidebar.classList.add("fixed-sidebar");

  const toggleBtn = document.getElementById("menu-toggle");
  const mobileMenu = document.getElementById("mobile-menu");
  if (toggleBtn && mobileMenu) {
    toggleBtn.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");
    });
  }

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

  fetch("content/index.txt")
    .then((res) => res.text())
    .then((text) => {
      const entries = parseContentFile(text);
      injectContent(entries);
      applyHoverEffects();
      handleHashChange();
    })
    .catch((err) => console.error("Failed to load content:", err));

  window.addEventListener("hashchange", handleHashChange);
});

function applyHoverEffects() {
  const hoverTargets = document.querySelectorAll("button, a span, .section-nav li span, .social-icons img, .project-item, .contact-section, .tab-content h3");
  hoverTargets.forEach(el => {
    el.addEventListener("mouseenter", () => el.classList.add("hover-effect"));
    el.addEventListener("mouseleave", () => el.classList.remove("hover-effect"));
  });
}

function parseContentFile(text) {
  const lines = text.split("\n");
  const entries = [];
  let current = null;

  lines.forEach((line) => {
    line = line.trim();
    if (line.startsWith("[") && line.endsWith("]")) {
      if (current) entries.push(current);
      current = { section: line.slice(1, -1), tags: [], responsibilities: [] };
    } else if (line.startsWith("-")) {
      if (current && current.responsibilities) {
        current.responsibilities.push(line.replace(/^-/, "").trim());
      }
    } else if (line.includes(":")) {
      const [key, ...rest] = line.split(":");
      const value = rest.join(":").trim();
      const currentKey = key.trim().toLowerCase();

      if (currentKey === "tags") {
        current.tags = value.split(",").map(s => s.trim());
      } else if (currentKey === "responsibilities") {
        current.responsibilities = [];
      } else {
        current[currentKey] = value;
      }
    }
  });

  if (current) entries.push(current);
  return entries;
}

function injectContent(entries) {
  const aboutContainer = document.querySelector("#about");
  const experienceContainer = document.querySelector("#experience");
  allProjects = entries.filter(e => e.section === "project");

  entries.forEach((entry) => {
    if (entry.section === "about" && aboutContainer) {
      aboutContainer.innerHTML += `<p>${entry.content}</p>`;
    }
  });

  const experiences = entries.filter(e => e.section === "experience");
  if (experiences.length && experienceContainer) {
    injectTabbedExperience(experiences);
  }

  renderProjectList(allProjects.slice(0, 3));
  addShowMoreButton();
}

function injectTabbedExperience(experiences) {
  const container = document.querySelector("#experience-tabs");
  if (!container) return;

  container.innerHTML = "";
  const tabSystem = document.createElement("div");
  tabSystem.className = "tab-system";

  const tabBar = document.createElement("div");
  tabBar.className = "tab-bar";

  const contentArea = document.createElement("div");
  contentArea.className = "tab-contents";

  // Arrays to store inputs and content separately
  const inputs = [];

  experiences.slice(0, 3).forEach((exp, idx) => {
    const tabId = `tab${idx + 1}`;
    const contentId = `content${idx + 1}`;

    // Create input (outside tab-bar)
    const input = document.createElement("input");
    input.type = "radio";
    input.name = "tabs";
    input.id = tabId;
    if (idx === 0) input.checked = true;
    inputs.push(input); // Store for appending later

    // Create label
    const label = document.createElement("label");
    label.setAttribute("for", tabId);
    label.textContent = exp.tabtitle;
    tabBar.appendChild(label);

    // Create content
    const content = document.createElement("div");
    content.className = "tab-content";
    content.id = contentId;

    content.innerHTML = `
      <h3>${exp.title}</h3>
      <p class="duration">${exp.duration}</p>
      <p>${exp.intro}</p>
      ${exp.responsibilities?.length ? `
        </br>
        <p>${exp.responsibilities.join(" ")}</p>
      ` : ""}
      ${exp.tags?.length ? `
        <div class="tech-tags">${exp.tags.map(t => `<span>${t}</span>`).join("")}</div>
      ` : ""}
    `;
    contentArea.appendChild(content);
  });

  // Add final placeholder tab for spacing
  const placeholder = document.createElement("div");
  placeholder.className = "tab-placeholder";
  tabBar.appendChild(placeholder);

  // Append inputs *before* tab bar and content
  inputs.forEach(input => tabSystem.appendChild(input));
  tabSystem.appendChild(tabBar);
  tabSystem.appendChild(contentArea);

  container.appendChild(tabSystem);
}


function renderProjectList(projects) {
  const container = document.querySelector("#projects");
  container.querySelectorAll(".project-item, .show-more").forEach(el => el.remove());

  projects.forEach((project) => {
    const item = document.createElement("div");
    item.className = "project-item hoverable glass-strong glass-weak";
    item.style.cursor = "pointer";
    item.addEventListener("click", () => {
      window.location.hash = `#project=${project.id}`;
    });

    item.innerHTML = `
      <div class="project-image-block">
        <img src="${project.image}" alt="${project.title}" />
        <div class="tech-tags">${project.tags.map(t => `<span>${t}</span>`).join("")}</div>
      </div>
      <div class="project-content">
        <h3>${project.title}</h3>
        <p>${project.content}</p>
      </div>
    `;
    container.appendChild(item);
  });
}

function addShowMoreButton() {
  if (allProjects.length <= 3) return;

  const btn = document.createElement("button");
  btn.className = "show-more submit-btn";
  btn.textContent = "Show More";
  btn.style.marginTop = "1rem";
  btn.addEventListener("click", () => {
    window.location.hash = "#projects";
  });

  document.querySelector("#projects").appendChild(btn);
}

function handleHashChange() {
  const hash = window.location.hash;

  if (hash.startsWith("#project=")) {
    const id = hash.split("=")[1];
    showProjectDetail(id);
  } else if (hash === "#projects") {
    const html = `
      <button class="back-btn" onclick="window.location.hash = ''">← Back</button>
      <div class="project-grid">
        ${allProjects.map(project => `
          <div class="project-item hoverable glass-strong glass-weak" onclick="window.location.hash = '#project=${project.id}'" style="cursor:pointer">
            <div class="project-image-block">
              <img src="${project.image}" alt="${project.title}" />
              <div class="tech-tags">${project.tags.map(t => `<span>${t}</span>`).join("")}</div>
            </div>
            <div class="project-content">
              <h3>${project.title}</h3>
              <p>${project.content}</p>
            </div>
          </div>
        `).join("")}
      </div>
    `;
    showOverlay(html);
  } else {
    hideOverlay();
    renderProjectList(isExpanded ? allProjects : allProjects.slice(0, 3));
    addShowMoreButton();
    applyHoverEffects();
  }
}

function showOverlay(contentHTML) {
  clearInterval(slideshowInterval);
  const overlay = document.getElementById("overlay-view");
  overlay.innerHTML = contentHTML;
  overlay.classList.remove("hidden");
  document.querySelector(".sidebar")?.classList.add("dimmed");
  document.querySelector(".main-content")?.classList.add("dimmed");
}

function hideOverlay() {
  clearInterval(slideshowInterval);
  const overlay = document.getElementById("overlay-view");
  overlay.classList.add("hidden");
  overlay.innerHTML = "";
  document.querySelector(".sidebar")?.classList.remove("dimmed");
  document.querySelector(".main-content")?.classList.remove("dimmed");
}

function showProjectDetail(projectId) {
  const filePath = `content/projects/${projectId}.txt`;

  fetch(filePath)
    .then(res => res.text())
    .then(text => {
      const data = parseProjectDetails(text);
      showDetailedProjectOverlay(data);
    })
    .catch(err => {
      showOverlay(`<p>Failed to load project data.</p><button class="back-btn" onclick="window.location.hash = ''">← Back</button>`);
    });
}

function parseProjectDetails(text) {
  const lines = text.split("\n");
  const project = { methods: [], tags: [], images: [] };
  let currentKey = "";

  lines.forEach(line => {
    line = line.trim();
    if (!line) return;

    if (line.includes(":") && !line.startsWith("-")) {
      const [key, ...rest] = line.split(":");
      currentKey = key.trim().toLowerCase();
      const value = rest.join(":").trim();

      switch (currentKey) {
        case "tech":
          project.tags = value.split(",").map(t => t.trim());
          break;
        case "id":
        case "title":
        case "description":
        case "link":
          project[currentKey] = value;
          break;
        case "methods":
        case "images":
          project[currentKey] = []; // prepare for items
          break;
      }
    } else if (line.startsWith("-")) {
      if (currentKey === "methods") {
        project.methods.push(line.replace(/^-/, "").trim());
      } else if (currentKey === "images") {
        project.images.push(line.replace(/^-/, "").trim());
      }
    }
  });

  return project;
}


function showDetailedProjectOverlay(project) {
  const slideshowHTML = `
    <div class="slideshow-wrapper">
      <button class="slideshow-arrow left" id="prev-slide">&#10094;</button>
      <div class="slideshow" id="slideshow">
        ${project.images.map((img, i) => `<img src="${img}" class="${i === 0 ? "active" : ""}">`).join("")}
      </div>
      <button class="slideshow-arrow right" id="next-slide">&#10095;</button>
    </div>
  `;

  const techHTML = project.tags.length
    ? `<div class="tech-tags">${project.tags.map(t => `<span>${t}</span>`).join("")}</div>`
    : "";

  const methodsHTML = project.methods.length
    ? `<h3">What I Did</h3><ul class="method-list">${project.methods.map(m => `<li>${m}</li>`).join("")}</ul>`
    : "";

  const descriptionHTML = project.description
    ? `<p style="margin-top: 1rem; line-height: 1.6;">${project.description}</p>`
    : "";

  const testButton = project.link
    ? `<a href="${project.link}" target="_blank" class="test-project-button">Test the Project</a>`
    : "";

  const html = `
    <button class="back-btn" onclick="window.location.hash = ''">← Back</button>
    <div class="project-item">
      <h2>${project.title}</h2>
      ${slideshowHTML}
      ${techHTML}
      ${methodsHTML}
      ${descriptionHTML}
      ${testButton}
    </div>
  `;

  showOverlay(html);
  startSlideshow();
}

function startSlideshow() {
  const slides = document.querySelectorAll("#slideshow img");
  if (!slides.length) return;

  let index = 0;

  function showSlide(i) {
    slides.forEach((img, idx) => {
      img.classList.toggle("active", idx === i);
    });
  }

  clearInterval(slideshowInterval);
  slideshowInterval = setInterval(() => {
    index = (index + 1) % slides.length;
    showSlide(index);
  }, 9000);

  document.getElementById("prev-slide")?.addEventListener("click", () => {
    index = (index - 1 + slides.length) % slides.length;
    showSlide(index);
  });

  document.getElementById("next-slide")?.addEventListener("click", () => {
    index = (index + 1) % slides.length;
    showSlide(index);
  });
}
