import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { getSession } from '@/lib/auth'
import { redirect } from 'next/navigation'

export default async function AdminProductsPage() {
  const session = await getSession()
  if (!session || session.audience !== 'admin') redirect('/admin/login')
  const products = await prisma.product.findMany({ orderBy: { createdAt: 'desc' } })

  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-[#1A2E42]">إدارة المنتجات</h1>
        <Link href="/admin/products/new" className="rounded-xl bg-[#097D77] px-4 py-2 text-white">إضافة منتج</Link>
      </div>
      <div className="overflow-hidden rounded-2xl border bg-white">
        <table className="min-w-full text-right text-sm">
          <thead className="bg-slate-50"><tr><th className="p-4">الاسم</th><th className="p-4">التصنيف</th><th className="p-4">السعر</th></tr></thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-t"><td className="p-4">{product.name}</td><td className="p-4">{product.category}</td><td className="p-4">{product.unitPrice}</td></tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  )
}
