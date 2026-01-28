const styles = new CSSStyleSheet();
styles.replaceSync(`
.project-page {
  width: 100%;
  min-height: 100vh;
  background: white;
}

.project-hero {
  width: 100%;
  padding: 4rem 2rem;
  background: linear-gradient(135deg, var(--bs-primary) 0%, var(--bs-primary-dark, #0056b3) 100%);
  color: white;
  text-align: center;
}

.project-hero-content {
  max-width: 900px;
  margin: 0 auto;
}

.project-hero h1 {
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

.project-hero .subtitle {
  font-size: 1.25rem;
  opacity: 0.9;
  margin-bottom: 2rem;
}

.project-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  justify-content: center;
  margin-bottom: 2rem;
}

.tag {
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.project-links {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.project-link {
  padding: 0.75rem 2rem;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.primary-link {
  background: white;
  color: var(--bs-primary);
}

.primary-link:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.secondary-link {
  background: transparent;
  color: white;
  border: 2px solid white;
}

.secondary-link:hover {
  background: white;
  color: var(--bs-primary);
}

.project-content {
  max-width: 900px;
  margin: 0 auto;
  padding: 3rem 2rem;
}

.project-image-container {
  width: 100%;
  margin: 2rem 0;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.project-image {
  width: 100%;
  height: auto;
  display: block;
}

.section {
  margin-bottom: 3rem;
}

.section h2 {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: var(--bs-dark);
}

.section h3 {
  font-size: 1.5rem;
  font-weight: bold;
  margin-top: 2rem;
  margin-bottom: 0.75rem;
  color: var(--bs-dark);
}

.section p {
  line-height: 1.8;
  color: var(--bs-secondary);
  margin-bottom: 1rem;
}

.section ul {
  margin-left: 1.5rem;
  margin-bottom: 1rem;
}

.section li {
  line-height: 1.8;
  color: var(--bs-secondary);
  margin-bottom: 0.5rem;
}

.highlight-box {
  background: var(--bs-light);
  border-left: 4px solid var(--bs-primary);
  padding: 1.5rem;
  border-radius: 8px;
  margin: 2rem 0;
}

.highlight-box h3 {
  margin-top: 0;
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
}

.feature-card {
  background: var(--bs-light);
  padding: 1.5rem;
  border-radius: 8px;
  transition: transform 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-5px);
}

.feature-card h4 {
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: var(--bs-dark);
}

.feature-card p {
  margin: 0;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 2rem;
  margin: 2rem 0;
  text-align: center;
}

.stat {
  padding: 1.5rem;
}

.stat-value {
  font-size: 2.5rem;
  font-weight: bold;
  color: var(--bs-primary);
  margin-bottom: 0.5rem;
}

.stat-label {
  color: var(--bs-secondary);
  font-size: 0.9rem;
}

.back-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--bs-primary);
  text-decoration: none;
  margin-bottom: 2rem;
  font-weight: 500;
}

.back-link:hover {
  text-decoration: underline;
}

@media (max-width: 768px) {
  .project-hero h1 {
    font-size: 2rem;
  }
  
  .project-hero .subtitle {
    font-size: 1rem;
  }
  
  .project-content {
    padding: 2rem 1rem;
  }
  
  .section h2 {
    font-size: 1.5rem;
  }
  
  .feature-grid {
    grid-template-columns: 1fr;
  }
}
`);

class ProjectTemplate extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        const title = this.getAttribute("title") || "Project Title";
        const subtitle = this.getAttribute("subtitle") || "Project subtitle";
        const image = this.getAttribute("image") || "";
        const tags = this.getAttribute("tags")
            ? this.getAttribute("tags").split(",")
            : [];
        const demoLink = this.getAttribute("demo-link") || "";
        const codeLink = this.getAttribute("code-link") || "";
        const overviewSlot = '<slot name="overview"></slot>';
        const challengeSlot = '<slot name="challenge"></slot>';
        const solutionSlot = '<slot name="solution"></slot>';
        const featuresSlot = '<slot name="features"></slot>';
        const resultsSlot = '<slot name="results"></slot>';
        const technicalSlot = '<slot name="technical"></slot>';
        const customSlot = "<slot></slot>";

        this.shadowRoot.innerHTML = `
      <div class="project-page">
        <div class="project-hero">
          <div class="project-hero-content">
            <h1>${title}</h1>
            <p class="subtitle">${subtitle}</p>
            ${tags.length > 0
                ? `
              <div class="project-tags">
                ${tags.map((tag) => `<span class="tag">${tag.trim()}</span>`).join("")}
              </div>
            `
                : ""
            }
            <div class="project-links">
              ${demoLink ? `<a href="${demoLink}" class="project-link primary-link">View Demo</a>` : ""}
              ${codeLink ? `<a href="${codeLink}" target="_blank" class="project-link secondary-link">View Code</a>` : ""}
            </div>
          </div>
        </div>

        <div class="project-content">
          <a href='${import.meta.url}/../../' class="back-link">← Back to Home</a>
          
          ${image
                ? `
            <div class="project-image-container">
              <img src="${image}" alt="${title}" class="project-image" />
            </div>
          `
                : ""
            }

          <div class="section">
            <h2>Overview</h2>
            ${overviewSlot}
          </div>

          <div class="section">
            <h2>The Challenge</h2>
            ${challengeSlot}
          </div>

          <div class="section">
            <h2>The Solution</h2>
            ${solutionSlot}
          </div>

          <div class="section">
            <h2>Key Features</h2>
            ${featuresSlot}
          </div>

          <div class="section">
            <h2>Technical Implementation</h2>
            ${technicalSlot}
          </div>

          <div class="section">
            <h2>Results & Impact</h2>
            ${resultsSlot}
          </div>

          ${customSlot}
        </div>
      </div>
    `;

        this.shadowRoot.adoptedStyleSheets = [styles];
    }
}

customElements.define("project-template", ProjectTemplate);
