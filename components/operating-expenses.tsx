"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, TrendingDown, FileText } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

interface OperatingExpense {
  id: string
  date: string
  category: "rent" | "electricity" | "water" | "internet" | "subscriptions" | "maintenance" | "other"
  description: string
  amount: number
  invoiceNumber?: string
  status: "paid" | "pending"
}

const CATEGORIES = {
  rent: "إيجار",
  electricity: "كهرباء",
  water: "مياه",
  internet: "إنترنت",
  subscriptions: "اشتراكات",
  maintenance: "صيانة",
  other: "أخرى",
}

export function OperatingExpenses() {
  const [expenses, setExpenses] = useState<OperatingExpense[]>([
    { id: "1", date: "2024-11-01", category: "rent", description: "إيجار شهر نوفمبر", amount: 15000, status: "paid" },
    {
      id: "2",
      date: "2024-11-05",
      category: "electricity",
      description: "فاتورة كهرباء أكتوبر",
      amount: 3200,
      invoiceNumber: "E-2024-10",
      status: "paid",
    },
    { id: "3", date: "2024-11-10", category: "internet", description: "اشتراك الإنترنت", amount: 500, status: "paid" },
    {
      id: "4",
      date: "2024-11-15",
      category: "subscriptions",
      description: "اشتراك Adobe Creative Cloud",
      amount: 2500,
      status: "pending",
    },
  ])

  const [isOpen, setIsOpen] = useState(false)
  const [newExpense, setNewExpense] = useState({
    date: new Date().toISOString().split("T")[0],
    category: "rent" as const,
    description: "",
    amount: 0,
    invoiceNumber: "",
    status: "pending" as const,
  })

  const handleAddExpense = () => {
    const expense: OperatingExpense = {
      id: Date.now().toString(),
      ...newExpense,
    }
    setExpenses([expense, ...expenses])
    setIsOpen(false)
    setNewExpense({
      date: new Date().toISOString().split("T")[0],
      category: "rent",
      description: "",
      amount: 0,
      invoiceNumber: "",
      status: "pending",
    })
  }

  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0)
  const paidExpenses = expenses.filter((e) => e.status === "paid").reduce((sum, exp) => sum + exp.amount, 0)
  const pendingExpenses = expenses.filter((e) => e.status === "pending").reduce((sum, exp) => sum + exp.amount, 0)

  const expensesByCategory = Object.entries(
    expenses.reduce(
      (acc, exp) => {
        acc[exp.category] = (acc[exp.category] || 0) + exp.amount
        return acc
      },
      {} as Record<string, number>,
    ),
  )

  return (
    <div className="space-y-6">
      {/* إحصائيات المصروفات */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">إجمالي المصروفات</p>
                <p className="text-2xl font-bold text-red-600">{totalExpenses.toLocaleString()} ج.م</p>
              </div>
              <TrendingDown className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">مدفوع</p>
                <p className="text-2xl font-bold text-green-600">{paidExpenses.toLocaleString()} ج.م</p>
              </div>
              <FileText className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">معلق</p>
                <p className="text-2xl font-bold text-orange-600">{pendingExpenses.toLocaleString()} ج.م</p>
              </div>
              <FileText className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* المصروفات حسب الفئة */}
      <Card>
        <CardHeader>
          <CardTitle>المصروفات حسب الفئة</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {expensesByCategory.map(([category, amount]) => (
              <div key={category} className="flex items-center justify-between p-3 rounded-lg bg-muted">
                <span className="font-medium">{CATEGORIES[category as keyof typeof CATEGORIES]}</span>
                <span className="text-lg font-bold">{amount.toLocaleString()} ج.م</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* قائمة المصروفات */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>سجل المصروفات التشغيلية</CardTitle>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="ml-2 h-4 w-4" />
                إضافة مصروف
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>إضافة مصروف تشغيلي جديد</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>التاريخ</Label>
                    <Input
                      type="date"
                      value={newExpense.date}
                      onChange={(e) => setNewExpense({ ...newExpense, date: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>الفئة</Label>
                    <Select
                      value={newExpense.category}
                      onValueChange={(value: any) => setNewExpense({ ...newExpense, category: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(CATEGORIES).map(([key, label]) => (
                          <SelectItem key={key} value={key}>
                            {label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>الوصف</Label>
                  <Input
                    placeholder="وصف المصروف"
                    value={newExpense.description}
                    onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>المبلغ (ج.م)</Label>
                    <Input
                      type="number"
                      value={newExpense.amount}
                      onChange={(e) => setNewExpense({ ...newExpense, amount: Number(e.target.value) })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>رقم الفاتورة (اختياري)</Label>
                    <Input
                      placeholder="INV-2024-001"
                      value={newExpense.invoiceNumber}
                      onChange={(e) => setNewExpense({ ...newExpense, invoiceNumber: e.target.value })}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>الحالة</Label>
                  <Select
                    value={newExpense.status}
                    onValueChange={(value: any) => setNewExpense({ ...newExpense, status: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="paid">مدفوع</SelectItem>
                      <SelectItem value="pending">معلق</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button className="w-full" onClick={handleAddExpense}>
                  حفظ المصروف
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {expenses.map((expense) => (
              <div key={expense.id} className="flex items-center justify-between p-4 rounded-lg border">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <div className="font-semibold">{CATEGORIES[expense.category]}</div>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        expense.status === "paid" ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"
                      }`}
                    >
                      {expense.status === "paid" ? "مدفوع" : "معلق"}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{expense.description}</p>
                  <p className="text-xs text-muted-foreground mt-1">{expense.date}</p>
                </div>
                <div className="text-left">
                  <div className="text-xl font-bold text-red-600">{expense.amount.toLocaleString()} ج.م</div>
                  {expense.invoiceNumber && <p className="text-xs text-muted-foreground">{expense.invoiceNumber}</p>}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
