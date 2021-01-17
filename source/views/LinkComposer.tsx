import React from 'react'
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

  const {
    linkSaved,
    currentLink,
    setCurrentLink,
    previewLoading,
    saveLoading,
    selectingCollection,
    setSelectingCollection,
  } = useLinkComposer()

  const { collections } = useCollections()

  return (
    <Page>
      <StyledHome>
        {!linkSaved && !previewLoading && !saveLoading && !selectingCollection && (
          <AddLink
            link={currentLink}
            onContinue={() => {
              playButton()
              setSelectingCollection(true)
            }}
            onUpdateLink={setCurrentLink}
          />
        )}

        {!linkSaved &&
          !previewLoading &&
          !saveLoading &&
          selectingCollection && (
            <SelectCollection
              link={currentLink}
              onUpdateLink={setCurrentLink}
              onBack={() => setSelectingCollection(false)}
              collections={collections}
            />
          )}

        {!linkSaved && previewLoading && !saveLoading && (
          <div>Preview loading</div>
        )}

        {!linkSaved && !previewLoading && saveLoading && (
          <div>Save loading</div>
        )}

        {linkSaved && <div>Link saved :)</div>}
      </StyledHome>
    </Page>
  )
}

export default LinkComposer
