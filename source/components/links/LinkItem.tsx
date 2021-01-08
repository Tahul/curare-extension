import { Icon, IconButton, theme, UiText } from '@heetch/flamingo-react'
import { motion } from 'framer-motion'
import React from 'react'
import styled from 'styled-components'
import useActionsSounds from '../../hooks/useActionsSounds'
import { Link } from '../../hooks/useLinks'
import renderHtml from '../../plugins/renderHtml'
import ExpandableText from './ExpandableText'

const StyledLinkItem = styled.div`
  width: 100%;
  background-color: ${theme.color.text.white};
  border-radius: ${theme.borderRadius.m};
  overflow: hidden;

  .image {
    height: 150px;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: 50% 50%;
    }
  }

  .content {
    padding: ${theme.space.l};
    overflow: hidden;

    .title {
      display: flex;
      justify-content: space-between;
      align-items: center;

      svg {
        fill: ${theme.color.element.tertiary};
      }

      span {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        padding-right: ${theme.space.m};
      }
    }

    .line {
      margin-top: ${theme.space.l};
      width: 100%;
    }
  }

  .footer {
    padding: 0 ${theme.space.l};
    display: flex;
    align-items: center;
    justify-content: flex-end;

    .actions {
      display: flex;
      justify-content: flex-end;

      .expand {
        transform: rotate(90deg);
      }

      button {
        margin-left: ${theme.space.l};
      }
    }
  }
`

export interface LinkItemProps {
  link: Partial<Link>
  onOpen?: (link: Partial<Link>) => {}
}

const LinkItem: React.FC<LinkItemProps> = ({ link, onOpen }) => {
  const { playButton, playBack } = useActionsSounds()
  const { ogp } = link

  const [full, setFull] = React.useState(false)

  const toggleFull = () => {
    if (!full) {
      playButton()
    } else {
      playBack()
    }

    setFull(!full)
  }

  const handleOpen = async () => {
    chrome.tabs.create({
      url: link.url,
    })

    if (onOpen) onOpen(link)
  }

  return (
    <motion.li
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
            {renderHtml('span', ogp.title || ogp.domain)}

            <Icon icon="IconGlobe" />
          </UiText>

          {ogp.description ? (
            <ExpandableText
              full={full}
              className="line"
              text={ogp.description}
            />
          ) : null}
        </div>

        <div className="footer">
          <div className="actions">
            {ogp.description ? (
              ogp?.description.length > 35 && !full ? (
                <IconButton
                  className="expand"
                  onClick={toggleFull}
                  icon="IconOption"
                />
              ) : (
                <IconButton
                  className="expand"
                  onClick={toggleFull}
                  icon="IconCross"
                />
              )
            ) : (
              <IconButton
                className="expand"
                onClick={handleOpen}
                icon="IconArrowUp"
              />
            )}
          </div>
        </div>
      </StyledLinkItem>
    </motion.li>
  )
}

export default LinkItem
