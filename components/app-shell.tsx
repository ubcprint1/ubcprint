"use client"

import { usePathname } from "next/navigation"
import { AppSidebar } from "@/components/app-sidebar"
import { AppTopbar } from "@/components/app-topbar"

const internalPrefixes = [
  "/dashboard",
  "/accounting",
  "/attendance",
  "/audit",
  "/inventory",
  "/machines",
  "/orders",
  "/reports",
  "/settings",
  "/tasks",
  "/employees",
  "/customers",
  "/production",
  "/staff/dashboard",
  "/staff/orders",
  "/staff/production",
  "/staff/accounting",
  "/staff/design",
  "/admin/dashboard",
  "/admin/products",
  "/admin/offers",
  "/admin/pricing",
  "/admin/users",
]

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isInternal = internalPrefixes.some((route) => pathname === route || pathname.startsWith(`${route}/`))

  if (!isInternal) {
    return <>{children}</>
  }

  return (
    <div className="min-h-screen bg-muted/30" dir="rtl">
      <div className="flex min-h-screen">
        <main className="flex min-h-screen flex-1 flex-col">
          <AppTopbar />
          <div className="flex-1 p-4 lg:p-6">{children}</div>
        </main>
        <AppSidebar />
      </div>
    </div>
  )
}
