"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ShoppingBag, Package, Clock, CheckCircle, User, LogOut, FileText } from "lucide-react"
import Link from "next/link"

type PortalUser = {
  id: string
  fullName: string
  email: string
  client?: { phone?: string; address?: string }
}

type PortalOrder = {
  id: string
  orderNumber: string
  productName?: string | null
  quantity: number
  status: string
  createdAt: string
  invoices: { total: number; paidAmount: number; balanceAmount: number }[]
}

const statusLabel: Record<string, string> = {
  NEW: 'جديد', REVIEW: 'قيد المراجعة', PRICING: 'قيد التسعير', APPROVAL: 'بانتظار الموافقة', DESIGN: 'قيد التصميم', PRODUCTION: 'قيد الطباعة', QUALITY: 'قيد الجودة', PACKAGING: 'قيد التجهيز', DELIVERY: 'جاهز للتسليم', COMPLETED: 'مكتمل', CANCELLED: 'ملغي'
}

export default function ClientPortal() {
  const router = useRouter()
  const [user, setUser] = useState<PortalUser | null>(null)
  const [orders, setOrders] = useState<PortalOrder[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      try {
        const meRes = await fetch('/api/auth/me')
        const meData = await meRes.json()
        if (!meRes.ok || meData.user?.role !== 'CLIENT') {
          router.push('/client/login')
          return
        }
        setUser(meData.user)
        const ordersRes = await fetch('/api/client/orders')
        const ordersData = await ordersRes.json()
        if (ordersRes.ok) setOrders(ordersData.orders || [])
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [router])

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/')
    router.refresh()
  }

  if (loading) return <div className="min-h-screen bg-white" />
  if (!user) return null

  const completed = orders.filter((o) => o.status === 'COMPLETED').length
  const inProgress = orders.filter((o) => !['COMPLETED', 'CANCELLED'].includes(o.status)).length

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white" dir="rtl">
      <header className="border-b bg-white">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-slate-900">لوحة تحكم العميل</h1>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <User className="h-5 w-5 text-slate-600" />
                <span className="text-sm font-medium">{user.fullName}</span>
              </div>
              <Button variant="outline" onClick={handleLogout} className="gap-2 bg-transparent">
                <LogOut className="h-4 w-4" />
                تسجيل الخروج
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h2 className="mb-2 text-3xl font-bold text-slate-900">مرحباً {user.fullName}</h2>
          <p className="text-slate-600">إليك نظرة عامة على طلباتك الحالية ومعلومات حسابك</p>
        </div>

        <div className="mb-8 grid gap-6 md:grid-cols-3">
          <Card><CardHeader className="pb-3"><CardTitle className="text-sm font-medium flex items-center gap-2"><Package className="h-4 w-4 text-blue-600" />إجمالي الطلبات</CardTitle></CardHeader><CardContent><div className="text-3xl font-bold">{orders.length}</div></CardContent></Card>
          <Card><CardHeader className="pb-3"><CardTitle className="text-sm font-medium flex items-center gap-2"><Clock className="h-4 w-4 text-orange-600" />قيد التنفيذ</CardTitle></CardHeader><CardContent><div className="text-3xl font-bold">{inProgress}</div></CardContent></Card>
          <Card><CardHeader className="pb-3"><CardTitle className="text-sm font-medium flex items-center gap-2"><CheckCircle className="h-4 w-4 text-green-600" />مكتملة</CardTitle></CardHeader><CardContent><div className="text-3xl font-bold">{completed}</div></CardContent></Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>طلباتي</CardTitle>
            </CardHeader>
            <CardContent>
              {orders.length === 0 ? (
                <div className="py-12 text-center text-slate-500">
                  <Package className="mx-auto mb-4 h-16 w-16 text-slate-300" />
                  <p className="mb-4">لا توجد طلبات حالياً</p>
                  <Link href="/request-quote"><Button className="gap-2 bg-blue-600 hover:bg-blue-700"><ShoppingBag className="h-4 w-4" />اطلب الآن</Button></Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.map((order) => {
                    const invoice = order.invoices?.[0]
                    return (
                      <div key={order.id} className="rounded-2xl border border-slate-200 p-4">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <div className="font-bold text-slate-900">{order.orderNumber}</div>
                            <div className="mt-1 text-sm text-slate-600">{order.productName || 'مشروع مخصص'} • الكمية {order.quantity}</div>
                            <div className="mt-2 text-sm text-slate-500">{statusLabel[order.status] || order.status}</div>
                          </div>
                          <Link href={`/track-order?query=${order.orderNumber}`}><Button variant="outline" className="gap-2 bg-transparent"><FileText className="h-4 w-4" />تتبع</Button></Link>
                        </div>
                        {invoice && <div className="mt-3 text-sm text-slate-600">إجمالي الفاتورة: {invoice.total} • المدفوع: {invoice.paidAmount} • المتبقي: {invoice.balanceAmount}</div>}
                      </div>
                    )
                  })}
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>معلومات الحساب</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              <div><div className="text-sm text-slate-500">الاسم</div><div className="font-medium">{user.fullName}</div></div>
              <div><div className="text-sm text-slate-500">البريد الإلكتروني</div><div className="font-medium">{user.email}</div></div>
              <div><div className="text-sm text-slate-500">رقم الهاتف</div><div className="font-medium">{user.client?.phone || '—'}</div></div>
              <div><div className="text-sm text-slate-500">العنوان</div><div className="font-medium">{user.client?.address || '—'}</div></div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
