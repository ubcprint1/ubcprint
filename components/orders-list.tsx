"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Plus, Search, Clock, AlertCircle, CheckCircle2, XCircle, ArrowRight } from "lucide-react"
import Link from "next/link"
import { useOrdersStore } from "@/lib/orders-store"
import { ORDER_STAGES_CONFIG } from "@/lib/orders-types"

const priorityConfig = {
  low: { label: "منخفض", color: "bg-blue-500/20 text-blue-600" },
  medium: { label: "متوسط", color: "bg-yellow-500/20 text-yellow-600" },
  high: { label: "عالي", color: "bg-orange-500/20 text-orange-600" },
  urgent: { label: "عاجل", color: "bg-red-500/20 text-red-600" },
}

export function OrdersList() {
  const router = useRouter()
  const { orders } = useOrdersStore()
  const [searchQuery, setSearchQuery] = useState("")

  const filteredOrders = orders.filter(
    (order) =>
      order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.productName.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" onClick={() => router.back()}>
              <ArrowRight className="h-4 w-4" />
            </Button>
            <h2 className="text-2xl font-bold text-foreground">إدارة الطلبات</h2>
          </div>
          <Link href="/orders/new">
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              طلب جديد
            </Button>
          </Link>
        </div>

        <div className="relative mb-6">
          <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="البحث في الطلبات..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pr-10"
          />
        </div>

        <div className="space-y-4">
          {filteredOrders.map((order) => {
            const currentStageInfo = ORDER_STAGES_CONFIG[order.currentStage]
            const progress = (order.stages.filter((s) => s.status === "completed").length / order.stages.length) * 100

            return (
              <Link key={order.id} href={`/orders/${order.id}`}>
                <Card className="p-4 transition-all hover:shadow-md cursor-pointer">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-lg font-bold text-foreground">{order.orderNumber}</h3>
                        <Badge className={priorityConfig[order.priority].color}>
                          {priorityConfig[order.priority].label}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{order.customerName}</p>
                    </div>

                    <Badge
                      style={{
                        backgroundColor: `${currentStageInfo.color}20`,
                        color: currentStageInfo.color,
                      }}
                    >
                      {currentStageInfo.label}
                    </Badge>
                  </div>

                  <div className="mb-3">
                    <p className="font-semibold text-foreground">{order.productName}</p>
                    <p className="text-sm text-muted-foreground">الكمية: {order.quantity}</p>
                  </div>

                  <div className="mb-3 space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">التقدم</span>
                      <span className="font-semibold text-foreground">{Math.round(progress)}%</span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                      <div
                        className="h-full rounded-full bg-primary transition-all"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">
                          {new Date(order.expectedDelivery).toLocaleDateString("ar-EG")}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        {order.paidAmount >= order.totalCost ? (
                          <>
                            <CheckCircle2 className="h-4 w-4 text-green-500" />
                            <span className="text-green-600">مدفوع</span>
                          </>
                        ) : order.paidAmount > 0 ? (
                          <>
                            <AlertCircle className="h-4 w-4 text-yellow-500" />
                            <span className="text-yellow-600">مدفوع جزئياً</span>
                          </>
                        ) : (
                          <>
                            <XCircle className="h-4 w-4 text-red-500" />
                            <span className="text-red-600">غير مدفوع</span>
                          </>
                        )}
                      </div>
                    </div>

                    <div className="text-left">
                      <span className="font-bold text-foreground">{order.totalCost.toLocaleString()} ج.م</span>
                    </div>
                  </div>
                </Card>
              </Link>
            )
          })}

          {filteredOrders.length === 0 && (
            <div className="py-12 text-center">
              <p className="text-muted-foreground">لا توجد طلبات</p>
            </div>
          )}
        </div>
      </Card>
    </div>
  )
}
