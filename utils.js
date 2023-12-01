export async function pathToImageData(imagePath) {
  return new Promise((res, rej) => {
    const canvas = document.createElement("canvas")
    try {
      const ctx = canvas.getContext("2d", { willReadFrequently: true })
      document.createElement("canvas").getContext("2d")
      const img = new Image()
      img.onload = () => {
        canvas.width = img.width
        canvas.height = img.height
        ctx.drawImage(img, 0, 0)
        const imageData = ctx.getImageData(0, 0, img.width, img.height)
        res({ img, imageData })
      }
      img.src = imagePath
    } catch (e) {
      rej(JSON.stringify(e))
    } finally {
      canvas.remove()
    }
  })
}

export function i18n(param) {
  if (param && typeof param === "object") {
    const current = document.documentElement.lang
    const exist = Object.keys(param)
    return exist.includes(current) ? param[current] : exist.includes("en") ? param["en"] : param[exist[0]]
  } else return ""
}
const html = String.raw

export function nodeFabric(actor) {
  console.log(actor.input)
  Object.keys(actor.input).map(async (key) => {
    const res = await fetch(`https://zavx0z.github.io/everywhere-everything/where/${key}.xml`)
    const data = await res.text()
    const parser = new DOMParser()
    const xmlDoc = parser.parseFromString(data, "text/xml")
    console.log(xmlDoc.querySelector("Type"))
  })
  console.log(actor.output)
  const template = document.createElement("template")
  template.innerHTML = html`
    <h1>${i18n(actor.name)}</h1>
    <form>
      ${Object.entries(actor.input)
        .map(([key, socket]) => {
          switch (socket.field) {
            case "Boolean":
              return html`
                <div>
                  <input type="checkbox" id="${key}" name="${key}" ${socket.value ? "checked" : ""} />
                  <label for="${key}">${i18n(socket.label)}</label>
                </div>
              `
            case "text":
              return html`
                <div>
                  <label for="${key}">${i18n(socket.label)}</label>
                  <input type="text" id="${key}" name="${key}" />
                </div>
              `
            case "textarea":
              return html`
                <div>
                  <label for="${key}">${i18n(socket.label)}</label>
                  <textarea cols="80" rows="4" id="${key}" name="${key}"> ${socket.value} </textarea>
                </div>
              `
            default:
              return ""
          }
        })
        .join("")}
    </form>
  `
  template.content.querySelector("form").addEventListener("change", (e) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const props = {}
    for (const key in actor.input) {
      const value = formData.get(key)
      if (actor.input[key].type === "Boolean") {
        props[key] = value === "on"
      } else props[key] = value
    }
    actor.send(props)
  })
  template.content.appendChild(actor)
  return template.content
}
