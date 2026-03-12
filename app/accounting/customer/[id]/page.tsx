import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { getSession } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { updateClientAction, deleteClientAction } from '../actions'

export default async function CustomerProfilePage({
  params,
  searchParams,
}: {
  params: { id: string }
  searchParams?: { error?: string; success?: string }
}) {
  const session = await getSession()
  if (!session || (session.audience !== 'admin' && session.audience !== 'staff')) redirect('/staff/login')

  const customer = await prisma.client.findUnique({
    where: { id: params.id },
    include: {
      user: true,
      orders: { orderBy: { createdAt: 'desc' }, take: 5 },
      quotes: { orderBy: { createdAt: 'desc' }, take: 5 },
      invoices: { orderBy: { createdAt: 'desc' }, take: 5 },
    },
  })

  if (!customer) redirect('/accounting/customers')

  const totalInvoices = customer.invoices.reduce((sum, item) => sum + item.total, 0)
  const totalBalance = customer.invoices.reduce((sum, item) => sum + item.balanceAmount, 0)

  return (
    <main className="mx-auto max-w-6xl px-4 py-10" dir="rtl">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-[#1A2E42]">ملف العميل</h1>
        <Link href="/accounting/customers" className="rounded-xl border px-4 py-2">رجوع</Link>
      </div>

      {searchParams?.success ? <div className="mb-4 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">تم حفظ بيانات العميل.</div> : null}
      {searchParams?.error ? <div className="mb-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">{searchParams.error === 'email' ? 'البريد مستخدم مسبقاً.' : searchParams.error === 'portal' ? 'ربط البوابة يحتاج بريد إلكتروني.' : searchParams.error === 'userexists' ? 'يوجد مستخدم آخر بنفس البريد.' : 'تحقق من البيانات المطلوبة.'}</div> : null}

      <div className="mb-6 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border bg-white p-5"><div className="text-sm text-slate-500">الطلبات</div><div className="mt-2 text-3xl font-bold text-[#1A2E42]">{customer.orders.length}</div></div>
        <div className="rounded-2xl border bg-white p-5"><div className="text-sm text-slate-500">إجمالي الفواتير</div><div className="mt-2 text-3xl font-bold text-[#223982]">{totalInvoices.toLocaleString()} ر.س</div></div>
        <div className="rounded-2xl border bg-white p-5"><div className="text-sm text-slate-500">الرصيد المتبقي</div><div className="mt-2 text-3xl font-bold text-[#B45309]">{totalBalance.toLocaleString()} ر.س</div></div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
        <form action={updateClientAction} className="grid gap-4 rounded-2xl border bg-white p-6 shadow-sm md:grid-cols-2">
          <input type="hidden" name="id" value={customer.id} />
          <div>
            <label className="mb-2 block text-sm font-medium">اسم العميل</label>
            <input name="name" className="w-full rounded-xl border p-3" defaultValue={customer.name} required />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium">اسم الشركة</label>
            <input name="companyName" className="w-full rounded-xl border p-3" defaultValue={customer.companyName || ''} />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium">البريد الإلكتروني</label>
            <input name="email" type="email" className="w-full rounded-xl border p-3" defaultValue={customer.email || ''} />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium">الجوال</label>
            <input name="phone" className="w-full rounded-xl border p-3" defaultValue={customer.phone || ''} />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium">المدينة</label>
            <input name="city" className="w-full rounded-xl border p-3" defaultValue={customer.city || ''} />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium">العنوان</label>
            <input name="address" className="w-full rounded-xl border p-3" defaultValue={customer.address || ''} />
          </div>
          <div className="md:col-span-2 rounded-2xl border border-slate-200 p-4">
            <div className="mb-2 text-sm font-medium text-slate-800">بوابة العميل</div>
            <div className="mb-3 text-sm text-slate-600">الحالة الحالية: {customer.user ? 'مربوطة' : 'غير مربوطة'}</div>
            <label className="flex items-center gap-2 text-sm text-slate-700">
              <input name="syncPortal" type="checkbox" defaultChecked={Boolean(customer.user)} />
              تحديث أو إنشاء حساب البوابة
            </label>
            <div className="mt-3">
              <label className="mb-2 block text-sm font-medium">كلمة مرور جديدة للبوابة</label>
              <input name="password" type="password" className="w-full rounded-xl border p-3" placeholder="اتركها فارغة بدون تغيير" />
            </div>
          </div>
          <div className="md:col-span-2 flex gap-3">
            <button className="rounded-xl bg-[#223982] px-5 py-3 text-white">حفظ بيانات العميل</button>
          </div>
        </form>

        <div className="space-y-6">
          <div className="rounded-2xl border bg-white p-6">
            <h2 className="mb-4 text-lg font-bold text-[#1A2E42]">آخر الطلبات</h2>
            <div className="space-y-3 text-sm">
              {customer.orders.map((order) => (
                <div key={order.id} className="rounded-xl border p-3">
                  <div className="font-medium">{order.orderNumber}</div>
                  <div className="mt-1 text-slate-600">{order.productName || order.description || '-'}</div>
                </div>
              ))}
              {customer.orders.length === 0 ? <div className="text-slate-500">لا يوجد طلبات.</div> : null}
            </div>
          </div>

          <div className="rounded-2xl border bg-white p-6">
            <h2 className="mb-4 text-lg font-bold text-[#1A2E42]">آخر الفواتير</h2>
            <div className="space-y-3 text-sm">
              {customer.invoices.map((invoice) => (
                <div key={invoice.id} className="rounded-xl border p-3">
                  <div className="font-medium">{invoice.invoiceNumber}</div>
                  <div className="mt-1 text-slate-600">الإجمالي: {invoice.total.toLocaleString()} ر.س</div>
                  <div className="mt-1 text-slate-600">المتبقي: {invoice.balanceAmount.toLocaleString()} ر.س</div>
                </div>
              ))}
              {customer.invoices.length === 0 ? <div className="text-slate-500">لا يوجد فواتير.</div> : null}
            </div>
          </div>

          <form action={deleteClientAction}>
            <input type="hidden" name="id" value={customer.id} />
            <button className="rounded-xl border border-red-200 px-5 py-3 text-red-600">حذف العميل</button>
          </form>
        </div>
      </div>
    </main>
  )
}
