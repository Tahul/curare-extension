import { Link } from '../hooks/useLinks'
import API from './index'

/**
 * Get all the links for a user and/or a collection.
 *
 * @param {string, string} userId
 */
export const index = async ({
  userId,
  collectionId,
}: {
  userId?: string
  collectionId?: string
}): Promise<Link[]> => {
  const request = await API.get(
    `/links${collectionId ? `?collectionId=${collectionId}` : ``}${
      userId ? `?userId=${userId}` : ``
    }`,
  )

  return request.data as Link[]
}

/**
 * Create a collection.
 *
 * @param {title} collection
 */
export const store = async ({
  url,
  ogp,
  collection_id,
}: Partial<Link>): Promise<Link> => {
  const request = await API.post(`/links`, {
    url,
    ogp,
    collection_id,
  })

  return request.data
}

/**
 * Update a collection.
 *
 * @param {string, string} collection
 */
export const update = async ({
  id,
  url,
  ogp,
}: Partial<Link>): Promise<Link> => {
  const request = await API.patch(`/links/${id}`, { url, ogp })

  return request.data as Link
}

/**
 * Destroy a collection.
 *
 * @param {string} id
 */
export const destroy = async ({ id }: Partial<Link>): Promise<Link> => {
  const request = await API.delete(`/links/${id}`)

  return request.data as Link
}

/**
 * Preview a link OpenGraph data.
 *
 * @param {string} url
 */
export const preview = async ({ url }: Partial<Link>): Promise<any> => {
  const request = await API.get(`/links/preview?url=${url}`)

  return request.data
}

/**
 * Increment the click count of a link.
 *
 * @param {string} id
 */
export const click = async ({ id }: Partial<Link>): Promise<Link> => {
  const request = await API.post(`/links/${id}/click`)

  return request.data
}
