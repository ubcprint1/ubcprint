import { getSession } from '@/lib/auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export default async function ClientPortalPage() {
  const session = await getSession()
  if (!session || session.audience !== 'client') redirect('/client/login')

  return (
    <main className="mx-auto max-w-5xl px-4 py-12">
      <h1 className="text-3xl font-bold text-[#1A2E42]">بوابة العميل</h1>
      <p className="mt-2 text-slate-600">مرحبًا {session.fullName}</p>
      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <Link href="/request-quote" className="rounded-2xl border bg-white p-5">طلب عرض سعر</Link>
        <Link href="/track-order" className="rounded-2xl border bg-white p-5">تتبع الطلب</Link>
        <form action="/api/auth/logout" method="post"><button className="w-full rounded-2xl border bg-white p-5 text-right">تسجيل الخروج</button></form>
      </div>
    </main>
  )
}
