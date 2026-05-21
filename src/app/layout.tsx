import type { Metadata, Viewport } from 'next'
import { Space_Grotesk, Inter } from 'next/font/google'
import './globals.css'
import { CapacitorInit } from '@/components/capacitor-init'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
})

// Critical for Capacitor WebView — without this Android renders at 980px
// and all lg: breakpoints fire, hiding the hamburger, camera buttons, and bottom nav
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover', // respect notch / gesture nav safe areas
}

export const metadata: Metadata = {
  title: 'DeepNode Vision — AI Document Intelligence',
  description:
    'Enterprise AI platform for OCR, document analysis, classification, and data extraction. Powered by DeepNode Industries.',
  keywords: ['OCR', 'AI', 'document analysis', 'computer vision', 'invoice extraction', 'CFDI'],
  authors: [{ name: 'DeepNode Industries' }],
  openGraph: {
    title: 'DeepNode Vision',
    description: 'AI-powered document intelligence for business',
    siteName: 'DeepNode Vision',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="min-h-screen bg-dark-950 text-white antialiased">
        <CapacitorInit />
        {children}
      </body>
    </html>
  )
}
