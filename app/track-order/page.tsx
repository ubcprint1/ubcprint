import { Suspense } from "react"
import { TrackOrderInner } from "@/components/auth/track-order-inner"

export const dynamic = "force-dynamic"

export default function TrackOrderPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center" dir="rtl">جاري تحميل تتبع الطلب...</div>}>
      <TrackOrderInner />
    </Suspense>
  )
}
