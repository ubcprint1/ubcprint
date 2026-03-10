"use client"

import Link from "next/link"
import { WebsiteHeader } from "@/components/website-header"
import { WebsiteFooter } from "@/components/website-footer"
import { Button } from "@/components/ui/button"
import { RotateCcw, CheckCircle2, XCircle, AlertCircle, MessageCircle } from "lucide-react"

export default function ReturnsPage() {
  const acceptedReturns = [
    "عيوب في الطباعة (ألوان خاطئة، طباعة غير واضحة)",
    "خامات تالفة أو معيبة",
    "كمية خاطئة",
    "منتج مختلف عن المطلوب",
  ]

  const notAcceptedReturns = [
    "تغيير رأي العميل بعد الطباعة",
    "خطأ في التصميم المقدم من العميل",
    "المنتجات المخصصة بأسماء أو تصاميم شخصية",
    "الطلبات التي تم استلامها منذ أكثر من 7 أيام",
  ]

  return (
    <div className="min-h-screen flex flex-col" dir="rtl">
      <WebsiteHeader />

      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">سياسة الإرجاع والاستبدال</h1>
          <p className="text-xl text-blue-100">رضا العملاء أولويتنا</p>
        </div>
      </section>

      <main className="flex-1 py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-xl p-8 shadow-sm mb-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center">
                  <RotateCcw className="w-7 h-7 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">سياستنا</h2>
                  <p className="text-slate-600">نلتزم بضمان جودة منتجاتنا</p>
                </div>
              </div>
              <p className="text-slate-700 leading-relaxed">
                نحن في UBC Print نضمن جودة جميع منتجاتنا. إذا وجدت أي عيب في الطباعة أو الخامة، نلتزم بإعادة الطباعة مجاناً أو استرداد المبلغ خلال 7 أيام من استلام الطلب.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-green-700">
                  <CheckCircle2 className="w-5 h-5" />
                  حالات مقبولة للإرجاع
                </h3>
                <ul className="space-y-3">
                  {acceptedReturns.map((item, index) => (
                    <li key={index} className="flex items-start gap-2 text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0 mt-1" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-red-700">
                  <XCircle className="w-5 h-5" />
                  حالات غير مقبولة
                </h3>
                <ul className="space-y-3">
                  {notAcceptedReturns.map((item, index) => (
                    <li key={index} className="flex items-start gap-2 text-slate-700">
                      <XCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-1" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="bg-amber-50 rounded-xl p-6 mb-8">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-amber-700">
                <AlertCircle className="w-5 h-5" />
                خطوات طلب الإرجاع
              </h3>
              <ol className="space-y-3 list-decimal list-inside text-slate-700">
                <li>تواصل معنا عبر واتساب خلال 7 أيام من استلام الطلب</li>
                <li>أرسل صور توضح المشكلة</li>
                <li>سيتم مراجعة طلبك خلال 24 ساعة</li>
                <li>في حالة القبول، سيتم إعادة الطباعة أو استرداد المبلغ</li>
              </ol>
            </div>

            <div className="text-center">
              <p className="text-slate-600 mb-4">لديك مشكلة مع طلبك؟</p>
              <a href="https://wa.me/201036930965?text=لدي مشكلة مع طلبي" target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="bg-green-600 hover:bg-green-700">
                  <MessageCircle className="w-5 h-5 ml-2" />
                  تواصل معنا عبر واتساب
                </Button>
              </a>
            </div>
          </div>
        </div>
      </main>

      <WebsiteFooter />
    </div>
  )
}
