"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowRight, FileText, Phone, Mail, MapPin, Building2 } from "lucide-react"
import Link from "next/link"
import { WhatsAppSendButton, WhatsAppInvoiceButton } from "@/components/whatsapp-actions"

interface CustomerTransaction {
  id: string
  invoiceId: string
  date: string
  description: string
  amount: number
  paid: number
  remaining: number
  status: "paid" | "partial" | "unpaid"
}

const mockTransactions: CustomerTransaction[] = [
  {
    id: "1",
    invoiceId: "INV-2024-001",
    date: "2024-01-15",
    description: "طباعة بروشورات - 1000 نسخة",
    amount: 5000,
    paid: 5000,
    remaining: 0,
    status: "paid",
  },
  {
    id: "2",
    invoiceId: "INV-2024-015",
    date: "2024-02-20",
    description: "طباعة لافتات إعلانية - 10 لافتات",
    amount: 8000,
    paid: 3000,
    remaining: 5000,
    status: "partial",
  },
  {
    id: "3",
    invoiceId: "INV-2024-028",
    date: "2024-03-10",
    description: "حفر ليزر على أكريليك - 50 قطعة",
    amount: 10000,
    paid: 0,
    remaining: 10000,
    status: "unpaid",
  },
]

export default function CustomerProfilePage({
  params,
}: {
  params: { id: string }
}) {
  const [transactions] = useState(mockTransactions)

  const customer = {
    id: params.id,
    name: "شركة النور للدعاية والإعلان",
    phone: "01036930965",
    email: "info@alnoor-ads.com",
    address: "15 شارع الجمهورية، القاهرة",
    type: "advertising",
    taxId: "123-456-789",
    registrationDate: "2023-06-15",
    status: "active",
    totalPaid: 8000,
    totalUnpaid: 15000,
  }

  const unpaidTransactions = transactions.filter((t) => t.status === "unpaid" || t.status === "partial")

  const handleCreateInvoice = () => {
    // TODO: إنشاء فاتورة من المعاملات غير المسددة
    alert("سيتم إنشاء فاتورة للمبالغ غير المسددة")
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "paid":
        return <Badge className="bg-green-600">مسدد</Badge>
      case "partial":
        return <Badge className="bg-orange-600">مسدد جزئياً</Badge>
      case "unpaid":
        return <Badge variant="destructive">غير مسدد</Badge>
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <Link href="/accounting/customers">
              <Button variant="ghost" size="icon">
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="text-2xl font-bold text-foreground">ملف العميل</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        <div className="space-y-6">
          {/* معلومات العميل */}
          <Card className="p-6">
            <div className="mb-4 flex items-start justify-between">
              <div>
                <h2 className="text-2xl font-bold text-foreground">{customer.name}</h2>
                <p className="text-sm text-muted-foreground">
                  عميل منذ {new Date(customer.registrationDate).toLocaleDateString("ar-EG")}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="gap-1">
                  <Building2 className="h-4 w-4" />
                  مكتب دعاية
                </Badge>
                <WhatsAppSendButton phone={customer.phone} label="تواصل معه" variant="default" size="sm" />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="flex items-center gap-2 text-sm">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>{customer.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>{customer.email}</span>
              </div>
              <div className="flex items-start gap-2 text-sm md:col-span-2">
                <MapPin className="mt-0.5 h-4 w-4 text-muted-foreground" />
                <span>{customer.address}</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="rounded-lg bg-green-50 p-4 dark:bg-green-950">
                <p className="text-sm text-muted-foreground">إجمالي المدفوع</p>
                <p className="text-2xl font-bold text-green-600">{customer.totalPaid.toLocaleString()} ج.م</p>
              </div>
              <div className="rounded-lg bg-orange-50 p-4 dark:bg-orange-950">
                <p className="text-sm text-muted-foreground">إجمالي المتبقي</p>
                <p className="text-2xl font-bold text-orange-600">{customer.totalUnpaid.toLocaleString()} ج.م</p>
              </div>
            </div>
          </Card>

          {/* المعاملات */}
          <Card className="p-6">
            <Tabs defaultValue="all">
              <div className="mb-4 flex items-center justify-between">
                <TabsList>
                  <TabsTrigger value="all">جميع المعاملات</TabsTrigger>
                  <TabsTrigger value="unpaid">غير المسدد</TabsTrigger>
                </TabsList>
                {unpaidTransactions.length > 0 && (
                  <Button onClick={handleCreateInvoice} className="gap-2">
                    <FileText className="h-4 w-4" />
                    إنشاء فاتورة للمتبقي
                  </Button>
                )}
              </div>

              <TabsContent value="all" className="space-y-3">
                {transactions.map((transaction) => (
                  <div key={transaction.id} className="rounded-lg border border-border p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="mb-2 flex items-center gap-2">
                          <h3 className="font-semibold">{transaction.invoiceId}</h3>
                          {getStatusBadge(transaction.status)}
                        </div>
                        <p className="mb-2 text-sm text-muted-foreground">{transaction.description}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(transaction.date).toLocaleDateString("ar-EG")}
                        </p>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <div className="text-left">
                          <p className="text-sm text-muted-foreground">المبلغ الكلي</p>
                          <p className="font-bold">{transaction.amount.toLocaleString()} ج.م</p>
                          {transaction.remaining > 0 && (
                            <p className="mt-1 text-sm text-orange-600">
                              متبقي: {transaction.remaining.toLocaleString()} ج.م
                            </p>
                          )}
                        </div>
                        <WhatsAppInvoiceButton
                          phone={customer.phone}
                          invoiceNumber={transaction.invoiceId}
                          customerName={customer.name}
                          amount={transaction.remaining > 0 ? transaction.remaining : transaction.amount}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </TabsContent>

              <TabsContent value="unpaid" className="space-y-3">
                {unpaidTransactions.map((transaction) => (
                  <div key={transaction.id} className="rounded-lg border border-border p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="mb-2 flex items-center gap-2">
                          <h3 className="font-semibold">{transaction.invoiceId}</h3>
                          {getStatusBadge(transaction.status)}
                        </div>
                        <p className="mb-2 text-sm text-muted-foreground">{transaction.description}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(transaction.date).toLocaleDateString("ar-EG")}
                        </p>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <div className="text-left">
                          <p className="text-sm text-muted-foreground">المتبقي</p>
                          <p className="font-bold text-orange-600">{transaction.remaining.toLocaleString()} ج.م</p>
                        </div>
                        <WhatsAppInvoiceButton
                          phone={customer.phone}
                          invoiceNumber={transaction.invoiceId}
                          customerName={customer.name}
                          amount={transaction.remaining}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </TabsContent>
            </Tabs>
          </Card>
        </div>
      </main>
    </div>
  )
}
