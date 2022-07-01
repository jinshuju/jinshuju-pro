import type { PlasmoContentScript } from "plasmo"

export const config: PlasmoContentScript = {
  matches: [
    "https://jinshuju.net/forms/new",
    "https://*.jinshuju.net/forms/new",
    "https://jinshuju.net/forms/*/edit",
    "https://*.jinshuju.net/forms/*/edit"
  ]
}

import cssText from "./form_builder.css"

export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}

export const initDarkMode = () => {
  console.log('Dark Mode initialized.')
}

window.addEventListener("load", () => {
  initDarkMode();
})

window.addEventListener("turbolinks:load", () => {
  initDarkMode();
})
