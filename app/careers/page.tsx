"use client"

import Link from "next/link"
import { WebsiteHeader } from "@/components/website-header"
import { WebsiteFooter } from "@/components/website-footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Briefcase, MapPin, Clock, Users, Heart, Zap, Award, MessageCircle } from "lucide-react"

export default function CareersPage() {
  const jobs = [
    {
      title: "مصمم جرافيك",
      department: "التصميم",
      location: "القاهرة",
      type: "دوام كامل",
      description: "نبحث عن مصمم جرافيك مبدع للانضمام لفريقنا",
    },
    {
      title: "فني طباعة",
      department: "الإنتاج",
      location: "القاهرة",
      type: "دوام كامل",
      description: "خبرة في تشغيل ماكينات الطباعة الرقمية والأوفست",
    },
    {
      title: "مسؤول مبيعات",
      department: "المبيعات",
      location: "القاهرة",
      type: "دوام كامل",
      description: "للتواصل مع العملاء وتحقيق أهداف المبيعات",
    },
  ]

  const benefits = [
    { icon: Heart, title: "تأمين صحي", description: "تأمين صحي شامل لك ولعائلتك" },
    { icon: Zap, title: "بيئة عمل محفزة", description: "فريق شاب ومبدع" },
    { icon: Award, title: "فرص للتطور", description: "تدريب مستمر وفرص للترقي" },
    { icon: Users, title: "ثقافة تعاونية", description: "نعمل كفريق واحد" },
  ]

  return (
    <div className="min-h-screen flex flex-col" dir="rtl">
      <WebsiteHeader />

      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">انضم لفريقنا</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            نبحث دائماً عن المواهب المميزة للانضمام لفريق UBC Print
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">لماذا تعمل معنا؟</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center p-6 bg-slate-50 rounded-xl">
                <div className="w-14 h-14 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <benefit.icon className="w-7 h-7 text-blue-600" />
                </div>
                <h3 className="font-bold mb-2">{benefit.title}</h3>
                <p className="text-slate-600 text-sm">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">الوظائف المتاحة</h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {jobs.map((job, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-bold mb-2">{job.title}</h3>
                    <p className="text-slate-600 mb-3">{job.description}</p>
                    <div className="flex flex-wrap gap-3">
                      <Badge variant="secondary" className="flex items-center gap-1">
                        <Briefcase className="w-3 h-3" />
                        {job.department}
                      </Badge>
                      <Badge variant="secondary" className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {job.location}
                      </Badge>
                      <Badge variant="secondary" className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {job.type}
                      </Badge>
                    </div>
                  </div>
                  <a href="https://wa.me/201036930965?text=أريد التقدم لوظيفة: ${job.title}" target="_blank" rel="noopener noreferrer">
                    <Button>تقدم الآن</Button>
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-slate-600 mb-4">لم تجد الوظيفة المناسبة؟ أرسل سيرتك الذاتية</p>
            <a href="mailto:careers@ubcprint.com">
              <Button variant="outline">
                <MessageCircle className="w-4 h-4 ml-2" />
                تواصل معنا
              </Button>
            </a>
          </div>
        </div>
      </section>

      <WebsiteFooter />
    </div>
  )
}
