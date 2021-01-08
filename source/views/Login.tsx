import { theme } from '@heetch/flamingo-react'
import React from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import LoginForm from '../components/auth/LoginForm'
import Page from '../components/utils/Page'
import { useAuthState } from '../contexts/auth'

const StyledLogin = styled.div`
  padding: ${theme.space.l};
`

const Login = () => {
  const { isLoggedIn } = useAuthState()
  const history = useHistory()

  if (isLoggedIn) {
    history.push('/')
  }

  return (
    <Page>
      <StyledLogin>
        <LoginForm />
      </StyledLogin>
    </Page>
  )
}

export default Login
