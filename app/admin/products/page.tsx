import Link from 'next/link'
import { redirect } from 'next/navigation'
import { getSession } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { getProductGroupLabel } from '@/lib/product-catalog'

export default async function AdminProductsPage() {
  const session = await getSession()
  if (!session || session.audience !== 'admin') redirect('/admin/login')

  const products = await prisma.product.findMany({ orderBy: { createdAt: 'desc' } })

  return (
    <main className="mx-auto max-w-7xl px-4 py-12">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#1A2E42]">إدارة المنتجات</h1>
          <p className="mt-2 text-sm text-slate-500">إضافة وعرض المنتجات المرتبطة مباشرة بصفحات المتجر.</p>
        </div>
        <Link href="/admin/products/new" className="rounded-xl bg-[#097D77] px-4 py-2 text-white">إضافة منتج</Link>
      </div>

      <div className="mb-6 grid gap-4 md:grid-cols-4">
        <div className="rounded-2xl border bg-white p-5"><div className="text-sm text-slate-500">إجمالي المنتجات</div><div className="mt-2 text-3xl font-bold text-[#1A2E42]">{products.length}</div></div>
        <div className="rounded-2xl border bg-white p-5"><div className="text-sm text-slate-500">المفعلة</div><div className="mt-2 text-3xl font-bold text-emerald-600">{products.filter((item) => item.isActive).length}</div></div>
        <div className="rounded-2xl border bg-white p-5"><div className="text-sm text-slate-500">مع صور</div><div className="mt-2 text-3xl font-bold text-[#223982]">{products.filter((item) => item.imageUrl).length}</div></div>
        <div className="rounded-2xl border bg-white p-5"><div className="text-sm text-slate-500">بدون صور</div><div className="mt-2 text-3xl font-bold text-amber-600">{products.filter((item) => !item.imageUrl).length}</div></div>
      </div>

      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <table className="min-w-full text-right text-sm">
          <thead className="bg-slate-50 text-slate-600">
            <tr>
              <th className="p-4">الصورة</th>
              <th className="p-4">المنتج</th>
              <th className="p-4">SKU</th>
              <th className="p-4">المجموعة</th>
              <th className="p-4">السعر</th>
              <th className="p-4">الحالة</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-t border-slate-100 align-top">
                <td className="p-4">
                  {product.imageUrl ? (
                    <img src={product.imageUrl} alt={product.name} className="h-16 w-16 rounded-xl object-cover" />
                  ) : (
                    <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-slate-100 text-xs text-slate-500">بدون صورة</div>
                  )}
                </td>
                <td className="p-4">
                  <div className="font-semibold text-slate-800">{product.name}</div>
                  <div className="mt-1 max-w-xs text-xs text-slate-500">{product.description || 'لا يوجد وصف مختصر'}</div>
                </td>
                <td className="p-4 font-mono text-xs text-slate-700">{product.sku}</td>
                <td className="p-4">{getProductGroupLabel(product.category)}</td>
                <td className="p-4">{product.unitPrice.toFixed(2)}</td>
                <td className="p-4">
                  <span className={`rounded-full px-3 py-1 text-xs font-medium ${product.isActive ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-600'}`}>
                    {product.isActive ? 'مفعل' : 'مخفي'}
                  </span>
                </td>
              </tr>
            ))}
            {!products.length ? (
              <tr>
                <td colSpan={6} className="p-8 text-center text-slate-500">لا توجد منتجات بعد. أضف أول منتج ليظهر هنا وفي المتجر.</td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </main>
  )
}
