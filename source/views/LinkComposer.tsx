import React, { useState } from 'react'
import styled from 'styled-components'
import SelectCollection from '../components/collections/SelectCollection'
import AddLink from '../components/links/AddLink'
import Page from '../components/utils/Page'
import useCollections from '../hooks/useCollections'
import useLinkComposer from '../hooks/useLinkComposer'

const StyledHome = styled.div``

const LinkComposer = () => {
  const { currentLink, saveLink } = useLinkComposer()

  const { collections } = useCollections()

  const [selectingCollection, setSelectingCollection] = useState<boolean>(false)

  return (
    <Page>
      <StyledHome>
        {!selectingCollection && (
          <AddLink
            link={currentLink}
            onContinue={() => {
              setSelectingCollection(true)
            }}
          />
        )}

        {selectingCollection && (
          <SelectCollection
            link={currentLink}
            onSave={saveLink}
            onBack={() => setSelectingCollection(false)}
            collections={collections}
          />
        )}
      </StyledHome>
    </Page>
  )
}

export default LinkComposer
