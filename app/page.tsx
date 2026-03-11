import Link from 'next/link'
import { WebsiteHeader } from '@/components/website-header'
import { WebsiteFooter } from '@/components/website-footer'
import { WhatsappFloat } from '@/components/whatsapp-float'

const cards = [
  { title: 'المنتجات المخصصة', href: '/products' },
  { title: 'الملابس', href: '/products/apparel' },
  { title: 'المنتجات الترويجية', href: '/products/promo' },
  { title: 'المجموعات والفعاليات', href: '/products/events' },
  { title: 'استوديو التصميم', href: '/design' },
  { title: 'اطلب عرض سعر', href: '/request-quote' },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <WebsiteHeader />
      <main>
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div className="space-y-6">
              <span className="inline-flex rounded-full bg-[#223982]/10 px-4 py-2 text-sm font-medium text-[#223982]">UBC Print</span>
              <h1 className="text-4xl font-bold leading-tight text-[#1A2E42] sm:text-5xl">كل خدمات الطباعة والتجهيز في مكان واحد</h1>
              <p className="text-lg leading-8 text-slate-600">اطلب مشروعك، ارفع ملفاتك، تابع التنفيذ، واختر الاستلام من المطبعة أو الشحن. تجربة عميل واضحة ومختلفة تمامًا عن نظام الموظفين الداخلي.</p>
              <div className="flex flex-wrap gap-4">
                <Link href="/request-quote" className="rounded-xl bg-[#097D77] px-6 py-3 font-medium text-white hover:opacity-90">اطلب الآن</Link>
                <Link href="/track-order" className="rounded-xl border border-[#1A2E42] px-6 py-3 font-medium text-[#1A2E42]">تتبع الطلب</Link>
              </div>
            </div>
            <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
              <div className="grid gap-4 sm:grid-cols-2">
                {cards.map((card) => (
                  <Link key={card.href} href={card.href} className="rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:border-[#223982] hover:bg-white">
                    <div className="text-lg font-semibold text-[#1A2E42]">{card.title}</div>
                    <div className="mt-2 text-sm text-slate-500">اضغط للدخول</div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <WebsiteFooter />
      <WhatsappFloat />
    </div>
  )
}
