'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

export default function StaffLoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [email, setEmail] = useState('sales@example.com')
  const [password, setPassword] = useState('Admin@123456')
  const [error, setError] = useState('')
  const redirectTo = searchParams.get('redirect') || '/staff/dashboard'

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, audience: 'staff' }),
    })
    const data = await res.json()
    if (!res.ok) return setError(data.error || 'تعذر تسجيل الدخول')
    router.push(redirectTo)
    router.refresh()
  }

  return (
    <main className="mx-auto max-w-md px-4 py-20">
      <h1 className="mb-6 text-3xl font-bold text-[#1A2E42]">دخول الموظفين</h1>
      <form onSubmit={onSubmit} className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <input className="w-full rounded-xl border p-3" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input className="w-full rounded-xl border p-3" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        {error ? <p className="text-sm text-red-600">{error}</p> : null}
        <button className="w-full rounded-xl bg-[#1A2E42] px-4 py-3 text-white">دخول الموظف</button>
      </form>
    </main>
  )
}
