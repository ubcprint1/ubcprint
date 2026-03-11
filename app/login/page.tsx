import Link from "next/link"

export default function EmployeeLoginPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] px-4 py-16 text-[#1A2E42] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-[#223982] text-3xl text-white">⟶</div>
          <h1 className="text-5xl font-black">تسجيل الدخول</h1>
          <p className="mt-4 text-xl text-slate-600">نظام إدارة المطبعة - دخول الموظفين</p>
        </div>
        <div className="space-y-5">
          <div>
            <label className="mb-2 block text-lg font-bold">البريد الإلكتروني</label>
            <input className="h-14 w-full rounded-xl border border-slate-300 px-4" defaultValue="admin@example.com" />
          </div>
          <div>
            <label className="mb-2 block text-lg font-bold">كلمة المرور</label>
            <input className="h-14 w-full rounded-xl border border-slate-300 px-4" defaultValue="Admin@123456" type="password" />
          </div>
          <Link href="/dashboard" className="flex h-14 items-center justify-center rounded-xl bg-[#111111] text-lg font-bold text-white">دخول النظام</Link>
        </div>
        <div className="mt-8 text-center text-slate-500">
          <div className="font-bold">بيانات تجريبية</div>
          <div className="mt-3">admin@example.com</div>
          <div className="mt-2">Admin@123456</div>
        </div>
      </div>
    </div>
  )
}
