import type { DocumentType } from './types'

const INVOICE_KEYWORDS = ['invoice', 'factura', 'bill', 'billing', 'invoice_', 'inv_', 'fact_']
const RECEIPT_KEYWORDS = ['receipt', 'ticket', 'recibo', 'ticket_', 'rcpt']
const PAYMENT_KEYWORDS = ['payment', 'comprobante', 'pago', 'transfer', 'remittance', 'voucher']
const PLATE_KEYWORDS = ['plate', 'placa', 'vehiculo', 'vehicle', 'carro', 'auto']
const CONTRACT_KEYWORDS = ['contract', 'contrato', 'agreement', 'convenio', 'acuerdo', 'terms']
const ID_KEYWORDS = ['id', 'credential', 'credencial', 'pasaporte', 'passport', 'ine', 'curp', 'dni']
const CFDI_KEYWORDS = ['cfdi', 'comprobante_fiscal', 'sat', 'xml_fiscal']
const REPORT_KEYWORDS = ['report', 'reporte', 'informe', 'scan', 'scanned']

export function detectDocumentTypeFromName(fileName: string): DocumentType {
  const name = fileName.toLowerCase().replace(/[\s_-]/g, '_')

  if (INVOICE_KEYWORDS.some(k => name.includes(k))) return 'invoice'
  if (PAYMENT_KEYWORDS.some(k => name.includes(k))) return 'payment_receipt'
  if (RECEIPT_KEYWORDS.some(k => name.includes(k))) return 'receipt'
  if (PLATE_KEYWORDS.some(k => name.includes(k))) return 'vehicle_plate'
  if (CONTRACT_KEYWORDS.some(k => name.includes(k))) return 'contract'
  if (ID_KEYWORDS.some(k => name.includes(k))) return 'id_document'
  if (CFDI_KEYWORDS.some(k => name.includes(k))) return 'cfdi'
  if (REPORT_KEYWORDS.some(k => name.includes(k))) return 'report'

  return 'unknown'
}

export function detectDocumentTypeFromMime(mimeType: string, fileName: string): DocumentType {
  const nameDetected = detectDocumentTypeFromName(fileName)
  if (nameDetected !== 'unknown') return nameDetected

  if (mimeType === 'application/pdf') return 'invoice'
  if (mimeType.startsWith('image/')) return 'product_image'

  return 'unknown'
}

export function resolveDocumentType(file: File): DocumentType {
  const detected = detectDocumentTypeFromMime(file.type, file.name)
  return detected
}

export const DOCUMENT_TYPE_COLORS: Record<DocumentType, string> = {
  invoice: '#06b6d4',
  receipt: '#8b5cf6',
  payment_receipt: '#10b981',
  vehicle_plate: '#f59e0b',
  contract: '#ef4444',
  id_document: '#ec4899',
  product_image: '#3b82f6',
  report: '#6b7280',
  cfdi: '#14b8a6',
  unknown: '#64748b',
}

export const DOCUMENT_TYPE_ICONS: Record<DocumentType, string> = {
  invoice: 'FileText',
  receipt: 'Receipt',
  payment_receipt: 'CreditCard',
  vehicle_plate: 'Car',
  contract: 'ScrollText',
  id_document: 'IdCard',
  product_image: 'Package',
  report: 'FileBarChart',
  cfdi: 'FileBadge',
  unknown: 'File',
}
