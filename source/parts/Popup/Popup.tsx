import * as React from 'react'
import { Switch } from 'react-router-dom'
import styled from 'styled-components'
import PublicRoute from '../../components/utils/PrivateRoute'
import PrivateRoute from '../../components/utils/PublicRoute'
import { AuthProvider, useAuthState } from '../../contexts/auth'
import useQueryLogout from '../../hooks/useQueryLogout'
import Login from '../../views/Login'
import './styles.scss'

const StyledApp = styled.div`
  height: 300px;
  width: 300px;
`

// Router switch
const Routes = () => {
  const { isLoggedIn } = useAuthState()

  useQueryLogout()

  return (
    <Switch>
      {!isLoggedIn ? (
        <PublicRoute restricted={true} path="/" component={Login} />
      ) : (
        <PrivateRoute path="/" component={Login} />
      )}
    </Switch>
  )
}

const Popup: React.FC = () => {
  return (
    <StyledApp>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </StyledApp>
  )
}

export default Popup
