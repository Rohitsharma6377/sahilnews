'use client'
import { motion } from 'framer-motion'
import { PropsWithChildren } from 'react'

type Props = PropsWithChildren<{
  delay?: number
  y?: number
  className?: string
}>

export function AnimatedIn({ children, delay = 0, y = 16, className }: Props) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: 'easeOut', delay }}
    >
      {children}
    </motion.div>
  )
}
