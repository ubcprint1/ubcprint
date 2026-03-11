"use client"

import { Bell, Search, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function AppTopbar() {
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/95 backdrop-blur">
      <div className="flex items-center justify-between gap-4 px-4 py-4 lg:px-6">
        <div className="flex items-center gap-3">
          <Button variant="outline" size="icon" className="lg:hidden">
            <Menu className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-lg font-semibold text-foreground">لوحة التحكم</h1>
            <p className="text-sm text-muted-foreground">متابعة الطلبات والإنتاج والمحاسبة من مكان واحد</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden w-72 items-center gap-2 rounded-xl border border-border bg-card px-3 py-2 md:flex">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input placeholder="بحث سريع..." className="h-auto border-0 bg-transparent p-0 shadow-none focus-visible:ring-0" />
          </div>
          <Button variant="outline" size="icon">
            <Bell className="h-4 w-4" />
          </Button>
          <div className="rounded-xl border border-border bg-card px-3 py-2 text-sm">
            <p className="font-medium text-foreground">مدير النظام</p>
            <p className="text-xs text-muted-foreground">admin@example.com</p>
          </div>
        </div>
      </div>
    </header>
  )
}
