import { useCallback, useEffect, useState } from 'react'
import { click, destroy, index, preview, store, update } from '../api/links'
import useActionsSounds from './useActionsSounds'
import { Collection } from './useCollections'
import useIsMounted from './useIsMounted'
import { Profile } from './useProfile'

export type Link = {
  id: string
  user_id: string
  collection_id: string
  url: string
  description: string
  ogp: any
  clicks: number
  collection?: Partial<Collection>
  profile?: Partial<Profile>
}

type UseLinksHookProps = {
  userId?: string
  collectionId?: string
}

const useLinks = ({ userId, collectionId }: UseLinksHookProps = {}) => {
  const { playSuccess, playError } = useActionsSounds()
  const isMounted = useIsMounted()
  const [loading, setLoading] = useState(false)
  const [links, setLinks] = useState<Link[]>([])

  /**
   * Get all the links for the current userId.
   *
   * @param {boolean} isMounted
   */
  const getLinks = useCallback(async () => {
    if (isMounted) setLoading(true)

    let links: Link[] | undefined

    try {
      if (collectionId) {
        links = await index({ collectionId })
      } else if (userId) {
        links = await index({ userId })
      }

      if (links) setLinks([...links])
    } catch (e) {
      console.log(e)
    }

    if (isMounted) setLoading(false)

    return links
  }, [collectionId, userId, isMounted])

  /**
   * Create a link.
   *
   * @param {string, string} link
   */
  const createLink = async ({ url, ogp, collection_id }: Partial<Link>) => {
    setLoading(true)

    let link

    try {
      if (url) link = await store({ url, ogp, collection_id })
      else throw new Error()

      if (link) setLinks([...links, link])
      else throw new Error()

      playSuccess()
    } catch (e) {
      playError()
    }

    setLoading(false)

    return link
  }

  /**
   * Update a link.
   *
   * @param {string, string} string
   */
  const updateLink = async ({ id, url }: Partial<Link>) => {
    if (!url || !id) return

    setLoading(true)

    let updatedLink: Link | undefined

    try {
      updatedLink = await update({ id, url })

      setLinks(
        links.map((link) => {
          if (updatedLink && link.id === updatedLink.id) {
            return updatedLink
          }

          return link
        }),
      )

      playSuccess()
    } catch (e) {
      playError()
    }

    setLoading(false)

    return updatedLink
  }

  /**
   * Delete a link.
   *
   * @param {id} link
   */
  const deleteLink = async ({ id }: Partial<Link>) => {
    try {
      await destroy({ id })

      setLinks(
        links.filter((link) => {
          return link.id !== id
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
   * Get a link OpenGraph preview.
   *
   * @param {string} url
   */
  const getLinkPreview = async ({ url }: Partial<Link>) => {
    try {
      const linkPreview = await preview({ url })

      return linkPreview
    } catch (e) {
      console.log(e)
    }

    return false
  }

  /**
   * Increment the click count of a link.
   *
   * @param {string} id
   */
  const clickLink = async ({ id }: Partial<Link>) => {
    if (!id) return

    try {
      const updatedLink = await click({ id })

      setLinks(
        links.map((link) => {
          if (link.id === updatedLink.id) {
            return updatedLink
          }

          return link
        }),
      )
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    if (userId) {
      const fetchLinks = async () => {
        await getLinks()
      }

      fetchLinks()
    }
  }, [getLinks, userId])

  return {
    links,
    setLinks,
    getLinks,
    createLink,
    updateLink,
    deleteLink,
    clickLink,
    getLinkPreview,
    loading,
  }
}

export default useLinks
