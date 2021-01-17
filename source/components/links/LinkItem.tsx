import { Icon, theme, UiText } from '@heetch/flamingo-react'
import { motion } from 'framer-motion'
import React, { ChangeEvent, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { Link } from '../../hooks/useLinks'

const StyledLinkItem = styled.div`
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  background-color: ${theme.color.text.white};
  border-radius: ${theme.borderRadius.m};
  overflow: hidden;

  .image {
    flex: 0 1 150px;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: 50% 50%;
    }
  }

  .content {
    flex: 1 1 auto;
    display: flex;
    flex-direction: column;
    padding: ${theme.space.l};
    overflow: hidden;

    .title {
      flex: 0 1 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;

      svg {
        fill: ${theme.color.element.tertiary};
      }

      input {
        flex: 1 1 auto;
        overflow: hidden;
        padding-right: ${theme.space.m};
        border: none;
        outline: none;
        font-family: inherit;
        font-weight: ${theme.fontWeight.bold};
        font-size: ${theme.fontSize.m};
      }
    }

    .line {
      margin-top: ${theme.space.l};
      width: 100%;
    }

    textarea {
      margin-top: ${theme.space.l};
      flex: 1 1 auto;
      width: 100%;
      height: 100%;
      max-height: 100%;
      outline: none;
      border: none;
      font-family: inherit;
      overflow-y: hidden;
      resize: none;
      line-height: ${theme.lineHeight.m};
      font-size: ${theme.fontSize.m};
      color: ${theme.color.text.secondary};
    }
  }
`

export interface LinkItemProps {
  link: Partial<Link>
  onUpdate: (link: Partial<Link>) => void
}

const LinkItem: React.FC<LinkItemProps> = ({ link, onUpdate }) => {
  const descriptionRef = useRef<HTMLTextAreaElement>(null)
  const { ogp } = link

  const handleChange = (
    type: string,
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    const newLink = {
      ...link,
      ogp: {
        ...ogp,
      },
    }

    if (type === 'title') newLink.ogp.title = event.target.value
    if (type === 'description') newLink.ogp.description = event.target.value

    onUpdate(newLink)
  }

  useEffect(() => {
    if (
      !descriptionRef ||
      !descriptionRef.current ||
      !descriptionRef.current.value
    )
      return

    descriptionRef.current.value = link?.ogp?.description || ''
  }, [link])

  return (
    <motion.li
      style={{ height: '100%' }}
      initial={{ opacity: 0, y: 50 }}
      animate={{
        opacity: 1,
        y: 0,
      }}
    >
      <StyledLinkItem>
        {ogp?.og?.['og:image'] ? (
          <div
            className="image"
            title={`${ogp.title}`}
            style={{
              backgroundImage: `url(${ogp.og['og:image']})`,
              backgroundSize: 'cover',
              backgroundPosition: '50% 50%',
              imageRendering: 'crisp-edges',
            }}
          />
        ) : null}

        <div className="content">
          <UiText
            className="title"
            variant="contentBold"
            alt={link?.url}
            title={link?.url}
          >
            <input
              type="text"
              defaultValue={ogp.title || ogp.domain}
              onChange={(event) => handleChange('title', event)}
            />

            <Icon icon="IconGlobe" />
          </UiText>

          <textarea
            ref={descriptionRef}
            defaultValue={ogp.description}
            onChange={(event) => handleChange('description', event)}
          />
        </div>
      </StyledLinkItem>
    </motion.li>
  )
}

export default LinkItem
