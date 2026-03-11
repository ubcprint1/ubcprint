"use client"

import { useState } from "react"
import Link from "next/link"
import { WebsiteHeader } from "@/components/website-header"
import { WebsiteFooter } from "@/components/website-footer"
import { WhatsAppFloat } from "@/components/whatsapp-float"

export default function ClientLoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#1A2E42]">
      <WebsiteHeader />
      <main className="mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="mb-8 text-center">
            <h1 className="text-5xl font-black">تسجيل الدخول</h1>
            <p className="mt-3 text-xl text-slate-600">سجّل دخولك لمتابعة طلباتك وإدارة ملفاتك.</p>
          </div>
          <div className="space-y-5">
            <div>
              <label className="mb-2 block text-lg font-bold">البريد الإلكتروني</label>
              <input value={email} onChange={(e) => setEmail(e.target.value)} className="h-14 w-full rounded-xl border border-slate-300 px-4" placeholder="name@example.com" />
            </div>
            <div>
              <label className="mb-2 block text-lg font-bold">كلمة المرور</label>
              <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="h-14 w-full rounded-xl border border-slate-300 px-4" placeholder="********" />
            </div>
            <button className="h-14 w-full rounded-xl bg-[#097D77] text-lg font-bold text-white">دخول</button>
          </div>
          <div className="mt-6 text-center text-slate-600">ليس لديك حساب؟ <Link href="/client/register" className="font-bold text-[#223982]">أنشئ حسابًا جديدًا</Link></div>
        </div>
      </main>
      <WebsiteFooter />
      <WhatsAppFloat />
    </div>
  )
}
