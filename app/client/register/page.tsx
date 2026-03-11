"use client"

import Link from "next/link"
import { WebsiteHeader } from "@/components/website-header"
import { WebsiteFooter } from "@/components/website-footer"
import { WhatsAppFloat } from "@/components/whatsapp-float"

export default function ClientRegisterPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#1A2E42]">
      <WebsiteHeader />
      <main className="mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="mb-8 text-center">
            <h1 className="text-5xl font-black">إنشاء حساب</h1>
            <p className="mt-3 text-xl text-slate-600">أنشئ حساب عميل جديد لرفع الملفات ومتابعة الطلبات.</p>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            <input className="h-14 rounded-xl border border-slate-300 px-4" placeholder="الاسم الكامل" />
            <input className="h-14 rounded-xl border border-slate-300 px-4" placeholder="رقم الهاتف" />
            <input className="h-14 rounded-xl border border-slate-300 px-4 md:col-span-2" placeholder="البريد الإلكتروني" />
            <input type="password" className="h-14 rounded-xl border border-slate-300 px-4" placeholder="كلمة المرور" />
            <input type="password" className="h-14 rounded-xl border border-slate-300 px-4" placeholder="تأكيد كلمة المرور" />
          </div>
          <button className="mt-6 h-14 w-full rounded-xl bg-[#097D77] text-lg font-bold text-white">إنشاء الحساب</button>
          <div className="mt-6 text-center text-slate-600">لديك حساب بالفعل؟ <Link href="/client/login" className="font-bold text-[#223982]">سجّل الدخول</Link></div>
        </div>
      </main>
      <WebsiteFooter />
      <WhatsAppFloat />
    </div>
  )
}
