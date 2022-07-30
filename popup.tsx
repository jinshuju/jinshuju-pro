import { useState } from "react"

function IndexPopup() {
  const [data, setData] = useState("")

  const websiteClicked = function() {
    chrome.tabs.create({url: "https://jinshuju.pro"});
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        padding: 16
      }}>
      <h1>
        jinshuju.pro
      </h1>
      <a onClick={websiteClicked} href="https://jinshuju.pro">
        visit our website.
      </a>
    </div>
  )
}

export default IndexPopup
