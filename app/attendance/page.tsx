"use client"

import { useRouter } from "next/navigation"
import { AttendanceStats } from "@/components/attendance-stats"
import { AttendanceDetailed } from "@/components/attendance-detailed"
import { ShiftsManagement } from "@/components/shifts-management"
import { CheckInOutPanel } from "@/components/check-in-out-panel"
import { PermissionRequestsList } from "@/components/permission-requests-list"
import { NotificationsDropdown } from "@/components/notifications-dropdown"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function AttendancePage() {
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
              <h1 className="text-2xl font-bold text-foreground">نظام الحضور والانصراف</h1>
            </div>
            <div className="flex items-center gap-4">
              <NotificationsDropdown />
              <span className="text-sm text-muted-foreground">مرحباً، أحمد</span>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        <div className="space-y-6">
          <CheckInOutPanel />
          <AttendanceStats />
          <PermissionRequestsList />
          <AttendanceDetailed />
          <ShiftsManagement />
        </div>
      </main>
    </div>
  )
}
