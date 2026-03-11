import Link from "next/link"

const adminCards = [
  { title: 'إدارة المنتجات', href: '/products', description: 'إضافة المنتجات والتعديل عليها' },
  { title: 'إدارة الطلبات', href: '/orders', description: 'متابعة الطلبات الواردة ومراحل التنفيذ' },
  { title: 'المحاسبة', href: '/accounting', description: 'الفواتير والمدفوعات والمصروفات' },
  { title: 'المستخدمون والصلاحيات', href: '/users', description: 'إدارة الموظفين والأدوار والصلاحيات' },
]

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6" dir="rtl">
      <div>
        <h1 className="text-3xl font-black text-slate-900">لوحة الأدمن</h1>
        <p className="mt-2 text-slate-600">تحكم كامل في منتجات UBC Print والأسعار والعروض والمستخدمين.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {adminCards.map((card) => (
          <Link key={card.href} href={card.href} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
            <h2 className="text-xl font-bold text-slate-900">{card.title}</h2>
            <p className="mt-2 text-sm text-slate-600">{card.description}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
