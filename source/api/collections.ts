import { Collection } from '../hooks/useCollections'
import API from './index'

/**
 * Get all the collections for a user.
 *
 * @param {*} userId
 */
export const index = async (): Promise<Collection[]> => {
  const request = await API.get(`/collections`)

  return request.data
}
