import { motion } from 'framer-motion'
import React from 'react'

const Page = ({
  children,
  animated = true,
}: {
  children: React.ReactNode
  animated?: boolean
}) => {
  return (
    <motion.div
      style={{ height: '100%' }}
      initial={animated ? { opacity: 0.25, y: 50 } : {}}
      animate={animated ? { opacity: 1, y: 0 } : {}}
      exit={animated ? { opacity: 0, y: 50 } : {}}
    >
      {children}
    </motion.div>
  )
}

export default Page
