import React, { useState } from 'react'
import styled from 'styled-components'
import SelectCollection from '../components/collections/SelectCollection'
import AddLink from '../components/links/AddLink'
import Page from '../components/utils/Page'
import useActionsSounds from '../hooks/useActionsSounds'
import useCollections from '../hooks/useCollections'
import useLinkComposer from '../hooks/useLinkComposer'

const StyledHome = styled.div`
  width: 100%;
  height: 100%;
`

const LinkComposer = () => {
  const { playButton } = useActionsSounds()

  const { currentLink, setCurrentLink, saveLink } = useLinkComposer()

  const { collections } = useCollections()

  const [selectingCollection, setSelectingCollection] = useState<boolean>(false)

  return (
    <Page>
      <StyledHome>
        {!selectingCollection && (
          <AddLink
            link={currentLink}
            onContinue={() => {
              playButton()
              setSelectingCollection(true)
            }}
            onUpdateLink={setCurrentLink}
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
