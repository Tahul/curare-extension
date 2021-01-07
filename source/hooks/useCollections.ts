import { useCallback, useEffect, useState } from 'react'
import {
  destroy,
  index,
  show,
  store,
  update,
  updateImage as updateRemoteImage,
} from '../api/collections'
import useActionsSounds from './useActionsSounds'
import useIsMounted from './useIsMounted'

export type Collection = {
  id: string
  title: string
  slug: string
  user_id: string
  image_url: string
  link_count: number
}

export type CollectionImageUpdatePayload = {
  id: string
  image: File | null
}

const useCollections = (userId?: string) => {
  const { playSuccess, playError } = useActionsSounds()
  const isMounted = useIsMounted()
  const [loading, setLoading] = useState(false)
  const [collections, setCollections] = useState<Collection[]>([])

  /**
   * Get all the collections for the current userId.
   */
  const getCollections = useCallback(
    async ({ userId = null }) => {
      if (isMounted) setLoading(true)

      let collections

      try {
        collections = await index({ userId })

        setCollections([...collections])
      } catch (e) {
        console.log(e)
      }

      if (isMounted) setLoading(false)

      return collections
    },
    [isMounted],
  )

  /**
   * Create a collection.
   *
   * @param {string} collection
   */
  const createCollection = async ({ title }: Partial<Collection>) => {
    setLoading(true)

    let collection

    try {
      collection = await store({ title })

      setCollections([...collections, collection])

      playSuccess()
    } catch (e) {
      playError()
    }

    setLoading(false)

    return collection
  }

  /**
   * Update a collection.
   *
   * @param {string, string} collection
   */
  const updateCollection = async ({ id, title }: Partial<Collection>) => {
    if (!id || !title) return

    setLoading(true)

    let updatedCollection: Collection | undefined

    try {
      updatedCollection = await update({ id, title })

      setCollections(
        collections.map((collection) => {
          if (updatedCollection && collection.id === updatedCollection.id) {
            return updatedCollection
          }

          return collection
        }),
      )

      playSuccess()
    } catch (e) {
      playError()
    }

    setLoading(false)

    return updatedCollection
  }

  /**
   * Delete a collection.
   *
   * @param {id} collection
   */
  const deleteCollection = async ({ id }: Partial<Collection>) => {
    try {
      await destroy({ id })

      setCollections(
        collections.filter((collection) => {
          return collection.id !== id
        }),
      )

      playSuccess()

      return { id }
    } catch (e) {
      playError()
    }

    return false
  }

  /**
   * Update the collection image, or remove it if passing null
   *
   * @param {File | null} image
   */
  const updateCollectionImage = async ({
    id,
    image = null,
  }: CollectionImageUpdatePayload) => {
    setLoading(true)

    let updatedCollection

    try {
      updatedCollection = await updateRemoteImage({ id, image })

      setCollections([
        ...collections.filter((collection) => collection.id !== id),
        updatedCollection,
      ])
    } catch (e) {
      // Mitigate this case
    }

    setLoading(false)

    return updatedCollection
  }

  /**
   * Get a single entity and refresh it from the local list.
   *
   * @param {string} id
   */
  const refreshCollection = async ({ id }: Partial<Collection>) => {
    setLoading(true)

    let updatedCollection

    try {
      updatedCollection = await show({ id })

      setCollections([
        ...collections.filter((collection) => collection.id !== id),
        updatedCollection,
      ])
    } catch (e) {
      // Mitigate this case
    }

    setLoading(false)

    return updatedCollection
  }

  useEffect(() => {
    const fetchCollections = async () => {
      if (userId) {
        await getCollections({ userId })
      }
    }

    fetchCollections()
  }, [getCollections, userId])

  return {
    collections,
    setCollections,
    getCollections,
    createCollection,
    updateCollection,
    deleteCollection,
    updateCollectionImage,
    refreshCollection,
    loading,
  }
}

export default useCollections
