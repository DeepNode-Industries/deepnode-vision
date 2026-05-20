'use client'

import { motion } from 'framer-motion'
import { ScanLine, Brain, Shield, FileSearch, Zap, Globe, BarChart3, Lock } from 'lucide-react'

const FEATURES = [
  {
    icon: ScanLine,
    title: 'OCR Text Extraction',
    description: 'Extract text from any document — invoices, receipts, contracts, IDs — with high-accuracy OCR powered by Google Vision, AWS Textract, or local Tesseract.',
    color: 'cyan',
  },
  {
    icon: Brain,
    title: 'AI Classification',
    description: 'Automatically identify and classify document types using machine learning. No manual labeling required — the AI learns from context and structure.',
    color: 'violet',
  },
  {
    icon: FileSearch,
    title: 'Field Detection',
    description: 'Intelligently detect and extract key data fields like amounts, dates, parties, IDs, and addresses with bounding box precision.',
    color: 'blue',
  },
  {
    icon: Shield,
    title: 'Data Validation',
    description: 'Validate extracted data against business rules — verify RFC formats, CFDI UUIDs, license plate patterns, and date consistency.',
    color: 'emerald',
  },
  {
    icon: Zap,
    title: 'Real-time Processing',
    description: 'Process documents in under 3 seconds with parallel AI pipelines. Built for high-volume enterprise workloads.',
    color: 'yellow',
  },
  {
    icon: Globe,
    title: 'Multi-provider Ready',
    description: 'Switch between OpenAI Vision, Google Vision, AWS Textract, Azure Document Intelligence, or Tesseract with a single config change.',
    color: 'pink',
  },
  {
    icon: BarChart3,
    title: 'Analytics & Insights',
    description: 'Track processing volumes, confidence trends, document type distribution, and estimated time savings with rich dashboards.',
    color: 'orange',
  },
  {
    icon: Lock,
    title: 'Enterprise Security',
    description: 'Documents are processed in isolated pipelines. No data is stored without consent. GDPR and compliance-ready architecture.',
    color: 'red',
  },
]

const colorMap: Record<string, { border: string; bg: string; icon: string; glow: string }> = {
  cyan: { border: 'border-cyan-500/20', bg: 'bg-cyan-500/10', icon: 'text-cyan-400', glow: 'group-hover:shadow-[0_0_20px_rgba(6,182,212,0.2)]' },
  violet: { border: 'border-violet-500/20', bg: 'bg-violet-500/10', icon: 'text-violet-400', glow: 'group-hover:shadow-[0_0_20px_rgba(139,92,246,0.2)]' },
  blue: { border: 'border-blue-500/20', bg: 'bg-blue-500/10', icon: 'text-blue-400', glow: 'group-hover:shadow-[0_0_20px_rgba(59,130,246,0.2)]' },
  emerald: { border: 'border-emerald-500/20', bg: 'bg-emerald-500/10', icon: 'text-emerald-400', glow: 'group-hover:shadow-[0_0_20px_rgba(16,185,129,0.2)]' },
  yellow: { border: 'border-amber-500/20', bg: 'bg-amber-500/10', icon: 'text-amber-400', glow: 'group-hover:shadow-[0_0_20px_rgba(245,158,11,0.2)]' },
  pink: { border: 'border-pink-500/20', bg: 'bg-pink-500/10', icon: 'text-pink-400', glow: 'group-hover:shadow-[0_0_20px_rgba(236,72,153,0.2)]' },
  orange: { border: 'border-orange-500/20', bg: 'bg-orange-500/10', icon: 'text-orange-400', glow: 'group-hover:shadow-[0_0_20px_rgba(249,115,22,0.2)]' },
  red: { border: 'border-red-500/20', bg: 'bg-red-500/10', icon: 'text-red-400', glow: 'group-hover:shadow-[0_0_20px_rgba(239,68,68,0.2)]' },
}

export function Features() {
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-dark-900/50" />
      <div className="relative mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-xs font-medium text-cyan-400 tracking-widest uppercase">Platform Features</span>
          <h2 className="font-display text-4xl font-bold text-white mt-3 mb-4">
            AI Document Intelligence
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            Everything you need to extract, validate, and act on data from any business document — in one unified platform.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {FEATURES.map((feature, i) => {
            const colors = colorMap[feature.color]
            const Icon = feature.icon
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className={`group rounded-2xl border ${colors.border} bg-dark-900/60 backdrop-blur-sm p-5 transition-all duration-300 hover:border-opacity-50 ${colors.glow} hover:-translate-y-1`}
              >
                <div className={`w-10 h-10 rounded-xl ${colors.bg} ${colors.border} border flex items-center justify-center mb-4`}>
                  <Icon className={`w-5 h-5 ${colors.icon}`} />
                </div>
                <h3 className="font-display font-semibold text-white text-sm mb-2">{feature.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{feature.description}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
