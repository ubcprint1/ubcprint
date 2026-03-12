import { WebsiteHeader } from '@/components/website-header'
import { WebsiteFooter } from '@/components/website-footer'
import { StorefrontHero } from '@/components/storefront/storefront-hero'
import { ProductGrid } from '@/components/storefront/product-grid'
import { getActiveProducts } from '@/lib/product-catalog'

export default async function Page() {
  const products = await getActiveProducts('events')

  return (
    <div className="min-h-screen bg-slate-50" dir="rtl">
      <WebsiteHeader />
      <StorefrontHero title="قسم المجموعات والفعاليات" description="حلول متكاملة للبوكسات والهدايا وتجهيزات الفعاليات والمناسبات." active="events" />
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <ProductGrid products={products} emptyMessage="لا توجد منتجات مفعلة في هذا القسم حالياً. أضف منتجًا جديدًا من لوحة الأدمن واختر نفس المجموعة." />
      </main>
      <WebsiteFooter />
    </div>
  )
}
