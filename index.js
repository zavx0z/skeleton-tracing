// https://github.com/LingDong-/skeleton-tracing/tree/master/wasm
// https://zavx0z.github.io/everywhere-everything/where/{id}.xml
import { visualize } from "./lib/draw.js"

class Component extends HTMLElement {
  static tag = "skeleton-tracing"
  static name = { ru: "Центральная линия", en: "skeleton-tracing" }
  static description = { ru: "", en: "" }
  input = {
    binaryImage: {
      name: { ru: "Бинарное изображение" },
      port: 201701380269254,
      value: "",
    },
  }
  output = {
    pointArray: {
      port: 1701435712847,
      value: [[]],
    },
    centerLine: {
      port: 1701435696745,
      value: "",
    },
  }
  property = {
    debug: true,
  }
  constructor() {
    super()
    this.shadow = this.attachShadow({ mode: "closed" })
  }
  send(data) {
    this.property.debug = true
    console.log(data)
    // this.render({ imageData })
  }
  subscriptions = []
  subscribe(cb) {
    this.subscriptions.push(cb)
    return () => this.subscriptions.unshift(cb)
  }
  render({ imageData }) {
    import("https://cdn.jsdelivr.net/npm/skeleton-tracing-wasm/build/trace_skeleton_wasm.min.js").then(() => {
      TraceSkeleton.load().then((tracer) => {
        const result = tracer.fromImageData(imageData)
        const viz = tracer.visualize(result)
        if (this.style.display !== "none") this.shadow.innerHTML = viz
        const vizResult = visualize(result.polylines, result.width, result.height, 1, 4)
        console.log(result)
        this.subscriptions.forEach((cb) => cb({ polylines: result.polylines, svg: vizResult }))
      })
    })
  }
}
customElements.define(Component.tag, Component)
