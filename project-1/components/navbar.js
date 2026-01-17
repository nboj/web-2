const styles = new CSSStyleSheet();
styles.replaceSync(`
  nav {
    display: flex;
    align-items: center;
    background: var(--bs-primary);
    justify-content: space-between;
    padding-inline: 1rem;
    color: white;
  }

  menu {
    display: flex;
    list-style: none;
    gap: 0;
    margin: 0;
  }

  li {
    margin: 0;
  }

  a {
    text-decoration: none;
    color: inherit;
    padding: 1rem;
  }

  a:visited {
    text-decoration: none;
    color: inherit;
  }

  #icon {
    border-radius: 50%;
  }

  #section-1 {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
  }

  .selected {
    text-decoration: underline;
  }
`);

class Navbar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  createLink(name, href, selected) {
    return `
<li><a ${selected && "class='selected'"} href="${href}">${name}</a></li>
`;
  }

  connectedCallback() {
    const selected = this.getAttribute("current-href") ?? "";
    const links = [
      { name: "Home", href: "/" },
      { name: "Contact", href: "/contact" },
    ];
    this.shadowRoot.innerHTML = `
<nav>
  <div id="section-1">
    <img src="${import.meta.url}/../../images/prof.png" alt="Christian's Profile Icon" title="Christian's Profile Icon" width="25" height="25" id="icon" />
    <p>Christian</p>
  </div>
  <menu>
    ${links
      .map((link) =>
        this.createLink(
          link.name,
          link.href,
          link.href.toLowerCase() == selected.toLowerCase(),
        ),
      )
      .join("\n")}
  </menu>
</nav>
`;
    this.shadowRoot.adoptedStyleSheets = [styles];
  }
}
customElements.define("portfolio-navbar", Navbar);
