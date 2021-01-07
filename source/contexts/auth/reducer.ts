import { DefaultState, defaultState } from './index'

/**
 * Fill the localStorage with auth parameters
 * @param {*} name
 * @param {*} email
 * @param {*} token
 */
const fillLocalStorage = (name: string, email: string, token: string) => {
  localStorage.setItem('curare_name', name)
  localStorage.setItem('curare_email', email)
  localStorage.setItem('curare_token', token)
}

/**
 * Clean the localStorage auth parameters
 */
const resetLocalStorage = () => {
  localStorage.removeItem('curare_name')
  localStorage.removeItem('curare_email')
  localStorage.removeItem('curare_token')
}

export interface AuthActionPayload {
  email?: string
  name?: string
  token?: string
  password?: string
  error?: boolean
}

export type AuthActionType = {
  type: 'START_AUTH' | 'SUCCESS_AUTH' | 'FAILED_AUTH' | 'RESET_AUTH'
  payload?: AuthActionPayload
}

const AuthReducer = (initialState: DefaultState, action: AuthActionType) => {
  switch (action.type) {
    case 'START_AUTH':
      return {
        ...initialState,
        loading: true,
        error: false,
      }
    case 'SUCCESS_AUTH':
      if (
        action.payload &&
        action.payload.name &&
        action.payload.email &&
        action.payload.token
      ) {
        fillLocalStorage(
          action.payload.name,
          action.payload.email,
          action.payload.token,
        )
      }

      return {
        ...initialState,
        ...action.payload,
        loading: false,
        isLoggedIn: true,
      }
    case 'FAILED_AUTH':
      resetLocalStorage()

      return {
        ...initialState,
        ...action.payload,
        loading: false,
      }
    case 'RESET_AUTH':
      resetLocalStorage()

      return {
        ...defaultState,
        isLoggedIn: false,
      }
    default:
      throw new Error(`Unhandled action type: ${action.type}`)
  }
}

export default AuthReducer
