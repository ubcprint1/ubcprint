import { getSession } from '@/lib/auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export default async function AdminDashboardPage() {
  const session = await getSession()
  if (!session || session.audience !== 'admin') redirect('/admin/login')
  return (
    <main className="mx-auto max-w-6xl px-4 py-12" dir="rtl">
      <h1 className="text-3xl font-bold text-[#1A2E42]">لوحة الأدمن</h1>
      <p className="mt-2 text-slate-600">مرحبًا {session.fullName}</p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Link href="/admin/products" className="rounded-2xl border bg-white p-5">إدارة المنتجات</Link>
        <Link href="/users" className="rounded-2xl border bg-white p-5">إدارة المستخدمين</Link>
        <Link href="/accounting/customers" className="rounded-2xl border bg-white p-5">إدارة العملاء</Link>
        <form action="/api/auth/logout" method="post"><button className="w-full rounded-2xl border bg-white p-5 text-right">تسجيل الخروج</button></form>
      </div>
    </main>
  )
}
