import { WebsiteHeader } from "@/components/website-header"
import { WebsiteFooter } from "@/components/website-footer"
import { WhatsAppFloat } from "@/components/whatsapp-float"

const faqs = [
  ["ما طرق الدفع المتاحة؟", "يمكن الدفع عبر InstaPay أو Vodafone Cash أو التحويل البنكي على البنك الأهلي المصري أو الدفع كاش."],
  ["هل يمكن رفع ملفات الطباعة؟", "نعم، يمكنك رفع ملفات بصيغ PDF, AI, PSD, CDR, PNG, JPG, ZIP وRAR أو طلب التواصل مع المصمم."],
  ["هل التوصيل متوفر؟", "نعم، يتوفر الاستلام من المطبعة أو الشحن حسب المدينة والطلب."],
  ["كيف أتابع الطلب؟", "من صفحة تتبع الطلب أدخل رقم الطلب أو سجل دخولك إلى بوابة العميل لمتابعة الحالة."],
]

export default function HelpPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#1A2E42]">
      <WebsiteHeader />
      <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <section className="rounded-3xl bg-[#223982] px-8 py-14 text-center text-white">
          <h1 className="text-5xl font-black">المساعدة</h1>
          <p className="mt-4 text-xl text-white/85">كل ما تحتاجه لإتمام طلبك من UBC Print بسهولة.</p>
        </section>
        <section id="faq" className="mt-10 grid gap-6 md:grid-cols-2">
          {faqs.map(([q, a]) => (
            <div key={q} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="mb-3 text-2xl font-bold">{q}</h3>
              <p className="text-slate-600">{a}</p>
            </div>
          ))}
        </section>
      </main>
      <WebsiteFooter />
      <WhatsAppFloat />
    </div>
  )
}
