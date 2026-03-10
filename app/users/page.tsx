"use client"

import { useRouter } from "next/navigation"
import { UsersManagement } from "@/components/users-management"
import { NotificationsDropdown } from "@/components/notifications-dropdown"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function UsersPage() {
  const router = useRouter()
  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={() => router.back()}>
                <ArrowRight className="h-5 w-5" />
              </Button>
              <h1 className="text-2xl font-bold text-foreground">إدارة الموظفين والصلاحيات</h1>
            </div>
            <div className="flex items-center gap-4">
              <NotificationsDropdown />
              <span className="text-sm text-muted-foreground">مرحباً، أحمد</span>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        <UsersManagement />
      </main>
    </div>
  )
}
