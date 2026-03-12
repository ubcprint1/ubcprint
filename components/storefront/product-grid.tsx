import Link from 'next/link'

type ProductCard = {
  id: string
  name: string
  sku: string
  category: string
  description: string | null
  imageUrl: string | null
  unitPrice: number
}

export function ProductGrid({ products, emptyMessage }: { products: ProductCard[]; emptyMessage: string }) {
  if (!products.length) {
    return <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center text-slate-500">{emptyMessage}</div>
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {products.map((product) => (
        <article key={product.id} className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md">
          <div className="aspect-[4/3] bg-slate-100">
            {product.imageUrl ? (
              <img src={product.imageUrl} alt={product.name} className="h-full w-full object-cover" />
            ) : (
              <div className="flex h-full items-center justify-center text-sm text-slate-500">لا توجد صورة</div>
            )}
          </div>
          <div className="p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-[#1A2E42]">{product.name}</h3>
                <p className="mt-1 text-xs text-slate-500">SKU: {product.sku}</p>
              </div>
              <div className="rounded-full bg-[#223982]/10 px-3 py-1 text-sm font-semibold text-[#223982]">{product.unitPrice.toFixed(2)}</div>
            </div>
            <p className="mt-3 min-h-[48px] text-sm leading-6 text-slate-600">{product.description || 'منتج مضاف من لوحة الأدمن ويظهر مباشرة في المتجر.'}</p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link href="/request-quote" className="rounded-xl bg-[#223982] px-4 py-2 text-sm font-medium text-white">اطلب عرض سعر</Link>
              <Link href="/contact" className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700">تواصل معنا</Link>
            </div>
          </div>
        </article>
      ))}
    </div>
  )
}
