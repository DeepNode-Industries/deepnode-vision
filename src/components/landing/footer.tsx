import Link from 'next/link'
import Image from 'next/image'

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-dark-950/80 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <Image src="/logo.svg" alt="DeepNode Industries" width={36} height={36} className="h-9 w-auto" />
              <div>
                <span className="font-display font-bold text-white">DeepNode Vision</span>
                <span className="block text-xs text-cyan-400 tracking-widest uppercase">by DeepNode Industries</span>
              </div>
            </div>
            <p className="text-sm text-slate-400 max-w-xs leading-relaxed">
              AI-powered document intelligence platform for businesses. Extract, classify, and validate
              documents with enterprise-grade accuracy.
            </p>
            <div className="flex gap-3 mt-4">
              <span className="flex items-center gap-1.5 text-xs text-slate-500">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                All systems operational
              </span>
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-3">Product</h4>
            <ul className="space-y-2">
              {['Scanner', 'Documents', 'Analytics', 'Templates', 'Settings'].map(item => (
                <li key={item}>
                  <Link
                    href={`/${item.toLowerCase()}`}
                    className="text-sm text-slate-400 hover:text-cyan-400 transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Technology */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-3">Technology</h4>
            <ul className="space-y-2">
              {[
                'OpenAI Vision',
                'Google Vision AI',
                'AWS Textract',
                'Azure Doc Intelligence',
                'Tesseract OCR',
              ].map(item => (
                <li key={item}>
                  <span className="text-sm text-slate-500">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500">
            DeepNode Industries © 2026. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-xs text-slate-600">Built with Next.js · TypeScript · Tailwind CSS</span>
            <div className="flex items-center gap-1.5">
              <span className="text-xs text-slate-600">Powered by</span>
              <span className="text-xs font-medium text-cyan-500">DeepNode AI</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

