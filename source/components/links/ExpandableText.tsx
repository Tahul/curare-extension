import { Text } from '@heetch/flamingo-react'
import { motion } from 'framer-motion'
import React from 'react'
import styled from 'styled-components'
import renderHtml from '../../plugins/renderHtml'

const StyledExpandableText = styled.div``

export interface ExpandableTextProps
  extends React.HTMLAttributes<HTMLDivElement> {
  full: boolean
  text: string
}

const ExpandableText: React.FC<ExpandableTextProps> = ({
  full,
  text = '',
  ...props
}) => {
  const displayText = full ? text : text.slice(0, 35)

  return (
    <StyledExpandableText {...props}>
      <motion.div
        initial={{ height: '1rem' }}
        animate={full ? { height: 'auto' } : { height: '1rem' }}
      >
        <Text>
          {renderHtml(
            'span',
            `${displayText}${!full && text.length > 35 ? '...' : ''}`,
          )}
        </Text>
      </motion.div>
    </StyledExpandableText>
  )
}

export default ExpandableText
