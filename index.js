// https://github.com/LingDong-/skeleton-tracing/tree/master/wasm
// import example from "./example.jpg"

const html = String.raw

class Component extends HTMLElement {
  name = "skeleton-tracing"
  input = {}
  output = {}
  property = {}
  static observedAttributes = []
  constructor() {
    super()
    this.shadow = this.attachShadow({ mode: "closed" })
    this.shadow.innerHTML = html`
     <h1>skeleton-tracing</h1> 
     <canvas></canvas>
     <div id='result'></div>
    `
    import("https://cdn.jsdelivr.net/npm/skeleton-tracing-wasm/build/trace_skeleton_wasm.js").then(module => {
      TraceSkeleton.load().then((tracer) => {
        const canvas = this.shadow.querySelector("canvas")
        const ctx = canvas.getContext("2d");
        const img = new Image();
        img.onload = () => {
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img, 0, 0)
          const result = tracer.fromCanvas(this.shadow.querySelector("canvas"))
          // const { polylines, rects } = result

          console.log(result)
          const viz = tracer.visualize(result)
          this.shadow.getElementById("result").innerHTML = viz

        };
        // img.src = "./horse_r.png"
        img.src = "./bin.png"
        // img.src = "./opencv-thinning-src-img.png"
        // img.src = "./example2.BMP"
      })
    })
  }
  draw() {
  }

  render() { }
  connectedCallback() { }
  attributeChangedCallback(attrName, oldValue, newValue) { }
}
customElements.define("skeleton-tracing", Component)
