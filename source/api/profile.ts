import { Profile } from '../hooks/useProfile'
import API from './index'

/**
 * Get a user profile (the current logged-in user if no `id`).
 *
 * @param {userId} userId
 */
export const getProfile = async ({
  userId,
}: {
  userId?: string
}): Promise<Profile> => {
  const request = await API.get(`/profiles${userId ? `/${userId}` : ``}`)

  return request.data as Profile
}

/**
 * Update a user profile data.
 *
 * @param {first_name, last_name, description, url} profile
 */
export const updateProfile = async ({
  first_name,
  last_name,
  description,
  url,
}: Partial<Profile>): Promise<Profile> => {
  const request = await API.patch(`/profiles`, {
    first_name,
    last_name,
    description,
    url,
  })

  return request.data as Profile
}

/**
 * Update a user profile avatar.
 *
 * @param {File | null} avatar
 */
export const updateAvatar = async ({
  avatar,
}: {
  avatar: File | null
}): Promise<Profile> => {
  if (avatar) {
    // Avatar isn't null, try to update the avatar accordingly
    if (!(avatar instanceof File)) {
      throw new Error('The avatar must be valid image!')
    }

    const formData = new FormData()

    formData.append('avatar', avatar)

    const request = await API.post(`/profiles/avatar`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })

    return request.data as Profile
  } else {
    // Avatar is null; remove the current avatar
    const request = await API.delete(`/profiles/avatar`)

    return request.data as Profile
  }
}
