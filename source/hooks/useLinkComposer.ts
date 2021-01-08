import { useCallback, useEffect, useState } from 'react'
import useCurrentUrl from './useCurrentUrl'
import useIsMounted from './useIsMounted'
import useLinks, { Link } from './useLinks'

// Parse URLs
const regex = /^(?:((?:(?:https?|ftp):\/\/))|(?:www.))+(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u00a1-\uffff][a-z0-9\u00a1-\uffff_-]{0,62})?[a-z0-9\u00a1-\uffff]\.)+(?:[a-z\u00a1-\uffff]{2,}\.?))(?::\d{2,5})?(?:[/?#]\S*)?$/

// Test URLs
const isUrl = (url: string) => regex.test(url)

const useLinkComposer = () => {
  const isMounted = useIsMounted()
  const [loading, setLoading] = useState<boolean>(false)
  const { currentUrl } = useCurrentUrl()
  const { getLinkPreview, createLink } = useLinks()
  const [currentLink, setCurrentLink] = useState<Partial<Link>>({
    url: currentUrl,
    clicks: 0,
    collection_id: undefined,
    ogp: undefined,
  })

  // Load preview of currentUrl
  const loadPreview = useCallback(async () => {
    if (isMounted) setLoading(true)

    try {
      if (currentUrl && isUrl(currentUrl)) {
        const preview = await getLinkPreview({ url: currentUrl })

        if (isMounted) setCurrentLink({ ...currentLink, ogp: preview })
      }
    } catch (e) {
      console.warn('Could not preview the following url:\n')
      console.warn(currentUrl)
    }

    if (isMounted) setLoading(false)
  }, [currentUrl])

  // @ts-ignore Save the link
  const saveLink = async () => {
    if (isMounted) setLoading(true)

    try {
      await createLink(currentLink)

      if (isMounted)
        setCurrentLink({
          url: currentUrl,
          collection_id: undefined,
          ogp: undefined,
        })
    } catch (e) {
      // TODO: Handle errors
    }

    if (isMounted) setLoading(false)
  }

  useEffect(() => {
    // Fetch preview on mount
    const fetchPreview = async () => {
      await loadPreview()
    }

    if (isMounted)
      setCurrentLink({
        ...currentLink,
        url: currentUrl,
      })

    fetchPreview()
  }, [loadPreview, currentUrl])

  return {
    currentUrl,
    currentLink,
    setCurrentLink,
    saveLink,
    loading,
  }
}

export default useLinkComposer
