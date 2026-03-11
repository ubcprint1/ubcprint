"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { WebsiteHeader } from "@/components/website-header"
import { WebsiteFooter } from "@/components/website-footer"
import { WhatsAppFloat } from "@/components/whatsapp-float"

export default function ClientRegisterPage() {
  const router = useRouter()
  const [form, setForm] = useState({ fullName: '', phone: '', email: '', password: '', confirmPassword: '' })
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (form.password !== form.confirmPassword) {
      setError('كلمتا المرور غير متطابقتين')
      return
    }
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/client/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'تعذر إنشاء الحساب')
      router.push(data.redirectTo || '/client/portal')
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'تعذر إنشاء الحساب')
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
            <h1 className="text-5xl font-black">إنشاء حساب</h1>
            <p className="mt-3 text-xl text-slate-600">أنشئ حساب عميل جديد لرفع الملفات ومتابعة الطلبات.</p>
          </div>
          <form onSubmit={handleSubmit} className="grid gap-5 md:grid-cols-2">
            <input value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} className="h-14 rounded-xl border border-slate-300 px-4" placeholder="الاسم الكامل" required />
            <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="h-14 rounded-xl border border-slate-300 px-4" placeholder="رقم الهاتف" required />
            <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="h-14 rounded-xl border border-slate-300 px-4 md:col-span-2" placeholder="البريد الإلكتروني" type="email" required />
            <input value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} type="password" className="h-14 rounded-xl border border-slate-300 px-4" placeholder="كلمة المرور" required />
            <input value={form.confirmPassword} onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })} type="password" className="h-14 rounded-xl border border-slate-300 px-4" placeholder="تأكيد كلمة المرور" required />
            {error && <div className="rounded-2xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700 md:col-span-2">{error}</div>}
            <button disabled={loading} className="mt-2 h-14 w-full rounded-xl bg-[#097D77] text-lg font-bold text-white disabled:opacity-60 md:col-span-2">{loading ? 'جاري إنشاء الحساب...' : 'إنشاء الحساب'}</button>
          </form>
          <div className="mt-6 text-center text-slate-600">لديك حساب بالفعل؟ <Link href="/client/login" className="font-bold text-[#223982]">سجّل الدخول</Link></div>
        </div>
      </main>
      <WebsiteFooter />
      <WhatsAppFloat />
    </div>
  )
}
