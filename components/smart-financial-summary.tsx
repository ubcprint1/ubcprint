"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { TrendingUp, TrendingDown, DollarSign } from "lucide-react"
import Link from "next/link"

export function SmartFinancialSummary() {
  const financialData = {
    todayRevenue: 12500,
    comparisonYesterday: 8,
    comparisonWeekAverage: -5,
    todayExpenses: 3500,
    netProfit: 9000,
  }

  return (
    <Card className="p-6">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <DollarSign className="h-6 w-6 text-green-500" />
          <h2 className="text-xl font-bold text-foreground">الملخص المالي</h2>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <div className="flex items-baseline gap-2">
            <p className="text-3xl font-bold text-foreground">{financialData.todayRevenue.toLocaleString()} ج.م</p>
            <p className="text-sm text-muted-foreground">إيرادات اليوم</p>
          </div>
          <div className="mt-2 flex flex-wrap gap-3">
            <div className="flex items-center gap-1 text-sm">
              <TrendingUp className="h-4 w-4 text-green-500" />
              <span className="text-green-500">أفضل من أمس بـ {financialData.comparisonYesterday}%</span>
            </div>
            <div className="flex items-center gap-1 text-sm">
              <TrendingDown className="h-4 w-4 text-red-500" />
              <span className="text-red-500">
                أقل من متوسط الأسبوع بـ {Math.abs(financialData.comparisonWeekAverage)}%
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 rounded-lg border border-border bg-secondary/30 p-4">
          <div>
            <p className="text-sm text-muted-foreground">المصروفات</p>
            <p className="text-xl font-bold text-red-500">{financialData.todayExpenses.toLocaleString()} ج.م</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">صافي الربح</p>
            <p className="text-xl font-bold text-green-500">{financialData.netProfit.toLocaleString()} ج.م</p>
          </div>
        </div>

        <Link href="/accounting">
          <Button className="w-full bg-transparent" variant="outline">
            عرض التفاصيل المالية
          </Button>
        </Link>
      </div>
    </Card>
  )
}
