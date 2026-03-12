import Link from 'next/link'
import { redirect } from 'next/navigation'
import { getSession } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export default async function ClientOrdersPage() {
  const session = await getSession()
  if (!session || session.audience !== 'client') redirect('/client/login')

  const client = await prisma.client.findFirst({ where: { OR: [{ userId: session.id }, { email: session.email }] } })
  const orders = client ? await prisma.order.findMany({ where: { clientId: client.id }, orderBy: { createdAt: 'desc' } }) : []

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#1A2E42]">طلباتي</h1>
          <p className="mt-2 text-slate-600">جميع الطلبات المرتبطة بحسابك.</p>
        </div>
        <Link href="/client/portal" className="rounded-xl border px-4 py-2">الرجوع للبوابة</Link>
      </div>
      <div className="overflow-hidden rounded-2xl border bg-white">
        <table className="min-w-full text-right text-sm">
          <thead className="bg-slate-50 text-slate-600"><tr><th className="p-4">رقم الطلب</th><th className="p-4">المنتج</th><th className="p-4">الحالة</th><th className="p-4">الكمية</th><th className="p-4">التكلفة</th></tr></thead>
          <tbody>
            {orders.length ? orders.map((order) => (
              <tr key={order.id} className="border-t"><td className="p-4 font-medium text-[#1A2E42]">{order.orderNumber}</td><td className="p-4">{order.productName || '-'}</td><td className="p-4">{order.status}</td><td className="p-4">{order.quantity}</td><td className="p-4">{order.totalCost}</td></tr>
            )) : <tr><td colSpan={5} className="p-6 text-center text-slate-500">لا توجد طلبات حالياً.</td></tr>}
          </tbody>
        </table>
      </div>
    </main>
  )
}
