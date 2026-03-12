import Link from 'next/link'
import { redirect } from 'next/navigation'
import { getSession } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

function money(value: number) {
  return new Intl.NumberFormat('ar-SA', { style: 'currency', currency: 'SAR', maximumFractionDigits: 0 }).format(value || 0)
}

export default async function ClientPortalPage() {
  const session = await getSession()
  if (!session || session.audience !== 'client') redirect('/client/login')

  const client = await prisma.client.findFirst({
    where: {
      OR: [{ userId: session.id }, { email: session.email }],
    },
    include: {
      orders: { orderBy: { createdAt: 'desc' }, take: 5 },
      quotes: { orderBy: { createdAt: 'desc' }, take: 5 },
      invoices: { orderBy: { createdAt: 'desc' }, take: 5 },
    },
  })

  const totalOrders = client?.orders.length || 0
  const totalQuotes = client?.quotes.length || 0
  const totalInvoices = client?.invoices.length || 0
  const unpaidBalance = (client?.invoices || []).reduce((sum, invoice) => sum + (invoice.balanceAmount || 0), 0)

  const quickLinks = [
    { title: 'تصفح المنتجات', desc: 'ادخل المتجر واستعرض خدمات الطباعة', href: '/products' },
    { title: 'طلب عرض سعر', desc: 'أرسل طلبك لفريق المبيعات', href: '/request-quote' },
    { title: 'تتبع الطلب', desc: 'تابع حالة التنفيذ بسهولة', href: '/track-order' },
    { title: 'طلباتي', desc: 'عرض جميع الطلبات الخاصة بك', href: '/client/portal/orders' },
    { title: 'عروض الأسعار', desc: 'راجع العروض المرسلة لك', href: '/client/portal/quotes' },
    { title: 'الفواتير', desc: 'تابع الفواتير والأرصدة المستحقة', href: '/client/portal/invoices' },
  ]

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <div className="flex flex-col gap-4 rounded-3xl bg-gradient-to-l from-[#1A2E42] to-[#223982] p-8 text-white">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">بوابة العميل</h1>
            <p className="mt-2 text-white/80">مرحبًا {session.fullName}، تقدر من هنا تتابع حسابك وتتصفح الموقع بشكل كامل.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/products" className="rounded-xl bg-white px-5 py-3 font-medium text-[#1A2E42]">الذهاب للمتجر</Link>
            <form action="/api/auth/logout" method="post">
              <input type="hidden" name="redirectTo" value="/" />
              <button className="rounded-xl border border-white/30 px-5 py-3 font-medium text-white">تسجيل الخروج</button>
            </form>
          </div>
        </div>
      </div>

      <section className="mt-8 grid gap-4 md:grid-cols-4">
        <div className="rounded-2xl border bg-white p-5"><div className="text-sm text-slate-500">الطلبات الأخيرة</div><div className="mt-2 text-3xl font-bold text-[#1A2E42]">{totalOrders}</div></div>
        <div className="rounded-2xl border bg-white p-5"><div className="text-sm text-slate-500">عروض الأسعار</div><div className="mt-2 text-3xl font-bold text-[#1A2E42]">{totalQuotes}</div></div>
        <div className="rounded-2xl border bg-white p-5"><div className="text-sm text-slate-500">الفواتير</div><div className="mt-2 text-3xl font-bold text-[#1A2E42]">{totalInvoices}</div></div>
        <div className="rounded-2xl border bg-white p-5"><div className="text-sm text-slate-500">الرصيد المستحق</div><div className="mt-2 text-2xl font-bold text-[#097D77]">{money(unpaidBalance)}</div></div>
      </section>

      <section className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {quickLinks.map((item) => (
          <Link key={item.href} href={item.href} className="rounded-2xl border bg-white p-5 transition hover:-translate-y-0.5 hover:shadow-sm">
            <div className="text-lg font-semibold text-[#1A2E42]">{item.title}</div>
            <div className="mt-2 text-sm leading-6 text-slate-600">{item.desc}</div>
          </Link>
        ))}
      </section>

      <section className="mt-8 grid gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border bg-white p-5 lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-bold text-[#1A2E42]">آخر الطلبات</h2>
            <Link href="/client/portal/orders" className="text-sm font-medium text-[#223982]">عرض الكل</Link>
          </div>
          <div className="space-y-3">
            {client?.orders?.length ? client.orders.map((order) => (
              <div key={order.id} className="rounded-2xl border border-slate-200 p-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="font-semibold text-[#1A2E42]">{order.orderNumber}</div>
                  <div className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-700">{order.status}</div>
                </div>
                <div className="mt-2 text-sm text-slate-600">{order.productName || order.customerName}</div>
              </div>
            )) : <p className="text-sm text-slate-500">لا توجد طلبات حالياً.</p>}
          </div>
        </div>

        <div className="rounded-2xl border bg-white p-5">
          <h2 className="text-xl font-bold text-[#1A2E42]">ملخص الحساب</h2>
          <div className="mt-4 space-y-3 text-sm text-slate-600">
            <div className="rounded-xl bg-slate-50 p-3">الاسم: <span className="font-medium text-slate-800">{session.fullName}</span></div>
            <div className="rounded-xl bg-slate-50 p-3">البريد: <span className="font-medium text-slate-800">{session.email}</span></div>
            <div className="rounded-xl bg-slate-50 p-3">الشركة: <span className="font-medium text-slate-800">{client?.companyName || 'عميل فردي'}</span></div>
            <div className="rounded-xl bg-slate-50 p-3">المدينة: <span className="font-medium text-slate-800">{client?.city || 'غير محدد'}</span></div>
          </div>
        </div>
      </section>
    </main>
  )
}
