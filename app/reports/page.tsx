"use client"

import { useRouter } from "next/navigation"
import { ReportsArchive } from "@/components/reports-archive"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function ReportsPage() {
  const router = useRouter()
  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => router.back()}>
              <ArrowRight className="h-5 w-5" />
            </Button>
            <h1 className="text-2xl font-bold">أرشيف التقارير</h1>
          </div>
        </div>
      </header>
      <main className="container mx-auto px-6 py-8">
        <ReportsArchive />
      </main>
    </div>
  )
}
