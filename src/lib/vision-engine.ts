// DeepNode Vision Engine — Simulation Module
// Connect real providers by replacing the simulate* functions below with API calls.
// See: src/lib/providers.ts for provider interfaces.

import type { DocumentType, VisionAnalysisResult, ExtractedField, AnalysisWarning } from './types'
import { generateId, getDocumentTypeLabel } from './utils'
import { resolveDocumentType } from './document-detectors'

const rand = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min
const pick = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)]
const randFloat = (min: number, max: number) => parseFloat((Math.random() * (max - min) + min).toFixed(2))

// ─── Simulated OCR text per document type ───────────────────────────────────

function generateOCRText(type: DocumentType): string {
  switch (type) {
    case 'invoice':
      return `FACTURA / INVOICE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Folio: FACT-${rand(10000, 99999)}
Fecha: ${new Date().toLocaleDateString('es-MX')}
RFC Emisor: DNI-${rand(100000, 999999)}-XY3

PROVEEDOR
TechSolutions México S.A. de C.V.
Av. Insurgentes Sur 1234, CDMX

CLIENTE
${pick(['Empresa Global Corp', 'Distribuidora Latina S.A.', 'Comercial Norte Ltda', 'Grupo Industrial del Bajío'])}
RFC: ${pick(['EGC', 'DLS', 'CNL', 'GIB'])}${rand(100000, 999999)}XX1

DESCRIPCIÓN          CANT    P.UNIT    IMPORTE
─────────────────────────────────────────────
Servicio Profesional  1.0   $${rand(1000, 9000)}.00   $${rand(1000, 9000)}.00
Soporte Técnico       ${rand(1, 5)}.0    $${rand(200, 800)}.00    $${rand(200, 2400)}.00
Licencia Software     ${rand(1, 10)}.0   $${rand(100, 500)}.00   $${rand(100, 5000)}.00

SUBTOTAL: $${rand(5000, 50000)},${rand(10, 99)}.00 MXN
IVA 16%:  $${rand(800, 8000)},${rand(10, 99)}.00 MXN
TOTAL:    $${rand(6000, 58000)},${rand(10, 99)}.00 MXN

Forma de pago: ${pick(['Transferencia bancaria', 'Cheque', 'Efectivo', 'Tarjeta corporativa'])}
Condiciones: ${pick(['Pago inmediato', 'Crédito 30 días', 'Crédito 60 días'])}`

    case 'receipt':
      return `━━━━━━━━━━━━━━━━━━━━━━━━
${pick(['OXXO', 'Walmart', 'Soriana', 'Costco', 'Home Depot'])}
Sucursal ${rand(100, 999)}
Ticket: T-${rand(100000, 999999)}
${new Date().toLocaleDateString('es-MX')} ${rand(10, 23)}:${rand(10, 59)}
─────────────────────────
${pick(['Café Americano', 'Leche Entera 1L', 'Pan Integral'])}  $${rand(20, 80)}.00
${pick(['Detergente 1kg', 'Papel Higiénico 4R', 'Shampoo 400ml'])}  $${rand(35, 120)}.00
${pick(['Galletas', 'Jugo Natural 1L', 'Cereal Fitness'])}  $${rand(25, 90)}.00
${pick(['Agua Purificada 5L', 'Refresco 2L', 'Bebida Energética'])}  $${rand(18, 45)}.00
─────────────────────────
SUBTOTAL:  $${rand(98, 335)}.00
IVA:       $${rand(15, 53)}.60
TOTAL:     $${rand(113, 388)}.60
─────────────────────────
PAGO: ${pick(['Efectivo', 'Tarjeta Débito', 'Tarjeta Crédito'])}
CAMBIO: $${rand(0, 50)}.00
━━━━━━━━━━━━━━━━━━━━━━━━`

    case 'payment_receipt':
      return `COMPROBANTE DE TRANSFERENCIA
SPEI / INTERBANCARIO
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
No. Rastreo: ${rand(1000000000, 9999999999)}
Fecha y hora: ${new Date().toISOString()}
Estado: COMPLETADO ✓

ORDENANTE
Banco: ${pick(['BBVA', 'Santander', 'Banamex', 'Banorte', 'HSBC'])}
Titular: ${pick(['Juan López García', 'María Hernández Ruiz', 'Carlos Martínez'])}
CLABE: ${rand(100000000000000000, 999999999999999999)}

BENEFICIARIO
Banco: ${pick(['BBVA', 'Santander', 'Banamex', 'Banorte', 'HSBC'])}
Nombre: DeepNode Industries S.A.
CLABE: 012345678901234567

MONTO TRANSFERIDO: $${rand(1000, 50000)},${rand(10, 99)}.${rand(10, 99)} MXN
CONCEPTO: ${pick(['Pago de servicios', 'Liquidación factura', 'Depósito mensual', 'Pago freelance'])}
REFERENCIA: REF-${rand(100000, 999999)}`

    case 'vehicle_plate':
      return `DETECCIÓN DE PLACA VEHICULAR
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PLACA DETECTADA: ${pick(['ABC', 'DEF', 'GHJ', 'KLM', 'NPQ', 'RST', 'UVW', 'XYZ'])}-${rand(100, 999)}-${pick(['A', 'B', 'C', 'D', 'E', 'F'])}

Características:
• Tipo: ${pick(['Particular', 'Comercial', 'Carga', 'Turismo'])}
• Región: ${pick(['CDMX', 'Estado de México', 'Jalisco', 'Nuevo León', 'Guadalajara', 'Monterrey'])}
• Color placa: ${pick(['Blanca/Roja', 'Azul/Blanca', 'Verde/Blanca'])}
• Año estimado: ${rand(2018, 2024)}

Características del vehículo:
• Tipo: ${pick(['Sedan', 'SUV', 'Pickup', 'Camioneta', 'Motocicleta'])}
• Color: ${pick(['Blanco', 'Negro', 'Rojo', 'Azul', 'Gris', 'Plata'])}`

    case 'contract':
      return `CONTRATO DE SERVICIOS PROFESIONALES
No. Contrato: CTR-${rand(1000, 9999)}-${new Date().getFullYear()}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

PARTES INVOLUCRADAS:

PRESTADOR DE SERVICIOS:
DeepNode Industries S.A. de C.V.
RFC: DNI-${rand(100000, 999999)}-XY3
Representante: Ing. Carlos López Martínez

CLIENTE:
${pick(['Empresa Global Corp S.A.', 'Distribuidora del Norte Ltda.', 'Grupo Industrial Bajío S.A.'])}
RFC: ${pick(['EGC', 'DNL', 'GIB'])}${rand(100000, 999999)}XX${rand(1, 9)}

OBJETO DEL CONTRATO:
Prestación de servicios de ${pick(['desarrollo de software', 'consultoría tecnológica', 'análisis de datos', 'implementación de IA'])}.

VIGENCIA:
Inicio: ${new Date().toLocaleDateString('es-MX')}
Término: ${new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toLocaleDateString('es-MX')}

MONTO: $${rand(50000, 500000)},000.00 MXN + IVA

FIRMAS:
[Firma Prestador] ____________
[Firma Cliente]   ____________`

    case 'id_document':
      return `IDENTIFICACIÓN OFICIAL
Instituto Nacional Electoral
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
NOMBRE: ${pick(['JUAN CARLOS', 'MARÍA FERNANDA', 'ROBERTO ALEJANDRO', 'DIANA LAURA'])}
        ${pick(['LÓPEZ', 'HERNÁNDEZ', 'MARTÍNEZ', 'GARCÍA'])} ${pick(['RUIZ', 'MORALES', 'JIMÉNEZ', 'TORRES'])}
SEXO: ${pick(['H', 'M'])}
FECHA DE NACIMIENTO: ${rand(1, 28)}/${rand(1, 12)}/${rand(1970, 2000)}
CLAVE DE ELECTOR: ${pick(['JCLPGR', 'MFHNMR', 'RAGMJT', 'DLGRTM'])}${rand(10, 99)}${rand(100, 999)}${pick(['H', 'M'])}${rand(100, 999)}
CURP: ${pick(['LOGR', 'HEMF', 'MAJR', 'GATO'])}${rand(700101, 991231)}${pick(['H', 'M'])}${pick(['CMX', 'GDL', 'MTY', 'PUE'])}${pick(['ABC', 'DEF', 'GHI'])}${rand(10, 99)}
VIGENCIA: ${rand(2025, 2030)}`

    case 'cfdi':
      return `COMPROBANTE FISCAL DIGITAL POR INTERNET
CFDI 4.0 - SAT México
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
UUID: ${generateId().toUpperCase()}
Fecha emisión: ${new Date().toISOString()}
Régimen fiscal: ${pick(['601 - General de Ley', '612 - Personas Físicas', '626 - RESICO'])}

EMISOR:
RFC: DNI${rand(100000, 999999)}XY3
Nombre: DeepNode Industries S.A. de C.V.

RECEPTOR:
RFC: ${pick(['XAXX010101000', 'XEXX010101000', 'EGC'])}{rand(100000, 999999)}XX1

Tipo de comprobante: Ingreso
Forma de pago: ${pick(['01 Efectivo', '03 Transferencia', '04 Tarjeta crédito'])}
Método de pago: ${pick(['PUE - Pago en una sola exhibición', 'PPD - Pago en parcialidades'])}

SubTotal: $${rand(5000, 50000)}.00
IVA Trasladado 16%: $${rand(800, 8000)}.00
Total: $${rand(5800, 58000)}.00

SELLO DIGITAL: [Certificado SAT 20001000000300022323]`

    default:
      return `DOCUMENTO ESCANEADO
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Archivo procesado por DeepNode Vision AI

Contenido detectado:
• Texto impreso: Sí
• Tablas: ${pick(['Sí', 'No'])}
• Imágenes: ${pick(['Sí', 'No'])}
• Firmas: ${pick(['Sí', 'No'])}
• Sellos: ${pick(['Sí', 'No'])}
• Código QR: ${pick(['Sí', 'No'])}
• Código de barras: ${pick(['Sí', 'No'])}

[Texto extraído mediante OCR]
${pick([
  'El presente documento certifica...',
  'Por medio del presente escrito...',
  'Se hace constar que...',
  'En cumplimiento a lo establecido...',
])}

Fecha aproximada: ${new Date().toLocaleDateString('es-MX')}
Idioma: ${pick(['Español', 'Inglés', 'Español/Inglés'])}`
  }
}

// ─── Field generators per document type ─────────────────────────────────────

function generateFields(type: DocumentType): Record<string, string> {
  switch (type) {
    case 'invoice': {
      const subtotal = rand(5000, 50000)
      const tax = Math.round(subtotal * 0.16)
      return {
        invoice_number: `FACT-${rand(10000, 99999)}`,
        date: new Date().toLocaleDateString('es-MX'),
        supplier: pick(['TechSolutions México S.A.', 'Innovate Corp', 'DataPro Systems', 'CloudEdge México']),
        customer: pick(['Empresa Global Corp', 'Distribuidora Latina S.A.', 'Comercial Norte Ltda']),
        subtotal: `$${subtotal.toLocaleString('es-MX')}.00 MXN`,
        tax: `$${tax.toLocaleString('es-MX')}.00 MXN`,
        total: `$${(subtotal + tax).toLocaleString('es-MX')}.00 MXN`,
        currency: 'MXN',
        payment_method: pick(['Transferencia SPEI', 'Cheque', 'Crédito 30 días']),
        rfc_supplier: `DNI${rand(100000, 999999)}XY3`,
      }
    }
    case 'receipt': {
      const total = randFloat(113, 388)
      return {
        merchant: pick(['OXXO Sucursal 342', 'Walmart Supercenter', 'Soriana Híper', 'Costco #345']),
        date: new Date().toLocaleDateString('es-MX'),
        time: `${rand(10, 23)}:${rand(10, 59)}`,
        ticket_number: `T-${rand(100000, 999999)}`,
        items_count: `${rand(2, 8)} artículos`,
        subtotal: `$${(total * 0.86).toFixed(2)}`,
        tax: `$${(total * 0.14).toFixed(2)}`,
        total: `$${total.toFixed(2)} MXN`,
        payment_method: pick(['Efectivo', 'Tarjeta Débito', 'Tarjeta Crédito VISA']),
        cashier: `Cajero #${rand(10, 99)}`,
      }
    }
    case 'payment_receipt': {
      const amount = rand(1000, 50000)
      return {
        bank: pick(['BBVA México', 'Santander', 'Banamex', 'Banorte', 'HSBC']),
        transaction_id: `TRX-${rand(100000000, 999999999)}`,
        tracking_key: `${rand(10000000000000000, 99999999999999999)}`,
        amount: `$${amount.toLocaleString('es-MX')}.00 MXN`,
        sender: pick(['Juan López García', 'María Hernández Ruiz', 'Carlos Martínez Pérez']),
        receiver: 'DeepNode Industries S.A.',
        date: new Date().toLocaleDateString('es-MX'),
        time: `${rand(8, 22)}:${rand(10, 59)}:${rand(10, 59)}`,
        status: 'COMPLETADO ✓',
        concept: pick(['Pago de servicios', 'Liquidación factura', 'Depósito mensual']),
      }
    }
    case 'vehicle_plate': {
      const letters = 'ABCDEFGHJKLMNPQRSTUVWXYZ'
      const plate = `${letters[rand(0, letters.length - 1)]}${letters[rand(0, letters.length - 1)]}${letters[rand(0, letters.length - 1)]}-${rand(100, 999)}-${letters[rand(0, 5)]}`
      return {
        plate_number: plate,
        vehicle_type: pick(['Sedan', 'SUV', 'Pickup', 'Camioneta', 'Motocicleta']),
        region: pick(['CDMX', 'Estado de México', 'Jalisco', 'Nuevo León', 'Puebla']),
        color: pick(['Blanco', 'Negro', 'Rojo', 'Azul', 'Gris', 'Plata']),
        estimated_year: `${rand(2015, 2024)}`,
        plate_type: pick(['Particular', 'Comercial', 'Carga']),
        detection_angle: pick(['Frontal', 'Trasera', 'Lateral izquierda']),
      }
    }
    case 'contract': {
      const start = new Date()
      const end = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
      return {
        contract_number: `CTR-${rand(1000, 9999)}-${new Date().getFullYear()}`,
        party_a: 'DeepNode Industries S.A. de C.V.',
        party_b: pick(['Empresa Global Corp S.A.', 'Distribuidora del Norte Ltda.', 'Grupo Industrial Bajío']),
        effective_date: start.toLocaleDateString('es-MX'),
        expiration_date: end.toLocaleDateString('es-MX'),
        duration: '12 meses',
        value: `$${rand(50000, 500000)},000.00 MXN + IVA`,
        jurisdiction: pick(['Ciudad de México', 'Guadalajara, Jalisco', 'Monterrey, Nuevo León']),
        obligations: pick(['Prestación de servicios de desarrollo de software', 'Consultoría tecnológica mensual']),
        type: pick(['Servicios profesionales', 'Arrendamiento', 'Compraventa', 'Confidencialidad']),
      }
    }
    case 'id_document': {
      return {
        document_type: pick(['INE', 'Pasaporte', 'CURP', 'RFC', 'Licencia de conducir']),
        full_name: `${pick(['Juan Carlos', 'María Fernanda', 'Roberto Alejandro', 'Diana Laura'])} ${pick(['López', 'Hernández', 'Martínez', 'García'])}`,
        gender: pick(['Masculino', 'Femenino']),
        birth_date: `${rand(1, 28)}/${rand(1, 12)}/${rand(1970, 2000)}`,
        nationality: 'Mexicana',
        id_number: `${rand(1000000000, 9999999999)}`,
        expiration: `${rand(2025, 2030)}`,
        issuing_authority: pick(['INE', 'SRE', 'RENAPO', 'Secretaría de Seguridad']),
      }
    }
    case 'cfdi': {
      const subtotal = rand(5000, 80000)
      return {
        uuid: generateId().toUpperCase(),
        version: '4.0',
        issuer_rfc: `DNI${rand(100000, 999999)}XY3`,
        issuer_name: 'DeepNode Industries S.A. de C.V.',
        receiver_rfc: pick(['XAXX010101000', 'EGC900101AB1', 'DNL800201XY3']),
        fiscal_regime: pick(['601 General de Ley Personas Morales', '612 Personas Físicas con Actividades']),
        voucher_type: 'I - Ingreso',
        payment_form: pick(['03 - Transferencia electrónica', '01 - Efectivo', '04 - Tarjeta de crédito']),
        subtotal: `$${subtotal.toLocaleString('es-MX')}.00`,
        total_tax: `$${Math.round(subtotal * 0.16).toLocaleString('es-MX')}.00`,
        total: `$${Math.round(subtotal * 1.16).toLocaleString('es-MX')}.00`,
        currency: 'MXN',
        digital_stamp: `[Certificado SAT ${rand(10000000000000000, 99999999999999999)}]`,
      }
    }
    default: {
      return {
        document_class: pick(['Imagen escaneada', 'PDF digital', 'Fotografía de documento']),
        text_detected: 'Sí',
        language: pick(['Español', 'Inglés', 'Español/Inglés']),
        tables_found: `${rand(0, 5)}`,
        signatures_found: `${rand(0, 3)}`,
        stamps_found: `${rand(0, 2)}`,
        qr_codes: `${rand(0, 2)}`,
        barcodes: `${rand(0, 3)}`,
        page_count: `${rand(1, 10)}`,
        scan_quality: pick(['Alta', 'Media', 'Baja']),
      }
    }
  }
}

// ─── Summary generators ──────────────────────────────────────────────────────

function generateSummary(type: DocumentType, fields: Record<string, string>): string {
  switch (type) {
    case 'invoice':
      return `This appears to be a valid invoice from ${fields.supplier || 'an unknown supplier'} for a total amount of ${fields.total || 'unknown'}. The document contains complete fiscal information including RFC, payment method, and itemized breakdown. Recommended for immediate processing and archiving in your ERP system.`
    case 'receipt':
      return `Point-of-sale receipt detected from ${fields.merchant || 'a retail store'}. Transaction total: ${fields.total || 'unknown'}. Payment processed via ${fields.payment_method || 'unspecified method'}. Document is valid for expense reporting purposes.`
    case 'payment_receipt':
      return `Bank transfer confirmation detected. Amount transferred: ${fields.amount || 'unknown'} from ${fields.sender || 'unknown sender'} to ${fields.receiver || 'unknown receiver'}. Transaction ID: ${fields.transaction_id || 'N/A'}. Status: ${fields.status || 'Completed'}. This document is suitable as proof of payment.`
    case 'vehicle_plate':
      return `Vehicle license plate successfully identified: ${fields.plate_number || 'N/A'}. Vehicle appears to be a ${fields.vehicle_type || 'unknown type'} registered in ${fields.region || 'unknown region'}. Detection confidence is high with clear visibility of all plate characters.`
    case 'contract':
      return `Legal services contract detected between ${fields.party_a || 'Party A'} and ${fields.party_b || 'Party B'}. Contract period: ${fields.effective_date || 'N/A'} to ${fields.expiration_date || 'N/A'}. Total contract value: ${fields.value || 'not specified'}. Review key obligations and deadlines carefully.`
    case 'id_document':
      return `Official identification document detected (${fields.document_type || 'ID'}). Identity: ${fields.full_name || 'N/A'}. Document expires: ${fields.expiration || 'N/A'}. KYC verification can proceed with this document. Ensure physical document verification for high-security operations.`
    case 'cfdi':
      return `CFDI fiscal voucher (version ${fields.version || '4.0'}) validated. UUID: ${fields.uuid?.substring(0, 16) || 'N/A'}... Total amount: ${fields.total || 'N/A'} MXN. Document complies with SAT requirements. Ready for accounting reconciliation and tax filing.`
    default:
      return `Document successfully processed by DeepNode Vision AI. Text extraction completed with ${fields.text_detected === 'Sí' ? 'positive' : 'limited'} results. ${fields.tables_found !== '0' ? `${fields.tables_found} tables detected. ` : ''}${fields.signatures_found !== '0' ? `${fields.signatures_found} signatures identified. ` : ''}Document has been archived for review.`
  }
}

// ─── Warning generators ──────────────────────────────────────────────────────

function generateWarnings(type: DocumentType, confidence: number): Array<{ code: string; message: string; severity: 'low' | 'medium' | 'high' }> {
  const warnings: Array<{ code: string; message: string; severity: 'low' | 'medium' | 'high' }> = []

  if (confidence < 80) {
    warnings.push({
      code: 'LOW_CONFIDENCE',
      message: 'Confidence score below 80%. Manual review recommended.',
      severity: 'medium',
    })
  }

  const randomWarnings: Array<{ code: string; message: string; severity: 'low' | 'medium' | 'high' }> = [
    { code: 'IMAGE_QUALITY', message: 'Image resolution could be improved for better accuracy.', severity: 'low' },
    { code: 'PARTIAL_TEXT', message: 'Some text areas may be partially obscured or blurred.', severity: 'low' },
    { code: 'ROTATION_DETECTED', message: 'Document appears rotated. Results may be less accurate.', severity: 'low' },
  ]

  if (confidence < 90 && Math.random() > 0.6) {
    warnings.push(pick(randomWarnings))
  }

  if (type === 'invoice' && Math.random() > 0.7) {
    warnings.push({ code: 'AMOUNT_VERIFY', message: 'Verify total matches subtotal + taxes manually.', severity: 'low' })
  }

  return warnings
}

// ─── Suggested actions per type ──────────────────────────────────────────────

function generateSuggestedActions(type: DocumentType): string[] {
  const common = ['Export to JSON', 'Download PDF report', 'Share with team']

  const byType: Record<DocumentType, string[]> = {
    invoice: ['Save to ERP system', 'Notify accounting team', 'Create payment reminder', 'Validate RFC with SAT', ...common],
    receipt: ['Add to expense report', 'Categorize for accounting', 'Request reimbursement', ...common],
    payment_receipt: ['Save to CRM', 'Notify finance team', 'Create invoice record', 'Reconcile with bank statement', ...common],
    vehicle_plate: ['Search in vehicle database', 'Create incident report', 'Add to watchlist', 'Log access timestamp', ...common],
    contract: ['Schedule review reminder', 'Set expiration alert', 'Extract key clauses', 'Send to legal team', ...common],
    id_document: ['Complete KYC process', 'Validate with authority', 'Add to client profile', 'Archive securely', ...common],
    product_image: ['Add to product catalog', 'Generate product description', 'Quality check review', ...common],
    report: ['Archive document', 'Extract key data points', 'Schedule follow-up', ...common],
    cfdi: ['Reconcile with SAT', 'Add to tax records', 'Validate UUID with SAT portal', 'Archive for fiscal year', ...common],
    unknown: ['Manual classification needed', 'Request original document', ...common],
  }

  const actions = byType[type] || common
  return actions.slice(0, rand(3, 5))
}

// ─── Extracted fields with confidence ────────────────────────────────────────

function toExtractedFields(fields: Record<string, string>): Array<{ key: string; value: string; confidence: number }> {
  return Object.entries(fields).map(([key, value]) => ({
    key,
    value,
    confidence: rand(75, 99),
  }))
}

// ─── Main analysis function ───────────────────────────────────────────────────

export async function analyzeDocument(
  file: File,
  onProgress?: (step: string) => void
): Promise<VisionAnalysisResult> {
  const start = Date.now()

  // Simulate processing delay
  onProgress?.('uploading')
  await sleep(rand(400, 800))

  onProgress?.('scanning')
  await sleep(rand(600, 1200))

  onProgress?.('extracting')
  await sleep(rand(500, 900))

  onProgress?.('classifying')
  await sleep(rand(300, 600))

  onProgress?.('summarizing')
  await sleep(rand(400, 700))

  // Detect document type
  const documentType = resolveDocumentType(file)
  const documentTypeLabel = getDocumentTypeLabel(documentType)

  // Generate confidence score
  const confidence = rand(74, 99)

  // Generate all result data
  const fields = generateFields(documentType)
  const extractedText = generateOCRText(documentType)
  const summary = generateSummary(documentType, fields)
  const warnings = generateWarnings(documentType, confidence).map(w => ({
    code: w.code,
    message: w.message,
    severity: w.severity as 'low' | 'medium' | 'high',
  }))
  const suggestedActions = generateSuggestedActions(documentType)
  const extractedFields = toExtractedFields(fields)

  const processingTime = Date.now() - start

  const result: VisionAnalysisResult = {
    id: generateId(),
    documentType,
    documentTypeLabel,
    confidence,
    extractedText,
    fields,
    extractedFields,
    summary,
    warnings,
    suggestedActions,
    processingTime,
    timestamp: new Date().toISOString(),
    fileName: file.name,
    fileSize: file.size,
    fileType: file.type,
    rawJson: '',
    tags: [documentTypeLabel, confidence >= 90 ? 'high-confidence' : 'review-needed', 'auto-classified'],
  }

  result.rawJson = JSON.stringify({
    documentType: result.documentType,
    documentTypeLabel: result.documentTypeLabel,
    confidence: result.confidence,
    fields: result.fields,
    summary: result.summary,
    warnings: result.warnings,
    suggestedActions: result.suggestedActions,
    processingTime: result.processingTime,
    timestamp: result.timestamp,
    fileName: result.fileName,
    fileSize: result.fileSize,
    fileType: result.fileType,
    tags: result.tags,
  }, null, 2)

  return result
}

function sleep(ms: number): Promise<void> {
  return new Promise(r => setTimeout(r, ms))
}
