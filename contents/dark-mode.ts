import type { PlasmoContentScript } from "plasmo"

export const config: PlasmoContentScript = {
  matches: [
    "https://*.jinshuju.net/home",
    "https://*.jinshuju.net/forms/*",
    "https://*.jinshuju.net/form_folders/*",
    "https://*.jinshuju.net/system*",
    "https://*.jinshuju.net/profile*",
    "https://*.jinshuju.net/transactions*",
    "https://*.jinshuju.net/apps*",
    "https://*.jinshuju.net/submitter*",
    "https://*.jinshuju.net/shared_forms*",
    "https://*.jinshuju.net/favorites*",
    "https://*.jinshuju.net/external_shared_forms*",
    "https://*.jinshuju.net/participated_forms*",
    "https://*.jinshuju.net/with_fields_unusable_forms*",
    "https://*.jinshuju.net/form_trash*",
    "https://*.jinshuju.net/tags*"
  ]
}

import cssText from "./dark-mode.css"

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
