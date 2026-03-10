"use client"

import { useState } from "react"
import { Receipt, Plus, Calendar, User, Download, Search } from "lucide-react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Expense } from "@/lib/accounting-types"

const MOCK_EXPENSES: Expense[] = [
  {
    id: "1",
    date: "2024-11-08",
    category: "materials",
    description: "شراء ورق A4 - 50 كرتونة",
    amount: 5000,
    vendor: "مؤسسة الورق المتحدة",
    paymentMethod: "bank",
  },
  {
    id: "2",
    date: "2024-11-07",
    category: "maintenance",
    description: "صيانة آلة الطباعة الرقمية",
    amount: 2500,
    vendor: "مركز الصيانة الفنية",
    paymentMethod: "cash",
  },
  {
    id: "3",
    date: "2024-11-05",
    category: "utilities",
    description: "فاتورة الكهرباء",
    amount: 3200,
    paymentMethod: "bank",
  },
  {
    id: "4",
    date: "2024-11-01",
    category: "salaries",
    description: "رواتب الموظفين - نوفمبر",
    amount: 25000,
    paymentMethod: "bank",
  },
]

const categoryColors = {
  materials: "bg-blue-500/10 text-blue-500",
  maintenance: "bg-amber-500/10 text-amber-500",
  salaries: "bg-purple-500/10 text-purple-500",
  utilities: "bg-emerald-500/10 text-emerald-500",
  other: "bg-slate-500/10 text-slate-500",
}

const categoryLabels = {
  materials: "مواد خام",
  maintenance: "صيانة",
  salaries: "رواتب",
  utilities: "تشغيل",
  other: "أخرى",
}

export function ExpensesListEnhanced() {
  const [expenses] = useState<Expense[]>(MOCK_EXPENSES)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterCategory, setFilterCategory] = useState<string>("all")
  const [filterDate, setFilterDate] = useState<string>("all")

  const filteredExpenses = expenses.filter((expense) => {
    const matchesSearch =
      expense.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      expense.vendor?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = filterCategory === "all" || expense.category === filterCategory

    return matchesSearch && matchesCategory
  })

  const totalExpenses = filteredExpenses.reduce((sum, expense) => sum + expense.amount, 0)

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Receipt className="h-5 w-5 text-primary" />
            <CardTitle>المصروفات</CardTitle>
          </div>
          <div className="flex gap-2">
            <Link href="/accounting/reports/expenses">
              <Button size="sm" variant="outline" className="gap-2 bg-transparent">
                <Download className="h-4 w-4" />
                تقرير PDF
              </Button>
            </Link>
            <Link href="/accounting/expense/new">
              <Button size="sm" className="gap-2">
                <Plus className="h-4 w-4" />
                مصروف جديد
              </Button>
            </Link>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-4 rounded-lg bg-red-500/10 p-4">
          <p className="text-sm text-muted-foreground">إجمالي المصروفات</p>
          <p className="text-2xl font-bold text-red-500">{totalExpenses.toLocaleString()} ج.م</p>
        </div>

        <div className="mb-4 flex gap-3">
          <div className="relative flex-1">
            <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="بحث في المصروفات..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pr-10"
            />
          </div>
          <Select value={filterCategory} onValueChange={setFilterCategory}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="الفئة" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">الكل</SelectItem>
              <SelectItem value="materials">مواد خام</SelectItem>
              <SelectItem value="maintenance">صيانة</SelectItem>
              <SelectItem value="salaries">رواتب</SelectItem>
              <SelectItem value="utilities">تشغيل</SelectItem>
              <SelectItem value="other">أخرى</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          {filteredExpenses.map((expense) => (
            <div
              key={expense.id}
              className="flex items-center justify-between rounded-lg border border-border bg-card p-3 transition-colors hover:bg-accent"
            >
              <div className="flex items-center gap-3">
                <span className={`rounded-lg px-2 py-1 text-xs font-medium ${categoryColors[expense.category]}`}>
                  {categoryLabels[expense.category]}
                </span>
                <div className="space-y-1">
                  <p className="text-sm font-medium">{expense.description}</p>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      <span>{expense.date}</span>
                    </div>
                    {expense.vendor && (
                      <div className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        <span>{expense.vendor}</span>
                      </div>
                    )}
                    <span className="rounded-full bg-accent px-2 py-0.5">
                      {expense.paymentMethod === "cash" ? "نقدي" : "بنكي"}
                    </span>
                  </div>
                </div>
              </div>
              <p className="text-base font-bold text-red-500">-{expense.amount.toLocaleString()} ج.م</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
