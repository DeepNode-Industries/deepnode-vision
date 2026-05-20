import type { Metadata } from 'next'
import { Space_Grotesk, Inter } from 'next/font/google'
import './globals.css'

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
        {children}
      </body>
    </html>
  )
}
