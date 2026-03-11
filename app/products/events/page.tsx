import { WebsiteHeader } from "@/components/website-header"
import { WebsiteFooter } from "@/components/website-footer"
import { WhatsAppFloat } from "@/components/whatsapp-float"
import Link from "next/link"

const items = [
  ["بنرات الفعاليات", "من 200 ج.م"],
  ["رول أب ستاند", "من 350 ج.م"],
  ["خلفيات تصوير", "حسب المقاس"],
  ["هدايا الشركات", "حسب الطلب"],
]

export default function EventsPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#1A2E42]">
      <WebsiteHeader />
      <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-[#223982] px-8 py-14 text-center text-white"><h1 className="text-5xl font-black">المجموعات والفعاليات</h1><p className="mt-4 text-xl text-white/85">حلول طباعة للمؤتمرات والمعارض والفرق والمناسبات.</p></div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {items.map(([name, price]) => (
            <Link key={name} href="/request-quote" className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="aspect-square bg-[#EAF0F6]" />
              <div className="p-5"><div className="text-xl font-bold">{name}</div><div className="mt-4 font-black text-[#223982]">{price}</div></div>
            </Link>
          ))}
        </div>
      </main>
      <WebsiteFooter />
      <WhatsAppFloat />
    </div>
  )
}
