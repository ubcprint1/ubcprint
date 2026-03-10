"use client"

import { WebsiteHeader } from "@/components/website-header"
import { WebsiteFooter } from "@/components/website-footer"
import { Truck, Clock, MapPin, Package, CheckCircle2 } from "lucide-react"

export default function ShippingPage() {
  const shippingZones = [
    { zone: "القاهرة والجيزة", time: "2-3 أيام عمل", cost: "مجاني للطلبات أكثر من 500 ج.م" },
    { zone: "الإسكندرية والدلتا", time: "3-5 أيام عمل", cost: "50 ج.م" },
    { zone: "الصعيد", time: "4-6 أيام عمل", cost: "75 ج.م" },
    { zone: "سيناء والبحر الأحمر", time: "5-7 أيام عمل", cost: "100 ج.م" },
  ]

  const features = [
    { icon: Truck, title: "شحن آمن", description: "تغليف احترافي لحماية منتجاتك" },
    { icon: Clock, title: "تتبع الشحنة", description: "تتبع طلبك في كل خطوة" },
    { icon: MapPin, title: "توصيل للباب", description: "نوصل لعنوانك مباشرة" },
    { icon: Package, title: "شحن سريع", description: "خيار التوصيل السريع متاح" },
  ]

  return (
    <div className="min-h-screen flex flex-col" dir="rtl">
      <WebsiteHeader />

      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">الشحن والتوصيل</h1>
          <p className="text-xl text-blue-100">نوصل طلباتك بأمان وسرعة لجميع أنحاء مصر</p>
        </div>
      </section>

      <main className="flex-1 py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-6 mb-12">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-xl p-6 text-center shadow-sm">
                <div className="w-14 h-14 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <feature.icon className="w-7 h-7 text-blue-600" />
                </div>
                <h3 className="font-bold mb-2">{feature.title}</h3>
                <p className="text-slate-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>

          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">مناطق التوصيل والأسعار</h2>
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <table className="w-full">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-6 py-4 text-right font-bold">المنطقة</th>
                    <th className="px-6 py-4 text-right font-bold">مدة التوصيل</th>
                    <th className="px-6 py-4 text-right font-bold">تكلفة الشحن</th>
                  </tr>
                </thead>
                <tbody>
                  {shippingZones.map((zone, index) => (
                    <tr key={index} className="border-t">
                      <td className="px-6 py-4">{zone.zone}</td>
                      <td className="px-6 py-4">{zone.time}</td>
                      <td className="px-6 py-4">{zone.cost}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-8 bg-blue-50 rounded-xl p-6">
              <h3 className="font-bold mb-4">ملاحظات مهمة</h3>
              <ul className="space-y-2">
                {[
                  "الشحن مجاني للطلبات أكثر من 500 ج.م داخل القاهرة والجيزة",
                  "يتم الشحن خلال أيام العمل (السبت - الخميس)",
                  "يتم التواصل معك قبل التوصيل لتأكيد الموعد",
                  "خدمة الشحن السريع متاحة برسوم إضافية",
                ].map((note, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>{note}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </main>

      <WebsiteFooter />
    </div>
  )
}
