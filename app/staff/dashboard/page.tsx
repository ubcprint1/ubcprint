import { getSession } from '@/lib/auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export default async function StaffDashboardPage() {
  const session = await getSession()
  if (!session || (session.audience !== 'staff' && session.audience !== 'admin')) redirect('/staff/login')
  return (
    <main className="mx-auto max-w-6xl px-4 py-12" dir="rtl">
      <h1 className="text-3xl font-bold text-[#1A2E42]">لوحة الموظفين</h1>
      <p className="mt-2 text-slate-600">مرحبًا {session.fullName}</p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Link href="/users" className="rounded-2xl border bg-white p-5">المستخدمون</Link>
        <Link href="/accounting/customers" className="rounded-2xl border bg-white p-5">العملاء</Link>
        <Link href="/reports" className="rounded-2xl border bg-white p-5">التقارير</Link>
        <form action="/api/auth/logout" method="post"><button className="w-full rounded-2xl border bg-white p-5 text-right">تسجيل الخروج</button></form>
      </div>
    </main>
  )
}
