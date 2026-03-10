"use client"

import { Button } from "@/components/ui/button"
import { Plus, FileText, DollarSign, Clock, UserPlus } from "lucide-react"
import Link from "next/link"

export function QuickActionsBar() {
  const actions = [
    { label: "مهمة جديدة", icon: Plus, href: "/orders/new", color: "bg-blue-500 hover:bg-blue-600" },
    { label: "فاتورة", icon: FileText, href: "/accounting/invoice/new", color: "bg-green-500 hover:bg-green-600" },
    { label: "مصروف", icon: DollarSign, href: "/accounting/expense/new", color: "bg-red-500 hover:bg-red-600" },
    { label: "تسجيل حضور", icon: Clock, href: "/attendance", color: "bg-purple-500 hover:bg-purple-600" },
    { label: "إضافة موظف", icon: UserPlus, href: "/users/new", color: "bg-orange-500 hover:bg-orange-600" },
  ]

  return (
    <div className="flex flex-wrap gap-3">
      {actions.map((action) => (
        <Link key={action.label} href={action.href}>
          <Button className={`${action.color} gap-2 text-white`}>
            <action.icon className="h-4 w-4" />
            {action.label}
          </Button>
        </Link>
      ))}
    </div>
  )
}
