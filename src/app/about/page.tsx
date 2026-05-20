'use client'

import { motion } from 'framer-motion'
import { AppShell } from '@/components/layout/app-shell'
import {
  Cpu, Layers, Zap, Shield, Globe, Code2, ExternalLink,
  ScanLine, FileText, BarChart3, Settings, CheckCircle2,
} from 'lucide-react'
import Image from 'next/image'

const TECH_STACK = [
  { name: 'Next.js 14', desc: 'App Router · RSC · SSG', color: 'text-white', bg: 'bg-white/5' },
  { name: 'TypeScript', desc: 'Strict mode · Type-safe', color: 'text-blue-400', bg: 'bg-blue-500/10' },
  { name: 'Tailwind CSS', desc: 'Custom cyber theme', color: 'text-cyan-400', bg: 'bg-cyan-500/10' },
  { name: 'Framer Motion', desc: 'Pro animations', color: 'text-purple-400', bg: 'bg-purple-500/10' },
  { name: 'Zustand', desc: 'Persist middleware', color: 'text-yellow-400', bg: 'bg-yellow-500/10' },
  { name: 'Recharts', desc: 'Analytics charts', color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
]

const AI_PROVIDERS = [
  { name: 'OpenAI Vision', status: 'Ready to connect', icon: Zap, color: 'text-green-400' },
  { name: 'Google Vision AI', status: 'Ready to connect', icon: Globe, color: 'text-blue-400' },
  { name: 'AWS Textract', status: 'Ready to connect', icon: Layers, color: 'text-orange-400' },
  { name: 'Azure Doc Intelligence', status: 'Ready to connect', icon: Shield, color: 'text-cyan-400' },
  { name: 'Tesseract OCR', status: 'Ready to connect', icon: Cpu, color: 'text-purple-400' },
]

const FEATURES = [
  { icon: ScanLine, title: 'AI Scanner', desc: 'Capture documents via camera or upload files for instant analysis' },
  { icon: FileText, title: 'Document History', desc: 'Persistent storage of all scanned and extracted documents' },
  { icon: BarChart3, title: 'Analytics', desc: '14-day usage trends, document type breakdown, confidence metrics' },
  { icon: Layers, title: 'Templates', desc: '8 pre-built extractors for invoices, IDs, contracts, and more' },
  { icon: Settings, title: 'Multi-provider', desc: 'Swap AI backends without changing your integration code' },
  { icon: Code2, title: 'Clean API', desc: 'Provider interface ready for OpenAI, Google, AWS, Azure, or local OCR' },
]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
}

export default function AboutPage() {
  return (
    <AppShell>
      <div className="max-w-3xl mx-auto space-y-10">

        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center pt-4"
        >
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="relative w-28 h-28"
            >
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-cyan-500/20 to-purple-600/20 border border-white/10" />
              <div className="absolute -inset-4 rounded-[2rem] bg-cyan-500/5 blur-xl" />
              <div className="relative w-full h-full flex items-center justify-center p-3">
                <Image
                  src="/logo.svg"
                  alt="DeepNode Industries"
                  width={88}
                  height={88}
                  className="w-full h-full object-contain drop-shadow-[0_0_24px_rgba(6,182,212,0.4)]"
                  priority
                />
              </div>
            </motion.div>
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.5 }}
            className="font-display font-bold text-3xl sm:text-4xl text-white mb-2"
          >
            DeepNode{' '}
            <span className="bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
              Vision
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25, duration: 0.5 }}
            className="text-slate-400 text-sm sm:text-base max-w-md mx-auto leading-relaxed"
          >
            AI-powered document intelligence platform. Extract, classify, and validate documents
            with enterprise-grade accuracy — no real API calls required in demo mode.
          </motion.p>

          {/* Version badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.35, duration: 0.4 }}
            className="flex items-center justify-center gap-3 mt-5"
          >
            <span className="px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-xs text-cyan-400 font-medium">
              v1.0.0
            </span>
            <span className="flex items-center gap-1.5 text-xs text-slate-500">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Demo Mode Active
            </span>
            <span className="text-xs text-slate-600">© 2026</span>
          </motion.div>
        </motion.div>

        {/* Features grid */}
        <motion.section variants={container} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <motion.h2 variants={item} className="text-sm font-semibold text-slate-400 uppercase tracking-widest mb-4">
            Core Features
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {FEATURES.map(({ icon: Icon, title, desc }) => (
              <motion.div
                key={title}
                variants={item}
                className="flex items-start gap-3 p-4 rounded-xl border border-white/8 bg-white/[0.03] hover:border-cyan-500/20 hover:bg-cyan-500/5 transition-all duration-200"
              >
                <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
                  <Icon className="w-4 h-4 text-cyan-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-white leading-none mb-1">{title}</p>
                  <p className="text-xs text-slate-500 leading-relaxed">{desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Tech stack */}
        <motion.section variants={container} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <motion.h2 variants={item} className="text-sm font-semibold text-slate-400 uppercase tracking-widest mb-4">
            Technology Stack
          </motion.h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {TECH_STACK.map(({ name, desc, color, bg }) => (
              <motion.div
                key={name}
                variants={item}
                className={`p-3 rounded-xl border border-white/8 ${bg} hover:border-white/20 transition-all duration-200`}
              >
                <p className={`text-sm font-semibold ${color} leading-none mb-1`}>{name}</p>
                <p className="text-[11px] text-slate-500">{desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* AI Providers */}
        <motion.section variants={container} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <motion.h2 variants={item} className="text-sm font-semibold text-slate-400 uppercase tracking-widest mb-4">
            AI Provider Integrations
          </motion.h2>
          <motion.p variants={item} className="text-xs text-slate-500 mb-4">
            Clean provider interface — swap backends without changing application code.
            Configure API keys in Settings to activate any provider.
          </motion.p>
          <div className="space-y-2">
            {AI_PROVIDERS.map(({ name, status, icon: Icon, color }) => (
              <motion.div
                key={name}
                variants={item}
                className="flex items-center justify-between p-3 rounded-xl border border-white/8 bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-200"
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${color}`} />
                  <span className="text-sm font-medium text-slate-200">{name}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-slate-600" />
                  <span className="text-[11px] text-slate-500">{status}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Mobile note */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="p-4 rounded-xl border border-violet-500/20 bg-violet-500/5"
        >
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-violet-500/20 flex items-center justify-center shrink-0">
              <ScanLine className="w-4 h-4 text-violet-400" />
            </div>
            <div>
              <p className="text-sm font-semibold text-violet-300 mb-1">Mobile-First Design</p>
              <p className="text-xs text-slate-500 leading-relaxed">
                Camera capture via <code className="text-violet-300 bg-white/5 px-1 rounded">capture=&quot;environment&quot;</code>,
                bottom navigation, collapsible panels, large touch targets, and full document analysis flow — all optimized for iOS and Android.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Footer credit */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center gap-3 pb-4 pt-2 border-t border-white/8"
        >
          <div className="flex items-center gap-3">
            <Image
              src="/logo.svg"
              alt="DeepNode Industries"
              width={32}
              height={32}
              className="h-8 w-auto opacity-80"
            />
            <span className="font-display font-bold text-slate-300 text-sm">DeepNode Industries</span>
          </div>
          <p className="text-xs text-slate-600">
            DeepNode Industries © 2026. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-2 text-xs text-slate-700">
            <span>Built with</span>
            <ExternalLink className="w-3 h-3" />
            <span>Next.js · TypeScript · Tailwind CSS</span>
          </div>
        </motion.div>

      </div>
    </AppShell>
  )
}
