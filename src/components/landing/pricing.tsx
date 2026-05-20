'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Check, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'

const PLANS = [
  {
    name: 'Starter',
    price: 'Free',
    subtitle: 'Perfect to explore',
    features: [
      '50 documents/month',
      'OCR text extraction',
      'Basic classification',
      'JSON export',
      'Local storage',
      'Demo AI mode',
    ],
    cta: 'Get Started',
    ctaVariant: 'ghost' as const,
    highlight: false,
  },
  {
    name: 'Business',
    price: '$49',
    period: '/month',
    subtitle: 'For growing teams',
    features: [
      '5,000 documents/month',
      'Real AI providers (OpenAI, Google)',
      'Advanced field extraction',
      'Webhook integrations',
      'API access',
      'Analytics dashboard',
      'Priority support',
    ],
    cta: 'Start Free Trial',
    ctaVariant: 'primary' as const,
    highlight: true,
    badge: 'Most Popular',
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    subtitle: 'For large organizations',
    features: [
      'Unlimited documents',
      'All AI providers',
      'Custom models & fine-tuning',
      'On-premise deployment',
      'SLA guarantee',
      'Dedicated support',
      'Custom integrations',
      'GDPR compliance',
    ],
    cta: 'Contact Sales',
    ctaVariant: 'outline' as const,
    highlight: false,
  },
]

export function Pricing() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-violet-500/5 rounded-full blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-xs font-medium text-cyan-400 tracking-widest uppercase">Pricing</span>
          <h2 className="font-display text-4xl font-bold text-white mt-3 mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-slate-400 max-w-lg mx-auto">
            Start free. Scale as you grow. Connect your own AI providers for maximum control.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {PLANS.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`relative rounded-2xl border p-6 ${
                plan.highlight
                  ? 'border-cyan-500/40 bg-gradient-to-b from-cyan-500/10 to-dark-900/60 shadow-neon-cyan'
                  : 'border-white/10 bg-dark-900/60'
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="flex items-center gap-1 rounded-full border border-cyan-500/40 bg-cyan-500/20 px-3 py-1 text-xs font-medium text-cyan-400">
                    <Zap className="w-3 h-3" />
                    {plan.badge}
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h3 className="font-display font-bold text-white text-lg">{plan.name}</h3>
                <p className="text-sm text-slate-500 mt-0.5">{plan.subtitle}</p>
                <div className="flex items-end gap-1 mt-4">
                  <span className="font-display text-4xl font-bold text-white">{plan.price}</span>
                  {plan.period && <span className="text-slate-400 mb-1">{plan.period}</span>}
                </div>
              </div>

              <ul className="space-y-2.5 mb-6">
                {plan.features.map(f => (
                  <li key={f} className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span className="text-sm text-slate-300">{f}</span>
                  </li>
                ))}
              </ul>

              <Link href="/scanner" className="block">
                <Button variant={plan.ctaVariant} className="w-full">
                  {plan.cta}
                </Button>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
