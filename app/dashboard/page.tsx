import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getDashboardData } from "@/lib/dashboard"
import { ClipboardList, DollarSign, Package, Users, Cog, FileText, CircleDollarSign, Clock3 } from "lucide-react"

export const dynamic = "force-dynamic"

const currency = new Intl.NumberFormat("ar-SA", { style: "currency", currency: "SAR", maximumFractionDigits: 0 })

function statusLabel(status: string) {
  const map: Record<string, string> = {
    NEW: "جديد",
    REVIEW: "مراجعة",
    PRICING: "تسعير",
    APPROVAL: "اعتماد",
    DESIGN: "تصميم",
    PRODUCTION: "إنتاج",
    QUALITY: "جودة",
    PACKAGING: "تغليف",
    DELIVERY: "تسليم",
    COMPLETED: "مكتمل",
    CANCELLED: "ملغي",
  }
  return map[status] ?? status
}

export default async function DashboardPage() {
  const { stats, recentOrders } = await getDashboardData()

  const cards = [
    { title: "إجمالي الطلبات", value: stats.ordersCount, icon: ClipboardList },
    { title: "العملاء", value: stats.clientsCount, icon: Users },
    { title: "المنتجات", value: stats.productsCount, icon: Package },
    { title: "الماكينات", value: stats.machinesCount, icon: Cog },
    { title: "الفواتير", value: stats.invoicesCount, icon: FileText },
    { title: "المهام النشطة", value: stats.activeTasksCount, icon: Clock3 },
  ]

  return (
    <div className="space-y-6" dir="rtl">
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">
        {cards.map((card) => {
          const Icon = card.icon
          return (
            <Card key={card.title} className="rounded-2xl shadow-sm">
              <CardContent className="flex items-center justify-between p-5">
                <div>
                  <p className="text-sm text-muted-foreground">{card.title}</p>
                  <p className="mt-2 text-3xl font-bold">{card.value}</p>
                </div>
                <div className="rounded-xl bg-primary/10 p-3 text-primary">
                  <Icon className="h-5 w-5" />
                </div>
              </CardContent>
            </Card>
          )
        })}
      </section>

      <section className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="rounded-2xl lg:col-span-2">
          <CardHeader>
            <CardTitle>ملخص الأداء المالي</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="rounded-2xl border p-4">
              <div className="mb-2 flex items-center gap-2 text-muted-foreground"><CircleDollarSign className="h-4 w-4" /> إجمالي الفواتير</div>
              <div className="text-2xl font-bold">{currency.format(stats.revenue)}</div>
            </div>
            <div className="rounded-2xl border p-4">
              <div className="mb-2 flex items-center gap-2 text-muted-foreground"><DollarSign className="h-4 w-4" /> المدفوع</div>
              <div className="text-2xl font-bold">{currency.format(stats.paid)}</div>
            </div>
            <div className="rounded-2xl border p-4">
              <div className="mb-2 flex items-center gap-2 text-muted-foreground"><Clock3 className="h-4 w-4" /> المتبقي</div>
              <div className="text-2xl font-bold">{currency.format(stats.outstanding)}</div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle>حالة التشغيل</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between rounded-xl bg-muted p-3">
              <span>طلبات قيد المعالجة</span>
              <strong>{stats.pendingOrders}</strong>
            </div>
            <div className="flex items-center justify-between rounded-xl bg-muted p-3">
              <span>فواتير مدفوعة</span>
              <strong>{stats.paidInvoices}</strong>
            </div>
            <div className="flex items-center justify-between rounded-xl bg-muted p-3">
              <span>سجلات حضور</span>
              <strong>{stats.attendanceTodayCount}</strong>
            </div>
          </CardContent>
        </Card>
      </section>

      <section>
        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle>آخر الطلبات</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="border-b text-right text-muted-foreground">
                    <th className="px-4 py-3">رقم الطلب</th>
                    <th className="px-4 py-3">العميل</th>
                    <th className="px-4 py-3">الحالة</th>
                    <th className="px-4 py-3">القيمة</th>
                    <th className="px-4 py-3">التاريخ</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="border-b last:border-0">
                      <td className="px-4 py-3 font-medium">{order.orderNumber}</td>
                      <td className="px-4 py-3">{order.customerName}</td>
                      <td className="px-4 py-3"><Badge variant="secondary">{statusLabel(order.status)}</Badge></td>
                      <td className="px-4 py-3">{currency.format(order.totalCost)}</td>
                      <td className="px-4 py-3 text-muted-foreground">{new Date(order.createdAt).toLocaleDateString("ar-SA")}</td>
                    </tr>
                  ))}
                  {recentOrders.length === 0 ? (
                    <tr>
                      <td className="px-4 py-6 text-center text-muted-foreground" colSpan={5}>لا توجد بيانات حتى الآن.</td>
                    </tr>
                  ) : null}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
