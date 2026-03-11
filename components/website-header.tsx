import Link from 'next/link'

const links = [
  { href: '/products', label: 'المنتجات المخصصة' },
  { href: '/products/apparel', label: 'الملابس' },
  { href: '/products/promo', label: 'المنتجات الترويجية' },
  { href: '/products/events', label: 'المجموعات والفعاليات' },
  { href: '/design', label: 'استوديو التصميم' },
  { href: '/help', label: 'المساعدة' },
]

export function WebsiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="text-2xl font-bold text-[#1A2E42]">UBC Print</Link>
        <nav className="hidden items-center gap-5 lg:flex">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="text-sm font-medium text-slate-700 hover:text-[#223982]">{link.label}</Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Link href="/client/login" className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700">دخول العميل</Link>
          <Link href="/staff/login" className="rounded-xl border border-[#1A2E42] px-4 py-2 text-sm font-medium text-[#1A2E42]">دخول الموظفين</Link>
          <Link href="/admin/login" className="rounded-xl bg-[#223982] px-4 py-2 text-sm font-medium text-white">الأدمن</Link>
        </div>
      </div>
    </header>
  )
}
