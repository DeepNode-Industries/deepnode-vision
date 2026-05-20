'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Play, ScanLine, Zap, Shield, Brain } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-hero" />
      <div
        className="absolute inset-0 bg-grid-cyber bg-grid opacity-100"
        style={{ backgroundSize: '60px 60px' }}
      />

      {/* Radial glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-3xl" />

      {/* Floating particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-cyan-400/40"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.8, 0.2],
          }}
          transition={{
            duration: 3 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 4,
            ease: 'easeInOut',
          }}
        />
      ))}

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-24 text-center">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center gap-2 mb-8"
        >
          <div className="flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1.5">
            <Zap className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-xs font-medium text-cyan-400 tracking-wide">
              Powered by AI · OCR · Computer Vision
            </span>
          </div>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-6"
        >
          <span className="text-white">AI Document</span>
          <br />
          <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-400 bg-clip-text text-transparent">
            Intelligence
          </span>
          <br />
          <span className="text-white">for Business</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mx-auto max-w-2xl text-lg text-slate-400 leading-relaxed mb-10"
        >
          Extract, classify, and validate any document — invoices, receipts, contracts, IDs, and more —
          with enterprise-grade AI precision. Connect Google Vision, OpenAI, AWS Textract, and Azure.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <Link href="/scanner">
            <Button size="lg" className="gap-2 min-w-[220px]">
              <ScanLine className="w-5 h-5" />
              Start Analyzing Documents
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button variant="ghost" size="lg" className="gap-2 min-w-[160px]">
              <Play className="w-4 h-4" />
              View Demo
            </Button>
          </Link>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="grid grid-cols-3 gap-6 max-w-lg mx-auto mb-20"
        >
          {[
            { value: '99%', label: 'Accuracy' },
            { value: '<3s', label: 'Processing' },
            { value: '10+', label: 'Doc Types' },
          ].map(stat => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl font-display font-bold text-cyan-400">{stat.value}</div>
              <div className="text-xs text-slate-500 mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Scanner mockup */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="relative mx-auto max-w-3xl"
        >
          <div className="rounded-2xl border border-white/10 bg-dark-900/80 backdrop-blur-sm overflow-hidden shadow-2xl">
            {/* Window bar */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-dark-800/50">
              <div className="w-3 h-3 rounded-full bg-red-500/70" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
              <div className="w-3 h-3 rounded-full bg-green-500/70" />
              <div className="flex-1 mx-4 rounded-md bg-white/5 px-3 py-1 text-xs text-slate-500 text-left">
                deepnode.vision/scanner
              </div>
            </div>

            {/* Mock scanner UI */}
            <div className="p-6 grid grid-cols-2 gap-4">
              {/* Upload zone mock */}
              <div className="rounded-xl border-2 border-dashed border-cyan-500/30 bg-cyan-500/5 p-6 flex flex-col items-center justify-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/20 flex items-center justify-center">
                  <ScanLine className="w-5 h-5 text-cyan-400" />
                </div>
                <div className="space-y-1 text-center">
                  <div className="h-2 w-28 rounded bg-white/20" />
                  <div className="h-2 w-20 rounded bg-white/10" />
                </div>
              </div>

              {/* Results mock */}
              <div className="space-y-2">
                <div className="rounded-lg border border-white/10 bg-white/5 p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Brain className="w-3.5 h-3.5 text-cyan-400" />
                    <div className="h-2 w-20 rounded bg-cyan-400/30" />
                  </div>
                  <div className="space-y-1">
                    <div className="h-1.5 w-full rounded bg-white/10" />
                    <div className="h-1.5 w-3/4 rounded bg-white/10" />
                    <div className="h-1.5 w-1/2 rounded bg-white/10" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-2 text-center">
                    <div className="text-emerald-400 font-bold text-lg">96%</div>
                    <div className="h-1.5 w-12 rounded bg-white/10 mx-auto mt-1" />
                  </div>
                  <div className="rounded-lg border border-violet-500/30 bg-violet-500/10 p-2">
                    <Shield className="w-3.5 h-3.5 text-violet-400 mx-auto mb-1" />
                    <div className="h-1.5 w-12 rounded bg-white/10 mx-auto" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Decorative elements */}
          <div className="absolute -top-4 -right-4 w-24 h-24 bg-cyan-500/20 rounded-full blur-2xl" />
          <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-violet-500/20 rounded-full blur-2xl" />
        </motion.div>
      </div>
    </section>
  )
}
