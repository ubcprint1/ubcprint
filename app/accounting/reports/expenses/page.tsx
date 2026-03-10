"use client"

import { useState, useMemo } from "react"
import { ArrowRight, Download, Calendar } from "lucide-react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { downloadCSV } from "@/lib/download-utils"
import { useFinancialStore } from "@/lib/financial-store"
import { useOrdersStore } from "@/lib/orders-store"

// بيانات المصروفات الثابتة (نموذجية)
const STATIC_EXPENSES = [
  { id: "1", date: "2024-11-01", category: "إيجار", description: "إيجار شهر نوفمبر", amount: 15000, vendor: "صاحب العقار", paymentMethod: "تحويل بنكي", invoiceNumber: "RENT-2024-11", status: "مدفوع" },
  { id: "2", date: "2024-11-05", category: "كهرباء", description: "فاتورة كهرباء أكتوبر", amount: 3200, vendor: "شركة الكهرباء", paymentMethod: "تحويل بنكي", invoiceNumber: "E-2024-10", status: "مدفوع" },
  { id: "3", date: "2024-11-08", category: "مواد خام", description: "شراء ورق A4 - 50 كرتونة", amount: 5000, vendor: "مؤسسة الورق المتحدة", paymentMethod: "تحويل بنكي", invoiceNumber: "PO-2024-045", status: "مدفوع" },
  { id: "4", date: "2024-11-10", category: "إنترنت", description: "اشتراك الإنترنت الشهري", amount: 500, vendor: "WE", paymentMethod: "نقدي", invoiceNumber: "-", status: "مدفوع" },
  { id: "5", date: "2024-11-07", category: "صيانة", description: "صيانة آلة الطباعة الرقمية", amount: 2500, vendor: "مركز الصيانة الفنية", paymentMethod: "نقدي", invoiceNumber: "MNT-2024-012", status: "مدفوع" },
  { id: "6", date: "2024-11-01", category: "رواتب", description: "رواتب الموظفين - نوفمبر", amount: 25000, vendor: "-", paymentMethod: "تحويل بنكي", invoiceNumber: "SAL-2024-11", status: "مدفوع" },
  { id: "7", date: "2024-11-15", category: "اشتراكات", description: "اشتراك Adobe Creative Cloud", amount: 2500, vendor: "Adobe", paymentMethod: "بطاقة ائتمان", invoiceNumber: "SUB-2024-003", status: "معلق" },
  { id: "8", date: "2024-11-12", category: "مواد خام", description: "شراء حبر طباعة CMYK - 20 عبوة", amount: 8000, vendor: "مؤسسة الأحبار العربية", paymentMethod: "نقدي", invoiceNumber: "PO-2024-048", status: "مدفوع" },
  { id: "9", date: "2024-11-18", category: "نقل", description: "شحن وتوصيل طلبات العملاء", amount: 1800, vendor: "شركة أرامكس", paymentMethod: "نقدي", invoiceNumber: "SHP-2024-091", status: "مدفوع" },
  { id: "10", date: "2024-11-20", category: "مواد خام", description: "شراء ورق مقوى 300 جرام - 200 فرخ", amount: 4500, vendor: "مؤسسة الورق المتحدة", paymentMethod: "تحويل بنكي", invoiceNumber: "PO-2024-052", status: "مدفوع" },
  { id: "11", date: "2024-11-22", category: "صيانة", description: "تغيير قطع غيار ماكينة الأوفست", amount: 6500, vendor: "وكيل هايدلبرج", paymentMethod: "تحويل بنكي", invoiceNumber: "MNT-2024-015", status: "مدفوع" },
  { id: "12", date: "2024-11-25", category: "مواد خام", description: "شراء فينيل لامع - 10 رولات", amount: 3500, vendor: "مؤسسة الفينيل للتوريدات", paymentMethod: "نقدي", invoiceNumber: "PO-2024-055", status: "مدفوع" },
  { id: "13", date: "2024-10-01", category: "إيجار", description: "إيجار شهر أكتوبر", amount: 15000, vendor: "صاحب العقار", paymentMethod: "تحويل بنكي", invoiceNumber: "RENT-2024-10", status: "مدفوع" },
  { id: "14", date: "2024-10-01", category: "رواتب", description: "رواتب الموظفين - أكتوبر", amount: 25000, vendor: "-", paymentMethod: "تحويل بنكي", invoiceNumber: "SAL-2024-10", status: "مدفوع" },
  { id: "15", date: "2024-10-08", category: "كهرباء", description: "فاتورة كهرباء سبتمبر", amount: 2800, vendor: "شركة الكهرباء", paymentMethod: "تحويل بنكي", invoiceNumber: "E-2024-09", status: "مدفوع" },
  { id: "16", date: "2024-10-12", category: "مواد خام", description: "شراء ورق كوشيه A3 - 30 كرتونة", amount: 6000, vendor: "مؤسسة الورق المتحدة", paymentMethod: "تحويل بنكي", invoiceNumber: "PO-2024-038", status: "مدفوع" },
]

export default function ExpensesReportPage() {
  const [period, setPeriod] = useState("daily")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")

  // بيانات حية من المخازن
  const financialTransactions = useFinancialStore((state) => state.transactions)
  const orders = useOrdersStore((state) => state.orders)

  // دمج البيانات الحية مع الثابتة
  const ALL_EXPENSES = useMemo(() => {
    const liveExpenses = financialTransactions
      .filter((t) => t.type === "expense" || t.type === "purchase" || t.type === "salary")
      .map((t) => ({
        id: `fin-${t.id}`,
        date: t.date.substring(0, 10),
        category: t.type === "salary" ? "رواتب" : t.type === "purchase" ? "مشتريات" : "مصروفات عامة",
        description: t.description,
        amount: t.amount,
        vendor: t.relatedTo?.entityName || "-",
        paymentMethod: "-",
        invoiceNumber: t.id,
        status: t.status === "completed" ? "مدفوع" : "معلق",
      }))

    // إضافة الطلبات كإيرادات
    const orderRevenues = orders.map((o) => {
      const productNames = (o.products && o.products.length > 0)
        ? o.products.map((p) => p.productName).join(", ")
        : (o as any).productName || "منتج"
      return {
        id: `order-${o.id}`,
        date: o.createdAt.substring(0, 10),
        category: "إيرادات طلبات",
        description: `طلب ${o.orderNumber} - ${o.customerName} - ${productNames}`,
        amount: o.totalCost,
        vendor: o.customerName,
        paymentMethod: o.paidAmount >= o.totalCost ? "مدفوع بالكامل" : o.paidAmount > 0 ? "مدفوع جزئياً" : "غير مدفوع",
        invoiceNumber: o.orderNumber,
        status: o.paidAmount >= o.totalCost ? "مدفوع" : "معلق",
      }
    })

    return [...STATIC_EXPENSES, ...liveExpenses, ...orderRevenues].sort((a, b) => b.date.localeCompare(a.date))
  }, [financialTransactions, orders])

  const generateReport = () => {
    const periodLabels: Record<string, string> = {
      daily: "يومي",
      weekly: "أسبوعي",
      monthly: "شهري",
      yearly: "سنوي",
    }
    const label = periodLabels[period] || period

    // تصفية المصروفات حسب الفترة المحددة
    const filtered = ALL_EXPENSES.filter((exp) => {
      if (startDate && exp.date < startDate) return false
      if (endDate && exp.date > endDate) return false
      return true
    })

    // تجميع المصروفات حسب الفئة
    const byCategory: Record<string, number> = {}
    const byPayment: Record<string, number> = {}
    const byStatus: Record<string, number> = {}
    let totalAmount = 0

    filtered.forEach((exp) => {
      byCategory[exp.category] = (byCategory[exp.category] || 0) + exp.amount
      byPayment[exp.paymentMethod] = (byPayment[exp.paymentMethod] || 0) + exp.amount
      byStatus[exp.status] = (byStatus[exp.status] || 0) + exp.amount
      totalAmount += exp.amount
    })

    // بناء التقرير الكامل
    const headers = ["#", "التاريخ", "الفئة", "الوصف", "المورد", "رقم الفاتورة", "طريقة الدفع", "الحالة", "المبلغ (ج.م)"]
    const rows = filtered.map((exp, i) => [
      String(i + 1),
      exp.date,
      exp.category,
      exp.description,
      exp.vendor,
      exp.invoiceNumber,
      exp.paymentMethod,
      exp.status,
      exp.amount.toLocaleString(),
    ])

    // صف فارغ
    rows.push(["", "", "", "", "", "", "", "", ""])
    rows.push(["", "", "", "", "", "", "", "إجمالي المصروفات", totalAmount.toLocaleString()])

    // ملخص حسب الفئة
    rows.push(["", "", "", "", "", "", "", "", ""])
    rows.push(["", "", "ملخص حسب الفئة", "", "", "", "", "", ""])
    Object.entries(byCategory).sort((a, b) => b[1] - a[1]).forEach(([cat, amt]) => {
      const pct = ((amt / totalAmount) * 100).toFixed(1)
      rows.push(["", "", cat, "", "", "", "", `${pct}%`, amt.toLocaleString()])
    })

    // ملخص حسب طريقة الدفع
    rows.push(["", "", "", "", "", "", "", "", ""])
    rows.push(["", "", "ملخص حسب طريقة الدفع", "", "", "", "", "", ""])
    Object.entries(byPayment).forEach(([method, amt]) => {
      rows.push(["", "", "", "", "", "", method, "", amt.toLocaleString()])
    })

    // ملخص حسب الحالة
    rows.push(["", "", "", "", "", "", "", "", ""])
    rows.push(["", "", "ملخص حسب الحالة", "", "", "", "", "", ""])
    Object.entries(byStatus).forEach(([status, amt]) => {
      rows.push(["", "", "", "", "", "", "", status, amt.toLocaleString()])
    })

    // معلومات التقرير
    rows.push(["", "", "", "", "", "", "", "", ""])
    rows.push(["", "", `نوع التقرير: ${label}`, "", "", `الفترة: ${startDate || "الكل"} إلى ${endDate || "الكل"}`, "", `عدد المصروفات: ${filtered.length}`, `تاريخ الإنشاء: ${new Date().toLocaleDateString("ar-EG")}`])
    rows.push(["", "", "UBC Print - نظام إدارة المطبعة", "", "", "", "", "", ""])

    downloadCSV(`تقرير-المصروفات-${label}-${startDate || "الكل"}-${endDate || "الكل"}`, headers, rows)
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="mx-auto max-w-3xl space-y-6">
        <div className="flex items-center gap-4">
          <Link href="/accounting">
            <Button variant="ghost" size="icon">
              <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">تقرير المصروفات</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>اختر نوع التقرير</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <RadioGroup value={period} onValueChange={setPeriod}>
              <div className="flex items-center space-x-2 space-x-reverse">
                <RadioGroupItem value="daily" id="daily" />
                <Label htmlFor="daily" className="cursor-pointer">
                  تقرير يومي
                </Label>
              </div>
              <div className="flex items-center space-x-2 space-x-reverse">
                <RadioGroupItem value="weekly" id="weekly" />
                <Label htmlFor="weekly" className="cursor-pointer">
                  تقرير أسبوعي
                </Label>
              </div>
              <div className="flex items-center space-x-2 space-x-reverse">
                <RadioGroupItem value="monthly" id="monthly" />
                <Label htmlFor="monthly" className="cursor-pointer">
                  تقرير شهري
                </Label>
              </div>
              <div className="flex items-center space-x-2 space-x-reverse">
                <RadioGroupItem value="yearly" id="yearly" />
                <Label htmlFor="yearly" className="cursor-pointer">
                  تقرير سنوي
                </Label>
              </div>
            </RadioGroup>

            <div className="space-y-4 rounded-lg border p-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <h3 className="font-medium">الفترة الزمنية</h3>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="startDate">من تاريخ</Label>
                  <input
                    type="date"
                    id="startDate"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full rounded-md border border-input bg-background px-3 py-2"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endDate">إلى تاريخ</Label>
                  <input
                    type="date"
                    id="endDate"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full rounded-md border border-input bg-background px-3 py-2"
                  />
                </div>
              </div>
            </div>

            <div className="rounded-lg bg-accent p-4 space-y-3">
              <h4 className="font-medium">معاينة التقرير</h4>
              <p className="text-sm text-muted-foreground">
                سيتم إنشاء تقرير{" "}
                {period === "daily" ? "يومي" : period === "weekly" ? "أسبوعي" : period === "monthly" ? "شهري" : "سنوي"}{" "}
                للمصروفات
                {startDate && endDate && ` من ${startDate} إلى ${endDate}`}
              </p>
              <div className="text-xs text-muted-foreground space-y-1 border-t pt-2">
                <p>التقرير يتضمن:</p>
                <ul className="list-inside list-disc space-y-0.5 mr-2">
                  <li>جدول تفصيلي بكل المصروفات (التاريخ، الفئة، الوصف، المورد، رقم الفاتورة، طريقة الدفع، الحالة، المبلغ)</li>
                  <li>ملخص المصروفات حسب الفئة مع النسبة المئوية</li>
                  <li>ملخص حسب طريقة الدفع (نقدي / بنكي / بطاقة)</li>
                  <li>ملخص حسب الحالة (مدفوع / معلق)</li>
                  <li>إجمالي المصروفات وعدد العمليات</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-3">
          <Link href="/accounting">
            <Button variant="outline">إلغاء</Button>
          </Link>
          <Button onClick={generateReport} className="gap-2">
            <Download className="h-4 w-4" />
            تحميل التقرير
          </Button>
        </div>
      </div>
    </div>
  )
}
