import axios from 'axios'
import { history } from '../parts/Popup'

export type UserRequest = {
  userId?: string | null
}

const API = axios.create({
  baseURL:
    process.env.NODE_ENV === 'development' ? '/api' : process.env.API_URL,
  withCredentials: true,
})

API.interceptors.response.use(
  // Success
  (response) => {
    if (response && response.data) {
      const { data } = response

      if (data.message) {
        delete data['message']
      }
    }

    return response
  },
  // Error
  (error) => {
    if (error && error.response && error.response.data) {
      const { data, status, config } = error.response

      // If status is 401, it means we are unauthenticated, so logout the app
      if (status === 401 && !config.url.includes('login')) {
        history.push('/?logout=true')
      }

      // Redirect if key is specified
      if (data.redirect) {
        history.push(data.redirect)
      }
    }
  },
)

export default API
