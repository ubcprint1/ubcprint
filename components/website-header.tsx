import Link from 'next/link'
import { getSession } from '@/lib/auth'

const links = [
  { href: '/products', label: 'المنتجات المخصصة' },
  { href: '/products/apparel', label: 'الملابس' },
  { href: '/products/promo', label: 'المنتجات الترويجية' },
  { href: '/products/events', label: 'الفعاليات' },
  { href: '/design', label: 'التصميم' },
  { href: '/help', label: 'المساعدة' },
]

export async function WebsiteHeader() {
  const session = await getSession()

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-8">
          <Link href="/" className="text-2xl font-bold text-[#1A2E42]">UBC Print</Link>
          <nav className="hidden items-center gap-5 lg:flex">
            {links.map((link) => (
              <Link key={link.href} href={link.href} className="text-sm font-medium text-slate-700 hover:text-[#223982]">{link.label}</Link>
            ))}
          </nav>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {session ? (
            <>
              <span className="rounded-xl bg-slate-100 px-3 py-2 text-sm text-slate-700">مرحبًا {session.fullName}</span>
              {session.audience === 'client' ? (
                <>
                  <Link href="/client/portal" className="rounded-xl border border-[#097D77] px-4 py-2 text-sm font-medium text-[#097D77]">بوابة العميل</Link>
                  <Link href="/products" className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700">تصفح المنتجات</Link>
                </>
              ) : null}
              {(session.audience === 'staff' || session.audience === 'admin') ? (
                <Link href={session.audience === 'admin' ? '/admin/dashboard' : '/staff/dashboard'} className="rounded-xl border border-[#1A2E42] px-4 py-2 text-sm font-medium text-[#1A2E42]">
                  {session.audience === 'admin' ? 'لوحة الأدمن' : 'لوحة الموظف'}
                </Link>
              ) : null}
              <form action="/api/auth/logout" method="post">
                <input type="hidden" name="redirectTo" value="/" />
                <button className="rounded-xl bg-[#223982] px-4 py-2 text-sm font-medium text-white">تسجيل الخروج</button>
              </form>
            </>
          ) : (
            <>
              <Link href="/client/login" className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700">دخول العميل</Link>
              <Link href="/staff/login" className="rounded-xl border border-[#1A2E42] px-4 py-2 text-sm font-medium text-[#1A2E42]">دخول الموظفين</Link>
              <Link href="/admin/login" className="rounded-xl bg-[#223982] px-4 py-2 text-sm font-medium text-white">الأدمن</Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
