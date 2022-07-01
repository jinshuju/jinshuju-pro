import { find, forEach, isEmpty } from "lodash"
import { nanoid } from "nanoid"
import type { PlasmoContentScript } from "plasmo"

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

const getFilterData = () => location.href

const createRecord = (name, value) => {
  return { id: nanoid(), value, name, createAt: new Date() }
}

const removeRecord = async (id) => {
  const formToken = getFormToken()
  const data: any[] = (await storage.get(formToken)) ?? []
  const idx = find(data, (item) => item.id === id)
  data.splice(idx, 1)
  await storage.set(formToken, data)
}

const renderRecordBtn = () => {
  const btn = document.createElement("button")
  const btnContent = document.createTextNode("记录一下筛选条件")
  btn.classList.add("gd-pro-record-btn")
  btn.appendChild(btnContent)

  return btn
}

const appendExpandBtn = () => {
  const btn = document.createElement("button")
  const btnContent = document.createTextNode("记录")
  btn.classList.add("gd-pro-expand-btn")

  btn.appendChild(btnContent)
  document.body.appendChild(btn)

  btn.onclick = () => {
    document.body.classList.toggle("gd-pro-list-expand")
  }
}

const renderItem = (item) => {
  const itemElement = document.createElement("div")
  itemElement.classList.add("gd-pro-record-item")

  const itemLinkElement = document.createElement("a")
  itemLinkElement.setAttribute("href", item.value)
  const itemLinkContent = document.createTextNode(item.name)
  itemLinkElement.appendChild(itemLinkContent)

  const itemCloseElement = document.createElement("a")
  itemCloseElement.classList.add("gd-pro-item-close")
  itemCloseElement.dataset.id = item.id

  const itemCloseContent = document.createTextNode("X")
  itemCloseElement.appendChild(itemCloseContent)

  itemElement.appendChild(itemLinkElement)
  itemElement.appendChild(itemCloseElement)

  return itemElement
}

const renderList = async () => {
  const listElement = document.createElement("div")
  listElement.classList.add("gd-pro-list-container")

  const formToken = getFormToken()
  const data = await storage.get(formToken)

  forEach(data, (item) => {
    const itemElement = renderItem(item)
    listElement.appendChild(itemElement)
  })

  return listElement
}

const main = async () => {
  const listRoot = document.createElement("div")
  listRoot.classList.add("gd-pro-list-root")

  if (!isEmpty(getFilterData())) {
    listRoot.appendChild(renderRecordBtn())
  }

  const listElement = await renderList()
  listRoot.appendChild(listElement)

  let current = listElement
  document.body.appendChild(listRoot)

  const updateList = async () => {
    const listElement = await renderList()
    listRoot.replaceChild(listElement, current)
    current = listElement
  }
  appendExpandBtn()

  document
    .querySelector(".gd-pro-list-root")
    .addEventListener("click", async (e: any) => {
      if (e.target.classList.contains("gd-pro-item-close")) {
        await removeRecord(e.target.dataset.id)
        await updateList()
      }
    })

  document
    .querySelector(".gd-pro-record-btn")
    .addEventListener("click", async () => {
      const formToken = getFormToken()
      const name = prompt("为这条记录设置一个名称吧")
      if (!name) return

      const filterData = getFilterData()
      const data = await storage.get(formToken)

      const record = createRecord(name, filterData)
      const newData = isEmpty(data) ? [record] : [...data, record]

      await storage.set(formToken, newData)
      updateList()
    })
}

window.addEventListener("load", () => {
  main()
})

window.addEventListener("turbolinks:load", () => {
  main()
})
