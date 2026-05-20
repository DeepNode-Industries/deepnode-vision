import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { DocumentType } from './types'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`
}

export function formatDuration(ms: number): string {
  if (ms < 1000) return `${ms}ms`
  return `${(ms / 1000).toFixed(1)}s`
}

export function formatTimestamp(timestamp: string): string {
  const date = new Date(timestamp)
  return new Intl.DateTimeFormat('es-MX', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date)
}

export function formatDate(timestamp: string): string {
  const date = new Date(timestamp)
  return new Intl.DateTimeFormat('es-MX', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date)
}

export function getDocumentTypeLabel(type: DocumentType): string {
  const labels: Record<DocumentType, string> = {
    invoice: 'Factura / Invoice',
    receipt: 'Ticket / Receipt',
    payment_receipt: 'Comprobante de Pago',
    vehicle_plate: 'Placa Vehicular',
    contract: 'Contrato',
    id_document: 'Identificación',
    product_image: 'Imagen de Producto',
    report: 'Reporte Escaneado',
    cfdi: 'CFDI / Comprobante Fiscal',
    unknown: 'Documento Desconocido',
  }
  return labels[type] || 'Documento'
}

export function getConfidenceColor(confidence: number): string {
  if (confidence >= 90) return 'text-emerald-400'
  if (confidence >= 75) return 'text-cyan-400'
  if (confidence >= 60) return 'text-yellow-400'
  return 'text-red-400'
}

export function getConfidenceBadge(confidence: number): string {
  if (confidence >= 90) return 'High Confidence'
  if (confidence >= 75) return 'Good'
  if (confidence >= 60) return 'Moderate'
  return 'Low'
}

export function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    complete: 'text-emerald-400',
    running: 'text-cyan-400',
    pending: 'text-slate-400',
    error: 'text-red-400',
    idle: 'text-slate-400',
  }
  return colors[status] || 'text-slate-400'
}

export function generateId(): string {
  return `dnv_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`
}

export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export function truncate(str: string, length: number): string {
  if (str.length <= length) return str
  return str.substring(0, length) + '...'
}
