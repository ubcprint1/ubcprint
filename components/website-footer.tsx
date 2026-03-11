import Link from "next/link"
import { ShoppingBag } from "lucide-react"

export function WebsiteFooter() {
  return (
    <footer className="bg-[#0F1D33] text-slate-300">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div>
          <h3 className="mb-4 text-2xl font-bold text-white">اطلب عرض سعر</h3>
          <p className="mb-4 text-slate-400">احصل على سعر فوري لطلبك عبر واتساب في ثوانٍ</p>
          <a
            href="https://wa.me/201036930965"
            target="_blank"
            className="inline-flex h-11 items-center rounded-xl bg-white px-5 text-sm font-bold text-[#1A2E42]"
            rel="noreferrer"
          >
            تحدث معنا
          </a>
        </div>

        <div>
          <h3 className="mb-4 text-2xl font-bold text-white">الدعم</h3>
          <div className="space-y-3 text-lg">
            <Link href="/help" className="block hover:text-white">مركز المساعدة</Link>
            <Link href="/shipping" className="block hover:text-white">معلومات الشحن</Link>
            <Link href="/returns" className="block hover:text-white">الإرجاع والاستبدال</Link>
            <Link href="/help#faq" className="block hover:text-white">الأسئلة الشائعة</Link>
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-2xl font-bold text-white">الخدمات</h3>
          <div className="space-y-3 text-lg">
            <Link href="/products" className="block hover:text-white">المنتجات المخصصة</Link>
            <Link href="/products/apparel" className="block hover:text-white">الملابس</Link>
            <Link href="/products/promo" className="block hover:text-white">المنتجات الترويجية</Link>
            <Link href="/products/events" className="block hover:text-white">المجموعات والفعاليات</Link>
            <Link href="/design" className="block hover:text-white">استوديو التصميم</Link>
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-2xl font-bold text-white">الشركة</h3>
          <div className="space-y-3 text-lg">
            <Link href="/about" className="block hover:text-white">من نحن</Link>
            <Link href="/contact" className="block hover:text-white">اتصل بنا</Link>
            <Link href="/careers" className="block hover:text-white">الوظائف</Link>
            <Link href="/login" className="block hover:text-white">دخول الموظفين</Link>
            <Link href="/products" className="block hover:text-white">المتجر</Link>
          </div>
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl items-center justify-between border-t border-white/10 px-4 py-6 text-sm sm:px-6 lg:px-8">
        <p>© 2026 UBC Print. جميع الحقوق محفوظة.</p>
        <div className="flex items-center gap-3 text-white">
          <span className="text-2xl font-black">UBC Print</span>
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#223982]">
            <ShoppingBag className="h-5 w-5" />
          </div>
        </div>
      </div>
    </footer>
  )
}
