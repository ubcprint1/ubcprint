'use client'

import { useState } from 'react'
import { Truck, Plus, Phone, Mail, MapPin } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import type { Supplier } from '@/lib/accounting-types'

const MOCK_SUPPLIERS: Supplier[] = [
  {
    id: '1',
    name: 'مؤسسة الورق المتحدة',
    contactPerson: 'أحمد السالم',
    phone: '0501234567',
    email: 'info@paper.sa',
    address: 'الرياض، حي الصناعية',
    category: 'paper',
    balance: -5000,
    lastOrder: '2024-11-08',
    status: 'active',
  },
  {
    id: '2',
    name: 'شركة الأحبار الحديثة',
    contactPerson: 'محمد العتيبي',
    phone: '0507654321',
    email: 'sales@ink.sa',
    address: 'جدة، شارع الملك',
    category: 'ink',
    balance: 0,
    lastOrder: '2024-10-25',
    status: 'active',
  },
  {
    id: '3',
    name: 'مركز قطع الغيار',
    contactPerson: 'خالد الأحمد',
    phone: '0551122334',
    email: 'support@parts.sa',
    address: 'الدمام، المنطقة الصناعية',
    category: 'parts',
    balance: -2500,
    lastOrder: '2024-11-05',
    status: 'active',
  },
]

const categoryColors = {
  paper: 'bg-blue-500/10 text-blue-500',
  ink: 'bg-purple-500/10 text-purple-500',
  parts: 'bg-amber-500/10 text-amber-500',
  equipment: 'bg-emerald-500/10 text-emerald-500',
  other: 'bg-slate-500/10 text-slate-500',
}

const categoryLabels = {
  paper: 'ورق',
  ink: 'أحبار',
  parts: 'قطع غيار',
  equipment: 'معدات',
  other: 'أخرى',
}

export function SuppliersList() {
  const [suppliers] = useState<Supplier[]>(MOCK_SUPPLIERS)

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Truck className="h-5 w-5 text-primary" />
            <CardTitle>الموردين</CardTitle>
          </div>
          <Button size="sm" className="gap-2">
            <Plus className="h-4 w-4" />
            مورد جديد
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {suppliers.map((supplier) => (
            <div
              key={supplier.id}
              className="rounded-lg border border-border bg-card p-4"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold">{supplier.name}</h4>
                      <span
                        className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                          categoryColors[supplier.category]
                        }`}
                      >
                        {categoryLabels[supplier.category]}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {supplier.contactPerson}
                    </p>
                  </div>
                  {supplier.balance !== 0 && (
                    <div className="text-left">
                      <p className="text-xs text-muted-foreground">الرصيد</p>
                      <p
                        className={`text-sm font-bold ${
                          supplier.balance < 0 ? 'text-red-500' : 'text-emerald-500'
                        }`}
                      >
                        {supplier.balance.toLocaleString()} ر.س
                      </p>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 gap-2 text-sm text-muted-foreground md:grid-cols-2">
                  <div className="flex items-center gap-2">
                    <Phone className="h-3 w-3" />
                    <span>{supplier.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-3 w-3" />
                    <span>{supplier.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-3 w-3" />
                    <span>{supplier.address}</span>
                  </div>
                  <div className="text-xs">آخر طلب: {supplier.lastOrder}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
