import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { getSession } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { deleteUserAction, toggleUserAction } from './actions'

const roleLabels: Record<string, string> = {
  ADMIN: 'أدمن',
  SUPERVISOR: 'مشرف',
  SALES: 'مبيعات',
  DESIGNER: 'مصمم',
  ACCOUNTANT: 'محاسب',
  OPERATOR: 'مشغل',
}

export default async function UsersPage({ searchParams }: { searchParams?: { success?: string } }) {
  const session = await getSession()
  if (!session || (session.audience !== 'admin' && session.audience !== 'staff')) redirect('/staff/login')

  const users = await prisma.user.findMany({
    where: { role: { not: 'CLIENT' } },
    include: { employee: true },
    orderBy: { createdAt: 'desc' },
  })

  return (
    <main className="mx-auto max-w-7xl px-4 py-10" dir="rtl">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#1A2E42]">إدارة المستخدمين والموظفين</h1>
          <p className="mt-2 text-sm text-slate-600">إضافة وتعديل وتفعيل وتعطيل وحذف المستخدمين الداخليين.</p>
        </div>
        <Link href="/users/new" className="rounded-xl bg-[#223982] px-4 py-2.5 text-white">إضافة مستخدم</Link>
      </div>

      {searchParams?.success ? (
        <div className="mb-6 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
          {searchParams.success === 'created' && 'تم إنشاء المستخدم بنجاح.'}
          {searchParams.success === 'toggled' && 'تم تحديث حالة المستخدم.'}
          {searchParams.success === 'deleted' && 'تم حذف المستخدم بنجاح.'}
          {searchParams.success === 'deactivated' && 'المستخدم مرتبط بسجلات سابقة، لذلك تم تعطيله فقط.'}
        </div>
      ) : null}

      <div className="overflow-hidden rounded-2xl border bg-white">
        <table className="min-w-full text-right text-sm">
          <thead className="bg-slate-50 text-slate-600">
            <tr>
              <th className="p-4">الاسم</th>
              <th className="p-4">البريد</th>
              <th className="p-4">الدور</th>
              <th className="p-4">رقم الموظف</th>
              <th className="p-4">القسم</th>
              <th className="p-4">الحالة</th>
              <th className="p-4">الإجراءات</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-t align-top">
                <td className="p-4 font-medium text-[#1A2E42]">{user.fullName}</td>
                <td className="p-4">{user.email}</td>
                <td className="p-4">{roleLabels[user.role] || user.role}</td>
                <td className="p-4">{user.employee?.employeeNo || '-'}</td>
                <td className="p-4">{user.employee?.department || '-'}</td>
                <td className="p-4">
                  <span className={`rounded-full px-3 py-1 text-xs ${user.isActive ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-700'}`}>
                    {user.isActive ? 'نشط' : 'معطل'}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex flex-wrap gap-2">
                    <Link href={`/users/${user.id}`} className="rounded-lg border px-3 py-1.5">تعديل</Link>
                    <form action={toggleUserAction}>
                      <input type="hidden" name="id" value={user.id} />
                      <input type="hidden" name="isActive" value={String(user.isActive)} />
                      <button className="rounded-lg border px-3 py-1.5">{user.isActive ? 'تعطيل' : 'تفعيل'}</button>
                    </form>
                    {user.employee ? (
                      <form action={deleteUserAction}>
                        <input type="hidden" name="id" value={user.id} />
                        <input type="hidden" name="employeeId" value={user.employee.id} />
                        <button className="rounded-lg border border-red-200 px-3 py-1.5 text-red-600">حذف</button>
                      </form>
                    ) : null}
                  </div>
                </td>
              </tr>
            ))}
            {users.length === 0 ? (
              <tr><td colSpan={7} className="p-8 text-center text-slate-500">لا يوجد مستخدمون حتى الآن.</td></tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </main>
  )
}
