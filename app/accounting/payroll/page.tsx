import { PayrollManagement } from "@/components/payroll-management"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export default function PayrollPage() {
  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <Link href="/accounting">
              <Button variant="ghost" size="icon">
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="text-2xl font-bold text-foreground">مرتبات الموظفين</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        <PayrollManagement />
      </main>
    </div>
  )
}
