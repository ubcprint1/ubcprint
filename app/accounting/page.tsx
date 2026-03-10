"use client"

import { useRouter } from "next/navigation"
import { AccountingStats } from "@/components/accounting-stats"
import { InvoicesListEnhanced } from "@/components/invoices-list-enhanced"
import { ExpensesListEnhanced } from "@/components/expenses-list-enhanced"
import { SuppliersListEnhanced } from "@/components/suppliers-list-enhanced"
import { CashflowChart } from "@/components/cashflow-chart"
import { TransactionsLog } from "@/components/transactions-log"
import { AccountingSettings } from "@/components/accounting-settings"
import { FloatingActionButtons } from "@/components/floating-action-buttons"
import { NotificationsDropdown } from "@/components/notifications-dropdown"
import { Button } from "@/components/ui/button"
import { ArrowRight, Tag, Package, Wallet, TrendingDown, Users } from "lucide-react"
import Link from "next/link"
import { CustomersList } from "@/components/customers-list"

export default function AccountingPage() {
  const router = useRouter()
  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={() => router.back()}>
                <ArrowRight className="h-5 w-5" />
              </Button>
              <h1 className="text-2xl font-bold text-foreground">نظام المحاسبة</h1>
            </div>
            <div className="flex items-center gap-4">
              <AccountingSettings />
              <Link href="/accounting/operating-expenses">
                <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                  <TrendingDown className="h-4 w-4" />
                  مصاريف التشغيل
                </Button>
              </Link>
              <Link href="/accounting/payroll">
                <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                  <Wallet className="h-4 w-4" />
                  المرتبات
                </Button>
              </Link>
              <Link href="/accounting/customers">
                <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                  <Users className="h-4 w-4" />
                  العملاء
                </Button>
              </Link>
              <Link href="/accounting/suppliers">
                <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                  <Users className="h-4 w-4" />
                  الموردين
                </Button>
              </Link>
              <Link href="/pricing">
                <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                  <Tag className="h-4 w-4" />
                  التسعير
                </Button>
              </Link>
              <Link href="/inventory">
                <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                  <Package className="h-4 w-4" />
                  المخزن
                </Button>
              </Link>
              <NotificationsDropdown />
              <span className="text-sm text-muted-foreground">مرحباً، أحمد</span>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        <div className="space-y-6">
          {/* لوحة الإحصائيات المحسنة */}
          <AccountingStats />

          {/* قسم التدفق المالي */}
          <CashflowChart />

          {/* الفواتير والمصروفات */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <InvoicesListEnhanced />
            <ExpensesListEnhanced />
          </div>

          {/* الموردين */}
          <SuppliersListEnhanced />

          {/* العملاء */}
          <CustomersList />

          {/* سجل المعاملات المحاسبية */}
          <TransactionsLog />
        </div>
      </main>

      {/* أزرار الإجراءات السريعة */}
      <FloatingActionButtons />
    </div>
  )
}
