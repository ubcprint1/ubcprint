'use client'

import { useState } from 'react'

export default function AdminProductNewPage() {
  const [saved, setSaved] = useState(false)
  return (
    <main className="mx-auto max-w-2xl px-4 py-12">
      <h1 className="mb-6 text-3xl font-bold text-[#1A2E42]">إضافة منتج</h1>
      <form className="space-y-4 rounded-2xl border bg-white p-6" onSubmit={(e) => { e.preventDefault(); setSaved(true) }}>
        <input className="w-full rounded-xl border p-3" placeholder="اسم المنتج" />
        <input className="w-full rounded-xl border p-3" placeholder="SKU" />
        <input className="w-full rounded-xl border p-3" placeholder="التصنيف" />
        <input className="w-full rounded-xl border p-3" type="number" placeholder="السعر" />
        <button className="rounded-xl bg-[#223982] px-5 py-3 text-white">حفظ</button>
        {saved ? <p className="text-sm text-[#097D77]">تم حفظ النموذج مبدئيًا. اربط الحفظ بالـ API في المرحلة التالية.</p> : null}
      </form>
    </main>
  )
}
