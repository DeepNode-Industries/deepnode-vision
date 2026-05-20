'use client'

import { motion } from 'framer-motion'
import { FileText, CreditCard, Car, ScrollText, Contact2, Package, Receipt, FileBadge } from 'lucide-react'

const USE_CASES = [
  { icon: FileText, title: 'Facturas e Invoices', desc: 'Extract invoice numbers, amounts, RFC, dates, and payment terms automatically.', color: '#06b6d4' },
  { icon: CreditCard, title: 'Comprobantes de Pago', desc: 'Validate SPEI transfers, bank receipts, and payment confirmations with transaction IDs.', color: '#10b981' },
  { icon: Receipt, title: 'Tickets y Receipts', desc: 'Parse POS receipts from any store — amounts, items, payment methods, cashier data.', color: '#8b5cf6' },
  { icon: Contact2, title: 'Identificaciones', desc: 'Extract identity data from INE, passports, CURP, and professional credentials for KYC.', color: '#ec4899' },
  { icon: Car, title: 'Placas Vehiculares', desc: 'Detect and read license plates from photos for access control and security systems.', color: '#f59e0b' },
  { icon: ScrollText, title: 'Contratos', desc: 'Parse contract parties, dates, obligations, value, and risks from legal documents.', color: '#ef4444' },
  { icon: FileBadge, title: 'CFDI / Documentos SAT', desc: 'Validate CFDI 4.0 documents, extract UUIDs, RFC, and verify compliance with SAT.', color: '#14b8a6' },
  { icon: Package, title: 'Imágenes de Producto', desc: 'Analyze product photos to extract labels, barcodes, QR codes, and text data.', color: '#3b82f6' },
]

export function UseCases() {
  return (
    <section className="py-24 relative">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-xs font-medium text-violet-400 tracking-widest uppercase">Supported Documents</span>
          <h2 className="font-display text-4xl font-bold text-white mt-3 mb-4">
            Analyze Any Document Type
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            DeepNode Vision adapts to every business document — no template customization required.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {USE_CASES.map((uc, i) => {
            const Icon = uc.icon
            return (
              <motion.div
                key={uc.title}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                whileHover={{ y: -4 }}
                className="group rounded-2xl border border-white/10 bg-dark-900/60 backdrop-blur-sm p-5 transition-all duration-300 hover:border-white/20 cursor-default"
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                  style={{ backgroundColor: `${uc.color}20`, border: `1px solid ${uc.color}40` }}
                >
                  <Icon className="w-5 h-5" style={{ color: uc.color }} />
                </div>
                <h3 className="font-display font-semibold text-white text-sm mb-1.5">{uc.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{uc.desc}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
