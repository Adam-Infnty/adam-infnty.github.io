document.addEventListener("DOMContentLoaded", () => {
  // Mouse hover effect for interactive elements
  const hoverTargets = document.querySelectorAll("button, a, .section-nav li, .social-icons img, .experience-item");
  hoverTargets.forEach(el => {
    el.addEventListener("mouseenter", () => el.classList.add("hover-effect"));
    el.addEventListener("mouseleave", () => el.classList.remove("hover-effect"));
  });

  // Cursor glow
  const cursorGlow = document.createElement("div");
  cursorGlow.className = "cursor-glow";
  document.body.appendChild(cursorGlow);
  document.addEventListener("mousemove", e => {
    cursorGlow.style.transform = `translate(${e.clientX - 350}px, ${e.clientY - 350}px)`;
  });

  // Lock sidebar in place
  const sidebar = document.querySelector(".sidebar");
  if (sidebar) {
    sidebar.classList.add("fixed-sidebar");
  }

  // Dynamic Experience Section
  const experienceSection = document.querySelector(".experience");
  if (experienceSection) {
    const moreExperience = [
      {
        duration: "2022 — 2024",
        title: "Software Developer, Wigan Council (Internship) · Wigan",
        description: "Implementing an API system to wigan councils existing ‘Jadu’ system to enable residents in the borough to book waste collection slots as part of wigans mission to eliminate fly tipping and excess waste accumulation.</br>• Spearheaded meetings of over 10 professionals from the relevant departments as well as the directors of wigan council to determine any complications that may arise when developing the integration.</br>• Acted as a middleman between the different departments, highlighting the potential complications of the system and creating realistic expectations.",
        tech: ["HTML", "CSS", "JavaScript", "Vue"]
      },
      {
        duration: "2020 — 2022",
        title: "Restaurant Manager, HMS Hosts · Manchester",
        description: "Working alongside a motivated and effective team to provide catering to over 30% of the airport’s customer traffic within terminal 2 a day, in the Amber Ale house.</br>Responsibilities;</br>• Regulated stock levels within the restaurant to ensure the customers’ needs are always met.</br>• Handling cash payments and making sure the cash float is never below or above the expected amount.</br>• Delegating tasks at the end of the shift to ensure all the necessary jobs are completed, and the restaurant is in excellent condition for the morning team to set up.</br>• Resolving any customer complaints, I can whilst communicating those that require a manager to the necessary person.",
        tech: ["React", "Redux", "Sass", "Git"]
      }
    ];

    moreExperience.forEach(job => {
      const item = document.createElement("div");
      item.className = "experience-item hoverable";
      item.innerHTML = `
        <div class="duration">${job.duration}</div>
        <h3>${job.title}</h3>
        <p>${job.description}</p>
        <div class="tech-tags">${job.tech.map(t => `<span>${t}</span>`).join(" ")}</div>
      `;
      experienceSection.appendChild(item);
    });
  }

  // Dynamic Projects Section
  const mainContent = document.querySelector(".main-content");
  if (mainContent) {
    const projectsSection = document.createElement("section");
    projectsSection.className = "projects";
    const heading = document.createElement("h2");
    heading.textContent = "What I've Worked On...";
    projectsSection.appendChild(heading);

    const projectData = [
      {
        title: "AI Powered Chatbot",
        description: [
          "Designed and developed a chatbot using modern web technologies.",
          "Integrated AI features to enhance interaction quality and automation."
        ],
        tech: ["Next.js", "Tailwind CSS", "Vercel"],
        img: "https://files.realpython.com/media/Chatterbot-Build-a-Chatbot-With-Python_Watermarked.07a26197ef70.jpg"
      },
      {
        title: "Spotify Wrapped",
        description: [
          "Designed and developed a personal portfolio to showcase professional experience and projects.",
          "Emphasized responsive design and clean UI with Tailwind CSS."
        ],
        tech: ["Next.js", "Tailwind CSS", "Vercel"],
        img: "https://files.realpython.com/media/Chatterbot-Build-a-Chatbot-With-Python_Watermarked.07a26197ef70.jpg"
      },
      {
        title: "Portfolio Website",
        description: [
          "Designed and developed a personal portfolio to showcase professional experience and projects.",
          "Emphasized responsive design and clean UI with Tailwind CSS."
        ],
        tech: ["Next.js", "Tailwind CSS", "Vercel"],
        img: "https://files.realpython.com/media/Chatterbot-Build-a-Chatbot-With-Python_Watermarked.07a26197ef70.jpg"
      }
    ];

    projectData.forEach(project => {
      const item = document.createElement("div");
      item.className = "project-item hoverable";

      const left = document.createElement("div");
      left.className = "project-image-block";
      const img = document.createElement("img");
      img.src = project.img;
      img.alt = project.title;
      const techTags = document.createElement("div");
      techTags.className = "tech-tags";
      techTags.innerHTML = project.tech.map(t => `<span>${t}</span>`).join("");
      left.appendChild(img);
      left.appendChild(techTags);

      const right = document.createElement("div");
      right.className = "project-content";
      const title = document.createElement("h3");
      title.textContent = project.title;
      const descriptionContainer = document.createElement("div");
      project.description.forEach(line => {
        const p = document.createElement("p");
        p.textContent = `• ${line}`;
        descriptionContainer.appendChild(p);
      });

      right.appendChild(title);
      right.appendChild(descriptionContainer);
      item.appendChild(left);
      item.appendChild(right);
      projectsSection.appendChild(item);
    });

    mainContent.appendChild(projectsSection);
  }

});

document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("menu-toggle");
  const mobileMenu = document.getElementById("mobile-menu");

  if (toggleBtn && mobileMenu) {
    toggleBtn.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");
    });
  }
});
