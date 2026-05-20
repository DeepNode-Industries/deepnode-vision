import { Hero } from '@/components/landing/hero'
import { Features } from '@/components/landing/features'
import { UseCases } from '@/components/landing/use-cases'
import { ProductShowcase } from '@/components/landing/product-showcase'
import { Pricing } from '@/components/landing/pricing'
import { Footer } from '@/components/landing/footer'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-dark-950">
      <Hero />
      <Features />
      <UseCases />
      <ProductShowcase />
      <Pricing />
      <Footer />
    </div>
  )
}
