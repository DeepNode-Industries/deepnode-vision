'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  FileText, CreditCard, Car, ScrollText, Contact2, Package, Receipt, FileBadge
} from 'lucide-react'
import { AppShell } from '@/components/layout/app-shell'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { TEMPLATES } from '@/lib/mock-data'

const ICON_MAP: Record<string, React.ElementType> = {
  FileText,
  CreditCard,
  Car,
  ScrollText,
  Contact2,
  IdCard: Contact2,
  Package,
  Receipt,
  FileBadge,
}

const CATEGORY_COLORS: Record<string, 'cyan' | 'green' | 'yellow' | 'purple' | 'red' | 'blue' | 'pink'> = {
  Finance: 'cyan',
  Security: 'yellow',
  KYC: 'pink',
  Legal: 'red',
  Fiscal: 'green',
  Commerce: 'blue',
}

export default function TemplatesPage() {
  const categories = Array.from(new Set(TEMPLATES.map(t => t.category)))

  return (
    <AppShell>
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Intro */}
        <div className="rounded-2xl border border-violet-500/20 bg-violet-500/5 p-6">
          <h2 className="font-display font-semibold text-white mb-1">Analysis Templates</h2>
          <p className="text-sm text-slate-400">
            Pre-built extraction templates optimized for common business document types.
            Select a template and upload your document to get started.
          </p>
        </div>

        {/* Templates by category */}
        {categories.map((category) => {
          const categoryTemplates = TEMPLATES.filter(t => t.category === category)
          return (
            <div key={category}>
              <div className="flex items-center gap-3 mb-4">
                <h3 className="font-display font-semibold text-white">{category}</h3>
                <Badge variant={CATEGORY_COLORS[category] ?? 'slate'}>
                  {categoryTemplates.length} template{categoryTemplates.length > 1 ? 's' : ''}
                </Badge>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {categoryTemplates.map((template, i) => {
                  const Icon = ICON_MAP[template.icon] || FileText
                  return (
                    <motion.div
                      key={template.id}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.06 }}
                    >
                      <Card hoverable className="h-full">
                        <CardContent className="p-5 flex flex-col h-full">
                          {/* Icon + title */}
                          <div className="flex items-center gap-3 mb-3">
                            <div
                              className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                              style={{
                                backgroundColor: `${template.color}20`,
                                border: `1px solid ${template.color}40`,
                              }}
                            >
                              <Icon className="w-5 h-5" style={{ color: template.color }} />
                            </div>
                            <div className="min-w-0">
                              <p className="text-sm font-semibold text-white leading-tight">{template.name}</p>
                              <Badge variant={CATEGORY_COLORS[template.category] ?? 'slate'} className="mt-1">
                                {template.category}
                              </Badge>
                            </div>
                          </div>

                          {/* Description */}
                          <p className="text-xs text-slate-400 leading-relaxed flex-1 mb-4">
                            {template.description}
                          </p>

                          {/* Fields preview */}
                          <div className="flex flex-wrap gap-1 mb-4">
                            {template.fields.slice(0, 4).map(field => (
                              <span
                                key={field}
                                className="px-1.5 py-0.5 rounded text-[10px] text-slate-500 bg-white/5 border border-white/8"
                              >
                                {field.replace(/_/g, ' ')}
                              </span>
                            ))}
                            {template.fields.length > 4 && (
                              <span className="px-1.5 py-0.5 rounded text-[10px] text-slate-600 bg-white/5">
                                +{template.fields.length - 4} more
                              </span>
                            )}
                          </div>

                          {/* CTA */}
                          <Link href="/scanner">
                            <Button variant="outline" size="sm" className="w-full">
                              Use Template
                            </Button>
                          </Link>
                        </CardContent>
                      </Card>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </AppShell>
  )
}
