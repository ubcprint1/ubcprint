"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { ArrowDownCircle, ArrowUpCircle, Plus, Search, Download } from "lucide-react"
import { downloadCSV } from "@/lib/download-utils"

type LogEntry = {
  id: string
  type: "inbound" | "outbound"
  date: string
  description: string
  category: string
  quantity: number
  unit: string
  price: number
  total: number
  supplier?: string
  customer?: string
  notes?: string
}

const mockData: LogEntry[] = [
  {
    id: "1",
    type: "inbound",
    date: "2024-01-15",
    description: "ورق A4 - 80 جرام",
    category: "مواد خام",
    quantity: 50,
    unit: "رزمة",
    price: 280,
    total: 14000,
    supplier: "شركة الورق المصري",
    notes: "جودة ممتازة",
  },
  {
    id: "2",
    type: "outbound",
    date: "2024-01-14",
    description: "بروشورات تجارية",
    category: "منتجات جاهزة",
    quantity: 5000,
    unit: "قطعة",
    price: 2.5,
    total: 12500,
    customer: "شركة النور للدعاية",
    notes: "تسليم عاجل",
  },
  {
    id: "3",
    type: "inbound",
    date: "2024-01-13",
    description: "حبر أسود - HP",
    category: "مستهلكات",
    quantity: 10,
    unit: "علبة",
    price: 450,
    total: 4500,
    supplier: "مكتبة النصر",
  },
  {
    id: "4",
    type: "outbound",
    date: "2024-01-12",
    description: "كروت شخصية",
    category: "منتجات جاهزة",
    quantity: 2000,
    unit: "قطعة",
    price: 1.5,
    total: 3000,
    customer: "محمد أحمد",
    notes: "طباعة ملونة",
  },
]

export function InboundOutboundLog() {
  const [entries] = useState<LogEntry[]>(mockData)
  const [filter, setFilter] = useState<"all" | "inbound" | "outbound">("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddingEntry, setIsAddingEntry] = useState(false)
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")

  const filteredEntries = entries.filter((entry) => {
    const matchesFilter = filter === "all" || entry.type === filter
    const matchesSearch =
      entry.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.category.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDate = (!startDate || entry.date >= startDate) && (!endDate || entry.date <= endDate)
    return matchesFilter && matchesSearch && matchesDate
  })

  const totalInbound = filteredEntries.filter((e) => e.type === "inbound").reduce((acc, e) => acc + e.total, 0)
  const totalOutbound = filteredEntries.filter((e) => e.type === "outbound").reduce((acc, e) => acc + e.total, 0)

  const downloadReport = () => {
    const headers = ["#", "التاريخ", "النوع", "المنتج", "التصنيف", "الكمية", "السعر", "الإجمالي", "ملاحظات"]
    const rows = filteredEntries.map((e, i) => [
      String(i + 1),
      e.date,
      e.type === "inbound" ? "وارد" : "صادر",
      e.product,
      e.category,
      String(e.quantity),
      e.price.toLocaleString(),
      e.total.toLocaleString(),
      e.notes || "",
    ])
    rows.push(["", "", "إجمالي الوارد", "", "", "", "", totalInbound.toLocaleString(), ""])
    rows.push(["", "", "إجمالي الصادر", "", "", "", "", totalOutbound.toLocaleString(), ""])
    downloadCSV(`تقرير-حركة-المخزون-${startDate || "الكل"}-${endDate || "الكل"}`, headers, rows)
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">إجمالي الوارد</p>
              <p className="mt-2 text-2xl font-bold text-emerald-600">{totalInbound.toLocaleString()} ج.م</p>
            </div>
            <div className="rounded-lg bg-emerald-500/10 p-3">
              <ArrowDownCircle className="h-6 w-6 text-emerald-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">إجمالي الصادر</p>
              <p className="mt-2 text-2xl font-bold text-blue-600">{totalOutbound.toLocaleString()} ج.م</p>
            </div>
            <div className="rounded-lg bg-blue-500/10 p-3">
              <ArrowUpCircle className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">الفرق</p>
              <p className="mt-2 text-2xl font-bold text-foreground">
                {(totalOutbound - totalInbound).toLocaleString()} ج.م
              </p>
            </div>
            <div className="rounded-lg bg-primary/10 p-3">
              <span className="text-xl font-bold">Δ</span>
            </div>
          </div>
        </Card>
      </div>

      <Card>
        <div className="border-b border-border p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <h2 className="text-xl font-bold">سجل الصادر والوارد</h2>
            <div className="flex flex-wrap gap-2">
              <div className="flex gap-2">
                <div className="space-y-1">
                  <Label className="text-xs">من تاريخ</Label>
                  <Input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-40"
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">إلى تاريخ</Label>
                  <Input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="w-40" />
                </div>
              </div>
              <Button variant="outline" className="gap-2 bg-transparent" onClick={downloadReport}>
                <Download className="h-4 w-4" />
                تحميل التقرير
              </Button>
              <div className="relative flex-1 md:w-64">
                <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="بحث..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pr-9"
                />
              </div>
              <Select value={filter} onValueChange={(v: any) => setFilter(v)}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">الكل</SelectItem>
                  <SelectItem value="inbound">وارد</SelectItem>
                  <SelectItem value="outbound">صادر</SelectItem>
                </SelectContent>
              </Select>
              <Dialog open={isAddingEntry} onOpenChange={setIsAddingEntry}>
                <DialogTrigger asChild>
                  <Button className="gap-2">
                    <Plus className="h-4 w-4" />
                    إضافة سجل
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl" dir="rtl">
                  <DialogHeader>
                    <DialogTitle>إضافة سجل جديد</DialogTitle>
                  </DialogHeader>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>النوع</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="اختر النوع" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="inbound">وارد</SelectItem>
                          <SelectItem value="outbound">صادر</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>التاريخ</Label>
                      <Input type="date" />
                    </div>
                    <div className="col-span-2 space-y-2">
                      <Label>الوصف</Label>
                      <Input placeholder="وصف المنتج أو المادة" />
                    </div>
                    <div className="space-y-2">
                      <Label>الفئة</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="اختر الفئة" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="raw">مواد خام</SelectItem>
                          <SelectItem value="supplies">مستهلكات</SelectItem>
                          <SelectItem value="products">منتجات جاهزة</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>الكمية</Label>
                      <Input type="number" placeholder="0" />
                    </div>
                    <div className="space-y-2">
                      <Label>الوحدة</Label>
                      <Input placeholder="قطعة، رزمة، علبة..." />
                    </div>
                    <div className="space-y-2">
                      <Label>السعر (ج.م)</Label>
                      <Input type="number" placeholder="0.00" />
                    </div>
                    <div className="col-span-2 space-y-2">
                      <Label>ملاحظات</Label>
                      <Textarea placeholder="ملاحظات إضافية..." rows={3} />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button>حفظ</Button>
                    <Button variant="outline" onClick={() => setIsAddingEntry(false)}>
                      إلغاء
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-border">
              <tr>
                <th className="p-4 text-right text-sm font-semibold">النوع</th>
                <th className="p-4 text-right text-sm font-semibold">التاريخ</th>
                <th className="p-4 text-right text-sm font-semibold">الوصف</th>
                <th className="p-4 text-right text-sm font-semibold">الفئة</th>
                <th className="p-4 text-right text-sm font-semibold">الكمية</th>
                <th className="p-4 text-right text-sm font-semibold">السعر</th>
                <th className="p-4 text-right text-sm font-semibold">الإجمالي</th>
                <th className="p-4 text-right text-sm font-semibold">الجهة</th>
              </tr>
            </thead>
            <tbody>
              {filteredEntries.map((entry) => (
                <tr key={entry.id} className="border-b border-border/50 hover:bg-muted/50">
                  <td className="p-4">
                    {entry.type === "inbound" ? (
                      <Badge className="gap-1 bg-emerald-500">
                        <ArrowDownCircle className="h-3 w-3" />
                        وارد
                      </Badge>
                    ) : (
                      <Badge className="gap-1 bg-blue-500">
                        <ArrowUpCircle className="h-3 w-3" />
                        صادر
                      </Badge>
                    )}
                  </td>
                  <td className="p-4 text-sm text-muted-foreground">
                    {new Date(entry.date).toLocaleDateString("ar-EG")}
                  </td>
                  <td className="p-4 font-medium">{entry.description}</td>
                  <td className="p-4 text-sm text-muted-foreground">{entry.category}</td>
                  <td className="p-4 text-sm">
                    {entry.quantity} {entry.unit}
                  </td>
                  <td className="p-4 text-sm">{entry.price.toLocaleString()} ج.م</td>
                  <td className="p-4 font-semibold">{entry.total.toLocaleString()} ج.م</td>
                  <td className="p-4 text-sm text-muted-foreground">{entry.supplier || entry.customer}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
