"use client"

import Link from "next/link"
import { WebsiteHeader } from "@/components/website-header"
import { WebsiteFooter } from "@/components/website-footer"
import { Users, Award, Clock, Target, CheckCircle2, Printer, Palette, Truck } from "lucide-react"

export default function AboutPage() {
  const stats = [
    { label: "سنوات الخبرة", value: "15+", icon: Clock },
    { label: "عميل سعيد", value: "10,000+", icon: Users },
    { label: "مشروع منجز", value: "50,000+", icon: Target },
    { label: "جوائز", value: "25+", icon: Award },
  ]

  const values = [
    { title: "الجودة العالية", description: "نستخدم أحدث تقنيات الطباعة وأفضل الخامات لضمان نتائج مذهلة", icon: Award },
    { title: "التسليم السريع", description: "نلتزم بمواعيد التسليم المحددة دون تأخير", icon: Truck },
    { title: "أسعار تنافسية", description: "نقدم أفضل الأسعار في السوق مع الحفاظ على الجودة", icon: Target },
    { title: "دعم فني متميز", description: "فريق متخصص لمساعدتك في كل خطوة", icon: Users },
  ]

  const services = [
    "طباعة الكروت الشخصية والتجارية",
    "طباعة البروشورات والكتالوجات",
    "طباعة البنرات واللافتات",
    "طباعة الملابس والأقمشة",
    "طباعة الهدايا الترويجية",
    "تصميم الشعارات والهوية البصرية",
  ]

  return (
    <div className="min-h-screen flex flex-col" dir="rtl">
      <WebsiteHeader />

      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">من نحن</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            نحن شركة UBC Print، رواد صناعة الطباعة في مصر منذ أكثر من 15 عاماً. نقدم حلول طباعة متكاملة بأعلى جودة وأفضل الأسعار.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <stat.icon className="w-8 h-8 text-blue-600" />
                </div>
                <div className="text-3xl font-bold text-slate-900 mb-1">{stat.value}</div>
                <div className="text-slate-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">قصتنا</h2>
            <div className="bg-white rounded-xl p-8 shadow-sm">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
                  <Printer className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">UBC Print</h3>
                  <p className="text-slate-600">تأسست عام 2009</p>
                </div>
              </div>
              <p className="text-slate-700 leading-relaxed mb-4">
                بدأت رحلتنا في عام 2009 بمطبعة صغيرة وحلم كبير: تقديم خدمات طباعة احترافية بأسعار معقولة. اليوم، أصبحنا واحدة من أكبر شركات الطباعة في مصر، مع فريق يضم أكثر من 50 متخصصاً.
              </p>
              <p className="text-slate-700 leading-relaxed">
                نفخر بخدمة آلاف العملاء من الأفراد والشركات الصغيرة والمتوسطة والكبرى، ونسعى دائماً لتقديم أفضل النتائج التي تفوق توقعات عملائنا.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">قيمنا</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div key={index} className="bg-slate-50 rounded-xl p-6 text-center hover:shadow-md transition-shadow">
                <div className="w-14 h-14 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <value.icon className="w-7 h-7 text-blue-600" />
                </div>
                <h3 className="font-bold text-lg mb-2">{value.title}</h3>
                <p className="text-slate-600 text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">خدماتنا</h2>
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-xl p-8 shadow-sm">
              <div className="grid md:grid-cols-2 gap-4">
                {services.map((service, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span className="text-slate-700">{service}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <WebsiteFooter />
    </div>
  )
}
