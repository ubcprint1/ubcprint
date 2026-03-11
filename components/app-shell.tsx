"use client"

import { usePathname } from "next/navigation"
import { AppSidebar } from "@/components/app-sidebar"
import { AppTopbar } from "@/components/app-topbar"

const publicRoutes = new Set([
  "/about",
  "/blog",
  "/careers",
  "/contact",
  "/pricing",
  "/client/login",
  "/client/register",
  "/track-order",
  "/login",
])

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isPublic = publicRoutes.has(pathname)

  if (isPublic) {
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
