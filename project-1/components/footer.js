const styles = new CSSStyleSheet();
styles.replaceSync(`
#footer {
  height: 100%;
  background: var(--bs-dark);
  padding: 1rem;
  display: flex;
  flex-direction: column;
  color: white;
  flex-shrink: 1;
}

#inner-footer {
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: auto;
}

#copyright {
  font-size: .8rem;
}
`);

class Footer extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.style = `
      height: 100%;
      display: flex;
      flex-direction: column;
    `;
    this.shadowRoot.innerHTML = `
<div id="footer">
  <div id="inner-footer">
    <p id="copyright">Christian Auman &copy; ${new Date().getFullYear()}</p>
  </div>
</div>
    `;
    this.shadowRoot.adoptedStyleSheets = [styles]
  }
}

customElements.define("portfolio-footer", Footer);
