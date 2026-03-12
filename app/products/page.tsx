import { WebsiteHeader } from '@/components/website-header'
import { WebsiteFooter } from '@/components/website-footer'
import { StorefrontHero } from '@/components/storefront/storefront-hero'
import { ProductGrid } from '@/components/storefront/product-grid'
import { getActiveProducts } from '@/lib/product-catalog'

export default async function ProductsPage() {
  const products = await getActiveProducts()

  return (
    <div className="min-h-screen bg-slate-50" dir="rtl">
      <WebsiteHeader />
      <StorefrontHero
        title="منتجات UBC Print"
        description="أضف منتجاتك من لوحة الأدمن وستظهر هنا مباشرة. يمكنك كذلك توزيع كل منتج على المجموعة المناسبة ليظهر في القسم الصحيح داخل الموقع."
      />
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center justify-between gap-3">
          <div>
            <h2 className="text-2xl font-bold text-[#1A2E42]">أحدث المنتجات</h2>
            <p className="mt-2 text-sm text-slate-500">هذه القائمة تعرض المنتجات المفعلة فقط.</p>
          </div>
          <a href="/request-quote" className="rounded-xl bg-[#097D77] px-4 py-2 text-sm font-medium text-white">طلب عرض سعر</a>
        </div>
        <ProductGrid products={products} emptyMessage="لا توجد منتجات مفعلة حالياً. أضف منتجًا من لوحة الأدمن وسيظهر هنا فورًا بعد الحفظ." />
      </main>
      <WebsiteFooter />
    </div>
  )
}
