import { Link } from '../hooks/useLinks'
import API from './index'

/**
 * Create a link.
 *
 * @param {url} link
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
 * Preview a link OpenGraph data.
 *
 * @param {string} url
 */
export const preview = async ({ url }: Partial<Link>): Promise<any> => {
  const request = await API.get(`/links/preview?url=${url}`)

  return request.data
}
