import { Dispatch } from 'react'
import { login, logout, register } from '../../api/auth'
import { AuthActionPayload, AuthActionType } from './reducer'

/**
 * Login action.
 *
 * @param {*} dispatch
 * @param { email, password } payload
 */
export const loginAction = async (
  dispatch: Dispatch<AuthActionType>,
  { email, password }: Partial<AuthActionPayload>,
) => {
  dispatch({
    type: 'START_AUTH',
  })

  try {
    if (!email || !password) throw new Error('Missing parameters')

    const payload = await login({ email, password })

    dispatch({
      type: 'SUCCESS_AUTH',
      payload,
    })
  } catch (error) {
    dispatch({
      type: 'FAILED_AUTH',
      payload: {
        error: true,
      },
    })
  }
}

/**
 * Register action.
 *
 * @param {*} dispatch
 * @param { name, email, password } payload
 */
export const registerAction = async (
  dispatch: Dispatch<AuthActionType>,
  { name, email, password }: Partial<AuthActionPayload>,
) => {
  dispatch({
    type: 'START_AUTH',
  })

  try {
    if (!email || !password || !name) throw new Error('Missing parameters')

    const payload = await register({ name, email, password })

    dispatch({
      type: 'SUCCESS_AUTH',
      payload,
    })
  } catch (error) {
    dispatch({
      type: 'FAILED_AUTH',
      payload: {
        error: true,
      },
    })
  }
}

/**
 * Logout action.
 *
 * @param {*} dispatch
 */
export const logoutAction = async (dispatch: Dispatch<AuthActionType>) => {
  dispatch({
    type: 'START_AUTH',
  })

  try {
    await logout()
  } catch (error) {
    dispatch({
      type: 'FAILED_AUTH',
      payload: {
        error: true,
      },
    })
  } finally {
    dispatch({
      type: 'RESET_AUTH',
    })
  }
}

/**
 * Force logout action, without API call.
 *
 * @param {*} dispatch
 */
export const forceLogout = async (dispatch: Dispatch<AuthActionType>) => {
  dispatch({
    type: 'RESET_AUTH',
  })
}
