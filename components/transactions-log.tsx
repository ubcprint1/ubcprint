'use client'

import { useState } from 'react'
import { History, Search, Filter, Download } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import type { Transaction } from '@/lib/accounting-types'
import { downloadCSV } from '@/lib/download-utils'

const MOCK_TRANSACTIONS: Transaction[] = [
  {
    id: '1',
    date: '2024-11-08',
    type: 'income',
    party: 'شركة الأعمال المتقدمة',
    amount: 9200,
    status: 'completed',
    description: 'دفعة فاتورة INV-2024-001',
    reference: 'INV-2024-001',
  },
  {
    id: '2',
    date: '2024-11-08',
    type: 'expense',
    party: 'مؤسسة الورق المتحدة',
    amount: 5000,
    status: 'completed',
    category: 'مواد خام',
    description: 'شراء ورق A4',
  },
  {
    id: '3',
    date: '2024-11-07',
    type: 'payment',
    party: 'مركز الصيانة الفنية',
    amount: 2500,
    status: 'completed',
    category: 'صيانة',
    description: 'صيانة آلة الطباعة',
  },
  {
    id: '4',
    date: '2024-11-05',
    type: 'invoice',
    party: 'مؤسسة التسويق الرقمي',
    amount: 5750,
    status: 'pending',
    description: 'فاتورة INV-2024-002',
    reference: 'INV-2024-002',
  },
]

const typeColors = {
  income: 'bg-emerald-500/10 text-emerald-500',
  expense: 'bg-red-500/10 text-red-500',
  invoice: 'bg-blue-500/10 text-blue-500',
  payment: 'bg-purple-500/10 text-purple-500',
}

const typeLabels = {
  income: 'إيراد',
  expense: 'مصروف',
  invoice: 'فاتورة',
  payment: 'دفعة',
}

const statusColors = {
  completed: 'bg-emerald-500/10 text-emerald-500',
  pending: 'bg-amber-500/10 text-amber-500',
  cancelled: 'bg-slate-500/10 text-slate-500',
}

const statusLabels = {
  completed: 'مكتمل',
  pending: 'معلق',
  cancelled: 'ملغي',
}

export function TransactionsLog() {
  const [transactions] = useState<Transaction[]>(MOCK_TRANSACTIONS)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState<string>('all')
  const [filterStatus, setFilterStatus] = useState<string>('all')

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch =
      transaction.party.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === 'all' || transaction.type === filterType
    const matchesStatus = filterStatus === 'all' || transaction.status === filterStatus

    return matchesSearch && matchesType && matchesStatus
  })

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <History className="h-5 w-5 text-primary" />
            <CardTitle>سجل المعاملات المحاسبية</CardTitle>
          </div>
          <Button size="sm" variant="outline" className="gap-2" onClick={() => {
            const headers = ['#', 'التاريخ', 'الوصف', 'النوع', 'الفئة', 'المبلغ (ج.م)']
            const rows = filteredTransactions.map((t, i) => [
              String(i + 1), t.date, t.description, t.type === 'income' ? 'إيراد' : 'مصروف', t.category, t.amount.toLocaleString()
            ])
            downloadCSV('سجل-المعاملات', headers, rows)
          }}>
            <Download className="h-4 w-4" />
            تصدير CSV
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex gap-3">
          <div className="relative flex-1">
            <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="بحث في المعاملات..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pr-10"
            />
          </div>
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="نوع المعاملة" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">الكل</SelectItem>
              <SelectItem value="income">إيراد</SelectItem>
              <SelectItem value="expense">مصروف</SelectItem>
              <SelectItem value="invoice">فاتورة</SelectItem>
              <SelectItem value="payment">دفعة</SelectItem>
            </SelectContent>
          </Select>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="الحالة" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">الكل</SelectItem>
              <SelectItem value="completed">مكتمل</SelectItem>
              <SelectItem value="pending">معلق</SelectItem>
              <SelectItem value="cancelled">ملغي</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          {filteredTransactions.map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-center justify-between rounded-lg border border-border bg-card p-4"
            >
              <div className="flex items-center gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                        typeColors[transaction.type]
                      }`}
                    >
                      {typeLabels[transaction.type]}
                    </span>
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                        statusColors[transaction.status]
                      }`}
                    >
                      {statusLabels[transaction.status]}
                    </span>
                  </div>
                  <p className="font-medium">{transaction.party}</p>
                  <p className="text-sm text-muted-foreground">{transaction.description}</p>
                  <p className="text-xs text-muted-foreground">{transaction.date}</p>
                </div>
              </div>
              <div className="text-left">
                <p
                  className={`text-lg font-bold ${
                    transaction.type === 'income' || transaction.type === 'invoice'
                      ? 'text-emerald-500'
                      : 'text-red-500'
                  }`}
                >
                  {transaction.type === 'income' || transaction.type === 'invoice' ? '+' : '-'}
                  {transaction.amount.toLocaleString()} ج.م
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
