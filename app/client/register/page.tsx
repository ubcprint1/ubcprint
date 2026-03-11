'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function ClientRegisterPage() {
  const router = useRouter()
  const [form, setForm] = useState({ name: '', email: '', phone: '', address: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const res = await fetch('/api/client/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    const data = await res.json()
    if (!res.ok) {
      setError(data.error || 'تعذر إنشاء الحساب')
      setLoading(false)
      return
    }
    router.push('/client/login')
  }

  return (
    <main className="mx-auto max-w-md px-4 py-20">
      <h1 className="mb-6 text-3xl font-bold text-[#1A2E42]">إنشاء حساب عميل</h1>
      <form onSubmit={onSubmit} className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <input className="w-full rounded-xl border p-3" placeholder="الاسم" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <input className="w-full rounded-xl border p-3" placeholder="البريد الإلكتروني" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input className="w-full rounded-xl border p-3" placeholder="رقم الجوال" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
        <input className="w-full rounded-xl border p-3" placeholder="العنوان" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
        <input className="w-full rounded-xl border p-3" type="password" placeholder="كلمة المرور" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
        {error ? <p className="text-sm text-red-600">{error}</p> : null}
        <button className="w-full rounded-xl bg-[#223982] px-4 py-3 text-white" disabled={loading}>{loading ? 'جاري الإنشاء...' : 'إنشاء الحساب'}</button>
      </form>
    </main>
  )
}
