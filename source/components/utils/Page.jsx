import { motion } from 'framer-motion'
import React from 'react'

const Page = ({ children, animated = true }) => {
  return (
    <motion.div
      initial={animated ? { opacity: 0.25, y: 50 } : false}
      animate={animated ? { opacity: 1, y: 0 } : false}
      exit={animated ? { opacity: 0, y: 50 } : false}
    >
      {children}
    </motion.div>
  )
}

export default Page
