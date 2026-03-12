import Link from 'next/link'
import { redirect } from 'next/navigation'
import { getSession } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export default async function ClientQuotesPage() {
  const session = await getSession()
  if (!session || session.audience !== 'client') redirect('/client/login')

  const client = await prisma.client.findFirst({ where: { OR: [{ userId: session.id }, { email: session.email }] } })
  const quotes = client ? await prisma.quote.findMany({ where: { clientId: client.id }, orderBy: { createdAt: 'desc' } }) : []

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#1A2E42]">عروض الأسعار</h1>
          <p className="mt-2 text-slate-600">كل العروض المرسلة إلى حسابك.</p>
        </div>
        <Link href="/client/portal" className="rounded-xl border px-4 py-2">الرجوع للبوابة</Link>
      </div>
      <div className="grid gap-4">
        {quotes.length ? quotes.map((quote) => (
          <div key={quote.id} className="rounded-2xl border bg-white p-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="text-lg font-semibold text-[#1A2E42]">{quote.quoteNumber}</div>
              <div className="rounded-full bg-slate-100 px-3 py-1 text-xs">{quote.status}</div>
            </div>
            <div className="mt-3 text-sm text-slate-600">الإجمالي: {quote.total}</div>
            <div className="mt-1 text-sm text-slate-500">ملاحظات: {quote.notes || 'لا توجد ملاحظات'}</div>
          </div>
        )) : <div className="rounded-2xl border bg-white p-6 text-center text-slate-500">لا توجد عروض حالياً.</div>}
      </div>
    </main>
  )
}
