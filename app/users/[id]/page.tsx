import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { getSession } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { updateUserAction, deleteUserAction } from '../actions'

export default async function EditUserPage({
  params,
  searchParams,
}: {
  params: { id: string }
  searchParams?: { error?: string; success?: string }
}) {
  const session = await getSession()
  if (!session || (session.audience !== 'admin' && session.audience !== 'staff')) redirect('/staff/login')

  const user = await prisma.user.findUnique({ where: { id: params.id }, include: { employee: true } })
  if (!user || !user.employee) redirect('/users')

  return (
    <main className="mx-auto max-w-3xl px-4 py-10" dir="rtl">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-[#1A2E42]">تعديل المستخدم</h1>
        <Link href="/users" className="rounded-xl border px-4 py-2">رجوع</Link>
      </div>

      {searchParams?.success ? <div className="mb-4 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">تم حفظ التعديلات.</div> : null}
      {searchParams?.error ? <div className="mb-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">{searchParams.error === 'email' ? 'البريد مستخدم مسبقاً.' : searchParams.error === 'employeeNo' ? 'رقم الموظف مستخدم مسبقاً.' : 'تحقق من البيانات المطلوبة.'}</div> : null}

      <form action={updateUserAction} className="grid gap-4 rounded-2xl border bg-white p-6 shadow-sm md:grid-cols-2">
        <input type="hidden" name="id" value={user.id} />
        <input type="hidden" name="employeeId" value={user.employee.id} />
        <div>
          <label className="mb-2 block text-sm font-medium">الاسم الكامل</label>
          <input name="fullName" className="w-full rounded-xl border p-3" defaultValue={user.fullName} required />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium">البريد الإلكتروني</label>
          <input name="email" type="email" className="w-full rounded-xl border p-3" defaultValue={user.email} required />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium">كلمة مرور جديدة</label>
          <input name="password" type="password" className="w-full rounded-xl border p-3" placeholder="اتركه فارغ بدون تغيير" />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium">الدور</label>
          <select name="role" className="w-full rounded-xl border p-3" defaultValue={user.role}>
            <option value="ADMIN">أدمن</option>
            <option value="SUPERVISOR">مشرف</option>
            <option value="SALES">مبيعات</option>
            <option value="DESIGNER">مصمم</option>
            <option value="ACCOUNTANT">محاسب</option>
            <option value="OPERATOR">مشغل</option>
          </select>
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium">رقم الموظف</label>
          <input name="employeeNo" className="w-full rounded-xl border p-3" defaultValue={user.employee.employeeNo} required />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium">القسم</label>
          <input name="department" className="w-full rounded-xl border p-3" defaultValue={user.employee.department} required />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium">المسمى الوظيفي</label>
          <input name="title" className="w-full rounded-xl border p-3" defaultValue={user.employee.title} required />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium">الجوال</label>
          <input name="phone" className="w-full rounded-xl border p-3" defaultValue={user.employee.phone || ''} />
        </div>
        <label className="flex items-center gap-2 text-sm text-slate-700 md:col-span-2">
          <input name="isActive" type="checkbox" defaultChecked={user.isActive} />
          المستخدم نشط
        </label>
        <div className="md:col-span-2 flex gap-3">
          <button className="rounded-xl bg-[#223982] px-5 py-3 text-white">حفظ التعديلات</button>
        </div>
      </form>

      <form action={deleteUserAction} className="mt-4">
        <input type="hidden" name="id" value={user.id} />
        <input type="hidden" name="employeeId" value={user.employee.id} />
        <button className="rounded-xl border border-red-200 px-5 py-3 text-red-600">حذف أو تعطيل المستخدم</button>
      </form>
    </main>
  )
}
