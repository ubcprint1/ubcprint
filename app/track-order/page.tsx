"use client"

import { useState } from "react"
import { WebsiteHeader } from "@/components/website-header"
import { WebsiteFooter } from "@/components/website-footer"
import { WhatsAppFloat } from "@/components/whatsapp-float"

const orderSteps = ["قيد المراجعة", "قيد التسعير", "قيد التصميم", "قيد الطباعة", "قيد التجهيز", "تم التسليم"]

export default function TrackOrderPage() {
  const [tracking, setTracking] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<any>(null)

  async function handleTrack() {
    setLoading(true)
    setError(null)
    setResult(null)
    try {
      const res = await fetch(`/api/public/track-order?query=${encodeURIComponent(tracking)}`)
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'تعذر العثور على الطلب')
      setResult(data.order)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'تعذر العثور على الطلب')
    } finally {
      setLoading(false)
    }
  }

  const activeIndex = result ? Math.max(orderSteps.indexOf(result.publicStatus), 0) : -1

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
            <button onClick={handleTrack} disabled={loading} className="h-14 rounded-xl bg-[#097D77] px-8 text-lg font-bold text-white disabled:opacity-60">{loading ? 'جاري البحث...' : 'تتبع الآن'}</button>
          </div>
          {error && <div className="mt-6 rounded-2xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">{error}</div>}
          {result && (
            <div className="mt-8 rounded-2xl bg-[#F8FAFC] p-6">
              <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <div className="text-sm text-slate-500">رقم الطلب</div>
                  <div className="text-2xl font-black">{result.orderNumber}</div>
                </div>
                <div>
                  <div className="text-sm text-slate-500">الحالة الحالية</div>
                  <span className="rounded-full bg-[#EEF3F8] px-4 py-2 text-sm font-bold text-[#223982]">{result.publicStatus}</span>
                </div>
              </div>
              <div className="mb-6 grid gap-4 md:grid-cols-3">
                <div className="rounded-2xl border border-slate-200 bg-white p-4"><div className="text-sm text-slate-500">العميل</div><div className="mt-1 font-bold">{result.customerName}</div></div>
                <div className="rounded-2xl border border-slate-200 bg-white p-4"><div className="text-sm text-slate-500">المنتج</div><div className="mt-1 font-bold">{result.productName || 'مشروع مخصص'}</div></div>
                <div className="rounded-2xl border border-slate-200 bg-white p-4"><div className="text-sm text-slate-500">طريقة الاستلام</div><div className="mt-1 font-bold">{result.deliveryMethod === 'PICKUP' ? 'استلام من المطبعة' : 'شحن'}</div></div>
              </div>
              <div className="grid gap-4 md:grid-cols-6">
                {orderSteps.map((step, index) => (
                  <div key={step} className={`rounded-2xl border p-4 text-center text-sm font-bold ${index <= activeIndex ? "border-[#097D77] bg-green-50 text-[#097D77]" : "border-slate-200 bg-white text-slate-500"}`}>{step}</div>
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
