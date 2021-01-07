import React, { Dispatch } from 'react'
import authReducer, { AuthActionType } from './reducer'

// Data from localStorage
const name = localStorage.getItem('curare_name')

const email = localStorage.getItem('curare_email')

const token = localStorage.getItem('curare_token')

// Default state
export interface DefaultState {
  name: string | null
  email: string | null
  token: string | null
  isLoggedIn: boolean
  loading: boolean
  error: boolean
}

export const defaultState: DefaultState = {
  name,
  email,
  token,
  isLoggedIn: !!(name && email),
  loading: false,
  error: false,
}

// Contexts
const AuthStateContext = React.createContext<DefaultState | undefined>(
  undefined,
)
AuthStateContext.displayName = 'AuthStateContext'
const AuthDispatchContext = React.createContext<
  Dispatch<AuthActionType> | undefined
>(undefined)
AuthDispatchContext.displayName = 'AuthDispatchContext'

// Provider
const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = React.useReducer(authReducer, defaultState)

  return (
    <AuthStateContext.Provider value={state}>
      <AuthDispatchContext.Provider value={dispatch}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  )
}

/**
 * useAuthState hooks
 */
const useAuthState = (): DefaultState => {
  const context = React.useContext(AuthStateContext)

  if (!context) throw new Error('Please us this within the AuthStateProvider')

  return context
}

/**
 * useAuthDispatch hook
 */
const useAuthDispatch = (): Dispatch<AuthActionType> => {
  const context = React.useContext(AuthDispatchContext)

  if (!context)
    throw new Error('Please us this within the AuthDispatchProvider')

  return context
}

/**
 * useAuth hook
 */
const useAuth = () => {
  return [useAuthState(), useAuthDispatch()]
}

export { AuthProvider, useAuthState, useAuthDispatch, useAuth }
