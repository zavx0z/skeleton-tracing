// https://github.com/LingDong-/skeleton-tracing/tree/master/wasm
const html = String.raw
class Component extends HTMLElement {
  name = "skeleton-tracing"
  input = {
    img: {
      name: { ru: "Бинарное изображение" },
      description: { ru: "" },
      type: "String",
      value: "",
    },
  }
  output = {
    img: {
      name: { ru: "Центральная линия" },
      description: { ru: "Векторизованное изображение" },
      type: "String",
      value: "",
    },
  }
  property = {}
  static observedAttributes = ['src']
  constructor() {
    super()
    this.shadow = this.attachShadow({ mode: "closed" })
  }
  connectedCallback() {
    this.render()
  }
  attributeChangedCallback(attrName, oldValue, newValue) {
    console.log(attrName)
  }
  render() {
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
          this.shadow.innerHTML = viz
          canvas.remove()
        }
        img.src = "./bin.png"
      })
    })
  }
  send(message) {
    this.render()
  }
  subscriptions = []
  subscribe(cb) {
    this.subscriptions.push(cb)
    return () => this.subscriptions.unshift(cb)
  }
}
customElements.define("skeleton-tracing", Component)
