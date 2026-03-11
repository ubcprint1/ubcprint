"use client"

import { useState } from "react"
import { WebsiteHeader } from "@/components/website-header"
import { WebsiteFooter } from "@/components/website-footer"
import { WhatsAppFloat } from "@/components/whatsapp-float"
import { Upload, Type, Shapes, ImageIcon, Download, Share2, Undo2, ZoomIn, ZoomOut, Move, Check } from "lucide-react"

const products = [
  { name: "كوب", price: "من 35 ج.م" },
  { name: "تيشيرت", price: "من 50 ج.م" },
  { name: "بنر إعلاني", price: "من 200 ج.م" },
  { name: "كارت شخصي", price: "من 150 ج.م / 100 كارت" },
  { name: "أخرى", price: "حسب الطلب" },
  { name: "علبة تغليف", price: "من 15 ج.م" },
]
const colors = ["#008000", "#800080", "#FFA500", "#12D4E0", "#ED0BFF", "#FFF000", "#1436FF", "#00FF00", "#FF0909", "#FFFFFF", "#000000", "#7A7A7A", "#C1272D", "#F8C8D6", "#0A1AFF"]

export default function DesignStudioPage() {
  const [selected, setSelected] = useState("كوب")
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#1A2E42]">
      <WebsiteHeader />
      <main>
        <section className="bg-[#245EEB] px-4 py-14 text-center text-white">
          <h1 className="text-5xl font-black">استوديو التصميم</h1>
          <p className="mx-auto mt-4 max-w-3xl text-xl text-white/90">صمم منتجاتك بنفسك أو ارفع تصميمك الخاص واحصل على طباعة احترافية عالية الجودة</p>
        </section>
        <section className="mx-auto grid max-w-7xl gap-6 px-4 py-10 lg:grid-cols-[1fr_360px] sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-3xl font-black">2. صمم منتجك</h2>
            <div className="mb-4 flex flex-wrap gap-2">
              <button className="rounded-xl border border-slate-300 px-4 py-2">قوالب جاهزة</button>
              <button className="rounded-xl border border-slate-300 px-4 py-2"><Shapes className="ml-2 inline h-4 w-4" /> أشكال</button>
              <button className="rounded-xl border border-slate-300 px-4 py-2"><Type className="ml-2 inline h-4 w-4" /> إضافة نص</button>
              <button className="rounded-xl bg-black px-4 py-2 text-white"><Upload className="ml-2 inline h-4 w-4" /> رفع صورة</button>
            </div>
            <div className="grid gap-6 lg:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 p-4">
                <div className="mb-3 flex gap-2 text-slate-500">
                  <button className="rounded border p-2"><Undo2 className="h-4 w-4" /></button>
                  <button className="rounded border p-2"><Move className="h-4 w-4" /></button>
                  <button className="rounded border p-2"><ZoomIn className="h-4 w-4" /></button>
                  <button className="rounded border p-2"><ZoomOut className="h-4 w-4" /></button>
                </div>
                <div className="flex aspect-square items-center justify-center rounded-2xl bg-[#EEF3F8] text-center text-slate-400">
                  <div>
                    <ImageIcon className="mx-auto mb-3 h-16 w-16" />
                    ارفع صورة أو أضف نص لرؤية المعاينة
                  </div>
                </div>
              </div>
              <div>
                <div className="flex aspect-[1.2] items-center justify-center rounded-2xl border-2 border-dashed border-[#C8D6F2] bg-[#FBFCFE] text-center text-slate-400">
                  <div>
                    <Upload className="mx-auto mb-3 h-16 w-16" />
                    <div className="font-bold">اضغط لرفع صورة</div>
                    <div className="mt-1 text-sm">PNG, JPG, SVG حتى 10MB</div>
                  </div>
                </div>
                <div className="mt-5">
                  <div className="mb-3 font-bold">اختر اللون</div>
                  <div className="flex flex-wrap gap-3">
                    {colors.map((color) => (
                      <span key={color} className="h-8 w-8 rounded-full border border-slate-300" style={{ backgroundColor: color }} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6 flex flex-wrap justify-between gap-3">
              <a href="https://wa.me/201036930965" target="_blank" rel="noreferrer" className="rounded-xl bg-[#097D77] px-5 py-3 font-bold text-white">اطلب عبر واتساب</a>
              <div className="flex gap-3">
                <button className="rounded-xl border border-slate-300 px-4 py-3"><Share2 className="ml-2 inline h-4 w-4" /> مشاركة</button>
                <button className="rounded-xl border border-slate-300 px-4 py-3"><Download className="ml-2 inline h-4 w-4" /> تحميل التصميم</button>
              </div>
            </div>
          </div>
          <aside className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-3xl font-black">1. اختر المنتج</h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-2">
              {products.map((item) => (
                <button key={item.name} onClick={() => setSelected(item.name)} className={`rounded-2xl border p-4 text-center ${selected === item.name ? "border-[#245EEB] bg-[#EEF3F8]" : "border-slate-200"}`}>
                  <div className="font-bold">{item.name}</div>
                  <div className="mt-2 text-sm text-slate-500">{item.price}</div>
                </button>
              ))}
            </div>
            <div className="mt-4 rounded-xl border border-green-200 bg-green-50 p-3 text-green-700"><Check className="ml-2 inline h-4 w-4" /> تم اختيار: {selected}</div>
          </aside>
        </section>
        <section className="mx-auto grid max-w-7xl gap-6 px-4 pb-16 sm:px-6 lg:grid-cols-3 lg:px-8">
          <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm"><div className="mb-4 text-5xl text-[#245EEB]">✓</div><h3 className="mb-2 text-3xl font-black">جودة عالية</h3><p className="text-slate-600">طباعة احترافية بأعلى جودة مع ضمان الرضا</p></div>
          <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm"><div className="mb-4 text-5xl text-[#245EEB]">◔</div><h3 className="mb-2 text-3xl font-black">خصّص الألوان</h3><p className="text-slate-600">اختر من مجموعة واسعة من الألوان لتناسب ذوقك</p></div>
          <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm"><div className="mb-4 text-5xl text-[#245EEB]">↑</div><h3 className="mb-2 text-3xl font-black">ارفع تصميمك</h3><p className="text-slate-600">ارفع أي صورة أو تصميم جاهز بصيغة PNG أو JPG أو SVG</p></div>
        </section>
      </main>
      <WebsiteFooter />
      <WhatsAppFloat />
    </div>
  )
}
