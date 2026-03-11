import { WebsiteHeader } from "@/components/website-header"
import { WebsiteFooter } from "@/components/website-footer"
import { WhatsAppFloat } from "@/components/whatsapp-float"

export default function RequestQuotePage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#1A2E42]">
      <WebsiteHeader />
      <main className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <h1 className="mb-6 text-center text-5xl font-black">اطلب عرض سعر</h1>
          <div className="grid gap-5 md:grid-cols-2">
            <input className="h-14 rounded-xl border border-slate-300 px-4" placeholder="الاسم" />
            <input className="h-14 rounded-xl border border-slate-300 px-4" placeholder="رقم الهاتف" />
            <input className="h-14 rounded-xl border border-slate-300 px-4" placeholder="البريد الإلكتروني" />
            <select className="h-14 rounded-xl border border-slate-300 px-4"><option>طريقة الاستلام</option><option>استلام من المطبعة</option><option>شحن</option></select>
            <select className="h-14 rounded-xl border border-slate-300 px-4"><option>طريقة الدفع</option><option>InstaPay</option><option>Vodafone Cash</option><option>تحويل بنكي</option><option>كاش</option></select>
            <select className="h-14 rounded-xl border border-slate-300 px-4"><option>الماكينة المطلوبة</option><option>Laser</option><option>Cutting</option><option>Packaging</option><option>Fiber Laser</option><option>Plotter</option><option>UV</option><option>UV DTF</option><option>Sublimation</option><option>Sublimation Roll</option><option>Digital</option><option>ID Printer</option></select>
            <textarea className="min-h-36 rounded-xl border border-slate-300 px-4 py-3 md:col-span-2" placeholder="اكتب تفاصيل مشروعك" />
          </div>
          <div className="mt-5 rounded-2xl border-2 border-dashed border-slate-300 p-8 text-center text-slate-500">ارفع ملفات الطباعة بأي صيغة أو اختر التواصل مع المصمم</div>
          <div className="mt-6 flex flex-wrap gap-3">
            <button className="h-14 flex-1 rounded-xl bg-[#097D77] px-6 text-lg font-bold text-white">إرسال الطلب</button>
            <a href="https://wa.me/201036930965" target="_blank" rel="noreferrer" className="inline-flex h-14 items-center rounded-xl border border-slate-300 px-6 font-bold">التواصل مع المصمم</a>
          </div>
        </div>
      </main>
      <WebsiteFooter />
      <WhatsAppFloat />
    </div>
  )
}
