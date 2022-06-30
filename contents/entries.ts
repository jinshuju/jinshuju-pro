import { isEmpty } from "lodash"
import { nanoid } from "nanoid"
import type { PlasmoContentScript } from "plasmo"
import queryString from "query-string"

import { Storage } from "@plasmohq/storage"

import cssText from "./entries.css"

export const config: PlasmoContentScript = {
  matches: ["https://jinshuju.net/forms/*/entries*"]
}
const storage = new Storage()

export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}

const getFormToken = () => {
  const matchResult =
    location.pathname.match(/\/forms\/([^/?]+)\/entries/) || []

  return matchResult[1]
}

const getFilterData = () => queryString.parse(location.search)

const createRecord = (name, value) => {
  return { id: nanoid(), value, name, createAt: new Date() }
}

const appendRecordBtn = () => {
  const copyPublishedFormLink = document.getElementById(
    "copy_published_form_link"
  )
  const formToken = getFormToken()
  const parentDiv = copyPublishedFormLink.parentNode

  const btn = document.createElement("button")
  const btnContent = document.createTextNode("记录一下")
  btn.setAttribute("class", "record-btn")
  btn.appendChild(btnContent)
  parentDiv.insertBefore(btn, copyPublishedFormLink)

  btn.addEventListener("click", async () => {
    const filterData = getFilterData()
    const data = await storage.get(formToken)

    const record = createRecord("", filterData)
    const newData = isEmpty(data) ? [record] : [...data, record]

    await storage.set(formToken, newData)

    const gainData = await storage.get(formToken)
    console.log("gainData", gainData)
  })
}

window.addEventListener("load", async () => {
  const filterData = getFilterData()
  if (!isEmpty(filterData)) {
    appendRecordBtn()
  }
})

window.addEventListener("turbolinks:load", async () => {
  const filterData = getFilterData()
  if (!isEmpty(filterData)) {
    appendRecordBtn()
  }
})
