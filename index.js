// https://github.com/LingDong-/skeleton-tracing/tree/master/wasm
const html = String.raw
import { visualize } from "./lib/draw.js"

class Component extends HTMLElement {
  static tag = "skeleton-tracing"
  name = { ru: "Центральная линия", en: "skeleton-tracing" }
  description = { ru: "", en: "" }
  input = {
    img: {
      name: { ru: "Бинарное изображение", en: "Binary image" },
      description: { ru: "" },
      type: "String",
      variant: "Path",
      value: "",
    },
  }
  output = {
    polylines: {
      name: { ru: "Массив точек линий" },
      description: { ru: "" },
      type: "Array.Array.Number",
      variant: "JS",
      value: [],
    },
    svg: {
      name: { ru: "Центральная линия" },
      description: { ru: "Векторизованное изображение" },
      type: "String",
      variant: "SVG",
      value: "",
    },
  }
  property = {
    preview: {
      name: { ru: "Предпросмотр" },
      description: { ru: "" },
      type: "Boolean",
      value: true,
    },
  }
  constructor() {
    super()
    this.shadow = this.attachShadow({ mode: "closed" })
  }
  connectedCallback() {}
  render({ imageData }) {
    import("https://cdn.jsdelivr.net/npm/skeleton-tracing-wasm/build/trace_skeleton_wasm.min.js").then(() => {
      TraceSkeleton.load().then((tracer) => {
        const result = tracer.fromImageData(imageData)
        const viz = tracer.visualize(result)
        if (this.property.preview.value) this.shadow.innerHTML = viz
        const vizResult = visualize(result.polylines, result.width, result.height, 1, 4)
        this.subscriptions.forEach((cb) => cb({ polylines: result.polylines, svg: vizResult }))
      })
    })
  }
  send({ imageData, preview }) {
    console.log(preview)
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
