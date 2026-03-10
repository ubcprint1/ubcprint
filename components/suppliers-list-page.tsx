"use client"

import { useState } from "react"
import { Plus, Search } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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

export function SuppliersListPage() {
  const [suppliers] = useState<Supplier[]>(MOCK_SUPPLIERS)
  const [searchQuery, setSearchQuery] = useState("")

  const filteredSuppliers = suppliers.filter((supplier) =>
    supplier.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            placeholder="البحث عن مورد..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pr-10"
          />
        </div>
        <Link href="/accounting/supplier/new">
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            إضافة مورد جديد
          </Button>
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredSuppliers.map((supplier) => (
          <Link href={`/accounting/supplier/${supplier.id}`} key={supplier.id}>
            <Card className="transition-all hover:shadow-lg cursor-pointer">
              <CardHeader>
                <CardTitle className="text-lg">{supplier.name}</CardTitle>
                <p className="text-sm text-muted-foreground">{supplier.contactPerson}</p>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-1 text-sm text-muted-foreground">
                  <p>📱 {supplier.phone}</p>
                  <p className="truncate">✉️ {supplier.email}</p>
                  <p>📍 {supplier.address}</p>
                </div>

                <div className="flex items-center justify-between border-t border-border pt-3">
                  <div>
                    <p className="text-xs text-muted-foreground">الرصيد</p>
                    <p className={`text-lg font-bold ${supplier.balance >= 0 ? "text-emerald-500" : "text-red-500"}`}>
                      {supplier.balance.toLocaleString()} ج.م
                    </p>
                  </div>
                  <div className="text-left">
                    <p className="text-xs text-muted-foreground">آخر معاملة</p>
                    <p className="text-sm font-medium">{supplier.lastOrder}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
