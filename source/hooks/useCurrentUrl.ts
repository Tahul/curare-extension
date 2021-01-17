import { useEffect, useState } from 'react'
import useIsMounted from './useIsMounted'

/**
 * Simple validator for the URL.
 *
 * @param url
 */
const isValidUrl = (url: string) => {
  return !url.includes('chrome-extension://')
}

export default () => {
  const isMounted = useIsMounted()
  let [currentUrl, setCurrentUrl] = useState<string>()

  useEffect(() => {
    chrome.tabs.query(
      { active: true, lastFocusedWindow: true },
      (tabs: chrome.tabs.Tab[]) => {
        if (tabs[0].url && isMounted && isValidUrl(tabs[0].url))
          setCurrentUrl(tabs[0].url)
      },
    )
  }, [isMounted])

  return { currentUrl }
}
