import { Input } from '@heetch/flamingo-react'
import React, { Ref } from 'react'
import styled from 'styled-components'
import useIsMounted from '../../hooks/useIsMounted'
import { Link } from '../../hooks/useLinks'
import LinkItem from './LinkItem'

// Parse URLs
const regex = /^(?:((?:(?:https?|ftp):\/\/))|(?:www.))+(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u00a1-\uffff][a-z0-9\u00a1-\uffff_-]{0,62})?[a-z0-9\u00a1-\uffff]\.)+(?:[a-z\u00a1-\uffff]{2,}\.?))(?::\d{2,5})?(?:[/?#]\S*)?$/

// Test URLs
const isUrl = (url: string) => regex.test(url)

const StyledAddLink = styled.div``

export interface AddLinkProps {
  defaultUrl: string
  onLinkPreview: ({ url }: { url: string }) => Promise<any>
  onLinkSave: (payload: Partial<Link>) => Promise<Link>
}

const AddLink: React.FC<AddLinkProps> = ({ onLinkPreview, onLinkSave }) => {
  const isMounted = useIsMounted()
  const inputRef: Ref<HTMLInputElement | undefined> = React.useRef()
  const [loading, setLoading] = React.useState<boolean>(false)
  const [preview, setPreview] = React.useState<any>(false)

  const handleLinkChange = async (url: React.FormEvent<HTMLInputElement>) => {
    if (isMounted) setLoading(true)

    let urlValue: string

    try {
      urlValue = url?.currentTarget?.value

      if (url && isUrl(urlValue)) {
        const preview = await onLinkPreview({ url: urlValue })

        if (isMounted) setPreview(preview)
      } else {
        if (isMounted) setPreview(false)
      }
    } catch (e) {
      console.warn('Could not preview the following url:\n')
      console.warn(url)
    }

    if (isMounted) setLoading(false)
  }

  const handleSave = async () => {
    if (!inputRef || !inputRef.current) return

    if (isMounted) setLoading(true)

    const previewData = { ...preview }

    try {
      const url = inputRef.current.value

      if (isMounted) setPreview(false)

      await onLinkSave({ url, ogp: previewData })

      inputRef.current.value = ''
    } catch (e) {
      setPreview(previewData)
    }

    if (isMounted) setLoading(false)
  }

  return (
    <StyledAddLink>
      <Input
        ref={inputRef}
        id="url"
        placeholder="Paste a new link"
        onChange={handleLinkChange}
      />

      {preview ? (
        <LinkItem
          editable
          editing
          onSave={handleSave}
          link={{ ogp: preview }}
          loading={loading}
        />
      ) : null}
    </StyledAddLink>
  )
}

export default AddLink
