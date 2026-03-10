"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowRight, FileText, Phone, Mail, MapPin, Package, TrendingUp, TrendingDown } from "lucide-react"
import Link from "next/link"

interface SupplierTransaction {
  id: string
  orderNumber: string
  date: string
  description: string
  amount: number
  paid: number
  remaining: number
  type: "purchase" | "payment"
  status: "paid" | "partial" | "unpaid"
}

const mockTransactions: SupplierTransaction[] = [
  {
    id: "1",
    orderNumber: "PO-2024-001",
    date: "2024-01-15",
    description: "ورق A4 - 100 رزمة",
    amount: 20000,
    paid: 20000,
    remaining: 0,
    type: "purchase",
    status: "paid",
  },
  {
    id: "2",
    orderNumber: "PO-2024-015",
    date: "2024-02-20",
    description: "حبر طباعة - 50 لتر",
    amount: 15000,
    paid: 10000,
    remaining: 5000,
    type: "purchase",
    status: "partial",
  },
  {
    id: "3",
    orderNumber: "PO-2024-028",
    date: "2024-03-10",
    description: "ورق مقوى - 200 رزمة",
    amount: 25000,
    paid: 0,
    remaining: 25000,
    type: "purchase",
    status: "unpaid",
  },
]

export default function SupplierProfilePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const resolvedParams = params as unknown as { id: string }
  const [transactions] = useState(mockTransactions)

  const supplier = {
    id: resolvedParams.id,
    name: "مؤسسة الورق المتحدة",
    contactPerson: "أحمد محمود",
    phone: "0123456789",
    email: "info@paper-co.com",
    address: "15 شارع الجمهورية، القاهرة",
    category: "ورق ومواد طباعة",
    taxId: "987-654-321",
    registrationDate: "2022-03-10",
    status: "active",
    totalPurchases: 60000,
    totalPaid: 30000,
    totalRemaining: 30000,
  }

  const unpaidTransactions = transactions.filter((t) => t.status === "unpaid" || t.status === "partial")

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
            <Link href="/accounting/suppliers">
              <Button variant="ghost" size="icon">
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="text-2xl font-bold text-foreground">ملف المورد</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        <div className="space-y-6">
          <Card className="p-6">
            <div className="mb-4 flex items-start justify-between">
              <div>
                <h2 className="text-2xl font-bold text-foreground">{supplier.name}</h2>
                <p className="text-sm text-muted-foreground">
                  مورد منذ {new Date(supplier.registrationDate).toLocaleDateString("ar-EG")}
                </p>
              </div>
              <Badge variant="outline" className="gap-1">
                <Package className="h-4 w-4" />
                {supplier.category}
              </Badge>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 mb-6">
              <div className="flex items-center gap-2 text-sm">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>{supplier.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>{supplier.email}</span>
              </div>
              <div className="flex items-start gap-2 text-sm md:col-span-2">
                <MapPin className="mt-0.5 h-4 w-4 text-muted-foreground" />
                <span>{supplier.address}</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="rounded-lg bg-blue-50 p-4 dark:bg-blue-950">
                <div className="flex items-center gap-2 mb-1">
                  <TrendingUp className="h-4 w-4 text-blue-600" />
                  <p className="text-sm text-muted-foreground">إجمالي المشتريات</p>
                </div>
                <p className="text-2xl font-bold text-blue-600">{supplier.totalPurchases.toLocaleString()} ج.م</p>
              </div>
              <div className="rounded-lg bg-green-50 p-4 dark:bg-green-950">
                <div className="flex items-center gap-2 mb-1">
                  <TrendingDown className="h-4 w-4 text-green-600" />
                  <p className="text-sm text-muted-foreground">إجمالي المدفوع</p>
                </div>
                <p className="text-2xl font-bold text-green-600">{supplier.totalPaid.toLocaleString()} ج.م</p>
              </div>
              <div className="rounded-lg bg-orange-50 p-4 dark:bg-orange-950">
                <div className="flex items-center gap-2 mb-1">
                  <FileText className="h-4 w-4 text-orange-600" />
                  <p className="text-sm text-muted-foreground">المتبقي</p>
                </div>
                <p className="text-2xl font-bold text-orange-600">{supplier.totalRemaining.toLocaleString()} ج.م</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <Tabs defaultValue="all">
              <div className="mb-4 flex items-center justify-between">
                <TabsList>
                  <TabsTrigger value="all">جميع المعاملات</TabsTrigger>
                  <TabsTrigger value="unpaid">المتبقي</TabsTrigger>
                </TabsList>
                <Link href="/accounting/purchase/new">
                  <Button className="gap-2">
                    <FileText className="h-4 w-4" />
                    إضافة فاتورة شراء
                  </Button>
                </Link>
              </div>

              <TabsContent value="all" className="space-y-3">
                {transactions.map((transaction) => (
                  <div key={transaction.id} className="rounded-lg border border-border p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="mb-2 flex items-center gap-2">
                          <h3 className="font-semibold">{transaction.orderNumber}</h3>
                          {getStatusBadge(transaction.status)}
                        </div>
                        <p className="mb-2 text-sm text-muted-foreground">{transaction.description}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(transaction.date).toLocaleDateString("ar-EG")}
                        </p>
                      </div>
                      <div className="text-left">
                        <p className="text-sm text-muted-foreground">المبلغ الكلي</p>
                        <p className="font-bold">{transaction.amount.toLocaleString()} ج.م</p>
                        {transaction.remaining > 0 && (
                          <p className="mt-1 text-sm text-orange-600">
                            متبقي: {transaction.remaining.toLocaleString()} ج.م
                          </p>
                        )}
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
                          <h3 className="font-semibold">{transaction.orderNumber}</h3>
                          {getStatusBadge(transaction.status)}
                        </div>
                        <p className="mb-2 text-sm text-muted-foreground">{transaction.description}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(transaction.date).toLocaleDateString("ar-EG")}
                        </p>
                      </div>
                      <div className="text-left">
                        <p className="text-sm text-muted-foreground">المتبقي</p>
                        <p className="font-bold text-orange-600">{transaction.remaining.toLocaleString()} ج.م</p>
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
