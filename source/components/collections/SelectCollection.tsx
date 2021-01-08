import React from 'react'
import styled from 'styled-components'
import { Link } from '../../hooks/useLinks'

const StyledSelectCollection = styled.div``

export interface SelectCollectionProps {
  link: Partial<Link>
  onSave: () => Promise<void>
}

const SelectCollection: React.FC<SelectCollectionProps> = ({
  link,
  onSave,
}) => {
  console.log({ link, onSave })

  return <StyledSelectCollection>Hello</StyledSelectCollection>
}
export default SelectCollection
