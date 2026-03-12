'use client'

import Link from 'next/link'
import { useState } from 'react'

const groups = [
  { value: 'custom', label: 'المنتجات المخصصة' },
  { value: 'apparel', label: 'الملابس' },
  { value: 'promo', label: 'المنتجات الترويجية' },
  { value: 'events', label: 'المجموعات والفعاليات' },
]

export default function AdminProductNewPage() {
  const [form, setForm] = useState({
    name: '',
    sku: '',
    category: 'custom',
    description: '',
    imageUrl: '',
    unitPrice: '',
    isActive: true,
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setMessage(null)
    setError(null)

    try {
      const res = await fetch('/api/admin/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          ...form,
          unitPrice: Number(form.unitPrice || 0),
        }),
      })

      const data = await res.json()
      if (!res.ok) {
        setError(data?.error || 'تعذر حفظ المنتج')
        return
      }

      setMessage('تمت إضافة المنتج بنجاح')
      setForm({
        name: '',
        sku: '',
        category: 'custom',
        description: '',
        imageUrl: '',
        unitPrice: '',
        isActive: true,
      })
    } catch {
      setError('حدث خطأ أثناء الحفظ')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <div className="mb-6 flex items-center justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold text-[#1A2E42]">إضافة منتج جديد</h1>
          <p className="mt-2 text-sm text-slate-500">أضف المنتج واربطه مباشرة بالمجموعة المناسبة داخل الموقع.</p>
        </div>
        <Link href="/admin/products" className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700">
          رجوع
        </Link>
      </div>

      <form className="space-y-5 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm" onSubmit={handleSubmit}>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">اسم المنتج</label>
            <input
              className="w-full rounded-xl border border-slate-300 p-3 outline-none focus:border-[#223982]"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="مثال: تيشيرت قطن مطبوع"
              required
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">SKU</label>
            <input
              className="w-full rounded-xl border border-slate-300 p-3 uppercase outline-none focus:border-[#223982]"
              value={form.sku}
              onChange={(e) => setForm({ ...form, sku: e.target.value.toUpperCase() })}
              placeholder="TSHIRT-001"
              required
            />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">مجموعة العرض في الموقع</label>
            <select
              className="w-full rounded-xl border border-slate-300 p-3 outline-none focus:border-[#223982]"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
            >
              {groups.map((group) => (
                <option key={group.value} value={group.value}>{group.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">سعر المنتج</label>
            <input
              className="w-full rounded-xl border border-slate-300 p-3 outline-none focus:border-[#223982]"
              value={form.unitPrice}
              onChange={(e) => setForm({ ...form, unitPrice: e.target.value })}
              type="number"
              min="0"
              step="0.01"
              placeholder="0"
              required
            />
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">رابط صورة المنتج</label>
          <input
            className="w-full rounded-xl border border-slate-300 p-3 outline-none focus:border-[#223982]"
            value={form.imageUrl}
            onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
            type="url"
            placeholder="https://example.com/product-image.jpg"
          />
          <p className="mt-2 text-xs text-slate-500">حالياً يتم استخدام رابط صورة خارجي لتسريع الإطلاق.</p>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">وصف مختصر</label>
          <textarea
            className="min-h-[120px] w-full rounded-xl border border-slate-300 p-3 outline-none focus:border-[#223982]"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            placeholder="اكتب وصفًا مختصرًا يظهر داخل كروت المنتجات"
          />
        </div>

        <label className="flex items-center gap-3 rounded-2xl bg-slate-50 p-4 text-sm text-slate-700">
          <input
            type="checkbox"
            checked={form.isActive}
            onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
          />
          المنتج مفعل ويظهر في الموقع
        </label>

        <div className="flex flex-wrap items-center gap-3">
          <button disabled={loading} className="rounded-xl bg-[#223982] px-5 py-3 text-sm font-medium text-white disabled:opacity-60">
            {loading ? 'جارٍ الحفظ...' : 'حفظ المنتج'}
          </button>
          <Link href="/products" className="rounded-xl border border-slate-300 px-5 py-3 text-sm font-medium text-slate-700">
            معاينة صفحة المنتجات
          </Link>
        </div>

        {message ? <p className="text-sm font-medium text-emerald-600">{message}</p> : null}
        {error ? <p className="text-sm font-medium text-red-600">{error}</p> : null}
      </form>
    </main>
  )
}
