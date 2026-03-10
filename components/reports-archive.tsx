"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FileText, Download, Calendar, User, Package, DollarSign, Filter, DownloadCloud, Eye, X } from "lucide-react"
import { downloadCSV } from "@/lib/download-utils"
import { useOrdersStore } from "@/lib/orders-store"
import { useFinancialStore } from "@/lib/financial-store"

// تعريف التسميات خارج المكون لتجنب مشاكل الترتيب
const reportTypeLabelsAr: Record<string, string> = {
  salary: "مرتبات",
  sales: "مبيعات / طلبات",
  inventory: "مخزون",
  purchases: "مشتريات",
  expenses: "مصروفات",
}

export function ReportsArchive() {
  const [reportType, setReportType] = useState("all")
  const [selectedMonth, setSelectedMonth] = useState("")
  const [selectedEntity, setSelectedEntity] = useState("")

  // بيانات حية من المخازن
  const orders = useOrdersStore((state) => state.orders)
  const financialTransactions = useFinancialStore((state) => state.transactions)

  // بناء التقارير ديناميكياً من البيانات الحية
  const archivedReports = useMemo(() => {
    const reports: any[] = []

    // --- تقارير الطلبات (مبيعات) من orders store ---
    orders.forEach((order) => {
      const month = order.createdAt.substring(0, 7) // "2024-11"
      const stageLabels: Record<string, string> = {
        new: "جديد", design: "تصميم", approval: "موافقة", production: "إنتاج",
        quality: "مراقبة الجودة", packaging: "تغليف", delivery: "تسليم",
      }
      const priorityLabels: Record<string, string> = { low: "منخفضة", medium: "متوسطة", high: "عالية", urgent: "عاجلة" }

      reports.push({
        id: `order-${order.id}`,
        type: "sales",
        month,
        entityName: order.customerName,
        amount: order.totalCost,
        createdAt: order.createdAt.substring(0, 10),
        details: {
          invoiceNumber: order.orderNumber,
          paymentMethod: order.paidAmount >= order.totalCost ? "مدفوع بالكامل" : order.paidAmount > 0 ? "مدفوع جزئياً" : "غير مدفوع",
          paymentStatus: order.paidAmount >= order.totalCost ? "مدفوع" : order.paidAmount > 0 ? "مدفوع جزئياً" : "غير مدفوع",
          items: (order.products && order.products.length > 0)
            ? order.products.map((p) => ({
                name: p.productName,
                qty: p.quantity,
                unitPrice: p.unitPrice,
                total: p.totalPrice,
              }))
            : [{ name: (order as any).productName || "منتج", qty: (order as any).quantity || 1, unitPrice: order.totalCost / ((order as any).quantity || 1), total: order.totalCost }],
          subtotal: order.totalCost,
          tax: Math.round(order.totalCost * 0.14),
          discount: 0,
          totalWithTax: Math.round(order.totalCost * 1.14),
          paidAmount: order.paidAmount,
          remainingAmount: order.totalCost - order.paidAmount,
          customerPhone: "-",
          deliveryDate: order.expectedDelivery?.substring(0, 10) || "-",
          notes: `المرحلة الحالية: ${stageLabels[order.currentStage] || order.currentStage} | الأولوية: ${priorityLabels[order.priority] || order.priority} | ${order.description || ""}`,
        },
      })
    })

    // --- تقارير من المعاملات المالية ---
    financialTransactions.forEach((txn) => {
      const month = txn.date.substring(0, 7)
      let type = "expenses"
      if (txn.type === "invoice" || txn.type === "revenue") type = "sales"
      else if (txn.type === "expense") type = "expenses"
      else if (txn.type === "salary") type = "salary"
      else if (txn.type === "purchase") type = "purchases"

      // تجنب التكرار إذا كان مرتبط بطلب موجود
      const alreadyExists = reports.some((r) => r.id === `order-${txn.relatedTo?.entityId}`)
      if (!alreadyExists) {
        reports.push({
          id: `txn-${txn.id}`,
          type,
          month,
          entityName: txn.relatedTo?.entityName || txn.description,
          amount: txn.amount,
          createdAt: txn.date.substring(0, 10),
          details: {
            description: txn.description,
            status: txn.status === "completed" ? "مكتمل" : txn.status === "pending" ? "معلق" : "ملغي",
            createdBy: txn.createdBy,
            entityType: txn.relatedTo?.entityType || "-",
            notes: `النوع: ${txn.type} | الحالة: ${txn.status}`,
          },
        })
      }
    })

    // --- بيانات ثابتة (نموذجية) في حال لم يكن هناك بيانات ---
    const staticReports = [
      {
        id: "static-1", type: "salary", month: "2024-11", entityName: "محمود شعراوي", amount: 8500, createdAt: "2024-11-30",
        details: {
          role: "مشرف", shift: "الصباحي",
          baseSalary: 6000, overtime: 1500, bonus: 1500, deductions: 500, insurance: 0, advances: 0, netSalary: 8500,
          workDays: 26, absentDays: 0, lateDays: 1,
          notes: "أداء ممتاز - مكافأة إنتاج"
        }
      },
      {
        id: "static-2", type: "salary", month: "2024-11", entityName: "شيماء عمر", amount: 7500, createdAt: "2024-11-30",
        details: {
          role: "موظف", shift: "الصباحي",
          baseSalary: 5500, overtime: 1000, bonus: 1000, deductions: 0, insurance: 0, advances: 1000, netSalary: 7500,
          workDays: 25, absentDays: 1, lateDays: 0,
          notes: "سلفة 1000 ج.م"
        }
      },
      {
        id: "static-3", type: "inventory", month: "2024-11", entityName: "حركة المخزون", amount: 125000, createdAt: "2024-11-30",
        details: {
          summary: { totalInbound: 85000, totalOutbound: 40000, netMovement: 45000 },
          movements: [
            { date: "2024-11-05", type: "وارد", item: "ورق A4 - 80 جرام", qty: 500, unit: "رزمة", value: 35000 },
            { date: "2024-11-08", type: "صادر", item: "ورق A4 - 80 جرام", qty: 200, unit: "رزمة", value: 14000 },
            { date: "2024-11-12", type: "وارد", item: "حبر طباعة CMYK", qty: 50, unit: "عبوة", value: 25000 },
            { date: "2024-11-15", type: "صادر", item: "حبر طباعة CMYK", qty: 15, unit: "عبوة", value: 7500 },
            { date: "2024-11-20", type: "وارد", item: "ورق مقوى 300 جرام", qty: 200, unit: "فرخ", value: 15000 },
            { date: "2024-11-22", type: "صادر", item: "ورق مقوى 300 جرام", qty: 80, unit: "فرخ", value: 6000 },
            { date: "2024-11-25", type: "وارد", item: "فينيل لامع", qty: 20, unit: "رول", value: 10000 },
            { date: "2024-11-28", type: "صادر", item: "فينيل لامع", qty: 10, unit: "رول", value: 5000 },
          ],
          lowStockItems: ["حبر أسود HP", "ورق كوشيه A3"],
          notes: "يجب إعادة طلب الحبر الأسود - المخزون أقل من الحد الأدنى"
        }
      },
    ]

    // دمج البيانات الثابتة مع الحية
    return [...reports, ...staticReports].sort((a, b) => b.createdAt.localeCompare(a.createdAt))
  }, [orders, financialTransactions])

  const [previewReport, setPreviewReport] = useState<(typeof archivedReports)[number] | null>(null)

  const filteredReports = archivedReports.filter((report) => {
    if (reportType !== "all" && report.type !== reportType) return false
    if (selectedMonth && report.month !== selectedMonth) return false
    if (selectedEntity && !report.entityName.includes(selectedEntity)) return false
    return true
  })

  const downloadReport = (reportId: string) => {
    const report = archivedReports.find((r) => r.id === reportId)
    if (!report) return
    const typeLabel = reportTypeLabelsAr[report.type] || report.type
    const d = report.details

    if (report.type === "salary" && d && "baseSalary" in d) {
      const headers = ["البند", "القيمة"]
      const rows = [
        ["نوع التقرير", `تقرير ${typeLabel}`],
        ["الموظف", report.entityName],
        ["الوظيفة", d.role],
        ["الوردية", d.shift],
        ["الشهر", report.month],
        ["---", "---"],
        ["الراتب الأساسي", `${d.baseSalary.toLocaleString()} ج.م`],
        ["إضافي (أوفرتايم)", `${d.overtime.toLocaleString()} ج.م`],
        ["مكافأة / بونص", `${d.bonus.toLocaleString()} ج.م`],
        ["خصومات", `${d.deductions.toLocaleString()} ج.م`],
        ["سلف", `${d.advances.toLocaleString()} ج.م`],
        ["---", "---"],
        ["صافي الراتب", `${d.netSalary.toLocaleString()} ج.م`],
        ["---", "---"],
        ["أيام العمل", `${d.workDays}`],
        ["أيام الغياب", `${d.absentDays}`],
        ["أيام التأخير", `${d.lateDays}`],
        ["ملاحظات", d.notes || "-"],
      ]
      downloadCSV(`تقرير-مرتب-${report.entityName}-${report.month}`, headers, rows)
    } else if (report.type === "sales" && d && "invoiceNumber" in d) {
      const headers = ["الصنف", "الكمية", "سعر الوحدة", "الإجمالي"]
      const rows = d.items.map((item) => [item.name, String(item.qty), `${item.unitPrice} ج.م`, `${item.total.toLocaleString()} ج.م`])
      rows.push(["---", "---", "---", "---"])
      rows.push(["المجموع الفرعي", "", "", `${d.subtotal.toLocaleString()} ج.م`])
      rows.push(["الضريبة (14%)", "", "", `${d.tax.toLocaleString()} ج.م`])
      if (d.discount > 0) rows.push(["خصم", "", "", `- ${d.discount.toLocaleString()} ج.م`])
      rows.push(["الإجمالي شامل الضريبة", "", "", `${d.totalWithTax.toLocaleString()} ج.م`])
      rows.push(["المدفوع", "", "", `${d.paidAmount.toLocaleString()} ج.م`])
      rows.push(["المتبقي", "", "", `${d.remainingAmount.toLocaleString()} ج.م`])
      rows.push(["---", "---", "---", "---"])
      rows.push(["رقم الفاتورة", d.invoiceNumber, "طريقة الدفع", d.paymentMethod])
      rows.push(["العميل", report.entityName, "الهاتف", d.customerPhone])
      rows.push(["التسليم", d.deliveryDate, "الحالة", d.paymentStatus])
      if (d.notes) rows.push(["ملاحظات", d.notes, "", ""])
      downloadCSV(`تقرير-مبيعات-${report.entityName}-${report.month}`, headers, rows)
    } else if (report.type === "inventory" && d && "summary" in d) {
      const headers = ["التاريخ", "النوع", "الصنف", "الكمية", "الوحدة", "القيمة"]
      const rows = d.movements.map((m) => [m.date, m.type, m.item, String(m.qty), m.unit, `${m.value.toLocaleString()} ج.م`])
      rows.push(["---", "---", "---", "---", "---", "---"])
      rows.push(["", "إجمالي الوارد", "", "", "", `${d.summary.totalInbound.toLocaleString()} ج.م`])
      rows.push(["", "إجمالي الصادر", "", "", "", `${d.summary.totalOutbound.toLocaleString()} ج.م`])
      rows.push(["", "صافي الحركة", "", "", "", `${d.summary.netMovement.toLocaleString()} ج.م`])
      if (d.lowStockItems.length > 0) rows.push(["", "أصناف تحت الحد الأدنى", d.lowStockItems.join(" - "), "", "", ""])
      if (d.notes) rows.push(["", "ملاحظات", d.notes, "", "", ""])
      downloadCSV(`تقرير-مخزون-${report.month}`, headers, rows)
    } else {
      const headers = ["نوع التقرير", "الاسم", "الشهر", "المبلغ (ج.م)", "تاريخ الإنشاء"]
      const rows = [[typeLabel, report.entityName, report.month, report.amount.toLocaleString(), report.createdAt]]
      downloadCSV(`تقرير-${typeLabel}-${report.entityName}-${report.month}`, headers, rows)
    }
  }

  const downloadAllFiltered = () => {
    if (filteredReports.length === 0) return
    const headers = ["#", "نوع التقرير", "الاسم", "الشهر", "المبلغ (ج.م)", "الحالة", "تفاصيل إضافية", "تاريخ الإنشاء"]
    const rows = filteredReports.map((report, i) => {
      const d = report.details || {}
      let status = "-"
      let extra = "-"
      if ("paymentStatus" in d) {
        status = d.paymentStatus
        extra = `فاتورة: ${d.invoiceNumber || "-"} | المدفوع: ${d.paidAmount?.toLocaleString() || 0} | المتبقي: ${d.remainingAmount?.toLocaleString() || 0}`
      } else if ("netSalary" in d) {
        status = "مكتمل"
        extra = `الأساسي: ${d.baseSalary?.toLocaleString()} | الصافي: ${d.netSalary?.toLocaleString()} | أيام: ${d.workDays}`
      } else if ("summary" in d) {
        status = "مكتمل"
        extra = `وارد: ${d.summary?.totalInbound?.toLocaleString()} | صادر: ${d.summary?.totalOutbound?.toLocaleString()}`
      } else if ("notes" in d) {
        status = d.status || "-"
        extra = d.notes || "-"
      }
      return [
        String(i + 1),
        reportTypeLabelsAr[report.type] || report.type,
        report.entityName,
        report.month,
        report.amount.toLocaleString(),
        status,
        extra,
        report.createdAt,
      ]
    })
    rows.push(["", "", "", "", "", "", "", ""])
    rows.push(["", "", "الإجمالي", "", filteredReports.reduce((s, r) => s + r.amount, 0).toLocaleString(), "", `عدد التقارير: ${filteredReports.length}`, new Date().toLocaleDateString("ar-EG")])
    downloadCSV(`تقارير-${reportType === "all" ? "الكل" : reportTypeLabelsAr[reportType]}-${selectedMonth || "جميع-الشهور"}`, headers, rows)
  }

  return (
    <div className="space-y-6">
      {/* الفلاتر */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            فلترة التقارير
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label>نوع التقرير</Label>
              <Select value={reportType} onValueChange={setReportType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع التقارير</SelectItem>
                  <SelectItem value="salary">مرتبات</SelectItem>
                  <SelectItem value="sales">مبيعات</SelectItem>
                  <SelectItem value="inventory">مخزون</SelectItem>
                  <SelectItem value="purchases">مشتريات</SelectItem>
                  <SelectItem value="expenses">مصروفات</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>الشهر</Label>
              <Input type="month" value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>بحث</Label>
              <Input
                placeholder="ابحث عن موظف أو عميل..."
                value={selectedEntity}
                onChange={(e) => setSelectedEntity(e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* الإحصائيات */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <FileText className="h-8 w-8 mx-auto mb-2 text-blue-600" />
              <p className="text-sm text-muted-foreground">إجمالي التقارير</p>
              <p className="text-2xl font-bold">{filteredReports.length}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <DollarSign className="h-8 w-8 mx-auto mb-2 text-green-600" />
              <p className="text-sm text-muted-foreground">القيمة الإجمالية</p>
              <p className="text-2xl font-bold">
                {filteredReports.reduce((sum, r) => sum + r.amount, 0).toLocaleString()} ج.م
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <User className="h-8 w-8 mx-auto mb-2 text-purple-600" />
              <p className="text-sm text-muted-foreground">تقارير المرتبات</p>
              <p className="text-2xl font-bold">{filteredReports.filter((r) => r.type === "salary").length}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <Package className="h-8 w-8 mx-auto mb-2 text-orange-600" />
              <p className="text-sm text-muted-foreground">تقارير المخزون</p>
              <p className="text-2xl font-bold">{filteredReports.filter((r) => r.type === "inventory").length}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* قائمة التقارير */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>التقارير المؤرشفة</CardTitle>
          <Button variant="outline" size="sm" onClick={downloadAllFiltered} disabled={filteredReports.length === 0} className="gap-2">
            <DownloadCloud className="h-4 w-4" />
            تحميل الكل ({filteredReports.length})
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {filteredReports.map((report) => (
              <div
                key={report.id}
                className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition"
              >
                <div className="flex items-center gap-4 flex-1">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      report.type === "salary"
                        ? "bg-blue-100"
                        : report.type === "sales"
                          ? "bg-green-100"
                          : report.type === "inventory"
                            ? "bg-orange-100"
                            : "bg-purple-100"
                    }`}
                  >
                    {report.type === "salary" ? (
                      <User className="h-6 w-6 text-blue-600" />
                    ) : report.type === "sales" ? (
                      <DollarSign className="h-6 w-6 text-green-600" />
                    ) : report.type === "inventory" ? (
                      <Package className="h-6 w-6 text-orange-600" />
                    ) : (
                      <FileText className="h-6 w-6 text-purple-600" />
                    )}
                  </div>
                  <div>
                    <div className="font-semibold">{report.entityName}</div>
                    <div className="text-sm text-muted-foreground">
                      {reportTypeLabels[report.type as keyof typeof reportTypeLabels]} - {report.month}
                    </div>
                    <div className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                      <Calendar className="h-3 w-3" />
                      {report.createdAt}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-left">
                    <div className="text-lg font-bold">{report.amount.toLocaleString()} ج.م</div>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => setPreviewReport(report)} title="عرض التقرير">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => downloadReport(report.id)} title="تحميل التقرير">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* نافذة عرض التقرير */}
      {previewReport && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setPreviewReport(null)}>
          <div className="bg-background rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-auto" onClick={(e) => e.stopPropagation()}>
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b sticky top-0 bg-background rounded-t-xl z-10">
              <h3 className="font-bold text-lg">عرض التقرير</h3>
              <Button variant="ghost" size="icon" onClick={() => setPreviewReport(null)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="p-6 space-y-5" dir="rtl">
              {/* رأس التقرير */}
              <div className="text-center space-y-1 pb-4 border-b border-dashed">
                <h4 className="text-xl font-bold text-foreground">مطبعة UBC Print</h4>
                <p className="text-sm text-muted-foreground">نظام إدارة المطبعة</p>
                <div className="flex items-center justify-center gap-3 pt-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    previewReport.type === "salary" ? "bg-blue-100 text-blue-700" :
                    previewReport.type === "sales" ? "bg-green-100 text-green-700" :
                    previewReport.type === "inventory" ? "bg-orange-100 text-orange-700" :
                    previewReport.type === "purchases" ? "bg-purple-100 text-purple-700" :
                    "bg-red-100 text-red-700"
                  }`}>
                    تقرير {reportTypeLabelsAr[previewReport.type] || previewReport.type}
                  </span>
                  <span className="text-xs text-muted-foreground">{previewReport.month}</span>
                </div>
              </div>

              {/* معلومات أساسية */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-lg bg-muted/50">
                  <p className="text-xs text-muted-foreground">الاسم / الجهة</p>
                  <p className="font-semibold mt-0.5">{previewReport.entityName}</p>
                </div>
                <div className="p-3 rounded-lg bg-muted/50">
                  <p className="text-xs text-muted-foreground">تاريخ الإنشاء</p>
                  <p className="font-semibold mt-0.5">{previewReport.createdAt}</p>
                </div>
              </div>

              {/* تفاصيل المرتبات */}
              {previewReport.type === "salary" && previewReport.details && "baseSalary" in previewReport.details && (
                <div className="space-y-3">
                  <h5 className="font-bold text-sm border-b pb-2">بيانات الموظف</h5>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="p-3 rounded-lg bg-muted/50 text-center">
                      <p className="text-xs text-muted-foreground">الوظيفة</p>
                      <p className="font-semibold mt-0.5">{previewReport.details.role}</p>
                    </div>
                    <div className="p-3 rounded-lg bg-muted/50 text-center">
                      <p className="text-xs text-muted-foreground">الوردية</p>
                      <p className="font-semibold mt-0.5">{previewReport.details.shift}</p>
                    </div>
                    <div className="p-3 rounded-lg bg-muted/50 text-center">
                      <p className="text-xs text-muted-foreground">أيام العمل</p>
                      <p className="font-semibold mt-0.5">{previewReport.details.workDays} يوم</p>
                    </div>
                  </div>
                  <h5 className="font-bold text-sm border-b pb-2 pt-2">تفاصيل الراتب</h5>
                  <div className="rounded-lg border overflow-hidden">
                    <table className="w-full text-sm">
                      <tbody>
                        <tr className="border-b"><td className="p-2.5 text-muted-foreground">الراتب الأساسي</td><td className="p-2.5 text-left font-medium">{previewReport.details.baseSalary.toLocaleString()} ج.م</td></tr>
                        <tr className="border-b bg-green-50/50"><td className="p-2.5 text-green-700">إضافي (أوفرتايم)</td><td className="p-2.5 text-left font-medium text-green-700">+ {previewReport.details.overtime.toLocaleString()} ج.م</td></tr>
                        <tr className="border-b bg-green-50/50"><td className="p-2.5 text-green-700">مكافأة / بونص</td><td className="p-2.5 text-left font-medium text-green-700">+ {previewReport.details.bonus.toLocaleString()} ج.م</td></tr>
                        <tr className="border-b bg-red-50/50"><td className="p-2.5 text-red-700">خصومات</td><td className="p-2.5 text-left font-medium text-red-700">- {previewReport.details.deductions.toLocaleString()} ج.م</td></tr>
                        <tr className="border-b bg-red-50/50"><td className="p-2.5 text-red-700">سلف</td><td className="p-2.5 text-left font-medium text-red-700">- {previewReport.details.advances.toLocaleString()} ج.م</td></tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="p-2.5 rounded-lg bg-red-50 text-center">
                      <p className="text-xs text-red-600">غياب</p>
                      <p className="font-bold text-red-700">{previewReport.details.absentDays} يوم</p>
                    </div>
                    <div className="p-2.5 rounded-lg bg-orange-50 text-center">
                      <p className="text-xs text-orange-600">تأخير</p>
                      <p className="font-bold text-orange-700">{previewReport.details.lateDays} يوم</p>
                    </div>
                  </div>
                  {previewReport.details.notes && (
                    <div className="p-3 rounded-lg bg-blue-50 text-sm">
                      <span className="font-medium text-blue-700">ملاحظات: </span>
                      <span className="text-blue-600">{previewReport.details.notes}</span>
                    </div>
                  )}
                </div>
              )}

              {/* تفاصيل المبيعات */}
              {previewReport.type === "sales" && previewReport.details && "invoiceNumber" in previewReport.details && (
                <div className="space-y-3">
                  <h5 className="font-bold text-sm border-b pb-2">بيانات الفاتورة</h5>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 rounded-lg bg-muted/50">
                      <p className="text-xs text-muted-foreground">رقم الفاتورة</p>
                      <p className="font-semibold mt-0.5">{previewReport.details.invoiceNumber}</p>
                    </div>
                    <div className="p-3 rounded-lg bg-muted/50">
                      <p className="text-xs text-muted-foreground">طريقة الدفع</p>
                      <p className="font-semibold mt-0.5">{previewReport.details.paymentMethod}</p>
                    </div>
                    <div className="p-3 rounded-lg bg-muted/50">
                      <p className="text-xs text-muted-foreground">هاتف العميل</p>
                      <p className="font-semibold mt-0.5">{previewReport.details.customerPhone}</p>
                    </div>
                    <div className="p-3 rounded-lg bg-muted/50">
                      <p className="text-xs text-muted-foreground">تاريخ التسليم</p>
                      <p className="font-semibold mt-0.5">{previewReport.details.deliveryDate}</p>
                    </div>
                  </div>
                  <h5 className="font-bold text-sm border-b pb-2 pt-2">البنود</h5>
                  <div className="rounded-lg border overflow-hidden">
                    <table className="w-full text-sm">
                      <thead className="bg-muted/70">
                        <tr>
                          <th className="p-2.5 text-right font-medium">الصنف</th>
                          <th className="p-2.5 text-center font-medium">الكمية</th>
                          <th className="p-2.5 text-center font-medium">السعر</th>
                          <th className="p-2.5 text-left font-medium">الإجمالي</th>
                        </tr>
                      </thead>
                      <tbody>
                        {previewReport.details.items.map((item, i) => (
                          <tr key={i} className="border-t">
                            <td className="p-2.5">{item.name}</td>
                            <td className="p-2.5 text-center">{item.qty.toLocaleString()}</td>
                            <td className="p-2.5 text-center">{item.unitPrice} ج.م</td>
                            <td className="p-2.5 text-left font-medium">{item.total.toLocaleString()} ج.م</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="rounded-lg border overflow-hidden">
                    <table className="w-full text-sm">
                      <tbody>
                        <tr className="border-b"><td className="p-2.5 text-muted-foreground">المجموع الفرعي</td><td className="p-2.5 text-left">{previewReport.details.subtotal.toLocaleString()} ج.م</td></tr>
                        <tr className="border-b"><td className="p-2.5 text-muted-foreground">الضريبة (14%)</td><td className="p-2.5 text-left">{previewReport.details.tax.toLocaleString()} ج.م</td></tr>
                        {previewReport.details.discount > 0 && <tr className="border-b"><td className="p-2.5 text-green-700">خصم</td><td className="p-2.5 text-left text-green-700">- {previewReport.details.discount.toLocaleString()} ج.م</td></tr>}
                        <tr className="border-b font-bold"><td className="p-2.5">الإجمالي شامل الضريبة</td><td className="p-2.5 text-left">{previewReport.details.totalWithTax.toLocaleString()} ج.م</td></tr>
                        <tr className="border-b bg-green-50/50"><td className="p-2.5 text-green-700">المدفوع</td><td className="p-2.5 text-left font-medium text-green-700">{previewReport.details.paidAmount.toLocaleString()} ج.م</td></tr>
                        {previewReport.details.remainingAmount > 0 && <tr className="bg-red-50/50"><td className="p-2.5 text-red-700">المتبقي</td><td className="p-2.5 text-left font-medium text-red-700">{previewReport.details.remainingAmount.toLocaleString()} ج.م</td></tr>}
                      </tbody>
                    </table>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${previewReport.details.paymentStatus === "مدفوع" ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"}`}>
                      {previewReport.details.paymentStatus}
                    </span>
                  </div>
                  {previewReport.details.notes && (
                    <div className="p-3 rounded-lg bg-blue-50 text-sm">
                      <span className="font-medium text-blue-700">ملاحظات: </span>
                      <span className="text-blue-600">{previewReport.details.notes}</span>
                    </div>
                  )}
                </div>
              )}

              {/* تفاصيل المخزون */}
              {previewReport.type === "inventory" && previewReport.details && "summary" in previewReport.details && (
                <div className="space-y-3">
                  <h5 className="font-bold text-sm border-b pb-2">ملخص الحركة</h5>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="p-3 rounded-lg bg-green-50 text-center">
                      <p className="text-xs text-green-600">إجمالي الوارد</p>
                      <p className="font-bold text-green-700">{previewReport.details.summary.totalInbound.toLocaleString()} ج.م</p>
                    </div>
                    <div className="p-3 rounded-lg bg-red-50 text-center">
                      <p className="text-xs text-red-600">إجمالي الصادر</p>
                      <p className="font-bold text-red-700">{previewReport.details.summary.totalOutbound.toLocaleString()} ج.م</p>
                    </div>
                    <div className="p-3 rounded-lg bg-blue-50 text-center">
                      <p className="text-xs text-blue-600">صافي الحركة</p>
                      <p className="font-bold text-blue-700">{previewReport.details.summary.netMovement.toLocaleString()} ج.م</p>
                    </div>
                  </div>
                  <h5 className="font-bold text-sm border-b pb-2 pt-2">تفاصيل الحركات</h5>
                  <div className="rounded-lg border overflow-hidden">
                    <table className="w-full text-sm">
                      <thead className="bg-muted/70">
                        <tr>
                          <th className="p-2 text-right font-medium">التاريخ</th>
                          <th className="p-2 text-center font-medium">النوع</th>
                          <th className="p-2 text-right font-medium">الصنف</th>
                          <th className="p-2 text-center font-medium">الكمية</th>
                          <th className="p-2 text-left font-medium">القيمة</th>
                        </tr>
                      </thead>
                      <tbody>
                        {previewReport.details.movements.map((m, i) => (
                          <tr key={i} className="border-t">
                            <td className="p-2 text-xs">{m.date}</td>
                            <td className="p-2 text-center">
                              <span className={`px-2 py-0.5 rounded text-xs font-medium ${m.type === "وارد" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>{m.type}</span>
                            </td>
                            <td className="p-2 text-xs">{m.item}</td>
                            <td className="p-2 text-center text-xs">{m.qty} {m.unit}</td>
                            <td className="p-2 text-left text-xs font-medium">{m.value.toLocaleString()} ج.م</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  {previewReport.details.lowStockItems.length > 0 && (
                    <div className="p-3 rounded-lg bg-red-50 text-sm">
                      <p className="font-medium text-red-700 mb-1">أصناف تحت الحد الأدنى:</p>
                      <div className="flex flex-wrap gap-2">
                        {previewReport.details.lowStockItems.map((item, i) => (
                          <span key={i} className="px-2 py-0.5 bg-red-100 text-red-700 rounded text-xs">{item}</span>
                        ))}
                      </div>
                    </div>
                  )}
                  {previewReport.details.notes && (
                    <div className="p-3 rounded-lg bg-blue-50 text-sm">
                      <span className="font-medium text-blue-700">ملاحظات: </span>
                      <span className="text-blue-600">{previewReport.details.notes}</span>
                    </div>
                  )}
                </div>
              )}

              {/* المبلغ الإجمالي */}
              <div className="flex justify-between items-center p-4 rounded-lg bg-primary/5 border border-primary/10">
                <span className="text-sm font-medium text-muted-foreground">صافي المبلغ</span>
                <span className="text-2xl font-bold text-primary">{previewReport.amount.toLocaleString()} ج.م</span>
              </div>

              {/* أزرار */}
              <div className="flex gap-3 pt-1">
                <Button className="flex-1 gap-2" onClick={() => {
                  downloadReport(previewReport.id)
                  setPreviewReport(null)
                }}>
                  <Download className="h-4 w-4" />
                  تحميل التقرير
                </Button>
                <Button variant="outline" className="flex-1" onClick={() => setPreviewReport(null)}>
                  إغلاق
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
