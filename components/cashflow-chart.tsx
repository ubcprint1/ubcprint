"use client"

import { useState } from "react"
import { Table2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { CashflowData } from "@/lib/accounting-types"

const MOCK_DAILY_DATA: CashflowData[] = [
  { date: "2024-11-01", income: 5200, expense: 3800, profit: 1400 },
  { date: "2024-11-02", income: 4800, expense: 2900, profit: 1900 },
  { date: "2024-11-03", income: 6100, expense: 4200, profit: 1900 },
  { date: "2024-11-04", income: 5500, expense: 3500, profit: 2000 },
  { date: "2024-11-05", income: 7200, expense: 4800, profit: 2400 },
  { date: "2024-11-06", income: 6800, expense: 4100, profit: 2700 },
  { date: "2024-11-07", income: 5900, expense: 3600, profit: 2300 },
]

const MOCK_WEEKLY_DATA: CashflowData[] = [
  { date: "الأسبوع 1", income: 32500, expense: 21000, profit: 11500 },
  { date: "الأسبوع 2", income: 38200, expense: 24500, profit: 13700 },
  { date: "الأسبوع 3", income: 41000, expense: 27800, profit: 13200 },
  { date: "الأسبوع 4", income: 35800, expense: 22300, profit: 13500 },
]

const MOCK_MONTHLY_DATA: CashflowData[] = [
  { date: "يناير", income: 145000, expense: 98000, profit: 47000 },
  { date: "فبراير", income: 132000, expense: 89000, profit: 43000 },
  { date: "مارس", income: 158000, expense: 102000, profit: 56000 },
  { date: "أبريل", income: 148000, expense: 95000, profit: 53000 },
  { date: "مايو", income: 165000, expense: 108000, profit: 57000 },
  { date: "يونيو", income: 152000, expense: 99000, profit: 53000 },
  { date: "يوليو", income: 171000, expense: 112000, profit: 59000 },
  { date: "أغسطس", income: 163000, expense: 106000, profit: 57000 },
  { date: "سبتمبر", income: 155000, expense: 101000, profit: 54000 },
  { date: "أكتوبر", income: 168000, expense: 109000, profit: 59000 },
  { date: "نوفمبر", income: 147500, expense: 95800, profit: 51700 },
  { date: "ديسمبر", income: 182000, expense: 118000, profit: 64000 },
]

const MOCK_YEARLY_DATA: CashflowData[] = [
  { date: "2020", income: 1520000, expense: 1020000, profit: 500000 },
  { date: "2021", income: 1680000, expense: 1125000, profit: 555000 },
  { date: "2022", income: 1850000, expense: 1230000, profit: 620000 },
  { date: "2023", income: 1920000, expense: 1280000, profit: 640000 },
  { date: "2024", income: 1886500, expense: 1232800, profit: 653700 },
]

type Period = "daily" | "weekly" | "monthly" | "yearly"

export function CashflowChart() {
  const [period, setPeriod] = useState<Period>("daily")

  const getData = () => {
    switch (period) {
      case "daily":
        return MOCK_DAILY_DATA
      case "weekly":
        return MOCK_WEEKLY_DATA
      case "monthly":
        return MOCK_MONTHLY_DATA
      case "yearly":
        return MOCK_YEARLY_DATA
      default:
        return MOCK_DAILY_DATA
    }
  }

  const data = getData()

  const openingBalance = 50000 // رصيد افتتاحي افتراضي
  const totalIncome = data.reduce((sum, item) => sum + item.income, 0)
  const totalExpense = data.reduce((sum, item) => sum + item.expense, 0)
  const totalCost = Math.round(totalExpense * 0.6) // التكلفة المباشرة
  const totalOperatingExpenses = totalExpense - totalCost // المصروفات التشغيلية
  const closingBalance = openingBalance + totalIncome - totalExpense

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Table2 className="h-5 w-5 text-primary" />
            <CardTitle>التدفق المالي</CardTitle>
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant={period === "daily" ? "default" : "outline"} onClick={() => setPeriod("daily")}>
              يومي
            </Button>
            <Button size="sm" variant={period === "weekly" ? "default" : "outline"} onClick={() => setPeriod("weekly")}>
              أسبوعي
            </Button>
            <Button
              size="sm"
              variant={period === "monthly" ? "default" : "outline"}
              onClick={() => setPeriod("monthly")}
            >
              شهري
            </Button>
            <Button size="sm" variant={period === "yearly" ? "default" : "outline"} onClick={() => setPeriod("yearly")}>
              سنوي
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* رصيد أول المدة */}
          <div className="rounded-lg border bg-blue-50 p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-muted-foreground">رصيد أول المدة</span>
              <span className="text-xl font-bold text-blue-600">{openingBalance.toLocaleString()} ج.م</span>
            </div>
          </div>

          {/* الجدول */}
          <div className="overflow-x-auto rounded-lg border">
            <table className="w-full text-sm">
              <thead className="bg-muted/50">
                <tr>
                  <th className="border-b p-3 text-right font-medium">التاريخ / الفترة</th>
                  <th className="border-b p-3 text-right font-medium text-green-600">الإيرادات</th>
                  <th className="border-b p-3 text-right font-medium text-orange-600">التكلفة</th>
                  <th className="border-b p-3 text-right font-medium text-red-600">المصروفات التشغيلية</th>
                  <th className="border-b p-3 text-right font-medium text-purple-600">إجمالي المصروفات</th>
                  <th className="border-b p-3 text-right font-medium text-blue-600">الربح</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => {
                  const cost = Math.round(item.expense * 0.6)
                  const operatingExpenses = item.expense - cost
                  return (
                    <tr key={index} className="hover:bg-muted/30 transition-colors">
                      <td className="border-b p-3 font-medium">{item.date}</td>
                      <td className="border-b p-3 text-green-600 font-semibold">{item.income.toLocaleString()} ج.م</td>
                      <td className="border-b p-3 text-orange-600">{cost.toLocaleString()} ج.م</td>
                      <td className="border-b p-3 text-red-600">{operatingExpenses.toLocaleString()} ج.م</td>
                      <td className="border-b p-3 text-purple-600 font-semibold">
                        {item.expense.toLocaleString()} ج.م
                      </td>
                      <td className="border-b p-3 text-blue-600 font-bold">{item.profit.toLocaleString()} ج.م</td>
                    </tr>
                  )
                })}
                {/* صف المجموع */}
                <tr className="bg-muted/50 font-bold">
                  <td className="p-3">المجموع</td>
                  <td className="p-3 text-green-600">{totalIncome.toLocaleString()} ج.م</td>
                  <td className="p-3 text-orange-600">{totalCost.toLocaleString()} ج.م</td>
                  <td className="p-3 text-red-600">{totalOperatingExpenses.toLocaleString()} ج.م</td>
                  <td className="p-3 text-purple-600">{totalExpense.toLocaleString()} ج.م</td>
                  <td className="p-3 text-blue-600">{(totalIncome - totalExpense).toLocaleString()} ج.م</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* رصيد آخر المدة */}
          <div className="rounded-lg border bg-green-50 p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-muted-foreground">رصيد آخر المدة</span>
              <span className="text-xl font-bold text-green-600">{closingBalance.toLocaleString()} ج.م</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
