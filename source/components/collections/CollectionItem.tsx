import { Item, Text, theme, UiText } from '@heetch/flamingo-react'
import { motion } from 'framer-motion'
import React from 'react'
import styled from 'styled-components'
import { Collection } from '../../hooks/useCollections'

const StyledCollectionItem = styled.div`
  position: relative;
  margin-top: ${theme.space.l};

  .itemContent {
    display: flex;
    justify-content: center;
    align-items: center;

    .image {
      height: 3rem;
      width: 3rem;
      background-image: url('../../assets/images/fill.svg');
      background-size: 100% 100%;
      margin-right: ${theme.space.l};

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 50%;
      }
    }
  }

  .actions {
    position: absolute;
    margin-top: calc(0rem - ${theme.space.xl});
    right: ${theme.space.l};
    display: flex;

    button {
      margin-left: ${theme.space.l};
    }

    @media (max-width: 320px) {
      button {
        word-wrap: nowrap;
        word-break: keep-all;
      }
    }
  }
`
const item = {
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.02,
    },
  }),
  hidden: { opacity: 0.25, y: 100 },
}

export interface CollectionItemProps
  extends React.HTMLAttributes<HTMLDivElement> {
  collection: Collection
  i: number
  onSelectCollection: ({ collection, i }: Partial<CollectionItemProps>) => void
}

const CollectionItem: React.FC<CollectionItemProps> = ({
  collection,
  i,
  onSelectCollection,
}) => {
  const handleClick = () => {
    if (onSelectCollection) onSelectCollection({ collection, i })
  }

  return (
    <motion.li
      custom={i}
      initial="hidden"
      animate="visible"
      variants={item}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 1 }}
      onClick={handleClick}
    >
      <StyledCollectionItem>
        <Item onClick={handleClick}>
          <div className="itemContent">
            <div className="image">
              {collection.image_url && (
                <img
                  src={collection.image_url}
                  alt={collection.title}
                  title={collection.title}
                />
              )}
            </div>

            <div className="textContent">
              <UiText variant="contentBold">{collection.title}</UiText>
              <Text type="subContent">
                {collection.links_count > 0
                  ? `${collection.links_count} links`
                  : 'No links'}
              </Text>
            </div>
          </div>
        </Item>
      </StyledCollectionItem>
    </motion.li>
  )
}

export default CollectionItem
