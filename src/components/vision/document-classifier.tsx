'use client'

import { motion } from 'framer-motion'
import { FileText, CreditCard, Car, ScrollText, Contact2, Package, Receipt, FileBadge, File } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { DocumentType } from '@/lib/types'

const TYPE_CONFIG: Record<DocumentType, { label: string; icon: typeof FileText; color: string; bg: string }> = {
  invoice: { label: 'Factura / Invoice', icon: FileText, color: 'text-cyan-400', bg: 'bg-cyan-500/15 border-cyan-500/30' },
  receipt: { label: 'Ticket / Receipt', icon: Receipt, color: 'text-violet-400', bg: 'bg-violet-500/15 border-violet-500/30' },
  payment_receipt: { label: 'Comprobante de Pago', icon: CreditCard, color: 'text-emerald-400', bg: 'bg-emerald-500/15 border-emerald-500/30' },
  vehicle_plate: { label: 'Placa Vehicular', icon: Car, color: 'text-amber-400', bg: 'bg-amber-500/15 border-amber-500/30' },
  contract: { label: 'Contrato Legal', icon: ScrollText, color: 'text-red-400', bg: 'bg-red-500/15 border-red-500/30' },
  id_document: { label: 'Identificación / ID', icon: Contact2, color: 'text-pink-400', bg: 'bg-pink-500/15 border-pink-500/30' },
  product_image: { label: 'Imagen de Producto', icon: Package, color: 'text-blue-400', bg: 'bg-blue-500/15 border-blue-500/30' },
  report: { label: 'Reporte Escaneado', icon: FileText, color: 'text-slate-400', bg: 'bg-slate-500/15 border-slate-500/30' },
  cfdi: { label: 'CFDI / Comprobante SAT', icon: FileBadge, color: 'text-teal-400', bg: 'bg-teal-500/15 border-teal-500/30' },
  unknown: { label: 'Documento Desconocido', icon: File, color: 'text-slate-400', bg: 'bg-slate-500/15 border-slate-500/30' },
}

interface DocumentClassifierProps {
  documentType: DocumentType
  confidence: number
  tags?: string[]
}

export function DocumentClassifier({ documentType, confidence, tags = [] }: DocumentClassifierProps) {
  const config = TYPE_CONFIG[documentType] || TYPE_CONFIG.unknown
  const Icon = config.icon

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex items-center gap-3"
    >
      <div className={cn('w-10 h-10 rounded-xl border flex items-center justify-center shrink-0', config.bg)}>
        <Icon className={cn('w-5 h-5', config.color)} />
      </div>
      <div className="flex-1 min-w-0">
        <p className={cn('text-sm font-semibold', config.color)}>{config.label}</p>
        <p className="text-xs text-slate-500">Classified by AI · {confidence}% confidence</p>
      </div>
    </motion.div>
  )
}
