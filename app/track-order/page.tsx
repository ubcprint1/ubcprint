"use client"

import { useState } from "react"
import { WebsiteHeader } from "@/components/website-header"
import { WebsiteFooter } from "@/components/website-footer"
import { WhatsAppFloat } from "@/components/whatsapp-float"

const orderSteps = ["قيد التسعير", "قيد التنفيذ", "قيد الطباعة", "قيد التجهيز", "جاهز", "تم التسليم"]

export default function TrackOrderPage() {
  const [tracking, setTracking] = useState("")
  const [show, setShow] = useState(false)
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#1A2E42]">
      <WebsiteHeader />
      <main className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <section className="rounded-3xl bg-[#223982] px-8 py-14 text-center text-white">
          <h1 className="text-5xl font-black">تتبع الطلب</h1>
          <p className="mt-4 text-xl text-white/85">أدخل رقم الطلب أو رقم الهاتف لمعرفة حالة التنفيذ الحالية.</p>
        </section>
        <section className="mt-10 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="grid gap-4 md:grid-cols-[1fr_auto]">
            <input value={tracking} onChange={(e) => setTracking(e.target.value)} placeholder="أدخل رقم الطلب أو رقم الهاتف" className="h-14 rounded-xl border border-slate-300 px-4 text-lg outline-none" />
            <button onClick={() => setShow(true)} className="h-14 rounded-xl bg-[#097D77] px-8 text-lg font-bold text-white">تتبع الآن</button>
          </div>
          {show && (
            <div className="mt-8 rounded-2xl bg-[#F8FAFC] p-6">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <div className="text-sm text-slate-500">رقم الطلب</div>
                  <div className="text-2xl font-black">{tracking || "ORD-1001"}</div>
                </div>
                <span className="rounded-full bg-[#EEF3F8] px-4 py-2 text-sm font-bold text-[#223982]">قيد التنفيذ</span>
              </div>
              <div className="grid gap-4 md:grid-cols-6">
                {orderSteps.map((step, index) => (
                  <div key={step} className={`rounded-2xl border p-4 text-center ${index <= 2 ? "border-[#097D77] bg-green-50" : "border-slate-200 bg-white"}`}>{step}</div>
                ))}
              </div>
            </div>
          )}
        </section>
      </main>
      <WebsiteFooter />
      <WhatsAppFloat />
    </div>
  )
}
