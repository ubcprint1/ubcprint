'use client'

import { useState } from 'react'
import { FileText, Plus, Eye, Download } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import type { Invoice } from '@/lib/accounting-types'

const MOCK_INVOICES: Invoice[] = [
  {
    id: '1',
    number: 'INV-2024-001',
    customerName: 'شركة الأعمال المتقدمة',
    date: '2024-11-01',
    dueDate: '2024-11-15',
    items: [
      { id: '1', description: 'طباعة كتيبات A4', quantity: 1000, unitPrice: 5, total: 5000 },
      { id: '2', description: 'تجليد فاخر', quantity: 1000, unitPrice: 3, total: 3000 },
    ],
    subtotal: 8000,
    tax: 1200,
    total: 9200,
    status: 'paid',
    paymentMethod: 'bank',
  },
  {
    id: '2',
    number: 'INV-2024-002',
    customerName: 'مؤسسة التسويق الرقمي',
    date: '2024-11-05',
    dueDate: '2024-11-20',
    items: [
      { id: '1', description: 'بروشورات ملونة', quantity: 500, unitPrice: 10, total: 5000 },
    ],
    subtotal: 5000,
    tax: 750,
    total: 5750,
    status: 'pending',
  },
  {
    id: '3',
    number: 'INV-2024-003',
    customerName: 'شركة البناء الحديث',
    date: '2024-10-20',
    dueDate: '2024-11-05',
    items: [
      { id: '1', description: 'لوحات إعلانية كبيرة', quantity: 10, unitPrice: 200, total: 2000 },
    ],
    subtotal: 2000,
    tax: 300,
    total: 2300,
    status: 'overdue',
  },
]

const statusColors = {
  paid: 'bg-emerald-500/10 text-emerald-500',
  pending: 'bg-amber-500/10 text-amber-500',
  overdue: 'bg-red-500/10 text-red-500',
  cancelled: 'bg-slate-500/10 text-slate-500',
}

const statusLabels = {
  paid: 'مدفوعة',
  pending: 'قيد الانتظار',
  overdue: 'متأخرة',
  cancelled: 'ملغاة',
}

export function InvoicesList() {
  const [invoices] = useState<Invoice[]>(MOCK_INVOICES)

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            <CardTitle>الفواتير</CardTitle>
          </div>
          <Button size="sm" className="gap-2">
            <Plus className="h-4 w-4" />
            فاتورة جديدة
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {invoices.map((invoice) => (
            <div
              key={invoice.id}
              className="rounded-lg border border-border bg-card p-4"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-3">
                    <h4 className="font-semibold">{invoice.number}</h4>
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                        statusColors[invoice.status]
                      }`}
                    >
                      {statusLabels[invoice.status]}
                    </span>
                  </div>
                  <p className="text-sm font-medium">{invoice.customerName}</p>
                  <div className="flex gap-4 text-sm text-muted-foreground">
                    <span>التاريخ: {invoice.date}</span>
                    <span>الاستحقاق: {invoice.dueDate}</span>
                  </div>
                  <div className="text-sm">
                    <span className="text-muted-foreground">المجموع: </span>
                    <span className="text-lg font-bold">{invoice.total.toLocaleString()} ر.س</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="icon">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Download className="h-4 w-4" />
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
