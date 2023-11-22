const html = String.raw

class Component extends HTMLElement {
  name = "skeleton-tracing"
  input = {}
  output = {}
  property = {}
  static observedAttributes = []
  constructor() {
    super()
    const shadow = this.attachShadow({ mode: "closed" })
    shadow.innerHTML = html`
      <script src="https://cdn.jsdelivr.net/npm/skeleton-tracing-wasm/build/trace_skeleton_wasm.js"></script>
      <h1>skeleton-tracing</h1>
    `
    console.log("constructor")
    // console.log(TraceSkeleton)
    // TraceSkeleton.load().then((tracer) => {
    //   // wasm module loaded
    //   // here is your code
    //   console.log(tracer)
    //   // const { polylines,rects } = tracer.fromCanvas(HTMLCANVAS)
    // })
  }
  render() {}
  connectedCallback() {}
  attributeChangedCallback(attrName, oldValue, newValue) {}
}
customElements.define("skeleton-tracing", Component)
