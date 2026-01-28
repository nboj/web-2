const styles = new CSSStyleSheet();
styles.replaceSync(`
#projects-section {
  width: 100%;
  padding: 3rem 1rem;
  background: var(--bs-light);
}

.projects-container {
  max-width: 1200px;
  margin: 0 auto;
}

.section-title {
  text-align: center;
  margin-bottom: 3rem;
  font-size: 2.5rem;
  font-weight: bold;
  color: var(--bs-dark);
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  padding: 0;
  list-style: none;
}

.project-card {
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
}

.project-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
}

.project-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  background: var(--bs-secondary);
}

.project-content {
  padding: 1.5rem;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.project-title {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: var(--bs-dark);
}

.project-description {
  color: var(--bs-secondary);
  margin-bottom: 1rem;
  flex: 1;
  line-height: 1.6;
}

.project-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.tag {
  background: var(--bs-primary);
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 15px;
  font-size: 0.85rem;
}

.project-links {
  display: flex;
  gap: 1rem;
  margin-top: auto;
}

.project-link {
  padding: 0.5rem 1rem;
  border-radius: 5px;
  text-decoration: none;
  font-weight: 500;
  transition: background 0.3s ease;
  text-align: center;
  flex: 1;
}

.primary-link {
  background: var(--bs-primary);
  color: white;
}

.primary-link:hover {
  background: var(--bs-primary-dark, #0056b3);
}

.secondary-link {
  background: transparent;
  color: var(--bs-primary);
  border: 2px solid var(--bs-primary);
}

.secondary-link:hover {
  background: var(--bs-primary);
  color: white;
}

@media (max-width: 768px) {
  .section-title {
    font-size: 2rem;
  }
  
  .projects-grid {
    grid-template-columns: 1fr;
  }
}
`);

class ProjectsSection extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        const projects = [
            {
                title: "Integrating LRP into stable diffusion",
                description:
                    "Presented a methodology at Luxembourg Eurovis about integrating Layer-wise Relevance Propagation (LRP) with Stable Diffusion to assign relevance scores to textual & visual elements, along with an interactive web-based visualization tool; validated via a 35-participant user study demonstrating accessibility and effectiveness.",
                image: "images/stable-diffusion-lrp.png",
                tags: ["Python", "Torch", "NextJS", "Typescript"],
                demoLink: "/projects/stable-diffusion-lrp",
                codeLink: "https://github.com/nboj/sd-lrp-research/tree/main/webapp",
            },
            {
                title: "Prompt Studio",
                description:
                    "Extended my other research to use DAAM which stands for Diffusion Attribution Attention Maps. These maps are useful in learning about the model's understanding of text and how it relates to the image.",
                image: "images/prompt-studio.png",
                tags: ["Python", "Rust", "Torch", "NextJS", "Typescript"],
                demoLink: "/projects/prompt-studio",
                codeLink: "https://github.com/nboj/research",
            },
            {
                title: "Flappers",
                description:
                    "This was my project during my first year of college. I ended up constructing a flappy bird game using the PhaserJs libary.",
                image: "images/flappers.png",
                tags: ["Javascript", "Phaser"],
                demoLink: "/projects/flappers",
                codeLink: "https://github.com/nboj/flappy-game",
            },
            {
                title: "Recipe Database",
                description:
                    "I worked on a team project with 2 other developers during my database class to create this Recipe Database web service which contains user authentication with OAuth2, backend database and api using fastapi in python with postgresql as the ORDBMS hosted on AWS.",
                image: "images/recipe-database.png",
                tags: ["NextJS", "Typescript", "Python"],
                demoLink: "/projects/flappers",
                codeLink: "https://github.com/nboj/recipe-team-project-2025",
            },
            {
                title: "Exit Paradox",
                description:
                    "I worked on a team project with 9 other developers during my software engineering class to create this 2D puzzle game. We created our own game engine with OBB collision, custom implemented tilemaps, UI management, and Scene management.",
                image: "images/exit-paradox.png",
                tags: ["Javascript"],
                demoLink: "/projects/flappers",
                codeLink: "https://github.com/team-echo-2025/game-remake"
            },
            {
                title: "Deimos Piratepacer",
                description:
                    "Reverse engineered a binary, created a rust SDK & rust DLL with Tauri 2.0 as the driver for the frontend. I developed arrlang which is my own compiled bot language for the tool. I wrote a message bus and a shared memory duplex ring buffer to communicate between the DLL and the tauri frontend.",
                image: "images/piratepacer.png",
                tags: ["Rust", "Ghydra", "x64dbg", "Cheat Engine"],
                demoLink: "/projects/flappers",
            },
        ];

        const projectCards = projects
            .map(
                (project) => `
      <li class="project-card">
        <img src="${project.image}" alt="${project.title}" class="project-image" onerror="this.style.display='none'" />
        <div class="project-content">
          <h3 class="project-title">${project.title}</h3>
          <p class="project-description">${project.description}</p>
          <div class="project-tags">
            ${project.tags.map((tag) => `<span class="tag">${tag}</span>`).join("")}
          </div>
          <div class="project-links">
            <a href="${import.meta.url}/../..${project.demoLink}" class="project-link primary-link">Learn More</a>
            ${project.codeLink ? `<a href="${project.codeLink}" target="_blank" class="project-link secondary-link">View Code</a>` : ""}
          </div>
        </div>
      </li>
    `,
            )
            .join("");

        this.shadowRoot.innerHTML = `
      <section id="projects-section">
        <div class="projects-container">
          <h2 class="section-title">My Projects</h2>
          <ul class="projects-grid">
            ${projectCards}
          </ul>
        </div>
      </section>
    `;
        this.shadowRoot.adoptedStyleSheets = [styles];
    }
}

customElements.define("portfolio-projects", ProjectsSection);
