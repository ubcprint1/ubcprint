import { Suspense } from "react"
import { ClientRegisterInner } from "@/components/auth/client-register-inner"

export const dynamic = "force-dynamic"

export default function ClientRegisterPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center" dir="rtl">جاري تحميل صفحة التسجيل...</div>}>
      <ClientRegisterInner />
    </Suspense>
  )
}
