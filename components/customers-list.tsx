"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, UserPlus, Building2, User, Eye } from "lucide-react"
import Link from "next/link"

interface Customer {
  id: string
  name: string
  phone: string
  type: "individual" | "company" | "advertising"
  balance: number
  totalPaid: number
  totalUnpaid: number
  status: "active" | "inactive"
}

const mockCustomers: Customer[] = [
  {
    id: "1",
    name: "شركة النور للدعاية والإعلان",
    phone: "01012345678",
    type: "advertising",
    balance: 15000,
    totalPaid: 45000,
    totalUnpaid: 15000,
    status: "active",
  },
  {
    id: "2",
    name: "محمد أحمد",
    phone: "01098765432",
    type: "individual",
    balance: 2500,
    totalPaid: 7500,
    totalUnpaid: 2500,
    status: "active",
  },
  {
    id: "3",
    name: "مؤسسة الأعمال المتقدمة",
    phone: "01123456789",
    type: "company",
    balance: 8000,
    totalPaid: 32000,
    totalUnpaid: 8000,
    status: "active",
  },
]

export function CustomersList() {
  const [searchTerm, setSearchTerm] = useState("")
  const filteredCustomers = mockCustomers.filter((customer) =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "company":
        return <Building2 className="h-4 w-4" />
      case "advertising":
        return <Building2 className="h-4 w-4" />
      default:
        return <User className="h-4 w-4" />
    }
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "company":
        return "شركة"
      case "advertising":
        return "مكتب دعاية"
      default:
        return "فرد"
    }
  }

  return (
    <Card className="p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold">العملاء</h2>
        <div className="flex items-center gap-2">
          <Link href="/accounting/customers">
            <Button variant="outline" size="sm" className="gap-2 bg-transparent">
              <Eye className="h-4 w-4" />
              عرض الكل
            </Button>
          </Link>
          <Link href="/accounting/customer/new">
            <Button size="sm" className="gap-2">
              <UserPlus className="h-4 w-4" />
              إضافة عميل
            </Button>
          </Link>
        </div>
      </div>

      <div className="mb-4">
        <div className="relative">
          <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="البحث عن عميل..."
            className="pr-10"
          />
        </div>
      </div>

      <div className="space-y-3">
        {filteredCustomers.slice(0, 3).map((customer) => (
          <Link key={customer.id} href={`/accounting/customer/${customer.id}`}>
            <div className="rounded-lg border border-border bg-card p-4 transition-colors hover:bg-accent cursor-pointer">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="mb-2 flex items-center gap-2">
                    <h3 className="font-semibold text-foreground">{customer.name}</h3>
                    <Badge variant="outline" className="gap-1">
                      {getTypeIcon(customer.type)}
                      {getTypeLabel(customer.type)}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{customer.phone}</p>
                  <div className="mt-2 flex gap-4 text-sm">
                    <span className="text-muted-foreground">
                      مدفوع:{" "}
                      <span className="font-medium text-green-600">{customer.totalPaid.toLocaleString()} ج.م</span>
                    </span>
                    <span className="text-muted-foreground">
                      متبقي:{" "}
                      <span className="font-medium text-orange-600">{customer.totalUnpaid.toLocaleString()} ج.م</span>
                    </span>
                  </div>
                </div>
                {customer.totalUnpaid > 0 && (
                  <Badge variant="destructive">{customer.totalUnpaid.toLocaleString()} ج.م</Badge>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </Card>
  )
}
