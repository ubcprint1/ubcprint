"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  Calculator,
  Users,
  FileText,
  ClipboardList,
  Settings,
  Wrench,
  UserCog,
  BarChart3,
} from "lucide-react"
import { cn } from "@/lib/utils"

const items = [
  { href: "/dashboard", label: "لوحة التحكم", icon: LayoutDashboard },
  { href: "/orders", label: "الطلبات", icon: ShoppingCart },
  { href: "/products", label: "المنتجات", icon: Package },
  { href: "/accounting", label: "المحاسبة", icon: Calculator },
  { href: "/users", label: "المستخدمون", icon: UserCog },
  { href: "/attendance", label: "الحضور", icon: ClipboardList },
  { href: "/maintenance", label: "الصيانة", icon: Wrench },
  { href: "/reports", label: "التقارير", icon: BarChart3 },
  { href: "/permissions", label: "الصلاحيات", icon: FileText },
  { href: "/settings", label: "الإعدادات", icon: Settings },
]

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <aside className="hidden w-72 shrink-0 border-l border-border bg-card lg:block">
      <div className="sticky top-0 flex h-screen flex-col">
        <div className="border-b border-border px-6 py-5">
          <p className="text-xs text-muted-foreground">UBC Print ERP</p>
          <h2 className="mt-1 text-xl font-bold text-foreground">نظام إدارة المطبعة</h2>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto p-4">
          {items.map((item) => {
            const Icon = item.icon
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`)
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-4 py-3 text-sm transition-colors",
                  active
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
              >
                <Icon className="h-4 w-4" />
                <span>{item.label}</span>
              </Link>
            )
          })}
        </nav>

        <div className="border-t border-border p-4 text-xs text-muted-foreground">
          <div className="rounded-xl bg-muted/50 p-3">
            <p className="font-medium text-foreground">النظام متصل</p>
            <p className="mt-1">جاهز لإدارة الطلبات والإنتاج والمحاسبة.</p>
          </div>
        </div>
      </div>
    </aside>
  )
}
