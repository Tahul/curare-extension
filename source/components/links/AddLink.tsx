import { Button, theme } from '@heetch/flamingo-react'
import { motion } from 'framer-motion'
import React from 'react'
import styled from 'styled-components'
import { Link } from '../../hooks/useLinks'
import LinkItem from './LinkItem'

const StyledAddLink = styled.div`
  padding: ${theme.space.l};
`

export interface AddLinkProps {
  link: Partial<Link>
  onContinue: () => void
}

const AddLink: React.FC<AddLinkProps> = ({ link, onContinue }) => {
  return (
    <StyledAddLink>
      {link && link.ogp && link.ogp.title && (
        <>
          <LinkItem link={link} />

          <motion.div
            initial={{ y: 25, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <Button onClick={onContinue} style={{ width: '100%' }}>
              Select a collection
            </Button>
          </motion.div>
        </>
      )}
    </StyledAddLink>
  )
}

export default AddLink
