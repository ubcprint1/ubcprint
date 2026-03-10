"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { EMPLOYEES } from "@/lib/employees-data"
import { DollarSign, Download, Send, Check, X, ChevronDown, ChevronLeft } from "lucide-react"
import { downloadCSV } from "@/lib/download-utils"

type PayrollRecord = {
  employeeId: string
  employeeName: string
  baseSalary: number
  bonus: number
  deductions: number
  netSalary: number
  status: "pending" | "paid"
  paidDate?: string
  month: string
  year: string
}

const PAYROLL_DATA: PayrollRecord[] = [
  // 2024
  {
    employeeId: "e1",
    employeeName: EMPLOYEES[0].name,
    baseSalary: 4500,
    bonus: 500,
    deductions: 200,
    netSalary: 4800,
    status: "paid",
    paidDate: "2024-11-01",
    month: "نوفمبر",
    year: "2024",
  },
  {
    employeeId: "e2",
    employeeName: EMPLOYEES[1].name,
    baseSalary: 3800,
    bonus: 300,
    deductions: 150,
    netSalary: 3950,
    status: "paid",
    paidDate: "2024-11-01",
    month: "نوفمبر",
    year: "2024",
  },
  {
    employeeId: "e1",
    employeeName: EMPLOYEES[0].name,
    baseSalary: 4500,
    bonus: 400,
    deductions: 180,
    netSalary: 4720,
    status: "paid",
    paidDate: "2024-10-01",
    month: "أكتوبر",
    year: "2024",
  },
  {
    employeeId: "e2",
    employeeName: EMPLOYEES[1].name,
    baseSalary: 3800,
    bonus: 250,
    deductions: 130,
    netSalary: 3920,
    status: "paid",
    paidDate: "2024-10-01",
    month: "أكتوبر",
    year: "2024",
  },
  {
    employeeId: "e3",
    employeeName: EMPLOYEES[2].name,
    baseSalary: 3500,
    bonus: 200,
    deductions: 100,
    netSalary: 3600,
    status: "paid",
    paidDate: "2024-10-01",
    month: "أكتوبر",
    year: "2024",
  },
  // 2023
  {
    employeeId: "e1",
    employeeName: EMPLOYEES[0].name,
    baseSalary: 4200,
    bonus: 450,
    deductions: 190,
    netSalary: 4460,
    status: "paid",
    paidDate: "2023-12-01",
    month: "ديسمبر",
    year: "2023",
  },
  {
    employeeId: "e2",
    employeeName: EMPLOYEES[1].name,
    baseSalary: 3500,
    bonus: 280,
    deductions: 140,
    netSalary: 3640,
    status: "paid",
    paidDate: "2023-12-01",
    month: "ديسمبر",
    year: "2023",
  },
]

export function PayrollManagement() {
  const [expandedYears, setExpandedYears] = useState<Set<string>>(new Set(["2024"]))
  const [expandedMonths, setExpandedMonths] = useState<Set<string>>(new Set(["2024-نوفمبر"]))

  // تجميع البيانات حسب السنة
  const dataByYear = PAYROLL_DATA.reduce(
    (acc, record) => {
      if (!acc[record.year]) {
        acc[record.year] = {}
      }
      if (!acc[record.year][record.month]) {
        acc[record.year][record.month] = []
      }
      acc[record.year][record.month].push(record)
      return acc
    },
    {} as Record<string, Record<string, PayrollRecord[]>>,
  )

  const years = Object.keys(dataByYear).sort((a, b) => Number.parseInt(b) - Number.parseInt(a))

  const exportPayroll = () => {
    const headers = ["#", "الموظف", "الشهر", "السنة", "الراتب الأساسي", "البونص", "الخصومات", "صافي الراتب", "الحالة", "تاريخ الصرف"]
    const rows = PAYROLL_DATA.map((r, i) => [
      String(i + 1),
      r.employeeName,
      r.month,
      r.year,
      r.baseSalary.toLocaleString(),
      r.bonus.toLocaleString(),
      r.deductions.toLocaleString(),
      r.netSalary.toLocaleString(),
      r.status === "paid" ? "مدفوع" : "معلق",
      r.paidDate || "-",
    ])
    const totalNet = PAYROLL_DATA.reduce((s, r) => s + r.netSalary, 0)
    rows.push(["", "الإجمالي", "", "", "", "", "", totalNet.toLocaleString(), "", ""])
    downloadCSV(`كشوف-المرتبات`, headers, rows)
  }

  const toggleYear = (year: string) => {
    const newExpanded = new Set(expandedYears)
    if (newExpanded.has(year)) {
      newExpanded.delete(year)
    } else {
      newExpanded.add(year)
    }
    setExpandedYears(newExpanded)
  }

  const toggleMonth = (yearMonth: string) => {
    const newExpanded = new Set(expandedMonths)
    if (newExpanded.has(yearMonth)) {
      newExpanded.delete(yearMonth)
    } else {
      newExpanded.add(yearMonth)
    }
    setExpandedMonths(newExpanded)
  }

  const totalPaid = PAYROLL_DATA.filter((p) => p.status === "paid").reduce((acc, p) => acc + p.netSalary, 0)
  const totalPending = PAYROLL_DATA.filter((p) => p.status === "pending").reduce((acc, p) => acc + p.netSalary, 0)

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">إجمالي المرتبات المدفوعة</p>
              <p className="mt-2 text-2xl font-bold text-emerald-600">{totalPaid.toLocaleString()} ج.م</p>
            </div>
            <div className="rounded-lg bg-emerald-500/10 p-3">
              <Check className="h-6 w-6 text-emerald-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">المرتبات المعلقة</p>
              <p className="mt-2 text-2xl font-bold text-amber-600">{totalPending.toLocaleString()} ج.م</p>
            </div>
            <div className="rounded-lg bg-amber-500/10 p-3">
              <X className="h-6 w-6 text-amber-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">إجمالي المرتبات</p>
              <p className="mt-2 text-2xl font-bold text-foreground">
                {(totalPaid + totalPending).toLocaleString()} ج.م
              </p>
            </div>
            <div className="rounded-lg bg-primary/10 p-3">
              <DollarSign className="h-6 w-6 text-primary" />
            </div>
          </div>
        </Card>
      </div>

      <Card>
        <div className="border-b border-border p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">أرشيف مرتبات الموظفين</h2>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="gap-2 bg-transparent" onClick={exportPayroll}>
                <Download className="h-4 w-4" />
                تصدير Excel
              </Button>
              <Button size="sm" className="gap-2">
                <Send className="h-4 w-4" />
                إرسال الكشوف
              </Button>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="space-y-4">
            {years.map((year) => {
              const yearExpanded = expandedYears.has(year)
              const months = Object.keys(dataByYear[year])
              const yearTotal = Object.values(dataByYear[year])
                .flat()
                .reduce((acc, r) => acc + r.netSalary, 0)

              return (
                <div key={year} className="space-y-2">
                  {/* السنة */}
                  <button
                    onClick={() => toggleYear(year)}
                    className="flex w-full items-center justify-between rounded-lg border border-border bg-muted/50 p-4 transition-colors hover:bg-muted"
                  >
                    <div className="flex items-center gap-3">
                      {yearExpanded ? (
                        <ChevronDown className="h-5 w-5 text-muted-foreground" />
                      ) : (
                        <ChevronLeft className="h-5 w-5 text-muted-foreground" />
                      )}
                      <h3 className="text-lg font-bold">سنة {year}</h3>
                      <Badge variant="secondary">{months.length} شهر</Badge>
                    </div>
                    <p className="text-lg font-bold text-primary">{yearTotal.toLocaleString()} ج.م</p>
                  </button>

                  {/* الأشهر */}
                  {yearExpanded && (
                    <div className="mr-8 space-y-2">
                      {months.map((month) => {
                        const yearMonth = `${year}-${month}`
                        const monthExpanded = expandedMonths.has(yearMonth)
                        const records = dataByYear[year][month]
                        const monthTotal = records.reduce((acc, r) => acc + r.netSalary, 0)

                        return (
                          <div key={yearMonth} className="space-y-2">
                            {/* الشهر */}
                            <button
                              onClick={() => toggleMonth(yearMonth)}
                              className="flex w-full items-center justify-between rounded-lg border border-border bg-card p-4 transition-colors hover:bg-muted/30"
                            >
                              <div className="flex items-center gap-3">
                                {monthExpanded ? (
                                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                                ) : (
                                  <ChevronLeft className="h-4 w-4 text-muted-foreground" />
                                )}
                                <h4 className="font-semibold">{month}</h4>
                                <Badge variant="outline">{records.length} موظف</Badge>
                              </div>
                              <p className="font-bold text-primary">{monthTotal.toLocaleString()} ج.م</p>
                            </button>

                            {/* الموظفين */}
                            {monthExpanded && (
                              <div className="mr-8 overflow-hidden rounded-lg border border-border">
                                <Table>
                                  <TableHeader>
                                    <TableRow className="bg-muted/50">
                                      <TableHead className="text-right">الموظف</TableHead>
                                      <TableHead className="text-right">الراتب الأساسي</TableHead>
                                      <TableHead className="text-right">المكافآت</TableHead>
                                      <TableHead className="text-right">الخصومات</TableHead>
                                      <TableHead className="text-right">صافي المرتب</TableHead>
                                      <TableHead className="text-right">الحالة</TableHead>
                                      <TableHead className="text-right">الإجراءات</TableHead>
                                    </TableRow>
                                  </TableHeader>
                                  <TableBody>
                                    {records.map((record, idx) => (
                                      <TableRow key={`${record.employeeId}-${idx}`}>
                                        <TableCell className="font-medium">{record.employeeName}</TableCell>
                                        <TableCell>{record.baseSalary.toLocaleString()} ج.م</TableCell>
                                        <TableCell className="text-emerald-600">
                                          +{record.bonus.toLocaleString()} ج.م
                                        </TableCell>
                                        <TableCell className="text-red-600">
                                          -{record.deductions.toLocaleString()} ج.م
                                        </TableCell>
                                        <TableCell className="font-bold">
                                          {record.netSalary.toLocaleString()} ج.م
                                        </TableCell>
                                        <TableCell>
                                          {record.status === "paid" ? (
                                            <Badge variant="default" className="bg-emerald-500">
                                              مدفوع
                                            </Badge>
                                          ) : (
                                            <Badge variant="secondary">معلق</Badge>
                                          )}
                                        </TableCell>
                                        <TableCell>
                                          <div className="flex gap-2">
                                            <Button size="sm" variant="outline">
                                              عرض التفاصيل
                                            </Button>
                                            {record.status === "pending" && (
                                              <Button size="sm" variant="default">
                                                تأكيد الدفع
                                              </Button>
                                            )}
                                          </div>
                                        </TableCell>
                                      </TableRow>
                                    ))}
                                  </TableBody>
                                </Table>
                              </div>
                            )}
                          </div>
                        )
                      })}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </Card>
    </div>
  )
}
