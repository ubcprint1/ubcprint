import Link from 'next/link'
import { getSession } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { createProductAction } from '../actions'

export default async function AdminProductNewPage({
  searchParams,
}: {
  searchParams?: { error?: string }
}) {
  const session = await getSession()
  if (!session || session.audience !== 'admin') redirect('/admin/login')

  return (
    <main className="mx-auto max-w-2xl px-4 py-10" dir="rtl">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-[#1A2E42]">إضافة منتج</h1>
        <Link href="/admin/products" className="rounded-xl border px-4 py-2">رجوع</Link>
      </div>

      {searchParams?.error ? (
        <div className="mb-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {searchParams.error === 'missing' && 'أكمل الحقول المطلوبة.'}
          {searchParams.error === 'exists' && 'يوجد منتج بنفس الاسم أو SKU.'}
        </div>
      ) : null}

      <form action={createProductAction} className="space-y-4 rounded-2xl border bg-white p-6 shadow-sm">
        <div>
          <label className="mb-2 block text-sm font-medium">اسم المنتج</label>
          <input name="name" className="w-full rounded-xl border p-3" required />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium">SKU</label>
          <input name="sku" className="w-full rounded-xl border p-3" required />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium">التصنيف</label>
          <input name="category" className="w-full rounded-xl border p-3" required />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium">السعر</label>
          <input name="unitPrice" type="number" step="0.01" min="0" className="w-full rounded-xl border p-3" defaultValue="0" required />
        </div>
        <label className="flex items-center gap-2 text-sm text-slate-700">
          <input name="isActive" type="checkbox" defaultChecked />
          المنتج نشط
        </label>
        <button className="rounded-xl bg-[#223982] px-5 py-3 text-white">حفظ المنتج</button>
      </form>
    </main>
  )
}
