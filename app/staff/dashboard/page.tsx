import { getSession } from '@/lib/auth'
import { redirect } from 'next/navigation'

export default async function StaffDashboardPage() {
  const session = await getSession()
  if (!session || (session.audience !== 'staff' && session.audience !== 'admin')) redirect('/staff/login')
  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-3xl font-bold text-[#1A2E42]">لوحة الموظفين</h1>
      <p className="mt-2 text-slate-600">مرحبًا {session.fullName}</p>
    </main>
  )
}
