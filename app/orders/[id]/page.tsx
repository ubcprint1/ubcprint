"use client"

import { useParams, useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, CheckCircle2, Clock, AlertCircle, Circle, Pencil } from "lucide-react"
import Link from "next/link"
import { useOrdersStore } from "@/lib/orders-store"
import { ORDER_STAGES_CONFIG } from "@/lib/orders-types"

export default function OrderDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const id = params.id as string
  const { getOrderById } = useOrdersStore()
  const order = getOrderById(id)

  if (!order) {
    return (
      <div className="min-h-screen bg-background p-6" dir="rtl">
        <Card className="p-12 text-center">
          <p className="text-muted-foreground">الطلب غير موجود</p>
          <Link href="/orders">
            <Button className="mt-4">العودة للطلبات</Button>
          </Link>
        </Card>
      </div>
    )
  }

  const currentStageInfo = ORDER_STAGES_CONFIG[order.currentStage]
  const progress = (order.stages.filter((s) => s.status === "completed").length / order.stages.length) * 100

  return (
    <div className="min-h-screen bg-background p-6" dir="rtl">
      <div className="mx-auto max-w-5xl space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => router.back()}>
              <ArrowRight className="h-5 w-5" />
            </Button>
            <h1 className="text-2xl font-bold text-foreground">تفاصيل الطلب</h1>
          </div>
          <Link href={`/orders/${id}/edit`}>
            <Button variant="outline" size="sm" className="gap-2 bg-transparent">
              <Pencil className="h-4 w-4" />
              تعديل الطلب
            </Button>
          </Link>
        </div>

        <Card className="p-6">
          <div className="mb-6 flex items-start justify-between">
            <div>
              <h2 className="text-2xl font-bold text-foreground">{order.orderNumber}</h2>
              <p className="mt-1 text-muted-foreground">{order.customerName}</p>
            </div>
            <Badge
              style={{
                backgroundColor: `${currentStageInfo.color}20`,
                color: currentStageInfo.color,
              }}
              className="text-sm"
            >
              {currentStageInfo.label}
            </Badge>
          </div>

          <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-3">
            <div>
              <p className="text-sm text-muted-foreground">المنتج</p>
              <p className="font-semibold text-foreground">{order.productName}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">الكمية</p>
              <p className="font-semibold text-foreground">{order.quantity}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">موعد التسليم</p>
              <p className="font-semibold text-foreground">
                {new Date(order.expectedDelivery).toLocaleDateString("ar-EG")}
              </p>
            </div>
          </div>

          {order.description && (
            <div className="mb-6">
              <p className="text-sm text-muted-foreground">الوصف</p>
              <p className="mt-1 text-foreground">{order.description}</p>
            </div>
          )}

          <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <p className="text-sm text-muted-foreground">التكلفة الكلية</p>
              <p className="text-xl font-bold text-foreground">{order.totalCost.toLocaleString()} ج.م</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">المبلغ المدفوع</p>
              <p className="text-xl font-bold text-green-600">{order.paidAmount.toLocaleString()} ج.م</p>
            </div>
          </div>

          <div className="mb-2 space-y-1">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">تقدم العمل</span>
              <span className="font-semibold text-foreground">{Math.round(progress)}%</span>
            </div>
            <div className="h-3 w-full overflow-hidden rounded-full bg-muted">
              <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${progress}%` }} />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="mb-6 text-xl font-bold text-foreground">مراحل سير العمل</h3>

          <div className="space-y-4">
            {order.stages.map((stage, index) => {
              const stageInfo = ORDER_STAGES_CONFIG[stage.stage]
              const isActive = stage.status === "in_progress"
              const isCompleted = stage.status === "completed"
              const isPending = stage.status === "pending"

              return (
                <div key={stage.stageId} className="relative">
                  {index < order.stages.length - 1 && (
                    <div
                      className="absolute right-[15px] top-[40px] h-[calc(100%+16px)] w-0.5 bg-border"
                      style={{
                        backgroundColor: isCompleted ? stageInfo.color : undefined,
                      }}
                    />
                  )}

                  <Card className={`p-4 ${isActive ? "border-primary shadow-md" : ""}`}>
                    <div className="flex items-start gap-4">
                      <div
                        className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full"
                        style={{
                          backgroundColor: isCompleted
                            ? stageInfo.color
                            : isPending
                              ? "#e5e7eb"
                              : `${stageInfo.color}40`,
                        }}
                      >
                        {isCompleted ? (
                          <CheckCircle2 className="h-5 w-5 text-white" />
                        ) : isActive ? (
                          <Clock className="h-5 w-5" style={{ color: stageInfo.color }} />
                        ) : (
                          <Circle className="h-5 w-5 text-gray-400" />
                        )}
                      </div>

                      <div className="flex-1">
                        <div className="mb-2 flex items-center justify-between">
                          <h4 className="font-bold text-foreground">{stageInfo.label}</h4>
                          <Badge
                            style={{
                              backgroundColor: isCompleted
                                ? "#22c55e20"
                                : isActive
                                  ? `${stageInfo.color}20`
                                  : "#e5e7eb",
                              color: isCompleted ? "#22c55e" : isActive ? stageInfo.color : "#6b7280",
                            }}
                          >
                            {isCompleted ? "مكتملة" : isActive ? "جارية" : "قادمة"}
                          </Badge>
                        </div>

                        <div className="mb-2 text-sm text-muted-foreground">
                          <p>
                            المسؤول: <span className="font-semibold text-foreground">{stage.assignedToName}</span>
                          </p>
                          <p>البدء المتوقع: {new Date(stage.startDate).toLocaleDateString("ar-EG")}</p>
                          <p>الانتهاء المتوقع: {new Date(stage.expectedEndDate).toLocaleDateString("ar-EG")}</p>
                          {stage.actualEndDate && (
                            <p className="text-green-600">
                              الانتهاء الفعلي: {new Date(stage.actualEndDate).toLocaleDateString("ar-EG")}
                            </p>
                          )}
                        </div>

                        {stage.notes && (
                          <div className="mt-2 rounded bg-muted p-2 text-sm text-muted-foreground">
                            <AlertCircle className="mb-1 inline h-4 w-4" /> {stage.notes}
                          </div>
                        )}
                      </div>
                    </div>
                  </Card>
                </div>
              )
            })}
          </div>
        </Card>
      </div>
    </div>
  )
}
