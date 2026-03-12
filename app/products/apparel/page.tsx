import { WebsiteHeader } from '@/components/website-header'
import { WebsiteFooter } from '@/components/website-footer'
import { StorefrontHero } from '@/components/storefront/storefront-hero'
import { ProductGrid } from '@/components/storefront/product-grid'
import { getActiveProducts } from '@/lib/product-catalog'

export default async function Page() {
  const products = await getActiveProducts('apparel')

  return (
    <div className="min-h-screen bg-slate-50" dir="rtl">
      <WebsiteHeader />
      <StorefrontHero title="قسم الملابس" description="منتجات الملابس والطباعة على التيشيرتات واليونيفورم والملابس الترويجية." active="apparel" />
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <ProductGrid products={products} emptyMessage="لا توجد منتجات مفعلة في هذا القسم حالياً. أضف منتجًا جديدًا من لوحة الأدمن واختر نفس المجموعة." />
      </main>
      <WebsiteFooter />
    </div>
  )
}
