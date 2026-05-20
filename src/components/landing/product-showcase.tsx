'use client'

import { motion } from 'framer-motion'
import { Brain, ScanLine, CheckCircle, AlertTriangle } from 'lucide-react'

export function ProductShowcase() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-dark-900/30" />
      <div
        className="absolute inset-0 bg-grid-cyber opacity-30"
        style={{ backgroundSize: '60px 60px' }}
      />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-xs font-medium text-violet-400 tracking-widest uppercase">How it works</span>
            <h2 className="font-display text-4xl font-bold text-white mt-3 mb-6">
              From Upload to
              <span className="bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent"> Structured Data</span>
              {' '}in Seconds
            </h2>

            <div className="space-y-6">
              {[
                { step: '01', title: 'Upload Your Document', desc: 'Drag & drop any invoice, receipt, ID, plate, or PDF. We accept all formats.', icon: ScanLine, color: 'cyan' },
                { step: '02', title: 'AI Analysis Pipeline', desc: 'Our engine runs OCR, classification, field extraction, and validation simultaneously.', icon: Brain, color: 'violet' },
                { step: '03', title: 'Receive Structured Results', desc: 'Get JSON with extracted fields, confidence scores, warnings, and suggested actions.', icon: CheckCircle, color: 'emerald' },
                { step: '04', title: 'Validate & Export', desc: 'Review results, fix discrepancies, export JSON, or send via webhook to your systems.', icon: AlertTriangle, color: 'amber' },
              ].map((item) => {
                const Icon = item.icon
                const colorMap: Record<string, string> = {
                  cyan: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30',
                  violet: 'text-violet-400 bg-violet-500/10 border-violet-500/30',
                  emerald: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
                  amber: 'text-amber-400 bg-amber-500/10 border-amber-500/30',
                }
                return (
                  <div key={item.step} className="flex gap-4">
                    <div className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 ${colorMap[item.color]}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-mono text-slate-600">{item.step}</span>
                        <h3 className="font-display font-semibold text-white text-sm">{item.title}</h3>
                      </div>
                      <p className="text-sm text-slate-400">{item.desc}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </motion.div>

          {/* Mock result panel */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="rounded-2xl border border-white/10 bg-dark-900/80 backdrop-blur-sm overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-dark-800/50">
                <div className="flex items-center gap-2">
                  <Brain className="w-4 h-4 text-cyan-400" />
                  <span className="text-xs font-medium text-white">Analysis Result</span>
                </div>
                <span className="flex items-center gap-1.5 text-xs text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  Complete
                </span>
              </div>

              <div className="p-4 space-y-3 text-xs font-mono">
                <div className="text-slate-500">{'{'}</div>
                <div className="pl-4 space-y-1">
                  <div><span className="text-violet-400">&quot;documentType&quot;</span><span className="text-slate-500">: </span><span className="text-emerald-400">&quot;Payment Receipt&quot;</span><span className="text-slate-500">,</span></div>
                  <div><span className="text-violet-400">&quot;confidence&quot;</span><span className="text-slate-500">: </span><span className="text-cyan-400">94</span><span className="text-slate-500">,</span></div>
                  <div><span className="text-violet-400">&quot;fields&quot;</span><span className="text-slate-500">: {'{'}</span></div>
                  <div className="pl-4 space-y-1">
                    <div><span className="text-blue-400">&quot;amount&quot;</span><span className="text-slate-500">: </span><span className="text-emerald-400">&quot;$2,450.00 MXN&quot;</span><span className="text-slate-500">,</span></div>
                    <div><span className="text-blue-400">&quot;transactionId&quot;</span><span className="text-slate-500">: </span><span className="text-emerald-400">&quot;TRX-928391&quot;</span><span className="text-slate-500">,</span></div>
                    <div><span className="text-blue-400">&quot;date&quot;</span><span className="text-slate-500">: </span><span className="text-emerald-400">&quot;2026-05-20&quot;</span><span className="text-slate-500">,</span></div>
                    <div><span className="text-blue-400">&quot;receiver&quot;</span><span className="text-slate-500">: </span><span className="text-emerald-400">&quot;DeepNode Industries&quot;</span></div>
                  </div>
                  <div className="text-slate-500">{'}'}<span className="text-slate-500">,</span></div>
                  <div><span className="text-violet-400">&quot;warnings&quot;</span><span className="text-slate-500">: [],</span></div>
                  <div><span className="text-violet-400">&quot;suggestedActions&quot;</span><span className="text-slate-500">: [</span></div>
                  <div className="pl-4 space-y-0.5">
                    <div><span className="text-amber-400">&quot;Save to CRM&quot;</span><span className="text-slate-500">,</span></div>
                    <div><span className="text-amber-400">&quot;Notify finance team&quot;</span><span className="text-slate-500">,</span></div>
                    <div><span className="text-amber-400">&quot;Create invoice record&quot;</span></div>
                  </div>
                  <div className="text-slate-500">]</div>
                </div>
                <div className="text-slate-500">{'}'}</div>
              </div>
            </div>

            {/* Decorations */}
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-cyan-500/15 rounded-full blur-2xl" />
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-violet-500/15 rounded-full blur-2xl" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
