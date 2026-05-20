'use client'

import { motion } from 'framer-motion'

interface ScanAnimationProps {
  active: boolean
}

export function ScanAnimation({ active }: ScanAnimationProps) {
  if (!active) return null

  return (
    <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none z-10">
      {/* Dark overlay with scan transparency */}
      <div className="absolute inset-0 bg-dark-950/30" />

      {/* Scan line */}
      <motion.div
        className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
        style={{ boxShadow: '0 0 20px rgba(6,182,212,0.8), 0 0 40px rgba(6,182,212,0.4)' }}
        animate={{ top: ['0%', '100%'] }}
        transition={{
          duration: 1.8,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      {/* Scan glow below line */}
      <motion.div
        className="absolute left-0 right-0 h-24 bg-gradient-to-b from-cyan-400/10 to-transparent"
        animate={{ top: ['0%', '100%'] }}
        transition={{
          duration: 1.8,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      {/* Corner brackets */}
      {[
        { top: '8px', left: '8px', borderTop: true, borderLeft: true },
        { top: '8px', right: '8px', borderTop: true, borderRight: true },
        { bottom: '8px', left: '8px', borderBottom: true, borderLeft: true },
        { bottom: '8px', right: '8px', borderBottom: true, borderRight: true },
      ].map((corner, i) => (
        <motion.div
          key={i}
          className="absolute w-6 h-6"
          style={{
            top: corner.top,
            left: corner.left,
            right: corner.right,
            bottom: corner.bottom,
            borderTop: corner.borderTop ? '2px solid #22d3ee' : undefined,
            borderLeft: corner.borderLeft ? '2px solid #22d3ee' : undefined,
            borderBottom: corner.borderBottom ? '2px solid #22d3ee' : undefined,
            borderRight: corner.borderRight ? '2px solid #22d3ee' : undefined,
          }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1, repeat: Infinity, delay: i * 0.1 }}
        />
      ))}

      {/* Center scanning indicator */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="flex flex-col items-center gap-2"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <div className="flex items-center gap-2 rounded-full border border-cyan-400/50 bg-dark-950/80 backdrop-blur-sm px-4 py-1.5">
            <motion.div
              className="w-2 h-2 rounded-full bg-cyan-400"
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ duration: 0.8, repeat: Infinity }}
            />
            <span className="text-xs text-cyan-400 font-medium">Scanning...</span>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
