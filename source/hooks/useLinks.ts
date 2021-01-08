import { useState } from 'react'
import { preview, store } from '../api/links'
import useActionsSounds from './useActionsSounds'
import { Collection } from './useCollections'
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

const useLinks = () => {
  const { playSuccess, playError } = useActionsSounds()
  const [loading, setLoading] = useState(false)

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

      playSuccess()
    } catch (e) {
      playError()
    }

    setLoading(false)

    return link
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

  return {
    createLink,
    getLinkPreview,
    loading,
  }
}

export default useLinks
