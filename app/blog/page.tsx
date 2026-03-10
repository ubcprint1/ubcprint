"use client"

import Link from "next/link"
import { WebsiteHeader } from "@/components/website-header"
import { WebsiteFooter } from "@/components/website-footer"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, ArrowLeft } from "lucide-react"

export default function BlogPage() {
  const posts = [
    {
      title: "دليل اختيار نوع الطباعة المناسب لمشروعك",
      excerpt: "تعرف على أنواع الطباعة المختلفة وكيف تختار النوع الأنسب لاحتياجاتك",
      category: "نصائح",
      date: "15 يناير 2024",
      readTime: "5 دقائق",
    },
    {
      title: "أهمية الهوية البصرية لنجاح مشروعك",
      excerpt: "كيف تؤثر الهوية البصرية على انطباع العملاء وبناء الثقة",
      category: "تسويق",
      date: "10 يناير 2024",
      readTime: "7 دقائق",
    },
    {
      title: "مقارنة بين الطباعة الرقمية والأوفست",
      excerpt: "متى تستخدم كل نوع؟ مميزات وعيوب كل طريقة",
      category: "تقنية",
      date: "5 يناير 2024",
      readTime: "6 دقائق",
    },
    {
      title: "كيف تصمم كارت شخصي احترافي",
      excerpt: "نصائح وأفكار لتصميم كارت شخصي يترك انطباع قوي",
      category: "تصميم",
      date: "1 يناير 2024",
      readTime: "4 دقائق",
    },
    {
      title: "أفضل الخامات للطباعة على الملابس",
      excerpt: "دليل شامل لاختيار خامات الطباعة على التيشيرتات والملابس",
      category: "منتجات",
      date: "25 ديسمبر 2023",
      readTime: "8 دقائق",
    },
    {
      title: "تجهيز ملفات الطباعة بشكل صحيح",
      excerpt: "خطوات تجهيز ملفات التصميم للحصول على أفضل نتائج طباعة",
      category: "تقنية",
      date: "20 ديسمبر 2023",
      readTime: "6 دقائق",
    },
  ]

  const categories = ["الكل", "نصائح", "تسويق", "تقنية", "تصميم", "منتجات"]

  return (
    <div className="min-h-screen flex flex-col" dir="rtl">
      <WebsiteHeader />

      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">المدونة</h1>
          <p className="text-xl text-blue-100">نصائح ومقالات حول الطباعة والتصميم</p>
        </div>
      </section>

      <main className="flex-1 py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-2 justify-center mb-12">
            {categories.map((cat, index) => (
              <Badge
                key={index}
                variant={index === 0 ? "default" : "secondary"}
                className="cursor-pointer hover:bg-blue-100 px-4 py-2"
              >
                {cat}
              </Badge>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {posts.map((post, index) => (
              <article key={index} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="h-48 bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                  <span className="text-6xl opacity-50">📰</span>
                </div>
                <div className="p-6">
                  <Badge variant="secondary" className="mb-3">{post.category}</Badge>
                  <h2 className="text-xl font-bold mb-2 line-clamp-2">{post.title}</h2>
                  <p className="text-slate-600 text-sm mb-4 line-clamp-2">{post.excerpt}</p>
                  <div className="flex items-center justify-between text-sm text-slate-500">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {post.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {post.readTime}
                      </span>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </main>

      <WebsiteFooter />
    </div>
  )
}
