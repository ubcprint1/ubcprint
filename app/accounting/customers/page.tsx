import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { getSession } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { deleteClientAction } from '../customer/actions'

export default async function CustomersPage({
  searchParams,
}: {
  searchParams?: { success?: string; error?: string }
}) {
  const session = await getSession()
  if (!session || (session.audience !== 'admin' && session.audience !== 'staff')) redirect('/staff/login')

  const customers = await prisma.client.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      user: true,
      _count: { select: { orders: true, quotes: true, invoices: true } },
    },
  })

  return (
    <main className="mx-auto max-w-7xl px-4 py-10" dir="rtl">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#1A2E42]">إدارة العملاء</h1>
          <p className="mt-2 text-sm text-slate-600">إضافة وتعديل وربط حساب بوابة العميل.</p>
        </div>
        <Link href="/accounting/customer/new" className="rounded-xl bg-[#097D77] px-4 py-2.5 text-white">إضافة عميل</Link>
      </div>

      {searchParams?.success ? <div className="mb-4 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">{searchParams.success === 'created' ? 'تم إنشاء العميل بنجاح.' : 'تم حذف العميل بنجاح.'}</div> : null}
      {searchParams?.error ? <div className="mb-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">{searchParams.error === 'linked' ? 'لا يمكن حذف العميل لأنه مرتبط بطلبات أو عروض أو فواتير.' : 'حدث خطأ في العملية.'}</div> : null}

      <div className="overflow-hidden rounded-2xl border bg-white">
        <table className="min-w-full text-right text-sm">
          <thead className="bg-slate-50 text-slate-600">
            <tr>
              <th className="p-4">العميل</th>
              <th className="p-4">التواصل</th>
              <th className="p-4">المدينة</th>
              <th className="p-4">البوابة</th>
              <th className="p-4">الارتباطات</th>
              <th className="p-4">الإجراءات</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer.id} className="border-t align-top">
                <td className="p-4">
                  <div className="font-medium text-[#1A2E42]">{customer.companyName || customer.name}</div>
                  {customer.companyName && customer.companyName !== customer.name ? <div className="mt-1 text-xs text-slate-500">{customer.name}</div> : null}
                </td>
                <td className="p-4 text-slate-600">
                  <div>{customer.phone || '-'}</div>
                  <div>{customer.email || '-'}</div>
                </td>
                <td className="p-4">{customer.city || '-'}</td>
                <td className="p-4">
                  <span className={`rounded-full px-3 py-1 text-xs ${customer.user ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-700'}`}>
                    {customer.user ? 'مفعل' : 'غير مربوط'}
                  </span>
                </td>
                <td className="p-4 text-slate-600">طلبات: {customer._count.orders} / عروض: {customer._count.quotes} / فواتير: {customer._count.invoices}</td>
                <td className="p-4">
                  <div className="flex flex-wrap gap-2">
                    <Link href={`/accounting/customer/${customer.id}`} className="rounded-lg border px-3 py-1.5">عرض وتعديل</Link>
                    <form action={deleteClientAction}>
                      <input type="hidden" name="id" value={customer.id} />
                      <button className="rounded-lg border border-red-200 px-3 py-1.5 text-red-600">حذف</button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
            {customers.length === 0 ? <tr><td colSpan={6} className="p-8 text-center text-slate-500">لا يوجد عملاء حتى الآن.</td></tr> : null}
          </tbody>
        </table>
      </div>
    </main>
  )
}
