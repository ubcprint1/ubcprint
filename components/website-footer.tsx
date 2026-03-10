"use client"

import Link from "next/link"
import { Printer, Phone, Mail, MapPin } from "lucide-react"

export function WebsiteFooter() {
  return (
    <footer className="bg-slate-900 text-slate-300 py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center">
                <Printer className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">UBC Print</span>
            </div>
            <p className="text-slate-400 mb-4">
              نوفر لك أفضل خدمات الطباعة الاحترافية بأعلى جودة وأفضل الأسعار
            </p>
            <div className="flex flex-col gap-2 text-sm">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>+20 103 693 0965</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>info@ubcprint.com</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>القاهرة، مصر</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4">المنتجات</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/products" className="hover:text-white transition-colors">
                  جميع المنتجات
                </Link>
              </li>
              <li>
                <Link href="/products/apparel" className="hover:text-white transition-colors">
                  الملابس المطبوعة
                </Link>
              </li>
              <li>
                <Link href="/products/promo" className="hover:text-white transition-colors">
                  المنتجات الترويجية
                </Link>
              </li>
              <li>
                <Link href="/products/events" className="hover:text-white transition-colors">
                  المجموعات والفعاليات
                </Link>
              </li>
              <li>
                <Link href="/design" className="hover:text-white transition-colors">
                  استوديو التصميم
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4">الشركة</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  من نحن
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  اتصل بنا
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:text-white transition-colors">
                  الوظائف
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-white transition-colors">
                  المدونة
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4">الدعم</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/help" className="hover:text-white transition-colors">
                  مركز المساعدة
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="hover:text-white transition-colors">
                  الشحن والتوصيل
                </Link>
              </li>
              <li>
                <Link href="/returns" className="hover:text-white transition-colors">
                  سياسة الإرجاع
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-white transition-colors">
                  الأسئلة الشائعة
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-12 pt-8 text-center text-sm">
          <p>&copy; 2024 UBC Print. جميع الحقوق محفوظة.</p>
        </div>
      </div>
    </footer>
  )
}
