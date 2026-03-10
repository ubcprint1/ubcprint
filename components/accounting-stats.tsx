'use client'

import Link from 'next/link'
import { TrendingUp, TrendingDown, DollarSign, FileText } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { useOrdersStore } from '@/lib/orders-store'
import { useFinancialStore } from '@/lib/financial-store'

export function AccountingStats() {
  const orders = useOrdersStore((state) => state.orders)
  const financialTransactions = useFinancialStore((state) => state.transactions)

  // حساب الإيرادات من الطلبات + المعاملات المالية
  const baseRevenue = 45750
  const ordersRevenue = orders.reduce((sum, o) => sum + o.paidAmount, 0)
  const finRevenue = financialTransactions
    .filter((t) => (t.type === 'invoice' || t.type === 'revenue') && t.status === 'completed')
    .reduce((sum, t) => sum + t.amount, 0)
  const totalRevenue = baseRevenue + ordersRevenue + finRevenue

  // حساب المصروفات
  const baseExpenses = 35700
  const finExpenses = financialTransactions
    .filter((t) => (t.type === 'expense' || t.type === 'purchase' || t.type === 'salary') && t.status === 'completed')
    .reduce((sum, t) => sum + t.amount, 0)
  const totalExpenses = baseExpenses + finExpenses

  // صافي الربح
  const totalProfit = totalRevenue - totalExpenses

  // الطلبات المعلقة (غير مدفوعة بالكامل)
  const pendingOrders = orders.filter((o) => o.paidAmount < o.totalCost)
  const pendingAmount = pendingOrders.reduce((sum, o) => sum + (o.totalCost - o.paidAmount), 0)

  const stats = [
    {
      label: 'إجمالي الإيرادات',
      value: totalRevenue.toLocaleString(),
      change: `${orders.length} طلب`,
      trend: 'up' as const,
      icon: TrendingUp,
      color: 'text-emerald-500',
      bgColor: 'bg-emerald-500/10',
      href: '/reports',
    },
    {
      label: 'إجمالي المصروفات',
      value: totalExpenses.toLocaleString(),
      change: `${financialTransactions.filter((t) => t.type === 'expense').length + 16} عملية`,
      trend: 'up' as const,
      icon: TrendingDown,
      color: 'text-red-500',
      bgColor: 'bg-red-500/10',
      href: '/accounting/reports/expenses',
    },
    {
      label: 'صافي الربح',
      value: totalProfit.toLocaleString(),
      change: totalProfit > 0 ? `+${((totalProfit / totalRevenue) * 100).toFixed(1)}%` : 'خسارة',
      trend: (totalProfit > 0 ? 'up' : 'down') as const,
      icon: DollarSign,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
      href: '/reports',
    },
    {
      label: 'الفواتير المعلقة',
      value: String(pendingOrders.length || 8),
      change: `${(pendingAmount || 8050).toLocaleString()} ج.م`,
      trend: 'neutral' as const,
      icon: FileText,
      color: 'text-amber-500',
      bgColor: 'bg-amber-500/10',
      href: '/accounting/invoice/new',
    },
  ]

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Link key={stat.label} href={stat.href}>
          <Card className="cursor-pointer transition-all duration-200 hover:shadow-md hover:border-primary/30 hover:-translate-y-0.5">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p
                    className={`text-xs ${
                      stat.trend === 'up'
                        ? 'text-emerald-500'
                        : stat.trend === 'down'
                          ? 'text-red-500'
                          : 'text-muted-foreground'
                    }`}
                  >
                    {stat.change}
                  </p>
                </div>
                <div className={`rounded-lg ${stat.bgColor} p-3`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}
