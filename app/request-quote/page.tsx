"use client"

import { useState } from "react"
import { WebsiteHeader } from "@/components/website-header"
import { WebsiteFooter } from "@/components/website-footer"
import { WhatsAppFloat } from "@/components/whatsapp-float"

const machines = ["Laser", "Cutting", "Packaging", "Fiber Laser", "Plotter", "UV", "UV DTF", "Sublimation", "Sublimation Roll", "Digital", "ID Printer"]

export default function RequestQuotePage() {
  const [form, setForm] = useState({
    customerName: "",
    phone: "",
    email: "",
    quantity: 1,
    productName: "",
    deliveryMethod: "SHIPPING",
    paymentMethod: "instapay",
    machine: "",
    shippingAddress: "",
    description: "",
    designHelp: false,
  })
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setResult(null)
    try {
      const res = await fetch('/api/public/request-quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'تعذر إرسال الطلب')
      setResult(`تم استلام طلبك بنجاح. رقم الطلب: ${data.orderNumber}`)
      setForm({
        customerName: "",
        phone: "",
        email: "",
        quantity: 1,
        productName: "",
        deliveryMethod: "SHIPPING",
        paymentMethod: "instapay",
        machine: "",
        shippingAddress: "",
        description: "",
        designHelp: false,
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'حدث خطأ غير متوقع')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#1A2E42]">
      <WebsiteHeader />
      <main className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <h1 className="mb-3 text-center text-5xl font-black">اطلب عرض سعر</h1>
          <p className="mb-8 text-center text-lg text-slate-600">أرسل تفاصيل مشروعك وسنتواصل معك بالتسعير وطريقة التنفيذ المناسبة.</p>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid gap-5 md:grid-cols-2">
              <input value={form.customerName} onChange={(e) => setForm({ ...form, customerName: e.target.value })} className="h-14 rounded-xl border border-slate-300 px-4" placeholder="الاسم" required />
              <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="h-14 rounded-xl border border-slate-300 px-4" placeholder="رقم الهاتف" required />
              <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="h-14 rounded-xl border border-slate-300 px-4" placeholder="البريد الإلكتروني" type="email" />
              <input value={form.productName} onChange={(e) => setForm({ ...form, productName: e.target.value })} className="h-14 rounded-xl border border-slate-300 px-4" placeholder="اسم المشروع أو المنتج" />
              <input value={form.quantity} onChange={(e) => setForm({ ...form, quantity: Number(e.target.value || 1) })} className="h-14 rounded-xl border border-slate-300 px-4" placeholder="الكمية" type="number" min={1} />
              <select value={form.deliveryMethod} onChange={(e) => setForm({ ...form, deliveryMethod: e.target.value })} className="h-14 rounded-xl border border-slate-300 px-4"><option value="SHIPPING">شحن</option><option value="PICKUP">استلام من المطبعة</option></select>
              <select value={form.paymentMethod} onChange={(e) => setForm({ ...form, paymentMethod: e.target.value })} className="h-14 rounded-xl border border-slate-300 px-4"><option value="instapay">InstaPay</option><option value="vodafone_cash">Vodafone Cash</option><option value="bank_transfer">تحويل بنكي</option><option value="cash">كاش</option></select>
              <select value={form.machine} onChange={(e) => setForm({ ...form, machine: e.target.value })} className="h-14 rounded-xl border border-slate-300 px-4"><option value="">اختر ماكينة مناسبة</option>{machines.map((machine) => <option key={machine}>{machine}</option>)}</select>
              <input value={form.shippingAddress} onChange={(e) => setForm({ ...form, shippingAddress: e.target.value })} className="h-14 rounded-xl border border-slate-300 px-4 md:col-span-2" placeholder="عنوان الشحن - يترك فارغًا في حال الاستلام من المطبعة" />
              <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="min-h-36 rounded-xl border border-slate-300 px-4 py-3 md:col-span-2" placeholder="اكتب تفاصيل مشروعك" required />
            </div>

            <label className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm font-medium">
              <input type="checkbox" checked={form.designHelp} onChange={(e) => setForm({ ...form, designHelp: e.target.checked })} />
              أحتاج تواصل مع المصمم لمساعدتي في تجهيز التصميم
            </label>

            <div className="rounded-2xl border-2 border-dashed border-slate-300 p-6 text-center text-slate-500">
              رفع الملفات سيكون في المرحلة التالية، وحاليًا يمكنك إرسال الطلب ثم التواصل مع المصمم عبر واتساب.
            </div>

            {error && <div className="rounded-2xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">{error}</div>}
            {result && <div className="rounded-2xl bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700">{result}</div>}

            <div className="mt-6 flex flex-wrap gap-3">
              <button disabled={loading} className="h-14 flex-1 rounded-xl bg-[#097D77] px-6 text-lg font-bold text-white disabled:opacity-60">{loading ? 'جاري الإرسال...' : 'إرسال الطلب'}</button>
              <a href="https://wa.me/201036930965" target="_blank" rel="noreferrer" className="inline-flex h-14 items-center rounded-xl border border-slate-300 px-6 font-bold">التواصل مع المصمم</a>
            </div>
          </form>
        </div>
      </main>
      <WebsiteFooter />
      <WhatsAppFloat />
    </div>
  )
}
