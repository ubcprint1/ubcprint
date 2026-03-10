"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { DollarSign, Calendar, TrendingUp, CheckCircle2, Phone, Package, Zap } from "lucide-react"
import type { Machine, MaintenanceRecord } from "@/lib/machines-types"

interface MachineProfileProps {
  machine: Machine
  maintenanceRecords?: MaintenanceRecord[]
}

export function MachineProfile({ machine, maintenanceRecords = [] }: MachineProfileProps) {
  const [activeTab, setActiveTab] = useState<"overview" | "services" | "maintenance" | "revenue">("overview")

  const statusColors = {
    working: { bg: "bg-green-500/10", text: "text-green-500", label: "تعمل" },
    maintenance: { bg: "bg-yellow-500/10", text: "text-yellow-500", label: "صيانة" },
    stopped: { bg: "bg-gray-500/10", text: "text-gray-500", label: "متوقفة" },
    broken: { bg: "bg-red-500/10", text: "text-red-500", label: "معطلة" },
  }

  const revenuePercentage = (machine.totalRevenue / machine.purchasePrice) * 100
  const quarterlySpareCost = machine.spareParts
    .filter((p) => p.replacementPeriod <= 3)
    .reduce((sum, p) => sum + p.cost, 0)

  return (
    <div className="space-y-6">
      {/* رأس البطاقة */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <CardTitle className="text-2xl">{machine.name}</CardTitle>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span>الموديل: {machine.model}</span>
                <span>•</span>
                <span>الرقم التسلسلي: {machine.serialNumber}</span>
              </div>
            </div>
            <Badge className={`${statusColors[machine.status].bg} ${statusColors[machine.status].text}`}>
              {statusColors[machine.status].label}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">تاريخ الشراء</p>
              <p className="font-semibold">{new Date(machine.purchaseDate).toLocaleDateString("ar-EG")}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">سعر الشراء</p>
              <p className="font-semibold">{machine.purchasePrice.toLocaleString()} ج.م</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">ساعات التشغيل</p>
              <p className="font-semibold">{machine.totalOperatingHours.toLocaleString()} ساعة</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">عدد الوظائف</p>
              <p className="font-semibold">{machine.totalJobs.toLocaleString()} وظيفة</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* التبويبات */}
      <div className="flex gap-2 border-b">
        <Button variant={activeTab === "overview" ? "default" : "ghost"} onClick={() => setActiveTab("overview")}>
          نظرة عامة
        </Button>
        <Button variant={activeTab === "services" ? "default" : "ghost"} onClick={() => setActiveTab("services")}>
          الخدمات والتسعير
        </Button>
        <Button variant={activeTab === "maintenance" ? "default" : "ghost"} onClick={() => setActiveTab("maintenance")}>
          الصيانة
        </Button>
        <Button variant={activeTab === "revenue" ? "default" : "ghost"} onClick={() => setActiveTab("revenue")}>
          الإيرادات
        </Button>
      </div>

      {/* المحتوى */}
      {activeTab === "overview" && (
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Phone className="h-5 w-5" />
                معلومات الصيانة
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-sm text-muted-foreground">المهندس المسؤول</p>
                <p className="font-semibold">{machine.maintenanceEngineer}</p>
                <p className="text-sm text-muted-foreground">{machine.engineerPhone}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">تكلفة الزيارة</p>
                <p className="font-semibold">{machine.visitCost} ج.م</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">الصيانة القادمة</p>
                <p className="font-semibold">{new Date(machine.nextMaintenanceDate).toLocaleDateString("ar-EG")}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Package className="h-5 w-5" />
                قطع الغيار (كل 3 أشهر)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {machine.spareParts.map((part, idx) => (
                  <div key={idx} className="flex justify-between text-sm">
                    <span>{part.name}</span>
                    <span className="font-semibold">{part.cost} ج.م</span>
                  </div>
                ))}
                <div className="border-t pt-2">
                  <div className="flex justify-between font-semibold">
                    <span>الإجمالي الربع سنوي:</span>
                    <span>{quarterlySpareCost} ج.م</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Zap className="h-5 w-5" />
                تكاليف التشغيل
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">الكهرباء/ساعة</span>
                <span className="font-semibold">{machine.operatingCosts.electricityCostPerHour} ج.م</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">الصيانة/شهر</span>
                <span className="font-semibold">{machine.operatingCosts.maintenanceCostPerMonth} ج.م</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <TrendingUp className="h-5 w-5" />
                استرداد التكلفة
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <div className="mb-2 flex justify-between text-sm">
                  <span>تم تحقيق {revenuePercentage.toFixed(1)}% من سعر الماكينة</span>
                  <span className="font-semibold">{machine.totalRevenue.toLocaleString()} ج.م</span>
                </div>
                <Progress value={revenuePercentage} className="h-2" />
              </div>
              <div className="text-sm text-muted-foreground">
                متبقي: {(machine.purchasePrice - machine.totalRevenue).toLocaleString()} ج.م
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === "services" && (
        <div className="space-y-4">
          {machine.services.map((service) => (
            <Card key={service.id}>
              <CardHeader>
                <CardTitle className="text-lg">{service.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="mb-2 text-sm text-muted-foreground">
                      الوحدة: {service.unit} | التكلفة: {service.costPerUnit} ج.م
                    </p>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">للأفراد</p>
                      <p className="text-lg font-bold text-green-500">{service.pricePerUnit.individual} ج.م</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">للشركات</p>
                      <p className="text-lg font-bold text-blue-500">{service.pricePerUnit.company} ج.م</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">لمكاتب الدعاية</p>
                      <p className="text-lg font-bold text-purple-500">{service.pricePerUnit.advertisingOffice} ج.م</p>
                    </div>
                  </div>
                  {service.sizeBasedPricing && (
                    <div className="rounded-lg bg-muted p-3">
                      <p className="mb-2 text-sm font-medium">التسعير حسب الحجم</p>
                      <p className="text-sm text-muted-foreground">
                        التكلفة الأساسية: {service.sizeBasedPricing.baseCost} ج.م +
                        {service.sizeBasedPricing.pricePerCmSquared} ج.م لكل سم²
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {activeTab === "maintenance" && (
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>جدول الصيانة الدورية</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between rounded-lg bg-muted p-3">
                <div>
                  <p className="font-semibold">الصيانة القادمة</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(machine.nextMaintenanceDate).toLocaleDateString("ar-EG")}
                  </p>
                </div>
                <Badge className="bg-yellow-500/10 text-yellow-500">
                  <Calendar className="ml-1 h-4 w-4" />
                  مجدولة
                </Badge>
              </div>
              {machine.lastMaintenanceDate && (
                <div className="flex items-center justify-between rounded-lg bg-muted p-3">
                  <div>
                    <p className="font-semibold">آخر صيانة</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(machine.lastMaintenanceDate).toLocaleDateString("ar-EG")}
                    </p>
                  </div>
                  <Badge className="bg-green-500/10 text-green-500">
                    <CheckCircle2 className="ml-1 h-4 w-4" />
                    مكتملة
                  </Badge>
                </div>
              )}
            </CardContent>
          </Card>

          {maintenanceRecords.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>سجل الصيانة</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {maintenanceRecords.map((record) => (
                    <div key={record.id} className="rounded-lg border p-3">
                      <div className="mb-2 flex items-start justify-between">
                        <div>
                          <p className="font-semibold">{record.description}</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(record.date).toLocaleDateString("ar-EG")} • {record.engineerName}
                          </p>
                        </div>
                        <Badge variant="outline">
                          {record.type === "preventive" ? "وقائية" : record.type === "corrective" ? "تصحيحية" : "طارئة"}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">التكلفة</span>
                        <span className="font-semibold">{record.cost} ج.م</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {activeTab === "revenue" && (
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                إحصائيات الإيرادات
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">إجمالي الإيرادات</p>
                <p className="text-3xl font-bold text-green-500">{machine.totalRevenue.toLocaleString()} ج.م</p>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">متوسط الإيراد/وظيفة</span>
                  <span className="font-semibold">{(machine.totalRevenue / machine.totalJobs).toFixed(2)} ج.م</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">متوسط الإيراد/ساعة</span>
                  <span className="font-semibold">
                    {(machine.totalRevenue / machine.totalOperatingHours).toFixed(2)} ج.م
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>استرداد رأس المال</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="mb-2 flex justify-between">
                  <span className="text-sm text-muted-foreground">نسبة الاسترداد</span>
                  <span className="font-semibold">{revenuePercentage.toFixed(1)}%</span>
                </div>
                <Progress value={revenuePercentage} className="h-3" />
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">سعر الشراء</span>
                  <span className="font-semibold">{machine.purchasePrice.toLocaleString()} ج.م</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">تم تحقيقه</span>
                  <span className="font-semibold text-green-500">{machine.totalRevenue.toLocaleString()} ج.م</span>
                </div>
                <div className="flex justify-between border-t pt-2">
                  <span className="text-muted-foreground">المتبقي</span>
                  <span className="font-semibold text-orange-500">
                    {(machine.purchasePrice - machine.totalRevenue).toLocaleString()} ج.م
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
