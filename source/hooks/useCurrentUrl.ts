import { useEffect, useState } from 'react'

export default () => {
  let [currentUrl, setCurrentUrl] = useState<chrome.tabs.Tab>()

  useEffect(() => {
    chrome.tabs.query(
      { active: true, lastFocusedWindow: true },
      (tabs: chrome.tabs.Tab[]) => {
        setCurrentUrl(tabs[0])
      },
    )
  }, [])

  return currentUrl
}
