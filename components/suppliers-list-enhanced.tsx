"use client"

import { Users, Eye } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import type { Supplier } from "@/lib/accounting-types"

const MOCK_SUPPLIERS: Supplier[] = [
  {
    id: "1",
    name: "مؤسسة الورق المتحدة",
    contactPerson: "أحمد محمود",
    phone: "0123456789",
    email: "info@paper-co.com",
    address: "القاهرة، مصر",
    category: "paper",
    balance: 15000,
    lastOrder: "2024-11-08",
    status: "active",
  },
  {
    id: "2",
    name: "شركة الأحبار الحديثة",
    contactPerson: "محمد علي",
    phone: "0123456780",
    email: "sales@ink-modern.com",
    address: "الجيزة، مصر",
    category: "ink",
    balance: 8500,
    lastOrder: "2024-11-05",
    status: "active",
  },
  {
    id: "3",
    name: "مركز قطع الغيار",
    contactPerson: "خالد حسن",
    phone: "0123456770",
    email: "parts@center.com",
    address: "الإسكندرية، مصر",
    category: "parts",
    balance: -2000,
    lastOrder: "2024-10-28",
    status: "active",
  },
]

export function SuppliersListEnhanced() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            <CardTitle>الموردين</CardTitle>
          </div>
          <Link href="/accounting/suppliers">
            <Button variant="outline" size="sm" className="gap-2 bg-transparent">
              <Eye className="h-4 w-4" />
              عرض الكل
            </Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {MOCK_SUPPLIERS.slice(0, 3).map((supplier) => (
            <Link href={`/accounting/supplier/${supplier.id}`} key={supplier.id}>
              <div className="rounded-lg border border-border bg-card p-4 transition-colors hover:bg-accent cursor-pointer">
                <div className="space-y-3">
                  <div>
                    <h4 className="font-semibold">{supplier.name}</h4>
                    <p className="text-sm text-muted-foreground">{supplier.contactPerson}</p>
                  </div>

                  <div className="flex items-center justify-between border-t border-border pt-3">
                    <div>
                      <p className="text-xs text-muted-foreground">الرصيد</p>
                      <p
                        className={`text-base font-bold ${supplier.balance >= 0 ? "text-emerald-500" : "text-red-500"}`}
                      >
                        {supplier.balance.toLocaleString()} ج.م
                      </p>
                    </div>
                    <div className="text-left">
                      <p className="text-xs text-muted-foreground">آخر معاملة</p>
                      <p className="text-sm font-medium">{supplier.lastOrder}</p>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
