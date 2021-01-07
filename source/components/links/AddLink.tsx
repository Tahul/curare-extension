import { Button } from '@heetch/flamingo-react'
import { AnimatePresence, motion } from 'framer-motion'
import React, { useCallback, useEffect, useState } from 'react'
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
  url?: string
  onLinkPreview: ({ url }: { url: string }) => Promise<Partial<Link>>
  onLinkSave: (payload: Partial<Link>) => Promise<Link | undefined>
}

const AddLink: React.FC<AddLinkProps> = ({
  url,
  onLinkPreview,
  onLinkSave,
}) => {
  const isMounted = useIsMounted()
  // @ts-ignore
  const [loading, setLoading] = useState<boolean>(false)
  const [preview, setPreview] = useState<Partial<Link>>()
  const [selectingCollection, setSelectingCollection] = useState<boolean>(false)

  const loadPreview = useCallback(async () => {
    if (isMounted) setLoading(true)

    try {
      if (url && isUrl(url)) {
        const preview = await onLinkPreview({ url })

        if (isMounted) setPreview(preview)
      } else {
        if (isMounted) setPreview(undefined)
      }
    } catch (e) {
      console.warn('Could not preview the following url:\n')
      console.warn(url)
    }

    if (isMounted) setLoading(false)
  }, [url])

  // @ts-ignore
  const handleSave = async () => {
    if (isMounted) setLoading(true)

    const previewData = { ...preview }

    try {
      if (isMounted) setPreview(undefined)

      await onLinkSave({ url, ogp: previewData })
    } catch (e) {
      setPreview(previewData)
    }

    if (isMounted) setLoading(false)
  }

  useEffect(() => {
    const fetchPreview = async () => {
      await loadPreview()
    }

    fetchPreview()
  }, [loadPreview, url])

  return (
    <StyledAddLink>
      <AnimatePresence>
        {preview && !selectingCollection && (
          <motion.div
            initial={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
          >
            <LinkItem editing link={{ ogp: preview }} />

            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
            >
              <Button
                onClick={() => setSelectingCollection(true)}
                style={{ width: '100%' }}
              >
                Select a collection
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {preview && selectingCollection && (
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 100, opacity: 0 }}
          >
            <Button
              onClick={() => setSelectingCollection(false)}
              style={{ width: '100%' }}
            >
              Back to link
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </StyledAddLink>
  )
}

export default AddLink
