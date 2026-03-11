"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function AdminLoginPage() {
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
        body: JSON.stringify({ email, password, audience: 'admin' }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'تعذر تسجيل الدخول')
      router.push(data.redirectTo || '/admin/dashboard')
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'تعذر تسجيل الدخول')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-16 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-md rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-2xl">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-[#097D77] text-3xl text-white">⚙</div>
          <h1 className="text-5xl font-black">دخول الأدمن</h1>
          <p className="mt-4 text-xl text-slate-300">إدارة المنتجات والعروض والأسعار والمحتوى والصلاحيات</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="mb-2 block text-lg font-bold">البريد الإلكتروني</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} className="h-14 w-full rounded-xl border border-slate-700 bg-slate-950 px-4" />
          </div>
          <div>
            <label className="mb-2 block text-lg font-bold">كلمة المرور</label>
            <input value={password} onChange={(e) => setPassword(e.target.value)} className="h-14 w-full rounded-xl border border-slate-700 bg-slate-950 px-4" type="password" />
          </div>
          {error && <div className="rounded-2xl bg-red-950 px-4 py-3 text-sm font-semibold text-red-200">{error}</div>}
          <button disabled={loading} className="flex h-14 w-full items-center justify-center rounded-xl bg-[#097D77] text-lg font-bold text-white disabled:opacity-60">{loading ? 'جاري الدخول...' : 'دخول لوحة الأدمن'}</button>
        </form>
      </div>
    </div>
  )
}
