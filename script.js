// script.js

document.addEventListener("DOMContentLoaded", () => {
    // Mouse hover effect
    const hoverTargets = document.querySelectorAll("button, a, .section-nav li, .social-icons img, .experience-item");
  
    hoverTargets.forEach(el => {
      el.addEventListener("mouseenter", () => {
        el.style.transition = "transform 0.3s ease, box-shadow 0.3s ease";
        el.style.transform = "scale(1.03)";
        el.style.boxShadow = "0 0 16px rgba(100, 255, 218, 0.3)";
      });
  
      el.addEventListener("mouseleave", () => {
        el.style.transform = "scale(1)";
        el.style.boxShadow = "none";
      });
    });
  
    // Cursor glow effect
    const cursorGlow = document.createElement("div");
    cursorGlow.style.position = "fixed";
    cursorGlow.style.top = 0;
    cursorGlow.style.left = 0;
    cursorGlow.style.width = "700px";
    cursorGlow.style.height = "700px";
    cursorGlow.style.borderRadius = "50%";
    cursorGlow.style.pointerEvents = "none";
    cursorGlow.style.zIndex = 9999;
    cursorGlow.style.background = "radial-gradient(circle, rgba(29, 78, 216, 0.15) 0%, transparent 80%)";
    document.body.appendChild(cursorGlow);
  
    document.addEventListener("mousemove", e => {
      cursorGlow.style.transform = `translate(${e.clientX - 350}px, ${e.clientY - 350}px)`;
    });
  
    // Nav hover effect
    const navItems = document.querySelectorAll(".section-nav li");
    navItems.forEach(item => {
      item.style.transition = "color 0.3s ease, font-size 0.3s ease";
      item.addEventListener("mouseenter", () => {
        item.style.color = "#ffffff";
        item.style.fontSize = "1.2rem";
      });
      item.addEventListener("mouseleave", () => {
        item.style.color = "";
        item.style.fontSize = "";
      });
    });
  });
  
  // Additional experience entries and project section setup
  const experienceSection = document.querySelector(".experience");
  if (experienceSection) {
    const moreExperience = [
      {
        duration: "2022 — 2024",
        title: "Frontend Developer · Freelance",
        description: "Built websites and web apps for startups and small businesses. Focused on responsive design, accessibility, and performance optimization.",
        tech: ["HTML", "CSS", "JavaScript", "Vue"]
      },
      {
        duration: "2020 — 2022",
        title: "Junior Developer · Tech Studio",
        description: "Worked on a variety of internal tools and external client projects. Gained experience with agile workflows and component-based development.",
        tech: ["React", "Redux", "Sass", "Git"]
      }
    ];
  
    moreExperience.forEach(job => {
      const item = document.createElement("div");
      item.className = "experience-item";
      item.style.transition = "box-shadow 0.3s ease";
      item.addEventListener("mouseenter", () => {
        item.style.boxShadow = "0 0 24px rgba(100, 255, 218, 0.2)";
      });
      item.addEventListener("mouseleave", () => {
        item.style.boxShadow = "none";
      });
      item.innerHTML = `
        <div class="duration">${job.duration}</div>
        <h3>${job.title}</h3>
        <p>${job.description}</p>
        <div class="tech-tags">${job.tech.map(t => `<span>${t}</span>`).join(" ")}</div>
      `;
      experienceSection.appendChild(item);
    });
  }
  
  const mainContent = document.querySelector(".main-content");
  if (mainContent) {
    const projectsSection = document.createElement("section");
    projectsSection.className = "projects";
    projectsSection.innerHTML = `
      <h2>Projects</h2>
      <div class="experience-item">
        <div class="duration">2023</div>
        <h3>Portfolio Website</h3>
        <p>Designed and developed a personal portfolio to showcase professional experience and projects using modern web technologies.</p>
        <div class="tech-tags">
          <span>Next.js</span>
          <span>Tailwind CSS</span>
          <span>Vercel</span>
        </div>
      </div>
      <div class="experience-item">
        <div class="duration">2022</div>
        <h3>Task Manager App</h3>
        <p>Created a full-stack task management application with user authentication and CRUD operations.</p>
        <div class="tech-tags">
          <span>Node.js</span>
          <span>Express</span>
          <span>MongoDB</span>
        </div>
      </div>
    `;
  
    // Add hover glow to project items
    projectsSection.querySelectorAll(".experience-item").forEach(item => {
      item.style.transition = "box-shadow 0.3s ease";
      item.addEventListener("mouseenter", () => {
        item.style.boxShadow = "0 0 24px rgba(100, 255, 218, 0.2)";
      });
      item.addEventListener("mouseleave", () => {
        item.style.boxShadow = "none";
      });
    });
  
    mainContent.appendChild(projectsSection);
  }
  
  // Lock the sidebar (navbar) in place
  const sidebar = document.querySelector(".sidebar");
  if (sidebar) {
    sidebar.style.position = "fixed";
    sidebar.style.top = "0";
    sidebar.style.left = "0";
    sidebar.style.height = "100vh";
    sidebar.style.width = "33.33vw";
    sidebar.style.overflow = "auto";
  }
  