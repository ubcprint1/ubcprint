'use client'

import { useState } from 'react'

export default function RequestQuotePage() {
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ customerName: '', email: '', productName: '', quantity: '1', description: '' })

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setMessage('')
    const res = await fetch('/api/public/request-quote', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    const data = await res.json()
    if (!res.ok) {
      setMessage(data.error || 'تعذر إرسال الطلب')
      setLoading(false)
      return
    }
    setMessage(`تم استلام الطلب. رقم الطلب: ${data.orderNumber}`)
    setLoading(false)
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="mb-6 text-3xl font-bold text-[#1A2E42]">اطلب عرض سعر</h1>
      <form onSubmit={onSubmit} className="space-y-4 rounded-2xl border bg-white p-6">
        <input className="w-full rounded-xl border p-3" placeholder="اسم العميل" value={form.customerName} onChange={(e) => setForm({ ...form, customerName: e.target.value })} />
        <input className="w-full rounded-xl border p-3" placeholder="البريد الإلكتروني" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input className="w-full rounded-xl border p-3" placeholder="نوع المشروع" value={form.productName} onChange={(e) => setForm({ ...form, productName: e.target.value })} />
        <input className="w-full rounded-xl border p-3" type="number" placeholder="الكمية" value={form.quantity} onChange={(e) => setForm({ ...form, quantity: e.target.value })} />
        <textarea className="w-full rounded-xl border p-3" rows={5} placeholder="وصف الطلب" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
        <button className="rounded-xl bg-[#097D77] px-5 py-3 text-white" disabled={loading}>{loading ? 'جاري الإرسال...' : 'إرسال الطلب'}</button>
        {message ? <p className="text-sm text-[#1A2E42]">{message}</p> : null}
      </form>
    </main>
  )
}
