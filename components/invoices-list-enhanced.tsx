"use client"

import { useState } from "react"
import { FileText, Plus, Eye, Download, Share2, Printer, Archive, Search } from "lucide-react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { WhatsAppInvoiceButton } from "@/components/whatsapp-actions"
import type { Invoice } from "@/lib/accounting-types"

const MOCK_INVOICES: Invoice[] = [
  {
    id: "1",
    number: "INV-2024-001",
    customerName: "شركة الأعمال المتقدمة",
    date: "2024-11-01",
    dueDate: "2024-11-15",
    items: [{ id: "1", description: "طباعة كتيبات A4", quantity: 1000, unitPrice: 5, total: 5000 }],
    subtotal: 8000,
    tax: 1200,
    total: 9200,
    status: "paid",
    paymentMethod: "bank",
  },
  {
    id: "2",
    number: "INV-2024-002",
    customerName: "مؤسسة التسويق الرقمي",
    date: "2024-11-05",
    dueDate: "2024-11-20",
    items: [{ id: "1", description: "بروشورات ملونة", quantity: 500, unitPrice: 10, total: 5000 }],
    subtotal: 5000,
    tax: 750,
    total: 5750,
    status: "pending",
  },
  {
    id: "3",
    number: "INV-2024-003",
    customerName: "شركة البناء الحديث",
    date: "2024-10-20",
    dueDate: "2024-11-05",
    items: [{ id: "1", description: "لوحات إعلانية كبيرة", quantity: 10, unitPrice: 200, total: 2000 }],
    subtotal: 2000,
    tax: 300,
    total: 2300,
    status: "overdue",
  },
]

const statusColors = {
  paid: "bg-emerald-500/10 text-emerald-500",
  pending: "bg-amber-500/10 text-amber-500",
  overdue: "bg-red-500/10 text-red-500",
  cancelled: "bg-slate-500/10 text-slate-500",
}

const statusLabels = {
  paid: "مدفوعة",
  pending: "قيد الانتظار",
  overdue: "متأخرة",
  cancelled: "ملغاة",
}

export function InvoicesListEnhanced() {
  const [invoices] = useState<Invoice[]>(MOCK_INVOICES)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState<string>("all")

  const handlePrint = (invoice: Invoice) => {
    window.print()
  }

  const handleDownload = (invoice: Invoice) => {
    const BOM = "\uFEFF"
    const content = `${BOM}فاتورة رقم: ${invoice.number}
العميل: ${invoice.customerName}
التاريخ: ${invoice.date}
الحالة: ${invoice.status === "paid" ? "مدفوعة" : invoice.status === "pending" ? "معلقة" : invoice.status === "overdue" ? "متأخرة" : "ملغاة"}
${invoice.items ? "\nالبنود:\n" + invoice.items.map((item: { name: string; quantity: number; unitPrice: number; total: number }, i: number) => `${i + 1}. ${item.name} - الكمية: ${item.quantity} - السعر: ${item.unitPrice} ج.م - الإجمالي: ${item.total} ج.م`).join("\n") : ""}
${"─".repeat(40)}
الإجمالي: ${invoice.total.toLocaleString()} ج.م
المدفوع: ${(invoice.paid || 0).toLocaleString()} ج.م
المتبقي: ${(invoice.total - (invoice.paid || 0)).toLocaleString()} ج.م
`
    const blob = new Blob([content], { type: "text/plain;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `فاتورة-${invoice.number}.txt`
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleShare = (invoice: Invoice) => {
    if (navigator.share) {
      navigator.share({
        title: `فاتورة ${invoice.number}`,
        text: `فاتورة ${invoice.customerName} - ${invoice.total} ج.م`,
      })
    }
  }

  const handleArchive = (invoice: Invoice) => {
    alert(`تم أرشفة الفاتورة ${invoice.number}`)
  }

  const handleView = (invoiceId: string) => {
    window.location.href = `/accounting/invoice/${invoiceId}`
  }

  const filteredInvoices = invoices.filter((invoice) => {
    const matchesSearch =
      invoice.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.number.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === "all" || invoice.status === filterStatus

    return matchesSearch && matchesStatus
  })

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            <CardTitle>الفواتير</CardTitle>
          </div>
          <div className="flex gap-2">
            <Link href="/accounting/quotation/new">
              <Button size="sm" variant="outline" className="gap-2 bg-transparent">
                <Plus className="h-4 w-4" />
                عرض سعر جديد
              </Button>
            </Link>
            <Link href="/accounting/invoice/new">
              <Button size="sm" className="gap-2">
                <Plus className="h-4 w-4" />
                فاتورة جديدة
              </Button>
            </Link>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex gap-3">
          <div className="relative flex-1">
            <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="بحث عن فاتورة..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pr-10"
            />
          </div>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="حالة الفاتورة" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">الكل</SelectItem>
              <SelectItem value="paid">مدفوعة</SelectItem>
              <SelectItem value="pending">قيد الانتظار</SelectItem>
              <SelectItem value="overdue">متأخرة</SelectItem>
              <SelectItem value="cancelled">ملغاة</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-3">
          {filteredInvoices.map((invoice) => (
            <div
              key={invoice.id}
              className="rounded-lg border border-border bg-card p-4 transition-colors hover:bg-accent"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-3">
                    <h4 className="font-semibold">{invoice.number}</h4>
                    <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${statusColors[invoice.status]}`}>
                      {statusLabels[invoice.status]}
                    </span>
                  </div>
                  <p className="text-sm font-medium">{invoice.customerName}</p>
                  <div className="flex gap-4 text-sm text-muted-foreground">
                    <span>الإصدار: {invoice.date}</span>
                    <span>الاستحقاق: {invoice.dueDate}</span>
                  </div>
                  <div className="text-sm">
                    <span className="text-muted-foreground">المبلغ الإجمالي: </span>
                    <span className="text-lg font-bold text-primary">{invoice.total.toLocaleString()} ج.م</span>
                  </div>
                </div>

                <div className="flex gap-1">
                  <WhatsAppInvoiceButton
                    phone="01036930965"
                    invoiceNumber={invoice.number}
                    customerName={invoice.customerName}
                    amount={invoice.total}
                    size="icon"
                  />
                  <Button variant="outline" size="icon" title="عرض" onClick={() => handleView(invoice.id)}>
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" title="تحميل PDF" onClick={() => handleDownload(invoice)}>
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" title="مشاركة" onClick={() => handleShare(invoice)}>
                    <Share2 className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" title="طباعة" onClick={() => handlePrint(invoice)}>
                    <Printer className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" title="أرشفة" onClick={() => handleArchive(invoice)}>
                    <Archive className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
