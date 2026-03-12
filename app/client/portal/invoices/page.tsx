import Link from 'next/link'
import { redirect } from 'next/navigation'
import { getSession } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export default async function ClientInvoicesPage() {
  const session = await getSession()
  if (!session || session.audience !== 'client') redirect('/client/login')

  const client = await prisma.client.findFirst({ where: { OR: [{ userId: session.id }, { email: session.email }] } })
  const invoices = client ? await prisma.invoice.findMany({ where: { clientId: client.id }, orderBy: { createdAt: 'desc' } }) : []

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#1A2E42]">الفواتير</h1>
          <p className="mt-2 text-slate-600">متابعة الفواتير والمبالغ المستحقة.</p>
        </div>
        <Link href="/client/portal" className="rounded-xl border px-4 py-2">الرجوع للبوابة</Link>
      </div>
      <div className="overflow-hidden rounded-2xl border bg-white">
        <table className="min-w-full text-right text-sm">
          <thead className="bg-slate-50 text-slate-600"><tr><th className="p-4">رقم الفاتورة</th><th className="p-4">الحالة</th><th className="p-4">الإجمالي</th><th className="p-4">المدفوع</th><th className="p-4">المتبقي</th></tr></thead>
          <tbody>
            {invoices.length ? invoices.map((invoice) => (
              <tr key={invoice.id} className="border-t"><td className="p-4 font-medium text-[#1A2E42]">{invoice.invoiceNumber}</td><td className="p-4">{invoice.status}</td><td className="p-4">{invoice.total}</td><td className="p-4">{invoice.paidAmount}</td><td className="p-4">{invoice.balanceAmount}</td></tr>
            )) : <tr><td colSpan={5} className="p-6 text-center text-slate-500">لا توجد فواتير حالياً.</td></tr>}
          </tbody>
        </table>
      </div>
    </main>
  )
}
