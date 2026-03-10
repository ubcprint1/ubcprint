"use client"

import React from "react"

import { useState } from "react"
import { WebsiteHeader } from "@/components/website-header"
import { WebsiteFooter } from "@/components/website-footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Phone, Mail, MapPin, Clock, MessageCircle, Send } from "lucide-react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const message = `رسالة جديدة من الموقع:
الاسم: ${formData.name}
البريد: ${formData.email}
الهاتف: ${formData.phone}
الموضوع: ${formData.subject}
الرسالة: ${formData.message}`
    window.open(`https://wa.me/201036930965?text=${encodeURIComponent(message)}`, "_blank")
  }

  const contactInfo = [
    { icon: Phone, label: "الهاتف", value: "01036930965", href: "tel:+201036930965" },
    { icon: MessageCircle, label: "واتساب", value: "01036930965", href: "https://wa.me/201036930965" },
    { icon: Mail, label: "البريد الإلكتروني", value: "info@ubcprint.com", href: "mailto:info@ubcprint.com" },
    { icon: MapPin, label: "العنوان", value: "القاهرة، مصر", href: "#" },
  ]

  const workingHours = [
    { day: "السبت - الخميس", hours: "9:00 ص - 6:00 م" },
    { day: "الجمعة", hours: "مغلق" },
  ]

  return (
    <div className="min-h-screen flex flex-col" dir="rtl">
      <WebsiteHeader />

      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">تواصل معنا</h1>
          <p className="text-xl text-blue-100">نحن هنا لمساعدتك. تواصل معنا بأي طريقة تناسبك</p>
        </div>
      </section>

      <main className="flex-1 py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Contact Info */}
            <div className="space-y-6">
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h2 className="text-xl font-bold mb-6">معلومات التواصل</h2>
                <div className="space-y-4">
                  {contactInfo.map((item, index) => (
                    <a
                      key={index}
                      href={item.href}
                      className="flex items-center gap-4 p-3 rounded-lg hover:bg-slate-50 transition-colors"
                    >
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <item.icon className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <div className="text-sm text-slate-500">{item.label}</div>
                        <div className="font-medium">{item.value}</div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-blue-600" />
                  ساعات العمل
                </h2>
                <div className="space-y-3">
                  {workingHours.map((item, index) => (
                    <div key={index} className="flex justify-between">
                      <span className="text-slate-600">{item.day}</span>
                      <span className="font-medium">{item.hours}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl p-8 shadow-sm">
                <h2 className="text-2xl font-bold mb-6">أرسل لنا رسالة</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="name">الاسم الكامل *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="أدخل اسمك"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">البريد الإلكتروني *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="example@email.com"
                        required
                      />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="phone">رقم الهاتف</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="01xxxxxxxxx"
                      />
                    </div>
                    <div>
                      <Label htmlFor="subject">الموضوع *</Label>
                      <Input
                        id="subject"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        placeholder="موضوع الرسالة"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="message">الرسالة *</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="اكتب رسالتك هنا..."
                      rows={6}
                      required
                    />
                  </div>
                  <Button type="submit" size="lg" className="w-full bg-green-600 hover:bg-green-700">
                    <Send className="w-5 h-5 ml-2" />
                    إرسال عبر واتساب
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>

      <WebsiteFooter />
    </div>
  )
}
