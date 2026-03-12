import Link from 'next/link'
import { getSession } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { createClientAction } from '../actions'

export default async function NewCustomerPage({ searchParams }: { searchParams?: { error?: string } }) {
  const session = await getSession()
  if (!session || (session.audience !== 'admin' && session.audience !== 'staff')) redirect('/staff/login')

  return (
    <main className="mx-auto max-w-3xl px-4 py-10" dir="rtl">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-[#1A2E42]">إضافة عميل جديد</h1>
        <Link href="/accounting/customers" className="rounded-xl border px-4 py-2">رجوع</Link>
      </div>

      {searchParams?.error ? (
        <div className="mb-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {searchParams.error === 'missing' && 'اسم العميل مطلوب.'}
          {searchParams.error === 'email' && 'بريد العميل مستخدم مسبقاً.'}
          {searchParams.error === 'portal' && 'لإنشاء البوابة لازم بريد وكلمة مرور.'}
          {searchParams.error === 'userexists' && 'يوجد مستخدم مسبقاً بنفس البريد.'}
        </div>
      ) : null}

      <form action={createClientAction} className="grid gap-4 rounded-2xl border bg-white p-6 shadow-sm md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium">اسم العميل</label>
          <input name="name" className="w-full rounded-xl border p-3" required />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium">اسم الشركة</label>
          <input name="companyName" className="w-full rounded-xl border p-3" />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium">البريد الإلكتروني</label>
          <input name="email" type="email" className="w-full rounded-xl border p-3" />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium">الجوال</label>
          <input name="phone" className="w-full rounded-xl border p-3" />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium">المدينة</label>
          <input name="city" className="w-full rounded-xl border p-3" />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium">العنوان</label>
          <input name="address" className="w-full rounded-xl border p-3" />
        </div>
        <div className="md:col-span-2 rounded-2xl border border-slate-200 p-4">
          <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
            <input name="createPortal" type="checkbox" />
            إنشاء حساب دخول للعميل في البوابة
          </label>
          <div className="mt-3">
            <label className="mb-2 block text-sm font-medium">كلمة مرور البوابة</label>
            <input name="password" type="password" className="w-full rounded-xl border p-3" placeholder="اختياري إذا ما فعلت البوابة" />
          </div>
        </div>
        <div className="md:col-span-2">
          <button className="rounded-xl bg-[#223982] px-5 py-3 text-white">حفظ العميل</button>
        </div>
      </form>
    </main>
  )
}
