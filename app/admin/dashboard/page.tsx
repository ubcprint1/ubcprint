import Link from 'next/link'
import { redirect } from 'next/navigation'
import { getSession } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export default async function AdminDashboardPage() {
  const session = await getSession()
  if (!session || session.audience !== 'admin') redirect('/admin/login')

  const [usersCount, clientsCount, productsCount, ordersCount, quotesCount, invoicesCount, latestUsers, latestOrders] = await Promise.all([
    prisma.user.count(),
    prisma.client.count(),
    prisma.product.count(),
    prisma.order.count(),
    prisma.quote.count(),
    prisma.invoice.count(),
    prisma.user.findMany({ orderBy: { createdAt: 'desc' }, take: 5 }),
    prisma.order.findMany({ orderBy: { createdAt: 'desc' }, take: 5 }),
  ])

  const metrics = [
    { title: 'المستخدمون', value: usersCount, href: '/users' },
    { title: 'العملاء', value: clientsCount, href: '/accounting/customers' },
    { title: 'المنتجات', value: productsCount, href: '/admin/products' },
    { title: 'الطلبات', value: ordersCount, href: '/orders' },
    { title: 'عروض الأسعار', value: quotesCount, href: '/accounting/quotation/new' },
    { title: 'الفواتير', value: invoicesCount, href: '/accounting/invoice/new' },
  ]

  const modules = [
    { title: 'إدارة المنتجات', desc: 'إضافة وتعديل وحذف المنتجات', href: '/admin/products' },
    { title: 'إدارة المستخدمين', desc: 'التحكم في الموظفين والعملاء', href: '/users' },
    { title: 'العملاء والحسابات', desc: 'مراجعة بيانات العملاء والفواتير', href: '/accounting/customers' },
    { title: 'الطلبات', desc: 'متابعة التشغيل وحالات الطلبات', href: '/orders' },
    { title: 'التقارير', desc: 'عرض التقارير العامة', href: '/reports' },
    { title: 'الإعدادات', desc: 'إدارة الإعدادات العامة', href: '/settings' },
  ]

  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <div className="rounded-3xl bg-gradient-to-l from-[#1A2E42] to-[#223982] p-8 text-white">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">لوحة الأدمن</h1>
            <p className="mt-2 text-white/80">مرحبًا {session.fullName}، هذه لوحة تحكم شاملة لإدارة النظام.</p>
          </div>
          <form action="/api/auth/logout" method="post">
            <input type="hidden" name="redirectTo" value="/" />
            <button className="rounded-xl border border-white/30 px-4 py-2">تسجيل الخروج</button>
          </form>
        </div>
      </div>

      <section className="mt-8 grid gap-4 md:grid-cols-3 xl:grid-cols-6">
        {metrics.map((metric) => (
          <Link key={metric.title} href={metric.href} className="rounded-2xl border bg-white p-5 transition hover:shadow-sm">
            <div className="text-sm text-slate-500">{metric.title}</div>
            <div className="mt-2 text-3xl font-bold text-[#1A2E42]">{metric.value}</div>
          </Link>
        ))}
      </section>

      <section className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {modules.map((item) => (
          <Link key={item.href} href={item.href} className="rounded-2xl border bg-white p-5 transition hover:-translate-y-0.5 hover:shadow-sm">
            <div className="text-lg font-semibold text-[#1A2E42]">{item.title}</div>
            <div className="mt-2 text-sm leading-6 text-slate-600">{item.desc}</div>
          </Link>
        ))}
      </section>

      <section className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border bg-white p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-bold text-[#1A2E42]">آخر المستخدمين</h2>
            <Link href="/users" className="text-sm font-medium text-[#223982]">عرض الكل</Link>
          </div>
          <div className="space-y-3">
            {latestUsers.map((user) => (
              <div key={user.id} className="rounded-2xl border border-slate-200 p-4">
                <div className="font-semibold text-[#1A2E42]">{user.fullName}</div>
                <div className="mt-1 text-sm text-slate-500">{user.email}</div>
                <div className="mt-2 inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs">{user.role}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border bg-white p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-bold text-[#1A2E42]">آخر الطلبات</h2>
            <Link href="/orders" className="text-sm font-medium text-[#223982]">عرض الكل</Link>
          </div>
          <div className="space-y-3">
            {latestOrders.map((order) => (
              <div key={order.id} className="rounded-2xl border border-slate-200 p-4">
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <div className="font-semibold text-[#1A2E42]">{order.orderNumber}</div>
                    <div className="mt-1 text-sm text-slate-500">{order.customerName}</div>
                  </div>
                  <div className="rounded-full bg-slate-100 px-3 py-1 text-xs">{order.status}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
