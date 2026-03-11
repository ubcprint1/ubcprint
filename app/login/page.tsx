"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function EmployeeLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('admin@example.com')
  const [password, setPassword] = useState('Admin@123456')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'تعذر تسجيل الدخول')
      router.push(data.redirectTo || '/dashboard')
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'تعذر تسجيل الدخول')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] px-4 py-16 text-[#1A2E42] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-[#223982] text-3xl text-white">⟶</div>
          <h1 className="text-5xl font-black">تسجيل الدخول</h1>
          <p className="mt-4 text-xl text-slate-600">نظام إدارة المطبعة - دخول الموظفين</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="mb-2 block text-lg font-bold">البريد الإلكتروني</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} className="h-14 w-full rounded-xl border border-slate-300 px-4" />
          </div>
          <div>
            <label className="mb-2 block text-lg font-bold">كلمة المرور</label>
            <input value={password} onChange={(e) => setPassword(e.target.value)} className="h-14 w-full rounded-xl border border-slate-300 px-4" type="password" />
          </div>
          {error && <div className="rounded-2xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">{error}</div>}
          <button disabled={loading} className="flex h-14 w-full items-center justify-center rounded-xl bg-[#111111] text-lg font-bold text-white disabled:opacity-60">{loading ? 'جاري الدخول...' : 'دخول النظام'}</button>
        </form>
        <div className="mt-8 text-center text-slate-500">
          <div className="font-bold">بيانات تجريبية</div>
          <div className="mt-3">admin@example.com</div>
          <div className="mt-2">Admin@123456</div>
        </div>
      </div>
    </div>
  )
}
