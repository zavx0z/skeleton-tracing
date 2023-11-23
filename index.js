// https://github.com/LingDong-/skeleton-tracing/tree/master/wasm
const html = String.raw
class Component extends HTMLElement {
  static tag = "skeleton-tracing"
  name = { ru: "Центральная линия", en: "skeleton-tracing" }
  description = { ru: "", en: "" }
  input = {
    img: {
      name: { ru: "Бинарное изображение" },
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
  static observedAttributes = ["src", "preview"]
  constructor() {
    super()
    this.shadow = this.attachShadow({ mode: "closed" })
    setTimeout(() => {
      console.log(this.property.preview.value, this.hasAttribute("preview"), typeof this.getAttribute("preview"), this.getAttribute("preview"))
    }, 1000)
  }
  connectedCallback() {
    this.render("./bin.png")
  }
  attributeChangedCallback(attrName, oldValue, newValue) {
    switch (attrName) {
      case "preview":
        this.property.preview.value = this.hasAttribute("preview")
        break
      default:
        break
    }
    setTimeout(() => {
      console.log(attrName, oldValue, typeof newValue, this.hasAttribute("preview"))
    }, 1000)
  }
  render(src) {
    import("https://cdn.jsdelivr.net/npm/skeleton-tracing-wasm/build/trace_skeleton_wasm.min.js").then(() => {
      TraceSkeleton.load().then((tracer) => {
        const canvas = document.createElement("canvas")
        const ctx = canvas.getContext("2d")
        const img = new Image()
        img.onload = () => {
          canvas.width = img.width
          canvas.height = img.height
          ctx.drawImage(img, 0, 0)
          const result = tracer.fromCanvas(canvas)
          const viz = tracer.visualize(result)
          setTimeout(()=>console.log(this.property.preview.value), 1000)
          if (this.hasAttribute("preview")) this.shadow.innerHTML = viz
          canvas.remove()
          this.subscriptions.forEach((cb) => cb({ polylines: result.polylines, svg: viz }))
        }
        img.src = src
      })
    })
  }
  mailbox = [] 
  send({ src }) {
    this.render(src)
  }
  subscriptions = []
  subscribe(cb) {
    this.subscriptions.push(cb)
    return () => this.subscriptions.unshift(cb)
  }
}
customElements.define(Component.tag, Component)
