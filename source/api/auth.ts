import API from './index'

/**
 * Login method
 *
 * @param {email, password}
 */
export const login = async ({
  email,
  password,
}: {
  email: string
  password: string
}) => {
  const request = await API.post('/auth/login?withToken=true', {
    email,
    password,
  })

  return request.data
}

/**
 * Register method
 *
 * @param {email, password}
 */
export const register = async ({
  name,
  email,
  password,
}: {
  name: string
  email: string
  password: string
}) => {
  const request = await API.post('/auth/register', {
    name,
    email,
    password,
  })

  return request.data
}

/**
 * Logout method
 */
export const logout = async () => {
  const request = await API.post('/auth/logout')

  return request.data
}
