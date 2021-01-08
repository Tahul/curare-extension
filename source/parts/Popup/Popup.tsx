import { theme } from '@heetch/flamingo-react'
import * as React from 'react'
import { Switch } from 'react-router-dom'
import styled from 'styled-components'
import PrivateRoute from '../../components/utils/PrivateRoute'
import PublicRoute from '../../components/utils/PublicRoute'
import { useAuthState } from '../../contexts/auth'
import useQueryLogout from '../../hooks/useQueryLogout'
import Home from '../../views/Home'
import Login from '../../views/Login'
import './styles.scss'

const StyledApp = styled.div`
  height: 420px;
  width: 420px;
  padding: ${theme.space.l};
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
        <PrivateRoute path="/" component={Home} />
      )}
    </Switch>
  )
}

const Popup: React.FC = () => {
  return (
    <StyledApp>
      <Routes />
    </StyledApp>
  )
}

export default Popup
