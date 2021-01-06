import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { useAuthState } from '../../contexts/auth'

const PrivateRoute = ({
  component: Component,
  path,
  ...rest
}: {
  component: any
  path: string
  rest?: any
}) => {
  const { isLoggedIn } = useAuthState()

  return (
    <Route
      path={path}
      {...rest}
      render={(props) =>
        isLoggedIn ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  )
}

export default PrivateRoute
