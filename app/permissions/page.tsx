"use client"

import { useRouter } from "next/navigation"
import { PermissionRequestsList } from "@/components/permission-requests-list"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function PermissionsPage() {
  const router = useRouter()
  return (
    <div className="min-h-screen bg-background p-6" dir="rtl">
      <div className="container mx-auto">
        <div className="mb-6 flex items-center gap-4">
          <Button variant="outline" size="sm" className="gap-2 bg-transparent" onClick={() => router.back()}>
            <ArrowRight className="h-4 w-4" />
            العودة للصفحة السابقة
          </Button>
        </div>
        <PermissionRequestsList />
      </div>
    </div>
  )
}
