"use client"

import { useFinancialStats, formatCurrency, useFinancialStore } from "@/lib/financial-store"
import { TrendingUp, TrendingDown, DollarSign, Wallet } from "lucide-react"
import { Card } from "@/components/ui/card"

export function UnifiedFinancialDashboard({ period = "month" }: { period?: "day" | "week" | "month" | "year" }) {
  const settings = useFinancialStore((state) => state.settings)

  // حساب التواريخ حسب الفترة
  const getDateRange = () => {
    const now = new Date()
    const start = new Date()

    switch (period) {
      case "day":
        start.setDate(now.getDate() - 1)
        break
      case "week":
        start.setDate(now.getDate() - 7)
        break
      case "month":
        start.setMonth(now.getMonth() - 1)
        break
      case "year":
        start.setFullYear(now.getFullYear() - 1)
        break
    }

    return {
      start: start.toISOString().split("T")[0],
      end: now.toISOString().split("T")[0],
    }
  }

  const { start, end } = getDateRange()
  const stats = useFinancialStats(start, end)

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">الإيرادات</p>
            <h3 className="text-2xl font-bold text-green-600">{formatCurrency(stats.revenue, settings)}</h3>
          </div>
          <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
            <TrendingUp className="w-6 h-6 text-green-600" />
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">المصروفات</p>
            <h3 className="text-2xl font-bold text-red-600">{formatCurrency(stats.expenses, settings)}</h3>
          </div>
          <div className="w-12 h-12 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center">
            <TrendingDown className="w-6 h-6 text-red-600" />
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">التكلفة</p>
            <h3 className="text-2xl font-bold text-orange-600">{formatCurrency(stats.costs, settings)}</h3>
          </div>
          <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center">
            <Wallet className="w-6 h-6 text-orange-600" />
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">صافي الربح</p>
            <h3 className="text-2xl font-bold text-blue-600">{formatCurrency(stats.profit, settings)}</h3>
          </div>
          <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
            <DollarSign className="w-6 h-6 text-blue-600" />
          </div>
        </div>
      </Card>
    </div>
  )
}
