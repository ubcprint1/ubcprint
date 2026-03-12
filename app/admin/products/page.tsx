import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { getSession } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { deleteProductAction } from './actions'

export default async function AdminProductsPage({
  searchParams,
}: {
  searchParams?: { success?: string }
}) {
  const session = await getSession()
  if (!session || session.audience !== 'admin') redirect('/admin/login')

  const [products, activeCount] = await Promise.all([
    prisma.product.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        _count: {
          select: { orderItems: true, quoteItems: true },
        },
      },
    }),
    prisma.product.count({ where: { isActive: true } }),
  ])

  const totalValue = products.reduce((sum, item) => sum + item.unitPrice, 0)

  return (
    <main className="mx-auto max-w-7xl px-4 py-10" dir="rtl">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#1A2E42]">إدارة المنتجات</h1>
          <p className="mt-2 text-sm text-slate-600">CRUD حقيقي للمنتجات مع تعديل وتعطيل وحذف.</p>
        </div>
        <Link href="/admin/products/new" className="rounded-xl bg-[#097D77] px-4 py-2.5 text-center text-white">
          إضافة منتج جديد
        </Link>
      </div>

      {searchParams?.success ? (
        <div className="mb-6 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
          {searchParams.success === 'created' && 'تم إنشاء المنتج بنجاح.'}
          {searchParams.success === 'saved' && 'تم تحديث المنتج بنجاح.'}
          {searchParams.success === 'deleted' && 'تم حذف المنتج بنجاح.'}
          {searchParams.success === 'archived' && 'المنتج مرتبط ببيانات سابقة، لذلك تم تعطيله بدل الحذف.'}
        </div>
      ) : null}

      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border bg-white p-5">
          <div className="text-sm text-slate-500">إجمالي المنتجات</div>
          <div className="mt-2 text-3xl font-bold text-[#1A2E42]">{products.length}</div>
        </div>
        <div className="rounded-2xl border bg-white p-5">
          <div className="text-sm text-slate-500">المنتجات النشطة</div>
          <div className="mt-2 text-3xl font-bold text-[#097D77]">{activeCount}</div>
        </div>
        <div className="rounded-2xl border bg-white p-5">
          <div className="text-sm text-slate-500">مجموع الأسعار</div>
          <div className="mt-2 text-3xl font-bold text-[#223982]">{totalValue.toLocaleString()} ر.س</div>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border bg-white">
        <table className="min-w-full text-right text-sm">
          <thead className="bg-slate-50 text-slate-600">
            <tr>
              <th className="p-4">الاسم</th>
              <th className="p-4">SKU</th>
              <th className="p-4">التصنيف</th>
              <th className="p-4">السعر</th>
              <th className="p-4">الحالة</th>
              <th className="p-4">الارتباطات</th>
              <th className="p-4">الإجراءات</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-t align-top">
                <td className="p-4 font-medium text-[#1A2E42]">{product.name}</td>
                <td className="p-4">{product.sku}</td>
                <td className="p-4">{product.category}</td>
                <td className="p-4">{product.unitPrice.toLocaleString()} ر.س</td>
                <td className="p-4">
                  <span className={`rounded-full px-3 py-1 text-xs ${product.isActive ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-700'}`}>
                    {product.isActive ? 'نشط' : 'معطل'}
                  </span>
                </td>
                <td className="p-4 text-slate-600">
                  طلبات: {product._count.orderItems} / عروض: {product._count.quoteItems}
                </td>
                <td className="p-4">
                  <div className="flex flex-wrap gap-2">
                    <Link href={`/admin/products/${product.id}`} className="rounded-lg border px-3 py-1.5">
                      تعديل
                    </Link>
                    <form action={deleteProductAction}>
                      <input type="hidden" name="id" value={product.id} />
                      <button className="rounded-lg border border-red-200 px-3 py-1.5 text-red-600">حذف/تعطيل</button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
            {products.length === 0 ? (
              <tr>
                <td colSpan={7} className="p-8 text-center text-slate-500">لا يوجد منتجات حتى الآن.</td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </main>
  )
}
