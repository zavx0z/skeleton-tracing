const html = String.raw

class Component extends HTMLElement {
  name = "skeleton-tracing"
  input = {}
  output = {}
  property = {}
  static observedAttributes = ["mobile"]
  constructor() {
    super()
    const shadow = this.attachShadow({ mode: "closed" })
    shadow.innerHTML = html`<h1>skeleton-tracing</h1>`
  }
  render() {}
  connectedCallback() {}
  attributeChangedCallback(attrName, oldValue, newValue) {}
}
customElements.define("skeleton-tracing", Component)
