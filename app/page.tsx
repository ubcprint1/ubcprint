import Link from "next/link"
import { WebsiteHeader } from "@/components/website-header"
import { WebsiteFooter } from "@/components/website-footer"
import { WhatsAppFloat } from "@/components/whatsapp-float"
import { featuredCategories, brandNames, reviews, guarantees, helpFeatures } from "@/lib/front-data"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Printer, Shield, Clock3, Truck, ChevronLeft, CheckCircle2 } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#1A2E42]">
      <WebsiteHeader />
      <main>
        <section className="bg-[#EEF3F8]">
          <div className="mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 lg:px-8">
            <Badge className="mb-5 rounded-full bg-[#DCE6FF] px-4 py-1 text-[#223982] hover:bg-[#DCE6FF]">توصيل مجاني خلال أسبوعين</Badge>
            <h1 className="text-5xl font-black leading-tight md:text-7xl">
              أفضل خدمات الطباعة <br />
              <span className="text-[#223982]">الاحترافية</span>
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-xl text-slate-600">
              نوفر لك جميع حلول الطباعة من كروت شخصية وبروشورات إلى بنرات وإعلانات خارجية بأعلى جودة وأفضل سعر.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link href="/request-quote"><Button className="h-12 rounded-xl bg-[#097D77] px-6 text-base hover:bg-[#086660]">اطلب عرض سعر</Button></Link>
              <Link href="/products"><Button variant="outline" className="h-12 rounded-xl border-slate-300 px-6 text-base bg-white">تصفح المنتجات</Button></Link>
            </div>
            <div className="mx-auto mt-10 flex max-w-2xl flex-wrap items-center justify-center gap-4 rounded-2xl border border-slate-200 bg-white px-5 py-4 text-sm text-slate-600 shadow-sm">
              <span className="inline-flex items-center gap-2"><Truck className="h-4 w-4 text-[#223982]" /> توصيل مجاني</span>
              <span className="inline-flex items-center gap-2"><Clock3 className="h-4 w-4 text-[#223982]" /> تسليم خلال أسبوعين</span>
              <span className="inline-flex items-center gap-2"><Shield className="h-4 w-4 text-[#223982]" /> ضمان رضا 100%</span>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <h2 className="mb-10 text-center text-4xl font-black">المنتجات المخصصة والترويجية لمجموعتك</h2>
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {featuredCategories.map((item) => (
              <Link key={item.title} href={item.href} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                <div className="flex aspect-square items-center justify-center bg-[#EAF0F6] text-[#91A3BD]"><Printer className="h-16 w-16" /></div>
                <div className="p-5 text-right font-bold">{item.title}</div>
              </Link>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link href="/products" className="inline-flex items-center gap-2 rounded-xl border border-slate-300 px-5 py-3 font-medium text-slate-700">عرض جميع المنتجات <ChevronLeft className="h-4 w-4" /></Link>
          </div>
        </section>

        <section className="bg-gradient-to-l from-[#223982] to-[#6B3CF3] py-8 text-white">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
            <div>
              <h3 className="text-4xl font-black">المنتجات الجديدة هنا</h3>
              <p className="mt-2 text-lg text-white/80">استعد الموسم مع مجموعة جديدة من العلامات التجارية المفضلة لديك</p>
            </div>
            <Link href="/products"><Button className="rounded-xl bg-white px-6 text-[#223982] hover:bg-slate-100">تسوق الآن</Button></Link>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <h2 className="mb-10 text-center text-4xl font-black">العلامات التجارية المميزة</h2>
          <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6">
            {brandNames.map((brand) => (
              <div key={brand} className="flex h-48 items-center justify-center rounded-2xl border border-slate-200 bg-white text-3xl font-black text-[#93A4BF] shadow-sm">{brand}</div>
            ))}
          </div>
          <div className="mt-8 text-center"><Link href="/products" className="text-[#223982]">عرض جميع المنتجات</Link></div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 lg:px-8">
          <h2 className="text-4xl font-black">خير بجانبك</h2>
          <p className="mx-auto mt-4 max-w-4xl text-xl text-slate-600">هل تحتاج مساعدة في طلبك؟ احصل على دعم شخصي من فريق الخبراء لدينا كخبراء من التصميم إلى التسليم.</p>
          <div className="mt-10 grid gap-6 md:grid-cols-4">
            {helpFeatures.map((feature) => (
              <div key={feature.title} className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#EEF3F8] text-[#223982]">
                  <CheckCircle2 className="h-7 w-7" />
                </div>
                <h3 className="mb-3 text-2xl font-bold">{feature.title}</h3>
                <p className="text-slate-600">{feature.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a href="https://wa.me/201036930965" target="_blank" rel="noreferrer"><Button className="bg-[#097D77] hover:bg-[#086660]">دردش معنا</Button></a>
            <Link href="/contact"><Button variant="outline" className="bg-white">راسلنا</Button></Link>
            <a href="tel:01036930965"><Button className="bg-[#223982] hover:bg-[#1A2E42]" dir="ltr">01036930965</Button></a>
          </div>
        </section>

        <section className="bg-[#EEF3F8] px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl rounded-3xl bg-white p-10 text-center shadow-sm">
            <h2 className="text-4xl font-black">السعر يشمل كل شيء</h2>
            <div className="mt-8 grid gap-4 text-lg text-slate-700 md:grid-cols-2">
              {guarantees.map((item) => (
                <div key={item} className="flex items-center justify-center gap-3"><CheckCircle2 className="h-5 w-5 text-[#097D77]" /> {item}</div>
              ))}
            </div>
            <Link href="/request-quote" className="mt-8 inline-block text-[#223982]">تعرف على المزيد</Link>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <h2 className="mb-10 text-center text-4xl font-black">ماذا يقول عملاؤنا</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {reviews.map((review) => (
              <div key={review.name} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-4 text-2xl text-amber-400">★★★★★</div>
                <p className="mb-6 text-lg text-slate-700">{review.text}</p>
                <div className="font-bold">{review.name}</div>
                <div className="text-slate-500">{review.city}</div>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center"><Link href="/help#faq" className="inline-flex rounded-xl border border-slate-300 px-5 py-3">الأسئلة الشائعة</Link></div>
        </section>

        <section className="bg-[#245EEB] px-4 py-16 text-center text-white sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl">
            <Shield className="mx-auto h-16 w-16" />
            <h2 className="mt-4 text-5xl font-black">ضمان الرضا لدينا</h2>
            <p className="mx-auto mt-5 max-w-4xl text-xl leading-9 text-white/90">
              سنجعل الأمر صحيحًا أو سنعيد المحاولة. المنتجات المخصصة عادة ما تكون مصحوبة بضمانات، لكنها غير ذلك: نحن نقدم منتجات عالية الجودة - منتجات تبدو تمامًا كما أشرت على موقعنا - ونقوم بذلك في الوقت المحدد.
            </p>
            <p className="mx-auto mt-5 max-w-4xl text-xl leading-9 text-white/90">
              إذا كانت المنتجات المخصصة التي تتلقاها تختلف ماديًا عما أنشأته، أو إذا كانت متأخرة عن الموعد المحدد، فسنصلح الأمر من أجلك.
            </p>
            <Link href="/help" className="mt-8 inline-flex rounded-xl bg-white px-6 py-3 font-bold text-[#223982]">تعرف على المزيد</Link>
          </div>
        </section>
      </main>
      <WebsiteFooter />
      <WhatsAppFloat />
    </div>
  )
}
