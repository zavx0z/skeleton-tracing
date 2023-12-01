// https://github.com/LingDong-/skeleton-tracing/tree/master/wasm
import { visualize } from "./lib/draw.js"

class Component extends HTMLElement {
  static tag = "skeleton-tracing"
  name = { ru: "Центральная линия", en: "skeleton-tracing" }
  description = { ru: "", en: "" }
  input = {
    1701380269254: "", //"Бинарное изображение"
  }
  output = {
    1701435712847: [[]], // "Массив точек линий"
    1701435696745: "", //"Центральная линия"
  }
  property = {
    preview: {
      label: { ru: "Предпросмотр" },
      description: { ru: "" },
      type: "Boolean",
      value: true,
    },
  }
  constructor() {
    super()
    this.shadow = this.attachShadow({ mode: "closed" })
  }
  attributeChangedCallback(attrName, oldValue, newValue) {}
  connectedCallback() {}
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
  send({ imageData, preview }) {
    this.property.preview.value = !!preview
    this.render({ imageData })
  }
  subscriptions = []
  subscribe(cb) {
    this.subscriptions.push(cb)
    return () => this.subscriptions.unshift(cb)
  }
}
customElements.define(Component.tag, Component)
