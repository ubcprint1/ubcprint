import Link from 'next/link'

const sections = [
  {
    title: 'الشركة',
    links: [
      { href: '/about', label: 'من نحن' },
      { href: '/contact', label: 'اتصل بنا' },
      { href: '/careers', label: 'الوظائف' },
      { href: '/blog', label: 'مدونة المطبعة' },
    ],
  },
  {
    title: 'الخدمات',
    links: [
      { href: '/products', label: 'المنتجات المخصصة' },
      { href: '/design', label: 'التصميم' },
      { href: '/products/promo', label: 'المنتجات الترويجية' },
      { href: '/products/events', label: 'المجموعات والفعاليات' },
      { href: '/request-quote', label: 'استوديو التصميم' },
    ],
  },
  {
    title: 'الدعم',
    links: [
      { href: '/help', label: 'مركز المساعدة' },
      { href: '/returns', label: 'سياسة الاستبدال' },
      { href: '/shipping', label: 'الشحن والتسليم' },
      { href: '/track-order', label: 'تتبع الطلبات' },
      { href: '/request-quote', label: 'الأسئلة الشائعة' },
    ],
  },
]

export function WebsiteFooter() {
  return (
    <footer className="mt-12 bg-[#06173A] text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <h3 className="text-2xl font-bold">UBC Print</h3>
            <p className="mt-3 text-sm leading-7 text-slate-300">حلول طباعة وتجهيزات متكاملة للشركات، الفعاليات، والطلبات الخاصة مع سرعة تنفيذ ودقة عالية.</p>
            <div className="mt-5 rounded-2xl bg-white/10 p-4 text-sm text-slate-200">
              <div>InstaPay / Vodafone Cash: 01036930965</div>
              <div className="mt-2">البنك الأهلي المصري: 1903502115353900011</div>
            </div>
          </div>
          {sections.map((section) => (
            <div key={section.title}>
              <h4 className="text-lg font-semibold">{section.title}</h4>
              <ul className="mt-4 space-y-3 text-sm text-slate-300">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="transition hover:text-white">{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-10 border-t border-white/10 pt-6 text-sm text-slate-300">© 2026 UBC Print. جميع الحقوق محفوظة.</div>
      </div>
    </footer>
  )
}
