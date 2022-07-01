import type { PlasmoContentScript } from "plasmo"

export const config: PlasmoContentScript = {
  matches: [
    "https://jinshuju.net/home",
    "https://*.jinshuju.net/home",
    "https://jinshuju.net/form_folders/*",
    "https://*.jinshuju.net/form_folders/*"
  ]
}

import cssText from "./home.css"

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
