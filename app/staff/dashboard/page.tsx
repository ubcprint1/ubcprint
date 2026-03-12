import Link from 'next/link'
import { redirect } from 'next/navigation'
import { getSession } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export default async function StaffDashboardPage() {
  const session = await getSession()
  if (!session || (session.audience !== 'staff' && session.audience !== 'admin')) redirect('/staff/login')

  const [ordersCount, activeOrders, clientsCount, productsCount, latestOrders] = await Promise.all([
    prisma.order.count(),
    prisma.order.count({ where: { status: { not: 'COMPLETED' } } }),
    prisma.client.count(),
    prisma.product.count(),
    prisma.order.findMany({ orderBy: { createdAt: 'desc' }, take: 6 }),
  ])

  const cards = [
    { title: 'إجمالي الطلبات', value: ordersCount, href: '/orders' },
    { title: 'الطلبات النشطة', value: activeOrders, href: '/orders' },
    { title: 'العملاء', value: clientsCount, href: '/accounting/customers' },
    { title: 'المنتجات', value: productsCount, href: '/products' },
  ]

  const shortcuts = [
    { title: 'إضافة طلب جديد', href: '/orders/new' },
    { title: 'العملاء', href: '/accounting/customers' },
    { title: 'التقارير', href: '/reports' },
    { title: 'الحضور', href: '/attendance' },
  ]

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#1A2E42]">لوحة الموظفين</h1>
          <p className="mt-2 text-slate-600">مرحبًا {session.fullName}، هذه نظرة سريعة على التشغيل اليومي.</p>
        </div>
        <form action="/api/auth/logout" method="post">
          <input type="hidden" name="redirectTo" value="/" />
          <button className="rounded-xl border px-4 py-2">تسجيل الخروج</button>
        </form>
      </div>

      <section className="mt-8 grid gap-4 md:grid-cols-4">
        {cards.map((card) => (
          <Link key={card.title} href={card.href} className="rounded-2xl border bg-white p-5 transition hover:shadow-sm">
            <div className="text-sm text-slate-500">{card.title}</div>
            <div className="mt-2 text-3xl font-bold text-[#1A2E42]">{card.value}</div>
          </Link>
        ))}
      </section>

      <section className="mt-8 grid gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border bg-white p-5 lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-bold text-[#1A2E42]">آخر الطلبات</h2>
            <Link href="/orders" className="text-sm font-medium text-[#223982]">عرض الكل</Link>
          </div>
          <div className="space-y-3">
            {latestOrders.map((order) => (
              <div key={order.id} className="rounded-2xl border border-slate-200 p-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
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

        <div className="rounded-2xl border bg-white p-5">
          <h2 className="text-xl font-bold text-[#1A2E42]">اختصارات سريعة</h2>
          <div className="mt-4 grid gap-3">
            {shortcuts.map((item) => (
              <Link key={item.href} href={item.href} className="rounded-xl bg-slate-50 p-4 text-sm font-medium text-slate-700 transition hover:bg-slate-100">{item.title}</Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
