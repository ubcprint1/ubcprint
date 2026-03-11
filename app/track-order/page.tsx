'use client'

import { useState } from 'react'

export default function TrackOrderPage() {
  const [orderNumber, setOrderNumber] = useState('')
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState('')

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setResult(null)
    const res = await fetch('/api/public/track-order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ orderNumber }),
    })
    const data = await res.json()
    if (!res.ok) return setError(data.error || 'تعذر العثور على الطلب')
    setResult(data)
  }

  return (
    <main className="mx-auto max-w-2xl px-4 py-12">
      <h1 className="mb-6 text-3xl font-bold text-[#1A2E42]">تتبع الطلب</h1>
      <form onSubmit={onSubmit} className="space-y-4 rounded-2xl border bg-white p-6">
        <input className="w-full rounded-xl border p-3" placeholder="رقم الطلب" value={orderNumber} onChange={(e) => setOrderNumber(e.target.value)} />
        <button className="rounded-xl bg-[#223982] px-5 py-3 text-white">بحث</button>
      </form>
      {error ? <p className="mt-4 text-sm text-red-600">{error}</p> : null}
      {result ? (
        <div className="mt-6 rounded-2xl border bg-white p-6">
          <div>رقم الطلب: {result.orderNumber}</div>
          <div>الحالة: {result.status}</div>
          <div>العميل: {result.customerName}</div>
        </div>
      ) : null}
    </main>
  )
}
