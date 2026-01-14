const styles = new CSSStyleSheet();
styles.replaceSync(`
    #menu {
        display: flex;
        list-style: none;
    }
`);
class Navbar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  createLink(name) {
    return `
            <ol><a>${name}</a></ol>
        `;
  }

  connectedCallback() {
    const selected = this.getAttribute("selected") ?? "";
    const links = [{ name: "Home" }, { name: "Contact" }];
    this.shadowRoot.innerHTML = `
        <nav>
            <menu id="menu">
                ${links.map((link) =>
                  this.createLink(
                    link.name,
                    link.name.toLowerCase() == selected.toLowerCase(),
                  )
                )}
            </menu>
        </nav>
    `;
    this.shadowRoot.adoptedStyleSheets = [styles];
  }
}
customElements.define("portfolio-navbar", Navbar);
