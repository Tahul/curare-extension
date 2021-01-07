import { useEffect, useState } from 'react'
import useIsMounted from './useIsMounted'

export default () => {
  const isMounted = useIsMounted()
  let [currentUrl, setCurrentUrl] = useState<string>()

  useEffect(() => {
    chrome.tabs.query(
      { active: true, lastFocusedWindow: true },
      (tabs: chrome.tabs.Tab[]) => {
        if (tabs[0].url && isMounted) setCurrentUrl(tabs[0].url)
      },
    )

    // Debug purposes
    if (!currentUrl && isMounted) setCurrentUrl('https://github.com/Tahul')
  }, [isMounted])

  return { currentUrl }
}
