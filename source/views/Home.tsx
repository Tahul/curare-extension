import React from 'react'
import styled from 'styled-components'
import AddLink from '../components/links/AddLink'
import Page from '../components/utils/Page'
import useCurrentUrl from '../hooks/useCurrentUrl'
import useLinks from '../hooks/useLinks'

const StyledHome = styled.div``

const Home = () => {
  const { getLinkPreview, createLink } = useLinks()
  let { currentUrl } = useCurrentUrl()

  return (
    <Page>
      <StyledHome>
        <AddLink
          url={currentUrl}
          onLinkPreview={getLinkPreview}
          onLinkSave={createLink}
        />
      </StyledHome>
    </Page>
  )
}

export default Home
