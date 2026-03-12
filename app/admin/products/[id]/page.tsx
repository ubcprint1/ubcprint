import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { getSession } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { updateProductAction, deleteProductAction } from '../actions'

export default async function AdminProductEditPage({
  params,
  searchParams,
}: {
  params: { id: string }
  searchParams?: { error?: string; success?: string }
}) {
  const session = await getSession()
  if (!session || session.audience !== 'admin') redirect('/admin/login')

  const product = await prisma.product.findUnique({ where: { id: params.id } })
  if (!product) redirect('/admin/products')

  return (
    <main className="mx-auto max-w-2xl px-4 py-10" dir="rtl">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-[#1A2E42]">تعديل المنتج</h1>
        <Link href="/admin/products" className="rounded-xl border px-4 py-2">رجوع</Link>
      </div>

      {searchParams?.success ? <div className="mb-4 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">تم حفظ التعديلات.</div> : null}
      {searchParams?.error ? <div className="mb-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">{searchParams.error === 'exists' ? 'يوجد منتج آخر بنفس الاسم أو SKU.' : 'تحقق من الحقول المطلوبة.'}</div> : null}

      <form action={updateProductAction} className="space-y-4 rounded-2xl border bg-white p-6 shadow-sm">
        <input type="hidden" name="id" value={product.id} />
        <div>
          <label className="mb-2 block text-sm font-medium">اسم المنتج</label>
          <input name="name" className="w-full rounded-xl border p-3" defaultValue={product.name} required />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium">SKU</label>
          <input name="sku" className="w-full rounded-xl border p-3" defaultValue={product.sku} required />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium">التصنيف</label>
          <input name="category" className="w-full rounded-xl border p-3" defaultValue={product.category} required />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium">السعر</label>
          <input name="unitPrice" type="number" step="0.01" min="0" className="w-full rounded-xl border p-3" defaultValue={product.unitPrice} required />
        </div>
        <label className="flex items-center gap-2 text-sm text-slate-700">
          <input name="isActive" type="checkbox" defaultChecked={product.isActive} />
          المنتج نشط
        </label>
        <div className="flex gap-3">
          <button className="rounded-xl bg-[#223982] px-5 py-3 text-white">حفظ التعديلات</button>
        </div>
      </form>

      <form action={deleteProductAction} className="mt-4">
        <input type="hidden" name="id" value={product.id} />
        <button className="rounded-xl border border-red-200 px-5 py-3 text-red-600">حذف أو تعطيل المنتج</button>
      </form>
    </main>
  )
}
