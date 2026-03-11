import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function ReportsPage() {
  return (
    <div className="space-y-6" dir="rtl">
      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle>التقارير</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm text-muted-foreground">
          <p>تم تجهيز صفحة التقارير كبداية مستقرة. التقارير التفصيلية يمكن فتحها من روابط الأقسام الحالية.</p>
          <div className="flex flex-wrap gap-3">
            <Link href="/accounting/reports/expenses" className="rounded-xl border px-4 py-2 text-foreground">تقارير المصروفات</Link>
            <Link href="/accounting" className="rounded-xl border px-4 py-2 text-foreground">لوحة المحاسبة</Link>
            <Link href="/dashboard" className="rounded-xl border px-4 py-2 text-foreground">العودة للوحة التحكم</Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
