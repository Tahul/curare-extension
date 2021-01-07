import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { useAuthState } from '../../contexts/auth'

const PublicRoute = ({
  component: Component,
  restricted,
  path,
  ...rest
}: {
  component: any
  restricted: boolean
  path: string
  rest?: any
}) => {
  const { isLoggedIn } = useAuthState()

  return (
    <Route
      path={path}
      {...rest}
      render={(props) =>
        isLoggedIn && restricted ? (
          <Redirect to={`/`} />
        ) : (
          <Component {...props} />
        )
      }
    />
  )
}

export default PublicRoute
