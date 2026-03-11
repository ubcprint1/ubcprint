"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { WebsiteHeader } from "@/components/website-header"
import { WebsiteFooter } from "@/components/website-footer"
import { WhatsAppFloat } from "@/components/whatsapp-float"

export default function ClientLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('client@example.com')
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
        body: JSON.stringify({ email, password, audience: 'client' }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'تعذر تسجيل الدخول')
      router.push('/client/portal')
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'تعذر تسجيل الدخول')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#1A2E42]">
      <WebsiteHeader />
      <main className="mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="mb-8 text-center">
            <h1 className="text-5xl font-black">دخول العميل</h1>
            <p className="mt-3 text-xl text-slate-600">تابع طلباتك، وشاهد الفواتير، وتواصل مع فريق UBC Print.</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-5">
            <input value={email} onChange={(e) => setEmail(e.target.value)} className="h-14 w-full rounded-xl border border-slate-300 px-4" placeholder="البريد الإلكتروني" type="email" required />
            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="h-14 w-full rounded-xl border border-slate-300 px-4" placeholder="كلمة المرور" required />
            {error && <div className="rounded-2xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">{error}</div>}
            <button disabled={loading} className="h-14 w-full rounded-xl bg-[#097D77] text-lg font-bold text-white disabled:opacity-60">{loading ? 'جاري الدخول...' : 'دخول الحساب'}</button>
          </form>
          <div className="mt-6 text-center text-slate-600">ليس لديك حساب؟ <Link href="/client/register" className="font-bold text-[#223982]">أنشئ حسابًا جديدًا</Link></div>
        </div>
      </main>
      <WebsiteFooter />
      <WhatsAppFloat />
    </div>
  )
}
