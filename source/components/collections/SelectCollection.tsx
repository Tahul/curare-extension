import { theme } from '@heetch/flamingo-react'
import { motion } from 'framer-motion'
import React from 'react'
import styled from 'styled-components'
import { Collection } from '../../hooks/useCollections'
import { Link } from '../../hooks/useLinks'
import BackButton from '../utils/BackButton'
import CollectionItem from './CollectionItem'

const StyledSelectCollection = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;

  .backButton {
    flex: 0 1 auto;
    padding: ${theme.space.l};
    border-bottom: 1px solid ${theme.color.element.tertiary};
  }

  ul {
    flex: 1 1 auto;
    min-height: 0;
    overflow-y: scroll;
    overflow-x: hidden;

    li {
      margin: 0 ${theme.space.l};
    }
  }
`

export interface SelectCollectionProps {
  link: Partial<Link>
  collections: Collection[]
  onUpdateLink: (link: Partial<Link>) => void
  onBack: () => void
}

const SelectCollection: React.FC<SelectCollectionProps> = ({
  collections,
  link,
  onUpdateLink,
  onBack,
}) => {
  const handleSelectCollection = (collection: Partial<Collection>) => {
    onUpdateLink({
      ...link,
      collection_id: collection.id,
    })
  }

  return (
    <StyledSelectCollection>
      <motion.div
        initial={{ y: 25, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <BackButton onBack={onBack}>Show me the link again</BackButton>
      </motion.div>

      <ul>
        {collections.map((collection, i) => (
          <CollectionItem
            collection={collection}
            key={collection.id}
            i={i}
            onSelectCollection={handleSelectCollection}
          />
        ))}
      </ul>
    </StyledSelectCollection>
  )
}
export default SelectCollection
