export function visualize(polylines, width, height, scale, stroke) {
    let svg = `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="${width * scale}" height="${height * scale}">`
    for (let i = 0; i < polylines.length; i++) {
      svg += `<path fill="none" stroke-width="${stroke}" stroke="rgb(${Math.floor(Math.random() * 200)},${Math.floor(
        Math.random() * 200
      )},${Math.floor(Math.random() * 200)})" d="M${polylines[i]
        .map((x) => x[0] * scale + "," + x[1] * scale)
        .join(" L")}"/>`
    }
    svg += "</svg>"
    return svg
  }
