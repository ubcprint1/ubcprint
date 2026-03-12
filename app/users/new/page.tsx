import Link from 'next/link'
import { getSession } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { createUserAction } from '../actions'

export default async function NewEmployeePage({ searchParams }: { searchParams?: { error?: string } }) {
  const session = await getSession()
  if (!session || (session.audience !== 'admin' && session.audience !== 'staff')) redirect('/staff/login')

  return (
    <main className="mx-auto max-w-3xl px-4 py-10" dir="rtl">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-[#1A2E42]">إضافة مستخدم جديد</h1>
        <Link href="/users" className="rounded-xl border px-4 py-2">رجوع</Link>
      </div>

      {searchParams?.error ? (
        <div className="mb-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {searchParams.error === 'missing' && 'أكمل الحقول المطلوبة.'}
          {searchParams.error === 'email' && 'البريد الإلكتروني مستخدم مسبقاً.'}
          {searchParams.error === 'employeeNo' && 'رقم الموظف مستخدم مسبقاً.'}
        </div>
      ) : null}

      <form action={createUserAction} className="grid gap-4 rounded-2xl border bg-white p-6 shadow-sm md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium">الاسم الكامل</label>
          <input name="fullName" className="w-full rounded-xl border p-3" required />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium">البريد الإلكتروني</label>
          <input name="email" type="email" className="w-full rounded-xl border p-3" required />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium">كلمة المرور</label>
          <input name="password" type="password" className="w-full rounded-xl border p-3" required />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium">الدور</label>
          <select name="role" className="w-full rounded-xl border p-3" defaultValue="SALES">
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
          <input name="employeeNo" className="w-full rounded-xl border p-3" placeholder="EMP-003" required />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium">القسم</label>
          <input name="department" className="w-full rounded-xl border p-3" required />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium">المسمى الوظيفي</label>
          <input name="title" className="w-full rounded-xl border p-3" required />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium">الجوال</label>
          <input name="phone" className="w-full rounded-xl border p-3" />
        </div>
        <label className="flex items-center gap-2 text-sm text-slate-700 md:col-span-2">
          <input name="isActive" type="checkbox" defaultChecked />
          المستخدم نشط
        </label>
        <div className="md:col-span-2">
          <button className="rounded-xl bg-[#223982] px-5 py-3 text-white">حفظ المستخدم</button>
        </div>
      </form>
    </main>
  )
}
