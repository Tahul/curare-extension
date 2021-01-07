import { useCallback, useEffect, useState } from 'react'
import {
  getProfile as getRemoteProfile,
  updateAvatar as updateRemoteAvatar,
  updateProfile as updateRemoteProfile,
} from '../api/profile'
import useActionsSounds from './useActionsSounds'
import useIsMounted from './useIsMounted'

export type Profile = {
  name: string
  first_name: string
  last_name: string
  description: string
  url: string
  avatar_url: string
}

export type ProfileAvatarUpdatePayload = {
  id: string
  image: File | null
}

const initialState = {
  first_name: '',
  last_name: '',
  description: '',
  url: '',
  avatar_url: '',
}

const useProfile = (id?: string) => {
  const { playSuccess, playError } = useActionsSounds()
  const isMounted = useIsMounted()
  const [loading, setLoading] = useState(false)
  const [profile, setProfile] = useState(initialState)

  /**
   * Get a remote profile for the hook context
   *
   * @param {*} id
   * @param {boolean} isMounted
   */
  const getProfile = useCallback(
    async ({ userId }: { userId?: string }) => {
      if (isMounted) setLoading(true)

      try {
        const remoteProfile = await getRemoteProfile({ userId })

        setProfile({ ...profile, ...remoteProfile })

        return remoteProfile
      } catch (e) {
        // Mitigate this case
      }

      if (isMounted) setLoading(false)

      return
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isMounted],
  )

  /**
   * Update the current user profile
   *
   * @param {first_name, last_name, description, url} profile
   */
  const updateProfile = async ({
    first_name,
    last_name,
    description,
    url,
  }: Partial<Profile>) => {
    setLoading(true)

    try {
      const updatedProfile = await updateRemoteProfile({
        first_name,
        last_name,
        description,
        url,
      })

      setProfile({ ...profile, ...updatedProfile })

      playSuccess()
    } catch (e) {
      playError()
    }

    setLoading(false)
  }

  /**
   * Update the user avatar, or remove it if passing null
   *
   * @param {File} avatar
   */
  const updateAvatar = async (avatar?: File) => {
    setLoading(true)

    try {
      const updatedProfile = await updateRemoteAvatar(
        avatar ? { avatar } : { avatar: null },
      )

      setProfile({ ...profile, ...updatedProfile })
    } catch (e) {
      // Mitigate this case
    }

    setLoading(false)
  }

  useEffect(() => {
    const fetchProfile = async () => {
      await getProfile({ userId: id })
    }

    fetchProfile()
  }, [id, getProfile])

  return {
    profile,
    setProfile,
    getProfile,
    updateProfile,
    updateAvatar,
    loading,
  }
}

export default useProfile
