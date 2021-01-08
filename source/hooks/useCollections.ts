import { useCallback, useEffect, useState } from 'react'
import { index } from '../api/collections'
import useIsMounted from './useIsMounted'

export type Collection = {
  id: string
  title: string
  slug: string
  user_id: string
  image_url: string
  links_count: number
}

const useCollections = () => {
  const isMounted = useIsMounted()
  const [loading, setLoading] = useState(false)
  const [collections, setCollections] = useState<Collection[]>([])

  /**
   * Get all the collections for the current userId.
   */
  const getCollections = useCallback(async () => {
    if (isMounted) setLoading(true)

    let collections

    try {
      collections = await index()

      setCollections([...collections])
    } catch (e) {
      console.log(e)
    }

    if (isMounted) setLoading(false)

    return collections
  }, [isMounted])

  useEffect(() => {
    const fetchCollections = async () => {
      await getCollections()
    }

    fetchCollections()
  }, [getCollections])

  return {
    collections,
    setCollections,
    getCollections,
    loading,
  }
}

export default useCollections
